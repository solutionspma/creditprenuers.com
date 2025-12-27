'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

export default function DriversPage() {
  const [filterStatus, setFilterStatus] = useState('all')

  const drivers = [
    { 
      id: 'DRV-001', 
      name: 'Marcus Johnson', 
      phone: '(404) 555-1234', 
      email: 'marcus@logademy.com',
      status: 'On Duty', 
      truck: 'TRK-001',
      license: 'CDL-A',
      licenseExp: '2025-08-15',
      medicalExp: '2025-03-20',
      hoursRemaining: 6.5,
      cycleRemaining: 48,
      location: 'I-20 W, near Dallas, TX',
      hireDate: '2022-03-15',
      loads: 245,
      miles: 156000,
      rating: 4.8
    },
    { 
      id: 'DRV-002', 
      name: 'Keisha Williams', 
      phone: '(678) 555-5678', 
      email: 'keisha@logademy.com',
      status: 'On Duty', 
      truck: 'TRK-004',
      license: 'CDL-A',
      licenseExp: '2026-01-10',
      medicalExp: '2025-06-05',
      hoursRemaining: 4.2,
      cycleRemaining: 32,
      location: 'I-55 N, near Springfield, IL',
      hireDate: '2021-09-01',
      loads: 312,
      miles: 198000,
      rating: 4.9
    },
    { 
      id: 'DRV-003', 
      name: 'Darnell Brown', 
      phone: '(770) 555-9012', 
      email: 'darnell@logademy.com',
      status: 'Sleeper', 
      truck: 'TRK-002',
      license: 'CDL-A',
      licenseExp: '2025-11-30',
      medicalExp: '2024-12-15',
      hoursRemaining: 10,
      cycleRemaining: 56,
      location: 'Rest Stop, I-45, TX',
      hireDate: '2023-01-20',
      loads: 89,
      miles: 52000,
      rating: 4.6
    },
    { 
      id: 'DRV-004', 
      name: 'Angela Thompson', 
      phone: '(404) 555-3456', 
      email: 'angela@logademy.com',
      status: 'On Duty', 
      truck: 'TRK-006',
      license: 'CDL-A',
      licenseExp: '2026-05-22',
      medicalExp: '2025-09-10',
      hoursRemaining: 8.5,
      cycleRemaining: 62,
      location: 'Phoenix, AZ (Delivery)',
      hireDate: '2023-06-01',
      loads: 67,
      miles: 38000,
      rating: 4.7
    },
    { 
      id: 'DRV-005', 
      name: 'Jerome Smith', 
      phone: '(678) 555-7890', 
      email: 'jerome@logademy.com',
      status: 'Off Duty', 
      truck: 'TRK-005',
      license: 'CDL-A',
      licenseExp: '2025-04-18',
      medicalExp: '2025-01-30',
      hoursRemaining: 11,
      cycleRemaining: 70,
      location: 'Phoenix, AZ (Home)',
      hireDate: '2020-11-15',
      loads: 456,
      miles: 312000,
      rating: 4.9
    },
  ]

  const filteredDrivers = filterStatus === 'all' 
    ? drivers 
    : drivers.filter(d => d.status.toLowerCase().replace(' ', '-') === filterStatus)

  return (
    <DashboardLayout activePage="drivers">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">👷 Driver Management</h1>
          <p className="text-gray-400 mt-1">Monitor drivers, HOS, and compliance</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
            📋 Compliance Report
          </button>
          <button className="bg-accent-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
            + Add Driver
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl p-4 border border-green-500/30">
          <p className="text-green-400 text-sm">On Duty</p>
          <p className="text-2xl font-bold text-white mt-1">3</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-4 border border-blue-500/30">
          <p className="text-blue-400 text-sm">Sleeper</p>
          <p className="text-2xl font-bold text-white mt-1">1</p>
        </div>
        <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/10 rounded-xl p-4 border border-gray-500/30">
          <p className="text-gray-400 text-sm">Off Duty</p>
          <p className="text-2xl font-bold text-white mt-1">1</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-xl p-4 border border-red-500/30">
          <p className="text-red-400 text-sm">Expiring Docs</p>
          <p className="text-2xl font-bold text-white mt-1">2</p>
        </div>
        <div className="bg-gradient-to-br from-accent-gold/20 to-yellow-600/10 rounded-xl p-4 border border-accent-gold/30">
          <p className="text-accent-gold text-sm">Avg Rating</p>
          <p className="text-2xl font-bold text-white mt-1">4.8 ⭐</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'on-duty', 'sleeper', 'off-duty'].map((status) => (
          <button 
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
              filterStatus === status 
                ? 'bg-accent-gold text-black' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {status.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredDrivers.map((driver) => (
          <div key={driver.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-accent-gold transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold text-2xl font-bold">
                  {driver.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{driver.name}</h3>
                  <p className="text-gray-400 text-sm">{driver.id} • {driver.license}</p>
                  <p className="text-gray-400 text-sm">{driver.phone}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                driver.status === 'On Duty' ? 'bg-green-500/20 text-green-400' :
                driver.status === 'Sleeper' ? 'bg-blue-500/20 text-blue-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {driver.status}
              </span>
            </div>

            {/* HOS Info */}
            <div className="bg-gray-700 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Hours of Service</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-xs">Drive Time Remaining</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${driver.hoursRemaining > 4 ? 'bg-green-500' : driver.hoursRemaining > 2 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${(driver.hoursRemaining / 11) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-medium">{driver.hoursRemaining}h</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">70hr Cycle Remaining</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent-gold"
                        style={{ width: `${(driver.cycleRemaining / 70) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-medium">{driver.cycleRemaining}h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Truck */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-gray-400">Location</p>
                <p className="text-white">{driver.location}</p>
              </div>
              <div>
                <p className="text-gray-400">Assigned Truck</p>
                <p className="text-accent-gold font-medium">{driver.truck}</p>
              </div>
            </div>

            {/* Compliance */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className={`p-2 rounded ${new Date(driver.licenseExp) < new Date('2025-03-01') ? 'bg-red-500/10 border border-red-500/30' : 'bg-gray-700'}`}>
                <p className="text-gray-400 text-xs">License Expires</p>
                <p className={`font-medium ${new Date(driver.licenseExp) < new Date('2025-03-01') ? 'text-red-400' : 'text-white'}`}>
                  {driver.licenseExp}
                </p>
              </div>
              <div className={`p-2 rounded ${new Date(driver.medicalExp) < new Date('2025-02-01') ? 'bg-red-500/10 border border-red-500/30' : 'bg-gray-700'}`}>
                <p className="text-gray-400 text-xs">Medical Expires</p>
                <p className={`font-medium ${new Date(driver.medicalExp) < new Date('2025-02-01') ? 'text-red-400' : 'text-white'}`}>
                  {driver.medicalExp}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
              <div className="flex gap-4 text-sm">
                <span className="text-gray-400">{driver.loads} loads</span>
                <span className="text-gray-400">{(driver.miles / 1000).toFixed(0)}K miles</span>
                <span className="text-accent-gold">{driver.rating} ⭐</span>
              </div>
              <button className="text-accent-gold hover:underline">View Profile →</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
