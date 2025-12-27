'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState('inbox')
  const [selectedConversation, setSelectedConversation] = useState(null)

  const conversations = [
    { id: 1, name: 'Marcus Johnson', avatar: 'MJ', lastMessage: 'Thanks for the update on my credit score!', time: '5 min', unread: 2, type: 'client', business: 'credtegy' },
    { id: 2, name: 'Keisha Williams', avatar: 'KW', lastMessage: 'When will my next dispute letter go out?', time: '15 min', unread: 1, type: 'client', business: 'credtegy' },
    { id: 3, name: 'Amazon FBA Logistics', avatar: 'AF', lastMessage: 'Load LD-2024-001 has been confirmed', time: '30 min', unread: 0, type: 'broker', business: 'logademy' },
    { id: 4, name: 'Darnell Brown', avatar: 'DB', lastMessage: 'Just completed delivery in Chicago', time: '1 hr', unread: 0, type: 'driver', business: 'logademy' },
    { id: 5, name: 'FedEx Ground', avatar: 'FG', lastMessage: 'New load available: Memphis to Nashville', time: '2 hrs', unread: 3, type: 'broker', business: 'logademy' },
    { id: 6, name: 'Jerome Smith', avatar: 'JS', lastMessage: 'Ready for funding consultation', time: '3 hrs', unread: 0, type: 'client', business: 'credtegy' },
  ]

  const messages = [
    { id: 1, sender: 'them', text: 'Hi, I wanted to check on the status of my credit dispute.', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Hello Marcus! Great news - we submitted 3 disputes last week and already have 1 deletion confirmed!', time: '10:32 AM' },
    { id: 3, sender: 'them', text: 'That\'s amazing! Which account was deleted?', time: '10:33 AM' },
    { id: 4, sender: 'me', text: 'The Capital One collection was removed. Your score should update within 30 days. We\'re still waiting on responses for the other 2 disputes.', time: '10:35 AM' },
    { id: 5, sender: 'them', text: 'Thanks for the update on my credit score!', time: '10:36 AM' },
  ]

  return (
    <DashboardLayout activePage="communication">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">💬 Communication Center</h1>
          <p className="text-gray-400 mt-1">Messages, emails, and notifications</p>
        </div>
        <button className="bg-accent-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
          + New Message
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Unread Messages</p>
          <p className="text-2xl font-bold text-accent-gold mt-1">6</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Sent Today</p>
          <p className="text-2xl font-bold text-white mt-1">24</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Avg Response Time</p>
          <p className="text-2xl font-bold text-green-400 mt-1">12 min</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Active Threads</p>
          <p className="text-2xl font-bold text-white mt-1">18</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['inbox', 'sent', 'scheduled', 'templates'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-medium capitalize transition-colors ${
              activeTab === tab 
                ? 'bg-accent-gold text-black' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chat Interface */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex" style={{ height: '500px' }}>
        {/* Conversation List */}
        <div className="w-80 border-r border-gray-700 overflow-y-auto">
          {conversations.map((conv) => (
            <div 
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`p-4 border-b border-gray-700 cursor-pointer transition-colors ${
                selectedConversation?.id === conv.id ? 'bg-gray-700' : 'hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  conv.business === 'credtegy' ? 'bg-accent-gold/20 text-accent-gold' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {conv.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-medium truncate">{conv.name}</h4>
                    <span className="text-gray-400 text-xs">{conv.time}</span>
                  </div>
                  <p className="text-gray-400 text-sm truncate">{conv.lastMessage}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      conv.type === 'client' ? 'bg-green-500/20 text-green-400' :
                      conv.type === 'driver' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {conv.type}
                    </span>
                    {conv.unread > 0 && (
                      <span className="bg-accent-gold text-black text-xs px-2 py-0.5 rounded-full font-bold">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    selectedConversation.business === 'credtegy' ? 'bg-accent-gold/20 text-accent-gold' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {selectedConversation.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{selectedConversation.name}</h4>
                    <p className="text-gray-400 text-sm capitalize">{selectedConversation.type}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors">📞</button>
                  <button className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors">📧</button>
                  <button className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors">⋯</button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-lg p-3 ${
                      msg.sender === 'me' 
                        ? 'bg-accent-gold text-black' 
                        : 'bg-gray-700 text-white'
                    }`}>
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-black/60' : 'text-gray-400'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-gold"
                  />
                  <button className="px-4 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">📎</button>
                  <button className="px-6 py-3 bg-accent-gold text-black rounded-lg font-bold hover:bg-yellow-400 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-4xl mb-4">💬</p>
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
