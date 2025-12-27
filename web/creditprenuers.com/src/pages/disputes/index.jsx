import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function DisputesDashboard() {
  const { data: disputes, error, mutate } = useSWR('/api/disputes/list', fetcher)
  const [filter, setFilter] = useState('all')

  const statusColors = {
    'Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Sent': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Replied': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'Deleted': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Won': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Lost': 'bg-red-500/20 text-red-400 border-red-500/30',
  }

  const filteredDisputes = disputes?.filter(d => 
    filter === 'all' ? true : d.status === filter
  ) || []

  const stats = {
    total: disputes?.length || 0,
    pending: disputes?.filter(d => d.status === 'Pending').length || 0,
    won: disputes?.filter(d => d.status === 'Won' || d.status === 'Deleted').length || 0,
    inProgress: disputes?.filter(d => ['Sent', 'Replied'].includes(d.status)).length || 0,
  }

  return (
    <>
      <Head>
        <title>Dispute Manager | Credtegy</title>
      </Head>

      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Navigation */}
        <nav className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/credtegy" className="flex items-center gap-3">
              <span className="text-xl font-bold text-yellow-400">Credtegy</span>
              <span className="text-gray-400">|</span>
              <span className="text-white">Dispute Center</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/credtegy" className="text-gray-400 hover:text-white">
                ← Back to Academy
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dispute Manager</h1>
              <p className="text-gray-400">Track and manage your credit disputes</p>
            </div>
            <Link 
              href="/disputes/create"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg transition-all"
            >
              <span>+</span> New Dispute
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="text-3xl font-bold text-white">{stats.total}</div>
              <div className="text-gray-400 text-sm">Total Disputes</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
              <div className="text-gray-400 text-sm">Pending</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="text-3xl font-bold text-blue-400">{stats.inProgress}</div>
              <div className="text-gray-400 text-sm">In Progress</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="text-3xl font-bold text-green-400">{stats.won}</div>
              <div className="text-gray-400 text-sm">Won/Deleted</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {['all', 'Pending', 'Sent', 'Replied', 'Deleted', 'Won', 'Lost'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  filter === status 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {status === 'all' ? 'All Disputes' : status}
              </button>
            ))}
          </div>

          {/* Disputes Table */}
          {error ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center">
              <p className="text-red-400">Failed to load disputes. Please try again.</p>
            </div>
          ) : !disputes ? (
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <div className="animate-pulse text-gray-400">Loading disputes...</div>
            </div>
          ) : filteredDisputes.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
              <div className="text-4xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-white mb-2">No disputes yet</h3>
              <p className="text-gray-400 mb-6">Create your first dispute to get started</p>
              <Link 
                href="/disputes/create"
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg"
              >
                + Create Dispute
              </Link>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Creditor</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Bureau</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Reason</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Letter Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Created</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredDisputes.map((dispute) => (
                      <tr key={dispute.id} className="hover:bg-gray-700/30 transition-colors">
                        <td className="px-4 py-4">
                          <div className="font-medium text-white">{dispute.creditor}</div>
                          {dispute.accountNumber && (
                            <div className="text-xs text-gray-500">***{dispute.accountNumber.slice(-4)}</div>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-gray-300">{dispute.bureau}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-gray-400 text-sm">{dispute.reason?.slice(0, 50)}...</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-yellow-400 text-sm">{dispute.letterType}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${statusColors[dispute.status] || 'bg-gray-700 text-gray-400'}`}>
                            {dispute.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-gray-500 text-sm">
                            {new Date(dispute.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link 
                              href={`/disputes/${dispute.id}`}
                              className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                            >
                              View
                            </Link>
                            {dispute.letterUrl && (
                              <a 
                                href={dispute.letterUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                              >
                                PDF
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
