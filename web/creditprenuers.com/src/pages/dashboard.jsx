'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import DashboardLayout from '@/components/DashboardLayout'

export default function Dashboard() {
  const [currentBusiness, setCurrentBusiness] = useState('credtegy')
  const router = useRouter()

  useEffect(() => {
    const savedBusiness = localStorage.getItem('currentBusiness') || 'credtegy'
    setCurrentBusiness(savedBusiness)
  }, [])

  // Credtegy Stats
  const creditStats = [
    { label: 'Total Contacts', value: '247', change: '+12%', icon: '👥' },
    { label: 'Active Clients', value: '89', change: '+8%', icon: '✅' },
    { label: 'Revenue MTD', value: '$12,450', change: '+23%', icon: '💰' },
    { label: 'Pending Funding', value: '34', change: '+5%', icon: '📋' },
  ]

  // Logademy Stats
  const logisticsStats = [
    { label: 'Active Loads', value: '18', change: '+15%', icon: '📦' },
    { label: 'Fleet Trucks', value: '12', change: '0%', icon: '🚛' },
    { label: 'Revenue MTD', value: '$87,320', change: '+31%', icon: '💰' },
    { label: 'Drivers Active', value: '14', change: '+2%', icon: '👨‍✈️' },
  ]

  const stats = currentBusiness === 'logademy' ? logisticsStats : creditStats

  // Credtegy Activity
  const creditActivity = [
    { action: 'New lead submitted', name: 'Marcus Johnson', time: '2 mins ago' },
    { action: 'Funding approved', name: 'Keisha Williams', time: '15 mins ago' },
    { action: 'eBook purchased', name: 'Darnell Brown', time: '1 hour ago' },
    { action: 'Mentorship signup', name: 'Tanya Davis', time: '3 hours ago' },
    { action: 'Credit score update', name: 'Jerome Smith', time: '5 hours ago' },
  ]

  // Logademy Activity
  const logisticsActivity = [
    { action: 'Load delivered', name: 'Load #LD-004521 to Atlanta', time: '10 mins ago' },
    { action: 'New load booked', name: '$3,200 - Dallas to Miami', time: '25 mins ago' },
    { action: 'Driver check-in', name: 'James Washington - I-95 NC', time: '1 hour ago' },
    { action: 'POD received', name: 'Load #LD-004518', time: '2 hours ago' },
    { action: 'Invoice paid', name: 'ABC Freight - $4,850', time: '4 hours ago' },
  ]

  const recentActivity = currentBusiness === 'logademy' ? logisticsActivity : creditActivity

  // Credtegy Pipeline
  const creditPipeline = [
    { stage: 'New Lead', count: 23, color: 'bg-red-500' },
    { stage: 'Consultation', count: 15, color: 'bg-orange-500' },
    { stage: 'Onboarding', count: 18, color: 'bg-yellow-500' },
    { stage: 'Credit Analysis', count: 12, color: 'bg-green-500' },
    { stage: 'Dispute Progress', count: 8, color: 'bg-blue-500' },
    { stage: 'Funding Ready', count: 5, color: 'bg-purple-500' },
    { stage: 'Funded', count: 34, color: 'bg-accent-gold' },
  ]

  // Logademy Pipeline
  const logisticsPipeline = [
    { stage: 'Quote Request', count: 8, color: 'bg-gray-500' },
    { stage: 'Quoted', count: 12, color: 'bg-red-500' },
    { stage: 'Booked', count: 6, color: 'bg-orange-500' },
    { stage: 'Dispatched', count: 4, color: 'bg-yellow-500' },
    { stage: 'In Transit', count: 18, color: 'bg-blue-500' },
    { stage: 'Delivered', count: 3, color: 'bg-green-500' },
    { stage: 'Invoiced', count: 7, color: 'bg-purple-500' },
    { stage: 'Paid', count: 142, color: 'bg-accent-gold' },
  ]

  const pipeline = currentBusiness === 'logademy' ? logisticsPipeline : creditPipeline

  // Quick Actions based on business
  const creditActions = [
    { icon: '➕', label: 'Add Contact', href: '/dashboard/contacts' },
    { icon: '📝', label: 'New Application', href: '/dashboard/funding' },
    { icon: '📧', label: 'Send Campaign', href: '/dashboard/communication' },
    { icon: '📊', label: 'View Reports', href: '/dashboard/analytics' },
  ]

  const logisticsActions = [
    { icon: '📦', label: 'New Load', href: '/dashboard/loads' },
    { icon: '🚛', label: 'Add Truck', href: '/dashboard/fleet' },
    { icon: '👨‍✈️', label: 'Add Driver', href: '/dashboard/drivers' },
    { icon: '📡', label: 'Dispatch', href: '/dashboard/dispatch' },
  ]

  const quickActions = currentBusiness === 'logademy' ? logisticsActions : creditActions

  return (
    <DashboardLayout activePage="dashboard">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          {currentBusiness === 'logademy' ? '🚛 Logademy' : '💳 Credtegy'} Dashboard
        </h1>
        <p className="text-gray-400 mt-1">
          {currentBusiness === 'logademy' 
            ? 'Trucking & Logistics Management' 
            : 'Credit Repair & Funding Platform'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-gray-400'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.name}</p>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => router.push(action.href)}
                className="flex flex-col items-center justify-center p-6 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <span className="text-3xl mb-2">{action.icon}</span>
                <span className="text-white font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">
          {currentBusiness === 'logademy' ? 'Load Pipeline' : 'Client Pipeline'}
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {pipeline.map((stage, index) => (
            <div key={index} className="flex-shrink-0 w-40 bg-gray-700 rounded-lg p-4 hover:bg-gray-600 cursor-pointer transition-colors">
              <div className={`w-3 h-3 rounded-full ${stage.color} mb-3`}></div>
              <p className="text-white font-medium text-sm">{stage.stage}</p>
              <p className="text-2xl font-bold text-white mt-1">{stage.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Logistics-specific: Active Loads Map Placeholder */}
      {currentBusiness === 'logademy' && (
        <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">🗺️ Active Loads Map</h2>
          <div className="bg-gray-700 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl">🗺️</span>
              <p className="text-gray-400 mt-2">GPS Tracking Map</p>
              <p className="text-gray-500 text-sm">18 trucks currently in transit</p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
