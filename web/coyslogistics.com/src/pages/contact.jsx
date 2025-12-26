import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Contact() {
  const [scrollY, setScrollY] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  return (
    <>
      <Head>
        <title>Contact Us | Coys Logistics</title>
        <meta name="description" content="Get in touch with Coys Logistics. Questions about dispatch training, fleet management, or trucking mentorship? We're here to help." />
      </Head>

      <div className="bg-slate-900 text-white min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{ backgroundColor: scrollY > 50 ? 'rgba(15,23,42,0.95)' : 'transparent', backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none' }}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/images/coyslogo.jpg" 
                alt="Coys Logistics" 
                className="w-12 h-12 rounded-lg object-cover"
              />
              <span className="font-bold text-xl hidden sm:block">Coys Logistics</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-300 hover:text-green-400 transition-colors">Home</Link>
              <Link href="/academy" className="text-gray-300 hover:text-green-400 transition-colors">Academy</Link>
              <Link href="/mentorship" className="text-gray-300 hover:text-green-400 transition-colors">Mentorship</Link>
              <Link href="/fleet" className="text-gray-300 hover:text-green-400 transition-colors">Fleet</Link>
              <Link href="/contact" className="text-green-400 font-semibold">Contact</Link>
            </div>
            <Link href="/academy" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-2.5 rounded-full transition-all hover:scale-105">
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Let&apos;s <span className="text-green-400">Talk</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to start your trucking journey? Have questions about our programs? 
              We&apos;re here to help you move forward.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
                
                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Email</h3>
                      <p className="text-gray-400">info@coyslogistics.com</p>
                      <p className="text-sm text-gray-500">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Phone/SMS</h3>
                      <p className="text-gray-400">(404) 555-0124</p>
                      <p className="text-sm text-gray-500">Text or call • Mon-Fri 8am-6pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Location</h3>
                      <p className="text-gray-400">Atlanta, GA</p>
                      <p className="text-sm text-gray-500">Serving all 48 continental states</p>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-8">
                  <h3 className="font-bold text-lg mb-4">🚛 Quick Links</h3>
                  <div className="space-y-3">
                    <Link href="/academy" className="flex items-center gap-2 text-green-400 hover:text-green-300">
                      → Dispatch Academy Programs
                    </Link>
                    <Link href="/mentorship" className="flex items-center gap-2 text-green-400 hover:text-green-300">
                      → 1-on-1 Mentorship
                    </Link>
                    <Link href="/fleet" className="flex items-center gap-2 text-green-400 hover:text-green-300">
                      → Fleet Management
                    </Link>
                    <a href="https://creditprenuers.netlify.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-amber-400 hover:text-amber-300">
                      → CreditPreneurs (Credit & Funding)
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <span className="text-6xl block mb-6">✅</span>
                    <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                    <p className="text-gray-400 mb-8">
                      Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', interest: '', message: '' }); }}
                      className="text-green-400 font-semibold hover:text-green-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg focus:border-green-400 focus:outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg focus:border-green-400 focus:outline-none transition-colors"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg focus:border-green-400 focus:outline-none transition-colors"
                            placeholder="(123) 456-7890"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">I&apos;m Interested In *</label>
                        <select
                          required
                          value={formData.interest}
                          onChange={(e) => setFormData({...formData, interest: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg focus:border-green-400 focus:outline-none transition-colors"
                        >
                          <option value="">Select an option...</option>
                          <option value="dispatch-academy">Dispatch Academy</option>
                          <option value="mentorship">1-on-1 Mentorship</option>
                          <option value="backend-support">Backend Support Services</option>
                          <option value="fleet">Fleet Management</option>
                          <option value="other">Other / General Inquiry</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Message *</label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg focus:border-green-400 focus:outline-none transition-colors resize-none"
                          placeholder="Tell us about your goals and how we can help..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 rounded-lg transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                      >
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-white/10 py-12 mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <img 
                  src="/images/coyslogo.jpg" 
                  alt="Coys Logistics" 
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <span className="font-bold text-xl">Coys Logistics</span>
              </div>
              <div className="flex gap-8 text-gray-400 text-sm">
                <Link href="/" className="hover:text-green-400">Home</Link>
                <Link href="/academy" className="hover:text-green-400">Academy</Link>
                <Link href="/mentorship" className="hover:text-green-400">Mentorship</Link>
                <Link href="/about" className="hover:text-green-400">About</Link>
              </div>
            </div>
            <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">© 2024 Coys Logistics. All rights reserved.</p>
              <div className="text-center md:text-right">
                <p className="text-gray-500 text-sm">
                  Powered by{' '}
                  <a href="https://pitchmodularspaces.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 hover:underline">
                    Pitch Modular Spaces
                  </a>
                  {' '}|{' '}
                  <a href="https://pitchmarketing.agency" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 hover:underline">
                    Pitch Marketing Agency
                  </a>
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  A division of Pitch Market Strategies & Public Relations LLC
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
