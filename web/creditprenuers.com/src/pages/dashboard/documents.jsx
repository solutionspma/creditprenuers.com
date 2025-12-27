'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

export default function DocumentsPage() {
  const [category, setCategory] = useState('all')

  const documents = [
    // Credtegy Documents
    { id: 1, name: 'Credit Dispute Letter Template', category: 'templates', business: 'credtegy', type: 'DOCX', size: '24 KB', updated: '2024-12-20' },
    { id: 2, name: 'Debt Validation Letter', category: 'templates', business: 'credtegy', type: 'DOCX', size: '18 KB', updated: '2024-12-18' },
    { id: 3, name: 'Funding Application Checklist', category: 'checklists', business: 'credtegy', type: 'PDF', size: '156 KB', updated: '2024-12-15' },
    { id: 4, name: 'Client Intake Form', category: 'forms', business: 'credtegy', type: 'PDF', size: '89 KB', updated: '2024-12-22' },
    { id: 5, name: 'Business Credit Building Guide', category: 'guides', business: 'credtegy', type: 'PDF', size: '2.4 MB', updated: '2024-12-10' },
    // Logademy Documents
    { id: 6, name: 'Bill of Lading Template', category: 'templates', business: 'logademy', type: 'PDF', size: '45 KB', updated: '2024-12-24' },
    { id: 7, name: 'Rate Confirmation Sheet', category: 'forms', business: 'logademy', type: 'PDF', size: '32 KB', updated: '2024-12-23' },
    { id: 8, name: 'Driver Compliance Checklist', category: 'checklists', business: 'logademy', type: 'PDF', size: '78 KB', updated: '2024-12-21' },
    { id: 9, name: 'DOT Inspection Prep Guide', category: 'guides', business: 'logademy', type: 'PDF', size: '1.2 MB', updated: '2024-12-19' },
    { id: 10, name: 'Carrier Packet Template', category: 'templates', business: 'logademy', type: 'ZIP', size: '3.5 MB', updated: '2024-12-17' },
    { id: 11, name: 'Proof of Delivery Form', category: 'forms', business: 'logademy', type: 'PDF', size: '28 KB', updated: '2024-12-25' },
    { id: 12, name: 'IFTA Quarterly Report Template', category: 'templates', business: 'logademy', type: 'XLSX', size: '156 KB', updated: '2024-12-16' },
  ]

  const filteredDocs = category === 'all' ? documents : documents.filter(d => d.category === category)

  const categories = [
    { id: 'all', name: 'All Documents', icon: '📁' },
    { id: 'templates', name: 'Templates', icon: '📄' },
    { id: 'forms', name: 'Forms', icon: '📝' },
    { id: 'checklists', name: 'Checklists', icon: '✅' },
    { id: 'guides', name: 'Guides', icon: '📚' },
  ]

  return (
    <DashboardLayout activePage="documents">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">📁 Documents</h1>
          <p className="text-gray-400 mt-1">Manage templates, forms, and files</p>
        </div>
        <button className="bg-accent-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
          + Upload Document
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Total Documents</p>
          <p className="text-2xl font-bold text-white mt-1">{documents.length}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Templates</p>
          <p className="text-2xl font-bold text-accent-gold mt-1">{documents.filter(d => d.category === 'templates').length}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Forms</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">{documents.filter(d => d.category === 'forms').length}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Updated This Week</p>
          <p className="text-2xl font-bold text-green-400 mt-1">8</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Categories */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
            <h3 className="text-white font-bold mb-4">Categories</h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    category === cat.id 
                      ? 'bg-accent-gold/20 text-accent-gold' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-gray-800 rounded-xl border border-gray-700 p-4 hover:border-accent-gold transition-colors group">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${
                    doc.type === 'PDF' ? 'bg-red-500/20 text-red-400' :
                    doc.type === 'DOCX' ? 'bg-blue-500/20 text-blue-400' :
                    doc.type === 'XLSX' ? 'bg-green-500/20 text-green-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {doc.type === 'PDF' ? '📕' : doc.type === 'DOCX' ? '📘' : doc.type === 'XLSX' ? '📗' : '📦'}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    doc.business === 'credtegy' ? 'bg-accent-gold/20 text-accent-gold' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {doc.business === 'credtegy' ? 'Credit' : 'Logistics'}
                  </span>
                </div>
                <h4 className="text-white font-medium mb-2 group-hover:text-accent-gold transition-colors">{doc.name}</h4>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{doc.type} • {doc.size}</span>
                  <span>{doc.updated}</span>
                </div>
                <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex-1 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm">
                    📥 Download
                  </button>
                  <button className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm">
                    ✏️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
