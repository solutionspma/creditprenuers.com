#!/bin/bash

# =====================================================
# Coys FieldOps Mobile App - Build & Deploy Script
# Builds and publishes React Native (Expo) app
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
MOBILE_DIR="$PROJECT_ROOT/mobile/coys_fieldops_app"
BUILD_DIR="$PROJECT_ROOT/builds/mobile"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo -e "${BLUE}==============================================${NC}"
echo -e "${BLUE}     Coys FieldOps Mobile App Build         ${NC}"
echo -e "${BLUE}==============================================${NC}"
echo ""

# Check if we're in the correct directory
if [ ! -d "$MOBILE_DIR" ]; then
    echo -e "${RED}Error: Mobile app directory not found: $MOBILE_DIR${NC}"
    exit 1
fi

cd "$MOBILE_DIR"

# Function to display usage
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help          Show this help message"
    echo "  -d, --dev           Start development server"
    echo "  -b, --build         Build production app"
    echo "  -p, --publish       Publish to Expo"
    echo "  --android           Build Android APK/AAB"
    echo "  --ios               Build iOS IPA"
    echo "  --preview           Create preview build"
    echo ""
    echo "Examples:"
    echo "  $0 -d               # Start dev server"
    echo "  $0 -b --android     # Build Android production"
    echo "  $0 -p               # Publish to Expo"
}

# Function to check dependencies
check_dependencies() {
    echo -e "${BLUE}Checking dependencies...${NC}"
    
    # Check for Node.js
    if ! command -v node &> /dev/null; then
        echo -e "${RED}Error: Node.js is not installed${NC}"
        exit 1
    fi
    
    # Check for npm
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}Error: npm is not installed${NC}"
        exit 1
    fi
    
    # Check for Expo CLI
    if ! command -v expo &> /dev/null; then
        echo -e "${YELLOW}Expo CLI not found. Installing...${NC}"
        npm install -g expo-cli
    fi
    
    # Check for EAS CLI
    if ! command -v eas &> /dev/null; then
        echo -e "${YELLOW}EAS CLI not found. Installing...${NC}"
        npm install -g eas-cli
    fi
    
    echo -e "${GREEN}✓ All dependencies installed${NC}"
}

# Function to install project dependencies
install_deps() {
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}Installing project dependencies...${NC}"
        npm install
    fi
}

# Function to start development server
start_dev() {
    echo -e "${BLUE}Starting Expo development server...${NC}"
    install_deps
    npx expo start
}

# Function to build production
build_production() {
    local platform=$1
    
    echo -e "${BLUE}Building production app for $platform...${NC}"
    install_deps
    
    mkdir -p "$BUILD_DIR"
    
    case $platform in
        "android")
            echo -e "${YELLOW}Building Android APK...${NC}"
            eas build --platform android --profile production
            ;;
        "ios")
            echo -e "${YELLOW}Building iOS IPA...${NC}"
            eas build --platform ios --profile production
            ;;
        "all")
            echo -e "${YELLOW}Building for all platforms...${NC}"
            eas build --platform all --profile production
            ;;
    esac
    
    echo -e "${GREEN}✓ Build submitted. Check Expo dashboard for status.${NC}"
}

# Function to create preview build
build_preview() {
    local platform=$1
    
    echo -e "${BLUE}Creating preview build...${NC}"
    install_deps
    
    case $platform in
        "android")
            eas build --platform android --profile preview
            ;;
        "ios")
            eas build --platform ios --profile preview
            ;;
        *)
            eas build --platform all --profile preview
            ;;
    esac
    
    echo -e "${GREEN}✓ Preview build submitted.${NC}"
}

# Function to publish to Expo
publish_expo() {
    echo -e "${BLUE}Publishing to Expo...${NC}"
    install_deps
    
    npx expo publish
    
    echo -e "${GREEN}✓ Published to Expo!${NC}"
    echo -e "${YELLOW}Share link: exp://exp.host/@your-username/coys-fieldops${NC}"
}

# Function to run EAS update
eas_update() {
    echo -e "${BLUE}Publishing EAS Update...${NC}"
    install_deps
    
    eas update --branch production --message "Update $TIMESTAMP"
    
    echo -e "${GREEN}✓ EAS Update published!${NC}"
}

# Function to create EAS config
setup_eas() {
    echo -e "${BLUE}Setting up EAS configuration...${NC}"
    
    if [ ! -f "eas.json" ]; then
        cat > eas.json << 'EOF'
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-services.json",
        "track": "internal"
      },
      "ios": {
        "appleId": "your-apple-id@email.com",
        "ascAppId": "your-app-store-connect-app-id"
      }
    }
  }
}
EOF
        echo -e "${GREEN}✓ Created eas.json${NC}"
    else
        echo -e "${YELLOW}eas.json already exists${NC}"
    fi
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            usage
            exit 0
            ;;
        -d|--dev)
            check_dependencies
            start_dev
            exit 0
            ;;
        -b|--build)
            shift
            PLATFORM="all"
            while [[ $# -gt 0 ]]; do
                case $1 in
                    --android)
                        PLATFORM="android"
                        shift
                        ;;
                    --ios)
                        PLATFORM="ios"
                        shift
                        ;;
                    *)
                        break
                        ;;
                esac
            done
            check_dependencies
            setup_eas
            build_production "$PLATFORM"
            exit 0
            ;;
        -p|--publish)
            check_dependencies
            publish_expo
            exit 0
            ;;
        --preview)
            shift
            PLATFORM="all"
            if [[ $1 == "--android" ]]; then
                PLATFORM="android"
            elif [[ $1 == "--ios" ]]; then
                PLATFORM="ios"
            fi
            check_dependencies
            setup_eas
            build_preview "$PLATFORM"
            exit 0
            ;;
        --update)
            check_dependencies
            eas_update
            exit 0
            ;;
        --setup)
            setup_eas
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            usage
            exit 1
            ;;
    esac
done

# Default action: show help
usage
