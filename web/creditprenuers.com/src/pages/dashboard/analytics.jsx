'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30d')

  // Credtegy Stats
  const creditStats = {
    revenue: { current: 48500, previous: 42000, change: 15.5 },
    clients: { current: 156, previous: 142, change: 9.9 },
    avgScore: { current: 87, previous: 72, change: 20.8 },
    funded: { current: 1250000, previous: 980000, change: 27.6 }
  }

  // Logademy Stats
  const logisticsStats = {
    revenue: { current: 125000, previous: 112000, change: 11.6 },
    loads: { current: 89, previous: 76, change: 17.1 },
    miles: { current: 42500, previous: 38200, change: 11.3 },
    ratePerMile: { current: 3.85, previous: 3.62, change: 6.4 }
  }

  const monthlyRevenue = [
    { month: 'Jul', credit: 32000, logistics: 95000 },
    { month: 'Aug', credit: 38000, logistics: 102000 },
    { month: 'Sep', credit: 35000, logistics: 98000 },
    { month: 'Oct', credit: 42000, logistics: 115000 },
    { month: 'Nov', credit: 45000, logistics: 118000 },
    { month: 'Dec', credit: 48500, logistics: 125000 },
  ]

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.credit + m.logistics))

  return (
    <DashboardLayout activePage="analytics">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">📊 Analytics Dashboard</h1>
          <p className="text-gray-400 mt-1">Performance metrics across all businesses</p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d', '1y'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                period === p 
                  ? 'bg-accent-gold text-black' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Combined Revenue */}
      <div className="bg-gradient-to-br from-accent-gold/20 to-yellow-600/10 rounded-xl p-6 border border-accent-gold/30 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-accent-gold text-sm font-medium">Total Combined Revenue</p>
            <p className="text-4xl font-bold text-white mt-1">
              ${(creditStats.revenue.current + logisticsStats.revenue.current).toLocaleString()}
            </p>
            <p className="text-green-400 text-sm mt-2">↑ 13.2% vs last period</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Credtegy: <span className="text-accent-gold">${creditStats.revenue.current.toLocaleString()}</span></p>
            <p className="text-gray-400 text-sm">Logademy: <span className="text-blue-400">${logisticsStats.revenue.current.toLocaleString()}</span></p>
          </div>
        </div>
      </div>

      {/* Credtegy Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-accent-gold mb-4">💳 Credtegy Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <p className="text-gray-400 text-sm">Monthly Revenue</p>
            <p className="text-2xl font-bold text-white mt-1">${creditStats.revenue.current.toLocaleString()}</p>
            <p className={`text-sm mt-2 ${creditStats.revenue.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {creditStats.revenue.change > 0 ? '↑' : '↓'} {creditStats.revenue.change}%
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <p className="text-gray-400 text-sm">Active Clients</p>
            <p className="text-2xl font-bold text-white mt-1">{creditStats.clients.current}</p>
            <p className={`text-sm mt-2 ${creditStats.clients.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {creditStats.clients.change > 0 ? '↑' : '↓'} {creditStats.clients.change}%
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <p className="text-gray-400 text-sm">Avg Score Improvement</p>
            <p className="text-2xl font-bold text-white mt-1">+{creditStats.avgScore.current} pts</p>
            <p className={`text-sm mt-2 ${creditStats.avgScore.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {creditStats.avgScore.change > 0 ? '↑' : '↓'} {creditStats.avgScore.change}%
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <p className="text-gray-400 text-sm">Total Funded</p>
            <p className="text-2xl font-bold text-white mt-1">${(creditStats.funded.current / 1000000).toFixed(2)}M</p>
            <p className={`text-sm mt-2 ${creditStats.funded.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {creditStats.funded.change > 0 ? '↑' : '↓'} {creditStats.funded.change}%
            </p>
          </div>
        </div>
      </div>

      {/* Logademy Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-400 mb-4">🚛 Logademy Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <p className="text-gray-400 text-sm">Monthly Revenue</p>
            <p className="text-2xl font-bold text-white mt-1">${logisticsStats.revenue.current.toLocaleString()}</p>
            <p className={`text-sm mt-2 ${logisticsStats.revenue.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {logisticsStats.revenue.change > 0 ? '↑' : '↓'} {logisticsStats.revenue.change}%
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <p className="text-gray-400 text-sm">Loads Completed</p>
            <p className="text-2xl font-bold text-white mt-1">{logisticsStats.loads.current}</p>
            <p className={`text-sm mt-2 ${logisticsStats.loads.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {logisticsStats.loads.change > 0 ? '↑' : '↓'} {logisticsStats.loads.change}%
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <p className="text-gray-400 text-sm">Miles Driven</p>
            <p className="text-2xl font-bold text-white mt-1">{(logisticsStats.miles.current / 1000).toFixed(1)}K</p>
            <p className={`text-sm mt-2 ${logisticsStats.miles.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {logisticsStats.miles.change > 0 ? '↑' : '↓'} {logisticsStats.miles.change}%
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <p className="text-gray-400 text-sm">Rate Per Mile</p>
            <p className="text-2xl font-bold text-white mt-1">${logisticsStats.ratePerMile.current}</p>
            <p className={`text-sm mt-2 ${logisticsStats.ratePerMile.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {logisticsStats.ratePerMile.change > 0 ? '↑' : '↓'} {logisticsStats.ratePerMile.change}%
            </p>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Combined Revenue Trend</h3>
        <div className="flex items-end gap-4 h-64">
          {monthlyRevenue.map((month) => (
            <div key={month.month} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col gap-1" style={{ height: `${((month.credit + month.logistics) / maxRevenue) * 100}%` }}>
                <div 
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${(month.logistics / (month.credit + month.logistics)) * 100}%` }}
                ></div>
                <div 
                  className="w-full bg-accent-gold rounded-b"
                  style={{ height: `${(month.credit / (month.credit + month.logistics)) * 100}%` }}
                ></div>
              </div>
              <span className="text-gray-400 text-sm mt-2">{month.month}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent-gold rounded"></div>
            <span className="text-gray-400 text-sm">Credtegy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-400 text-sm">Logademy</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
