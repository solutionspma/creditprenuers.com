#!/bin/bash

# =====================================================
# Credtegy x Koiz Platform - Deployment Script
# Deploys web applications to GoDaddy/Ionos hosting
# =====================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_DIR="$PROJECT_ROOT/web"
BUILD_DIR="$PROJECT_ROOT/builds"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Site configurations
SITES=(
  "credtegy.com"
  "logademy.com"
)

# FTP Configuration (set these via environment variables or .env file)
# CREDTEGY_FTP_HOST
# CREDTEGY_FTP_USER
# CREDTEGY_FTP_PASS
# LOGADEMY_FTP_HOST
# LOGADEMY_FTP_USER
# LOGADEMY_FTP_PASS

echo -e "${BLUE}==============================================${NC}"
echo -e "${BLUE}   Credtegy x Koiz Platform Deploy    ${NC}"
echo -e "${BLUE}==============================================${NC}"
echo ""

# Load environment variables if .env exists
if [ -f "$PROJECT_ROOT/.env" ]; then
    echo -e "${YELLOW}Loading environment variables from .env${NC}"
    export $(cat "$PROJECT_ROOT/.env" | grep -v '^#' | xargs)
fi

# Function to display usage
usage() {
    echo "Usage: $0 [OPTIONS] [SITE]"
    echo ""
    echo "Options:"
    echo "  -h, --help        Show this help message"
    echo "  -b, --build-only  Only build, don't deploy"
    echo "  -d, --deploy-only Only deploy (skip build)"
    echo "  --all             Deploy all sites"
    echo ""
    echo "Sites:"
    echo "  credtegy    Deploy credtegy.com"
    echo "  logademy     Deploy logademy.com"
    echo ""
    echo "Examples:"
    echo "  $0 --all                    # Build and deploy all sites"
    echo "  $0 credtegy           # Build and deploy credtegy.com"
    echo "  $0 -b logademy         # Only build logademy.com"
}

# Function to build a site
build_site() {
    local site=$1
    local site_dir="$WEB_DIR/$site"
    
    echo -e "${BLUE}Building $site...${NC}"
    
    if [ ! -d "$site_dir" ]; then
        echo -e "${RED}Error: Site directory not found: $site_dir${NC}"
        return 1
    fi
    
    cd "$site_dir"
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}Installing dependencies...${NC}"
        npm install
    fi
    
    # Build the Next.js static export
    echo -e "${YELLOW}Running Next.js build...${NC}"
    npm run build
    
    # Create build archive
    mkdir -p "$BUILD_DIR"
    local archive="$BUILD_DIR/${site}_${TIMESTAMP}.tar.gz"
    
    if [ -d "out" ]; then
        tar -czvf "$archive" -C out .
        echo -e "${GREEN}✓ Build complete: $archive${NC}"
    else
        echo -e "${RED}Error: Build output directory 'out' not found${NC}"
        return 1
    fi
    
    cd "$PROJECT_ROOT"
    return 0
}

# Function to deploy via FTP
deploy_ftp() {
    local site=$1
    local ftp_host=""
    local ftp_user=""
    local ftp_pass=""
    local remote_dir="public_html"
    
    # Get FTP credentials based on site
    case $site in
        "credtegy.com")
            ftp_host="${CREDTEGY_FTP_HOST:-}"
            ftp_user="${CREDTEGY_FTP_USER:-}"
            ftp_pass="${CREDTEGY_FTP_PASS:-}"
            ;;
        "logademy.com")
            ftp_host="${LOGADEMY_FTP_HOST:-}"
            ftp_user="${LOGADEMY_FTP_USER:-}"
            ftp_pass="${LOGADEMY_FTP_PASS:-}"
            ;;
    esac
    
    if [ -z "$ftp_host" ] || [ -z "$ftp_user" ] || [ -z "$ftp_pass" ]; then
        echo -e "${YELLOW}FTP credentials not configured for $site${NC}"
        echo -e "${YELLOW}Set environment variables: ${site^^}_FTP_HOST, ${site^^}_FTP_USER, ${site^^}_FTP_PASS${NC}"
        return 1
    fi
    
    echo -e "${BLUE}Deploying $site to $ftp_host...${NC}"
    
    local build_output="$WEB_DIR/$site/out"
    
    if [ ! -d "$build_output" ]; then
        echo -e "${RED}Error: Build output not found. Run build first.${NC}"
        return 1
    fi
    
    # Use lftp for FTP transfer (install: brew install lftp)
    if command -v lftp &> /dev/null; then
        lftp -c "
            set ftp:ssl-allow no;
            open -u $ftp_user,$ftp_pass $ftp_host;
            mirror -R --delete --verbose $build_output $remote_dir;
            quit
        "
        echo -e "${GREEN}✓ Deployment complete for $site${NC}"
    else
        echo -e "${YELLOW}lftp not found. Install with: brew install lftp${NC}"
        echo -e "${YELLOW}Manual upload required. Files are in: $build_output${NC}"
        return 1
    fi
    
    return 0
}

# Function to deploy via SFTP/SSH
deploy_sftp() {
    local site=$1
    local ssh_host=""
    local ssh_user=""
    local remote_dir=""
    
    # Get SSH credentials based on site
    case $site in
        "credtegy.com")
            ssh_host="${CREDTEGY_SSH_HOST:-}"
            ssh_user="${CREDTEGY_SSH_USER:-}"
            remote_dir="${CREDTEGY_REMOTE_DIR:-/var/www/credtegy.com/public_html}"
            ;;
        "logademy.com")
            ssh_host="${LOGADEMY_SSH_HOST:-}"
            ssh_user="${LOGADEMY_SSH_USER:-}"
            remote_dir="${LOGADEMY_REMOTE_DIR:-/var/www/logademy.com/public_html}"
            ;;
    esac
    
    if [ -z "$ssh_host" ] || [ -z "$ssh_user" ]; then
        echo -e "${YELLOW}SSH credentials not configured for $site, trying FTP...${NC}"
        deploy_ftp "$site"
        return $?
    fi
    
    echo -e "${BLUE}Deploying $site to $ssh_host via SFTP...${NC}"
    
    local build_output="$WEB_DIR/$site/out"
    
    if [ ! -d "$build_output" ]; then
        echo -e "${RED}Error: Build output not found. Run build first.${NC}"
        return 1
    fi
    
    # Use rsync for efficient transfer
    rsync -avz --delete \
        -e "ssh -o StrictHostKeyChecking=no" \
        "$build_output/" \
        "${ssh_user}@${ssh_host}:${remote_dir}/"
    
    echo -e "${GREEN}✓ Deployment complete for $site${NC}"
    return 0
}

# Main deployment function
deploy_site() {
    local site=$1
    
    echo -e "${BLUE}Deploying $site...${NC}"
    
    # Try SFTP first, fall back to FTP
    deploy_sftp "$site" || deploy_ftp "$site"
    
    return $?
}

# Parse arguments
BUILD_ONLY=false
DEPLOY_ONLY=false
DEPLOY_ALL=false
TARGET_SITES=()

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            usage
            exit 0
            ;;
        -b|--build-only)
            BUILD_ONLY=true
            shift
            ;;
        -d|--deploy-only)
            DEPLOY_ONLY=true
            shift
            ;;
        --all)
            DEPLOY_ALL=true
            shift
            ;;
        credtegy|credtegy.com)
            TARGET_SITES+=("credtegy.com")
            shift
            ;;
        logademy|logademy.com)
            TARGET_SITES+=("logademy.com")
            shift
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            usage
            exit 1
            ;;
    esac
done

# Determine which sites to process
if [ "$DEPLOY_ALL" = true ]; then
    TARGET_SITES=("${SITES[@]}")
fi

if [ ${#TARGET_SITES[@]} -eq 0 ]; then
    echo -e "${YELLOW}No sites specified. Use --all or specify a site name.${NC}"
    usage
    exit 1
fi

# Process each site
for site in "${TARGET_SITES[@]}"; do
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}Processing: $site${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    # Build if not deploy-only
    if [ "$DEPLOY_ONLY" = false ]; then
        build_site "$site"
        if [ $? -ne 0 ]; then
            echo -e "${RED}Build failed for $site${NC}"
            continue
        fi
    fi
    
    # Deploy if not build-only
    if [ "$BUILD_ONLY" = false ]; then
        deploy_site "$site"
        if [ $? -ne 0 ]; then
            echo -e "${RED}Deployment failed for $site${NC}"
            continue
        fi
    fi
done

echo ""
echo -e "${GREEN}==============================================${NC}"
echo -e "${GREEN}   Deployment process complete!              ${NC}"
echo -e "${GREEN}==============================================${NC}"
