'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LeadGate({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: ''
  })

  const businessTypes = [
    'Entrepreneur / Business Owner',
    'Aspiring Business Owner',
    'Real Estate Investor',
    'E-Commerce / Online Business',
    'Service-Based Business',
    'Trucking / Logistics',
    'Credit Repair Professional',
    'Coach / Consultant',
    'Freelancer / Contractor',
    'Just Learning / Curious'
  ]

  useEffect(() => {
    // Check if user already submitted
    const hasAccess = localStorage.getItem('credtegy_lead_captured')
    if (hasAccess) {
      setIsUnlocked(true)
    }
    setIsLoading(false)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    // Validate
    if (!formData.name || !formData.email || !formData.phone || !formData.businessType) {
      setError('Please fill in all fields')
      setIsSubmitting(false)
      return
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    // Simple phone validation (at least 10 digits)
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (phoneDigits.length < 10) {
      setError('Please enter a valid phone number')
      setIsSubmitting(false)
      return
    }

    try {
      // Store lead data (can be sent to Supabase later)
      const leadData = {
        ...formData,
        source: 'credtegy.com',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      }

      // Store locally for now - can integrate with Supabase
      const existingLeads = JSON.parse(localStorage.getItem('credtegy_leads') || '[]')
      existingLeads.push(leadData)
      localStorage.setItem('credtegy_leads', JSON.stringify(existingLeads))
      
      // Mark as captured
      localStorage.setItem('credtegy_lead_captured', 'true')
      localStorage.setItem('credtegy_lead_data', JSON.stringify(leadData))

      // Simulate API delay for smooth UX
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsUnlocked(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    )
  }

  if (isUnlocked) {
    return children
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black z-50 overflow-auto"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: 'linear-gradient(rgba(255,215,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* Floating money icons */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-10"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) 
              }}
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 4 + Math.random() * 2, 
                repeat: Infinity,
                delay: i * 0.4 
              }}
            >
              {['💰', '💳', '📈', '🏆', '💎', '🔥', '⭐', '💵'][i]}
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-lg"
          >
            {/* Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8 md:p-10 shadow-2xl">
              {/* Logo/Brand */}
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="text-5xl">💳</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">Credtegy</span>
                </div>
                <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-amber-500 mx-auto rounded-full"></div>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-8"
              >
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  🔐 VIP Access Portal
                </h1>
                <p className="text-gray-400">
                  Unlock the secrets to <span className="text-yellow-400 font-semibold">credit repair</span>, <span className="text-yellow-400 font-semibold">business funding</span>, and <span className="text-yellow-400 font-semibold">wealth building</span> with Shakur Mac
                </p>
              </motion.div>

              {/* Features Preview */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-3 mb-8"
              >
                {[
                  { icon: '📚', text: 'Credit Strategies' },
                  { icon: '💰', text: 'Funding Secrets' },
                  { icon: '🎓', text: 'Mentorship' },
                  { icon: '🚀', text: 'Wealth Building' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-yellow-500/10 rounded-xl p-3 flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* Form */}
              <motion.form
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Name */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(xxx) xxx-xxxx"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Business Type *</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em' }}
                  >
                    <option value="" className="bg-gray-900">Select your business type</option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type} className="bg-gray-900">{type}</option>
                    ))}
                  </select>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-red-400 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    isSubmitting 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black shadow-lg shadow-yellow-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Unlocking VIP Access...
                    </span>
                  ) : (
                    '🚀 Unlock VIP Access'
                  )}
                </motion.button>
              </motion.form>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 text-center"
              >
                <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
                  <span>🔒</span>
                  Your information is secure and will never be shared
                </p>
              </motion.div>
            </div>

            {/* Bottom Branding */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-6"
            >
              <p className="text-gray-600 text-sm">
                Powered by{' '}
                <a href="https://pitchmodularspaces.com" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400">
                  Pitch Modular Spaces
                </a>
                {' '}|{' '}
                <a href="https://pitchmarketing.agency" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400">
                  Pitch Marketing Agency
                </a>
              </p>
              <p className="text-gray-700 text-xs mt-1">
                A division of Pitch Market Strategies & Public Relations LLC
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
