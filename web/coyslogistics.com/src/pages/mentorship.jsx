import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Mentorship() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Head>
        <title>1-on-1 Mentorship | Coys Logistics</title>
        <meta name="description" content="Get personal mentorship from Shakur Mac. Weekly coaching calls, business strategy, and ongoing support to build your trucking empire." />
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
              <Link href="/mentorship" className="text-green-400 font-semibold">Mentorship</Link>
              <Link href="/fleet" className="text-gray-300 hover:text-green-400 transition-colors">Fleet</Link>
              <Link href="/contact" className="text-gray-300 hover:text-green-400 transition-colors">Contact</Link>
            </div>
            <Link href="/contact" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold px-6 py-2.5 rounded-full transition-all hover:scale-105">
              Apply Now
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-5 py-2 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                <span className="text-sm font-medium text-green-400">Limited Spots Available</span>
              </span>
              <h1 className="text-5xl md:text-7xl font-black mb-6">
                1-on-1 Mentorship
                <span className="block text-green-400">With Shakur Mac</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Personal guidance, weekly coaching, and ongoing support to help you build and scale your trucking business the right way.
              </p>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16">
              What&apos;s Included in <span className="text-green-400">Mentorship</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: '📞', title: 'Weekly Coaching Calls', desc: 'One-hour private sessions with Shakur to discuss strategy, troubleshoot problems, and plan your next moves.' },
                { icon: '📋', title: 'Custom Business Plan', desc: 'A tailored roadmap for your specific situation — whether starting fresh or scaling an existing operation.' },
                { icon: '💰', title: 'Funding Guidance', desc: 'Access to credit building and funding resources through CreditPreneurs partnership.' },
                { icon: '🔧', title: 'Backend Support Option', desc: 'Add dispatch and admin services so you can focus on driving and business development.' },
                { icon: '👥', title: 'Private Community', desc: 'Connect with other mentees, share wins, ask questions, and build your network.' },
                { icon: '📱', title: 'Direct Access', desc: 'Text/call Shakur directly for urgent questions between sessions. Priority response guaranteed.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-white/10 rounded-2xl p-8 hover:border-green-400/30 transition-all">
                  <span className="text-5xl mb-6 block">{item.icon}</span>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16">
              How It <span className="text-green-400">Works</span>
            </h2>

            <div className="space-y-8">
              {[
                { step: '01', title: 'Apply & Get Accepted', desc: 'Fill out the application form. Shakur personally reviews each application to ensure good fit.' },
                { step: '02', title: 'Discovery Call', desc: 'Free 30-minute call to discuss your goals, current situation, and how mentorship can help.' },
                { step: '03', title: 'Create Your Roadmap', desc: 'First session: build your custom business plan with clear milestones and timelines.' },
                { step: '04', title: 'Weekly Implementation', desc: 'Execute the plan with weekly guidance, accountability, and support from Shakur.' },
                { step: '05', title: 'Scale & Succeed', desc: 'As you grow, the mentorship evolves. From starting up to scaling to multiple trucks.' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-black">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-4">
              Investment <span className="text-green-400">Options</span>
            </h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Choose the level of support that fits your needs and budget
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Monthly */}
              <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-10 hover:border-green-400/30 transition-all">
                <h3 className="text-2xl font-bold mb-2">Monthly Mentorship</h3>
                <p className="text-gray-400 mb-6">Perfect for getting started</p>
                <div className="flex items-end gap-2 mb-8">
                  <span className="text-5xl font-black">$997</span>
                  <span className="text-gray-400 mb-2">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    '4 weekly coaching sessions',
                    'Custom business strategy',
                    'Direct phone/text access',
                    'Private community access',
                    'Resource library',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      <span className="text-green-400">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/contact" 
                  className="block w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-full text-center transition-all"
                >
                  Apply Now
                </Link>
              </div>

              {/* 6-Month */}
              <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500 rounded-3xl p-10">
                <div className="absolute -top-4 right-8 bg-green-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                  BEST VALUE
                </div>
                <h3 className="text-2xl font-bold mb-2">6-Month Accelerator</h3>
                <p className="text-gray-400 mb-6">Serious about building your empire</p>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-5xl font-black">$4,997</span>
                  <span className="text-gray-400 mb-2">one-time</span>
                </div>
                <p className="text-green-400 text-sm mb-8">Save $997 (vs monthly)</p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Everything in Monthly, plus:',
                    '6 months of commitment & focus',
                    'Priority scheduling',
                    'Emergency support line',
                    'Backend dispatch at discounted rate',
                    'CreditPreneurs VIP access',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      <span className="text-green-400">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/contact" 
                  className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 rounded-full text-center transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                >
                  Apply for Accelerator
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16">
              Mentee <span className="text-green-400">Success Stories</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { 
                  quote: 'Shakur helped me go from driving for someone else to owning 2 trucks in under a year. The weekly calls kept me accountable and on track.',
                  name: 'Darius Mitchell',
                  result: 'Owner of 2 trucks',
                  avatar: '👨🏾'
                },
                { 
                  quote: 'I was lost trying to figure out dispatching on my own. Three months of mentorship and I quit my job to dispatch full-time. Making more than I ever did.',
                  name: 'Tameka Johnson',
                  result: 'Full-time dispatcher',
                  avatar: '👩🏽'
                },
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-4xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{testimonial.name}</p>
                      <p className="text-green-400 text-sm">{testimonial.result}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16">
              Common <span className="text-green-400">Questions</span>
            </h2>

            <div className="space-y-6">
              {[
                { q: 'Who is mentorship for?', a: 'Anyone serious about starting or scaling a trucking business. Whether you\'re brand new or already running trucks and want to grow smarter.' },
                { q: 'How are the sessions conducted?', a: 'Video calls via Zoom, typically 1 hour each week. We record them so you can review later. Plus unlimited text/phone access between sessions.' },
                { q: 'What if I\'m completely new to trucking?', a: 'Perfect! Many of our most successful mentees started with zero experience. The mentorship is designed to take you from wherever you are.' },
                { q: 'Can I cancel anytime?', a: 'Monthly mentorship can be cancelled with 30-day notice. The 6-month program is a commitment, but we offer a satisfaction guarantee for the first 30 days.' },
                { q: 'Do you offer payment plans?', a: 'Yes, we can split the 6-month program into 3 payments. Just mention it when you apply.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-white/10 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                  <p className="text-gray-400">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Build Your
              <span className="text-green-400"> Trucking Empire?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Apply for mentorship today. Spots are limited to ensure every mentee gets the attention they deserve.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-12 py-5 rounded-full text-xl transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(34,197,94,0.6)]"
            >
              Apply for Mentorship
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-white/10 py-12">
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
                <Link href="/fleet" className="hover:text-green-400">Fleet</Link>
                <Link href="/contact" className="hover:text-green-400">Contact</Link>
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
