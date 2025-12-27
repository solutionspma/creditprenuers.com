'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')

  const sections = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'businesses', name: 'Businesses', icon: '🏢' },
    { id: 'team', name: 'Team', icon: '👥' },
    { id: 'integrations', name: 'Integrations', icon: '🔌' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'billing', name: 'Billing Plan', icon: '💳' },
  ]

  const integrations = [
    { name: 'Stripe', status: 'Connected', icon: '💳', description: 'Payment processing' },
    { name: 'QuickBooks', status: 'Connected', icon: '📊', description: 'Accounting sync' },
    { name: 'Twilio', status: 'Connected', icon: '📱', description: 'SMS & Calls' },
    { name: 'Google Workspace', status: 'Connected', icon: '📧', description: 'Email integration' },
    { name: 'Samsara', status: 'Not Connected', icon: '🚛', description: 'ELD & Fleet tracking' },
    { name: 'DAT Load Board', status: 'Not Connected', icon: '📦', description: 'Load matching' },
    { name: 'TransUnion', status: 'Connected', icon: '📈', description: 'Credit monitoring' },
    { name: 'Experian', status: 'Connected', icon: '📉', description: 'Credit data' },
  ]

  return (
    <DashboardLayout activePage="settings">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">⚙️ Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Settings Navigation */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id 
                      ? 'bg-accent-gold/20 text-accent-gold' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span>{section.icon}</span>
                  <span>{section.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeSection === 'profile' && (
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Profile Settings</h2>
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold text-3xl font-bold">
                  SM
                </div>
                <div>
                  <button className="px-4 py-2 bg-accent-gold text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                    Change Photo
                  </button>
                  <p className="text-gray-400 text-sm mt-2">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">First Name</label>
                  <input type="text" defaultValue="Shakur" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-gold" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Last Name</label>
                  <input type="text" defaultValue="Mac" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-gold" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <input type="email" defaultValue="admin@credtegy.com" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-gold" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone</label>
                  <input type="tel" defaultValue="(404) 555-0123" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-gold" />
                </div>
              </div>
              <button className="mt-6 px-6 py-3 bg-accent-gold text-black rounded-lg font-bold hover:bg-yellow-400 transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {activeSection === 'businesses' && (
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-xl border border-accent-gold/50 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-accent-gold/20 flex items-center justify-center text-2xl">
                      💳
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Credtegy</h3>
                      <p className="text-gray-400">Credit Repair & Business Funding</p>
                      <span className="text-xs bg-accent-gold/20 text-accent-gold px-2 py-1 rounded mt-2 inline-block">Primary</span>
                    </div>
                  </div>
                  <button className="text-accent-gold hover:underline">Edit</button>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-blue-500/20 flex items-center justify-center text-2xl">
                      🚛
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Logademy</h3>
                      <p className="text-gray-400">Trucking & Freight Services</p>
                    </div>
                  </div>
                  <button className="text-accent-gold hover:underline">Edit</button>
                </div>
              </div>
              <button className="w-full py-4 border-2 border-dashed border-gray-600 rounded-xl text-gray-400 hover:border-accent-gold hover:text-accent-gold transition-colors">
                + Add Another Business
              </button>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <div key={integration.name} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{integration.icon}</span>
                      <div>
                        <h4 className="text-white font-medium">{integration.name}</h4>
                        <p className="text-gray-400 text-sm">{integration.description}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      integration.status === 'Connected' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-gray-600 text-gray-400'
                    }`}>
                      {integration.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div className="pb-6 border-b border-gray-700">
                  <h3 className="text-white font-medium mb-2">Password</h3>
                  <p className="text-gray-400 text-sm mb-4">Last changed 30 days ago</p>
                  <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    Change Password
                  </button>
                </div>
                <div className="pb-6 border-b border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                      <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                    </div>
                    <button className="px-4 py-2 bg-accent-gold text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                      Enable
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-700 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <p className="text-white">MacBook Pro • Chrome</p>
                        <p className="text-gray-400 text-sm">Atlanta, GA • Current session</p>
                      </div>
                      <span className="text-green-400 text-sm">Active</span>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <p className="text-white">iPhone 15 • Safari</p>
                        <p className="text-gray-400 text-sm">Atlanta, GA • 2 hours ago</p>
                      </div>
                      <button className="text-red-400 text-sm hover:underline">Revoke</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeSection === 'team' || activeSection === 'notifications' || activeSection === 'billing') && (
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4 capitalize">{activeSection} Settings</h2>
              <p className="text-gray-400">Configure your {activeSection} preferences here.</p>
              <div className="mt-6 p-8 border-2 border-dashed border-gray-700 rounded-lg text-center">
                <p className="text-gray-400">🚧 Coming Soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
