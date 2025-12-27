'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Sidebar component shared across all dashboard pages
export function DashboardLayout({ children, activePage, business = 'credtegy' }) {
  const [user, setUser] = useState(null)
  const [currentBusiness, setCurrentBusiness] = useState(business)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (!token || !userData) {
      router.push('/signin')
      return
    }
    setUser(JSON.parse(userData))
    
    // Get saved business preference
    const savedBusiness = localStorage.getItem('currentBusiness') || 'credtegy'
    setCurrentBusiness(savedBusiness)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('currentBusiness')
    router.push('/signin')
  }

  const switchBusiness = (businessId) => {
    setCurrentBusiness(businessId)
    localStorage.setItem('currentBusiness', businessId)
    router.push('/dashboard')
  }

  const businesses = [
    { id: 'credtegy', name: 'Credtegy', icon: '💳', color: 'bg-accent-gold' },
    { id: 'logademy', name: 'Logademy', icon: '🚛', color: 'bg-blue-500' },
  ]

  const currentBiz = businesses.find(b => b.id === currentBusiness)

  // Different menu items based on business
  const credtegyMenu = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊', id: 'dashboard' },
    { name: 'Contacts', href: '/dashboard/contacts', icon: '👥', id: 'contacts' },
    { name: 'Pipeline', href: '/dashboard/pipeline', icon: '📈', id: 'pipeline' },
    { name: 'Funding', href: '/dashboard/funding', icon: '💰', id: 'funding' },
    { name: 'Credit Vault', href: '/dashboard/credit-vault', icon: '🔐', id: 'credit-vault' },
    { name: 'Mentees', href: '/dashboard/mentees', icon: '🎓', id: 'mentees' },
    { name: 'Documents', href: '/dashboard/documents', icon: '📁', id: 'documents' },
    { name: 'Automation', href: '/dashboard/automation', icon: '⚡', id: 'automation' },
    { name: 'Communication', href: '/dashboard/communication', icon: '💬', id: 'communication' },
    { name: 'Billing', href: '/dashboard/billing', icon: '💵', id: 'billing' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: '📊', id: 'analytics' },
  ]

  const logademyMenu = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊', id: 'dashboard' },
    { name: 'Contacts', href: '/dashboard/contacts', icon: '👥', id: 'contacts' },
    { name: 'Pipeline', href: '/dashboard/pipeline', icon: '📈', id: 'pipeline' },
    { name: 'Fleet', href: '/dashboard/fleet', icon: '🚛', id: 'fleet' },
    { name: 'Loads', href: '/dashboard/loads', icon: '📦', id: 'loads' },
    { name: 'Drivers', href: '/dashboard/drivers', icon: '👷', id: 'drivers' },
    { name: 'Documents', href: '/dashboard/documents', icon: '📁', id: 'documents' },
    { name: 'Automation', href: '/dashboard/automation', icon: '⚡', id: 'automation' },
    { name: 'Communication', href: '/dashboard/communication', icon: '💬', id: 'communication' },
    { name: 'Billing', href: '/dashboard/billing', icon: '💵', id: 'billing' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: '📊', id: 'analytics' },
  ]

  const menuItems = currentBusiness === 'logademy' ? logademyMenu : credtegyMenu

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-gold"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <div className="bg-gray-900 rounded-lg p-2">
                <img src="/images/logo.png" alt="MBOCC" className="h-8 w-auto" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg">MBOCC Command Center</span>
                <span className="text-gray-400 text-xs">Multi-Business Owner Command Center</span>
              </div>
            </div>

            {/* Business Switcher */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={currentBusiness}
                  onChange={(e) => switchBusiness(e.target.value)}
                  className="appearance-none bg-gray-700 text-white px-4 py-2 pr-8 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-gold cursor-pointer"
                >
                  {businesses.map((biz) => (
                    <option key={biz.id} value={biz.id}>
                      {biz.icon} {biz.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  ▼
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${currentBiz?.color}`}></div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-300">{user?.firstName} {user?.lastName}</span>
                <span className="text-xs bg-accent-gold text-black px-2 py-1 rounded">{user?.role}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white transition-colors px-3 py-2 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 min-h-[calc(100vh-64px)] border-r border-gray-700 flex-shrink-0">
          {/* Business Badge */}
          <div className={`m-4 p-3 rounded-lg ${currentBusiness === 'logademy' ? 'bg-blue-500/20 border-blue-500' : 'bg-accent-gold/20 border-accent-gold'} border`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentBiz?.icon}</span>
              <div>
                <p className="text-white font-bold text-sm">{currentBiz?.name}</p>
                <p className="text-gray-400 text-xs">{currentBusiness === 'logademy' ? 'Trucking & Logistics' : 'Credit Repair & Funding'}</p>
              </div>
            </div>
          </div>

          <nav className="px-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activePage === item.id
                    ? currentBusiness === 'logademy' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-accent-gold text-black'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
            
            <div className="border-t border-gray-700 my-4"></div>
            
            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activePage === 'settings' ? 'bg-gray-600 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span>⚙️</span>
              <span className="font-medium">Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
