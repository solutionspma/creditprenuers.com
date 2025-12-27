'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState('workflows')

  const workflows = [
    { id: 1, name: 'New Lead Welcome Sequence', business: 'credtegy', status: 'Active', triggers: 'New Contact', actions: 5, runs: 234, lastRun: '2 min ago' },
    { id: 2, name: 'Credit Score Milestone Alert', business: 'credtegy', status: 'Active', triggers: 'Score Change', actions: 3, runs: 89, lastRun: '1 hr ago' },
    { id: 3, name: 'Funding Application Follow-up', business: 'credtegy', status: 'Active', triggers: 'App Submitted', actions: 4, runs: 156, lastRun: '30 min ago' },
    { id: 4, name: 'Load Delivery Confirmation', business: 'logademy', status: 'Active', triggers: 'Load Delivered', actions: 3, runs: 412, lastRun: '5 min ago' },
    { id: 5, name: 'Driver HOS Warning', business: 'logademy', status: 'Active', triggers: 'HOS < 2hrs', actions: 2, runs: 67, lastRun: '45 min ago' },
    { id: 6, name: 'Invoice Payment Reminder', business: 'both', status: 'Active', triggers: 'Invoice Overdue', actions: 4, runs: 78, lastRun: '3 hrs ago' },
    { id: 7, name: 'Document Expiration Alert', business: 'logademy', status: 'Paused', triggers: '30 days before', actions: 2, runs: 23, lastRun: '2 days ago' },
    { id: 8, name: 'Client Birthday Message', business: 'both', status: 'Active', triggers: 'Birthday', actions: 1, runs: 45, lastRun: '1 day ago' },
  ]

  const templates = [
    { id: 1, name: 'Welcome Email', type: 'Email', business: 'credtegy', uses: 234 },
    { id: 2, name: 'Credit Score Update', type: 'Email', business: 'credtegy', uses: 189 },
    { id: 3, name: 'Rate Confirmation', type: 'Email', business: 'logademy', uses: 312 },
    { id: 4, name: 'Load Pickup Reminder', type: 'SMS', business: 'logademy', uses: 256 },
    { id: 5, name: 'Invoice', type: 'PDF', business: 'both', uses: 445 },
    { id: 6, name: 'Bill of Lading', type: 'PDF', business: 'logademy', uses: 398 },
  ]

  return (
    <DashboardLayout activePage="automation">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">⚡ Automation Hub</h1>
          <p className="text-gray-400 mt-1">Workflows, triggers, and automated actions</p>
        </div>
        <button className="bg-accent-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
          + Create Workflow
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl p-5 border border-green-500/30">
          <p className="text-green-400 text-sm font-medium">Active Workflows</p>
          <p className="text-3xl font-bold text-white mt-1">{workflows.filter(w => w.status === 'Active').length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-5 border border-blue-500/30">
          <p className="text-blue-400 text-sm font-medium">Total Runs Today</p>
          <p className="text-3xl font-bold text-white mt-1">147</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-5 border border-purple-500/30">
          <p className="text-purple-400 text-sm font-medium">Time Saved</p>
          <p className="text-3xl font-bold text-white mt-1">24 hrs</p>
        </div>
        <div className="bg-gradient-to-br from-accent-gold/20 to-yellow-600/10 rounded-xl p-5 border border-accent-gold/30">
          <p className="text-accent-gold text-sm font-medium">Success Rate</p>
          <p className="text-3xl font-bold text-white mt-1">98.5%</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setActiveTab('workflows')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'workflows' 
              ? 'bg-accent-gold text-black' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Workflows
        </button>
        <button 
          onClick={() => setActiveTab('templates')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'templates' 
              ? 'bg-accent-gold text-black' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Templates
        </button>
      </div>

      {activeTab === 'workflows' ? (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Workflow</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Business</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Trigger</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Actions</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Runs</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Status</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {workflows.map((workflow) => (
                <tr key={workflow.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{workflow.name}</p>
                      <p className="text-gray-400 text-sm">Last run: {workflow.lastRun}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      workflow.business === 'credtegy' ? 'bg-accent-gold/20 text-accent-gold' :
                      workflow.business === 'logademy' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {workflow.business === 'both' ? 'Both' : workflow.business === 'credtegy' ? 'Credit' : 'Logistics'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{workflow.triggers}</td>
                  <td className="px-6 py-4 text-white">{workflow.actions}</td>
                  <td className="px-6 py-4 text-white">{workflow.runs}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      workflow.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {workflow.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-accent-gold hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="bg-gray-800 rounded-xl border border-gray-700 p-5 hover:border-accent-gold transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  template.type === 'Email' ? 'bg-blue-500/20 text-blue-400' :
                  template.type === 'SMS' ? 'bg-green-500/20 text-green-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {template.type === 'Email' ? '📧' : template.type === 'SMS' ? '💬' : '📄'}
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  template.business === 'credtegy' ? 'bg-accent-gold/20 text-accent-gold' :
                  template.business === 'logademy' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  {template.business === 'both' ? 'Both' : template.business === 'credtegy' ? 'Credit' : 'Logistics'}
                </span>
              </div>
              <h4 className="text-white font-medium">{template.name}</h4>
              <p className="text-gray-400 text-sm">{template.type} Template</p>
              <p className="text-accent-gold text-sm mt-2">{template.uses} uses</p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
