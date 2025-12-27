'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState('invoices')

  const invoices = [
    { id: 'INV-2024-089', client: 'Marcus Johnson', business: 'credtegy', service: 'Credit Repair Package', amount: 599, status: 'Paid', date: '2024-12-20', dueDate: '2024-12-27' },
    { id: 'INV-2024-090', client: 'Amazon FBA', business: 'logademy', service: 'Load LD-2024-001', amount: 3200, status: 'Paid', date: '2024-12-22', dueDate: '2024-12-29' },
    { id: 'INV-2024-091', client: 'Keisha Williams', business: 'credtegy', service: 'Premium Mentorship', amount: 1499, status: 'Pending', date: '2024-12-24', dueDate: '2024-12-31' },
    { id: 'INV-2024-092', client: 'FedEx Ground', business: 'logademy', service: 'Load LD-2024-002', amount: 2100, status: 'Paid', date: '2024-12-23', dueDate: '2024-12-30' },
    { id: 'INV-2024-093', client: 'Jerome Smith', business: 'credtegy', service: 'Business Credit Build', amount: 899, status: 'Overdue', date: '2024-12-10', dueDate: '2024-12-17' },
    { id: 'INV-2024-094', client: 'Target DC', business: 'logademy', service: 'Load LD-2024-004', amount: 850, status: 'Draft', date: '2024-12-26', dueDate: '2025-01-02' },
  ]

  const subscriptions = [
    { id: 1, client: 'Marcus Johnson', plan: 'Credit Repair Pro', amount: 199, frequency: 'Monthly', status: 'Active', nextBill: '2025-01-20' },
    { id: 2, client: 'Keisha Williams', plan: 'Premium Mentorship', amount: 499, frequency: 'Monthly', status: 'Active', nextBill: '2025-01-15' },
    { id: 3, client: 'Angela Thompson', plan: 'Credit Monitoring', amount: 29, frequency: 'Monthly', status: 'Active', nextBill: '2025-01-10' },
    { id: 4, client: 'Darnell Brown', plan: 'Business Credit Basic', amount: 99, frequency: 'Monthly', status: 'Paused', nextBill: '-' },
  ]

  const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0)
  const pendingAmount = invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0)
  const overdueAmount = invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0)

  return (
    <DashboardLayout activePage="billing">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">💵 Billing & Invoices</h1>
          <p className="text-gray-400 mt-1">Manage payments, invoices, and subscriptions</p>
        </div>
        <button className="bg-accent-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
          + Create Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl p-5 border border-green-500/30">
          <p className="text-green-400 text-sm font-medium">Revenue This Month</p>
          <p className="text-3xl font-bold text-white mt-1">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl p-5 border border-yellow-500/30">
          <p className="text-yellow-400 text-sm font-medium">Pending</p>
          <p className="text-3xl font-bold text-white mt-1">${pendingAmount.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-xl p-5 border border-red-500/30">
          <p className="text-red-400 text-sm font-medium">Overdue</p>
          <p className="text-3xl font-bold text-white mt-1">${overdueAmount.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-5 border border-purple-500/30">
          <p className="text-purple-400 text-sm font-medium">Active Subscriptions</p>
          <p className="text-3xl font-bold text-white mt-1">{subscriptions.filter(s => s.status === 'Active').length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setActiveTab('invoices')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'invoices' 
              ? 'bg-accent-gold text-black' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Invoices
        </button>
        <button 
          onClick={() => setActiveTab('subscriptions')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'subscriptions' 
              ? 'bg-accent-gold text-black' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Subscriptions
        </button>
      </div>

      {activeTab === 'invoices' ? (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Invoice</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Client</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Service</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Amount</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Status</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Due Date</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-accent-gold font-mono font-bold">{invoice.id}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        invoice.business === 'credtegy' ? 'bg-accent-gold' : 'bg-blue-400'
                      }`}></span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{invoice.client}</td>
                  <td className="px-6 py-4 text-gray-300">{invoice.service}</td>
                  <td className="px-6 py-4 text-white font-bold">${invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'Paid' ? 'bg-green-500/20 text-green-400' :
                      invoice.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      invoice.status === 'Overdue' ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{invoice.dueDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-accent-gold hover:underline">View</button>
                      <button className="text-blue-400 hover:underline">Send</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Client</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Plan</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Amount</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Frequency</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Status</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Next Bill</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4 text-white font-medium">{sub.client}</td>
                  <td className="px-6 py-4 text-gray-300">{sub.plan}</td>
                  <td className="px-6 py-4 text-accent-gold font-bold">${sub.amount}/mo</td>
                  <td className="px-6 py-4 text-gray-300">{sub.frequency}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      sub.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{sub.nextBill}</td>
                  <td className="px-6 py-4">
                    <button className="text-accent-gold hover:underline">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  )
}
