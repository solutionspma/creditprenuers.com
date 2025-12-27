import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { captureLead } from '@/lib/supabase'

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      await captureLead({
        ...formData,
        form_id: 'credtegy-waitlist',
        product_id: 'credtegy-academy',
        source: 'credtegy'
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Failed to submit:', err)
      alert('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Credtegy Academy | Credit Education That Actually Works</title>
        <meta name="description" content="Practical credit education for people who want results, not promises. Learn how to dispute, document, and rebuild credit the right way." />
      </Head>

      <div className="bg-gray-900 text-gray-100 min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-2xl font-bold text-yellow-400">Credtegy</span>
              <span className="text-sm text-gray-400">Academy</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#modules" className="text-gray-300 hover:text-yellow-400 transition-colors">Modules</a>
              <a href="#pricing" className="text-gray-300 hover:text-yellow-400 transition-colors">Pricing</a>
              <Link href="/disputes" className="text-gray-300 hover:text-yellow-400 transition-colors">Dispute Center</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/signin" className="text-yellow-400 hover:text-yellow-300 font-medium">Sign In</Link>
              <a href="#waitlist" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-2.5 rounded-lg transition-all hover:scale-105">
                Join Waitlist
              </a>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, #f59e0b 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1 text-yellow-400 text-sm font-medium mb-6">
              🎓 Enrollment Opens January 2025
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-yellow-400">Credit Education</span>
              <br />
              <span className="text-white">That Actually Works</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
              Practical credit education for people who want results, not promises.
            </p>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Learn how to dispute, document, and rebuild credit the right way. 
              No gimmicks. No shortcuts. Just strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#waitlist"
                className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg shadow-yellow-500/25"
              >
                Join the Waitlist →
              </a>
              <a
                href="#modules"
                className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-lg transition-all border border-gray-700"
              >
                View Curriculum
              </a>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-12 border-y border-gray-800 bg-gray-800/50">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-400">500+</div>
              <div className="text-gray-400 text-sm mt-1">Students Enrolled</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400">127pt</div>
              <div className="text-gray-400 text-sm mt-1">Avg Score Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400">92%</div>
              <div className="text-gray-400 text-sm mt-1">Success Rate</div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-2xl p-8 md:p-12 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">
              Credit Education. Not Credit Repair.
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              Credtegy Academy was built for real people who are tired of the myths and
              misinformation surrounding credit. We teach how the bureaus actually work,
              how disputes are won, and how to rebuild financial leverage with strategy and
              precision.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our curriculum is designed by credit professionals with over 15 years of experience
              in the industry. We've helped thousands of clients understand their rights and take
              control of their financial future.
            </p>
          </div>
        </section>

        {/* MODULES */}
        <section className="bg-gray-800/30 py-20" id="modules">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-yellow-400 mb-4">
                Course Curriculum
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Five comprehensive modules taking you from credit fundamentals to advanced automation strategies
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  num: '01',
                  title: "Credit Fundamentals",
                  desc: "Understand how bureaus operate, why disputes work, and how to avoid common mistakes that derail your progress.",
                  icon: '📚'
                },
                {
                  num: '02',
                  title: "Dispute Mechanics",
                  desc: "Learn letter logic, evidence hierarchy, and timing strategies that actually matter in winning disputes.",
                  icon: '⚖️'
                },
                {
                  num: '03',
                  title: "Winning Patterns",
                  desc: "Recognize what typically gets deleted and how to pivot strategically without restarting your process.",
                  icon: '🎯'
                },
                {
                  num: '04',
                  title: "Automation & AI Tools",
                  desc: "Use AI responsibly to draft letters, track responses, and stay compliant with regulations.",
                  icon: '🤖'
                },
                {
                  num: '05',
                  title: "Next-Level Leverage",
                  desc: "Rebuild credit, restructure utilization, and prepare strategically for funding opportunities.",
                  icon: '🚀'
                },
                {
                  num: 'BONUS',
                  title: "Dispute Center Access",
                  desc: "Full access to our automated dispute tracking system and letter generator tools.",
                  icon: '🎁'
                },
              ].map((m) => (
                <div key={m.title} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/50 transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{m.icon}</span>
                    <span className="text-yellow-400 text-sm font-mono">{m.num}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors">{m.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / WAITLIST */}
        <section className="max-w-4xl mx-auto px-6 py-20" id="waitlist">
          <div className="bg-gradient-to-br from-yellow-500/10 to-transparent rounded-2xl p-8 md:p-12 border border-yellow-500/30 text-center">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">
              Enrollment Opens Soon
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Be among the first to join Credtegy Academy and lock in founders pricing.
              Limited spots available.
            </p>
            
            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-green-400 mb-2">You're on the list!</h3>
                <p className="text-gray-400">We'll notify you when enrollment opens.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto flex flex-col gap-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-500/50 text-black font-bold py-4 rounded-lg transition-all hover:scale-105 disabled:hover:scale-100"
                >
                  {submitting ? 'Joining...' : 'Join the Waitlist →'}
                </button>
                <p className="text-gray-500 text-xs">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* PRICING PREVIEW */}
        <section className="py-20 bg-gray-800/30" id="pricing">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                Founders Pricing
              </h2>
              <p className="text-gray-400">Early access pricing for waitlist members</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-2">Self-Paced</h3>
                <div className="text-3xl font-bold text-yellow-400 mb-4">$297</div>
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li>✓ All 5 Course Modules</li>
                  <li>✓ Letter Templates</li>
                  <li>✓ Community Access</li>
                  <li>✓ Lifetime Updates</li>
                </ul>
                <a href="#waitlist" className="block text-center bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-all">
                  Join Waitlist
                </a>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/20 to-gray-800 rounded-xl p-6 border-2 border-yellow-500 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Pro + Tools</h3>
                <div className="text-3xl font-bold text-yellow-400 mb-4">$497</div>
                <ul className="text-gray-300 text-sm space-y-2 mb-6">
                  <li>✓ Everything in Self-Paced</li>
                  <li>✓ Dispute Center Access</li>
                  <li>✓ AI Letter Generator</li>
                  <li>✓ Progress Tracking</li>
                  <li>✓ Priority Support</li>
                </ul>
                <a href="#waitlist" className="block text-center bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 rounded-lg transition-all">
                  Join Waitlist
                </a>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-2">VIP Mentorship</h3>
                <div className="text-3xl font-bold text-yellow-400 mb-4">$1,497</div>
                <ul className="text-gray-400 text-sm space-y-2 mb-6">
                  <li>✓ Everything in Pro</li>
                  <li>✓ 1-on-1 Coaching Calls</li>
                  <li>✓ Done-With-You Disputes</li>
                  <li>✓ Funding Introduction</li>
                  <li>✓ Business Credit Path</li>
                </ul>
                <a href="#waitlist" className="block text-center bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-all">
                  Join Waitlist
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-800 py-12 border-t border-gray-700">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="text-yellow-400 font-bold text-lg mb-4">Credtegy</h4>
                <p className="text-gray-400 text-sm">
                  Credit education that empowers you to take control of your financial future.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Academy</h4>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li><a href="#modules" className="hover:text-yellow-400">Curriculum</a></li>
                  <li><a href="#pricing" className="hover:text-yellow-400">Pricing</a></li>
                  <li><Link href="/disputes" className="hover:text-yellow-400">Dispute Center</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li><a href="#" className="hover:text-yellow-400">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-yellow-400">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-yellow-400">Disclaimer</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>📞 1-888-881-0057</li>
                  <li>📧 support@credtegy.com</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
              <p>
                © {new Date().getFullYear()} Credtegy Academy. Built on the MBOCC Platform by
                Pitch Marketing Agency.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
