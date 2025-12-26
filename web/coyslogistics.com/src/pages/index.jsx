import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const videoRef = useRef(null)
  const [stats, setStats] = useState({ drivers: 0, funded: 0, businesses: 0, states: 0 })

  useEffect(() => {
    // Animate stats on load
    const animateStats = () => {
      const duration = 2000
      const start = Date.now()
      const animate = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setStats({
          drivers: Math.floor(247 * eased),
          funded: Math.floor(4.8 * eased * 10) / 10,
          businesses: Math.floor(89 * eased),
          states: Math.floor(48 * eased)
        })
        if (progress < 1) requestAnimationFrame(animate)
      }
      animate()
    }
    setTimeout(animateStats, 500)

    // Scroll listener
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)

    // Mouse move for glow effect
    const handleMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouse)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Coys Logistics | Not Just Moving Freight — Moving People Forward</title>
        <meta name="description" content="Start your trucking business the right way. Mentorship, dispatch training, and backend support from Shakur Mac. 247+ drivers trained. 48 states covered." />
        <meta property="og:title" content="Coys Logistics | Trucking Mentorship & Business Support" />
        <meta property="og:description" content="Not just moving freight — moving people forward. Start and scale your box truck business with Shakur Mac's proven system." />
      </Head>

      <div className="bg-slate-900 text-white overflow-hidden">
        {/* Animated Background Gradient */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-30 z-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 197, 94, 0.15), transparent 40%)`
          }}
        />

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
              <Link href="/academy" className="text-gray-300 hover:text-green-400 transition-colors">Academy</Link>
              <Link href="/mentorship" className="text-gray-300 hover:text-green-400 transition-colors">Mentorship</Link>
              <Link href="/fleet" className="text-gray-300 hover:text-green-400 transition-colors">Fleet</Link>
              <Link href="/about" className="text-gray-300 hover:text-green-400 transition-colors">About</Link>
              <Link href="/contact" className="text-gray-300 hover:text-green-400 transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/signin" className="text-green-400 hover:text-green-300 transition-colors font-medium hidden sm:block">Sign In</Link>
              <Link href="/academy" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold px-6 py-2.5 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-105"
              style={{ filter: 'brightness(0.3)' }}
              poster="/images/truck-highway-1.jpg"
            >
              <source src="/images/hero-truck-video.mp4" type="video/mp4" />
            </video>
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-transparent to-slate-900" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-slate-900/80" />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>

          {/* Road animation stripes */}
          <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-20">
            <div className="absolute bottom-10 left-0 right-0 h-2 flex gap-8 animate-road">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-24 h-full bg-yellow-400 flex-shrink-0" />
              ))}
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 animate-fade-in-down">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              <span className="text-sm font-medium">🚛 Trucking Mentorship by Shakur Mac</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-none animate-fade-in-up">
              <span className="block">Not Just Moving</span>
              <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-gradient-x">
                Freight.
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl mt-4 font-light text-gray-300">
                Moving People Forward.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Start your box truck business. Master dispatching. Build your fleet empire.
              <span className="text-white font-semibold"> Shakur Mac shows you how.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <Link 
                href="/academy" 
                className="group relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold px-10 py-5 rounded-full text-lg transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  🎓 Join Dispatch Academy
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              <Link 
                href="/mentorship" 
                className="group border-2 border-white/30 hover:border-green-400 text-white hover:text-green-400 font-bold px-10 py-5 rounded-full text-lg transition-all hover:bg-white/5"
              >
                <span className="flex items-center gap-2">
                  🤝 1-on-1 Mentorship
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-green-400">{stats.drivers}+</p>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">Drivers Trained</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-green-400">${stats.funded}M+</p>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">Funding Secured</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-green-400">{stats.businesses}+</p>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">Businesses Started</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-green-400">{stats.states}</p>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">States Covered</p>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2">
                <div className="w-1.5 h-3 bg-green-400 rounded-full animate-scroll" />
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF TICKER */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-8 mx-4">
                <span className="font-bold">&quot;Started with $0 down, now running 3 trucks!&quot; - Marcus T.</span>
                <span className="w-2 h-2 bg-white rounded-full" />
                <span className="font-bold">&quot;Shakur&apos;s mentorship changed everything&quot; - Keisha P.</span>
                <span className="w-2 h-2 bg-white rounded-full" />
                <span className="font-bold">&quot;Grossing $25K/month after 6 months!&quot; - Jerome W.</span>
                <span className="w-2 h-2 bg-white rounded-full" />
                <span className="font-bold">&quot;Best investment I ever made&quot; - Tanya R.</span>
                <span className="w-2 h-2 bg-white rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* WHAT WE OFFER */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-900" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="text-green-400 font-bold uppercase tracking-widest text-sm">Our Services</span>
              <h2 className="text-4xl md:text-6xl font-black mt-4">
                Your Complete <span className="text-green-400">Trucking Journey</span>
              </h2>
              <p className="text-gray-400 text-xl mt-4 max-w-2xl mx-auto">
                From startup to scale — we&apos;ve got everything you need
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  icon: '🎓', 
                  title: 'Dispatch Academy', 
                  desc: 'Learn load finding, broker relations, compliance, and everything needed to become a certified dispatcher.',
                  color: 'from-green-500/20 to-emerald-500/20',
                  price: 'Starting at $197'
                },
                { 
                  icon: '🚛', 
                  title: 'Box Truck Business', 
                  desc: 'Step-by-step guidance on starting your own box truck operation. From MC authority to your first load.',
                  color: 'from-orange-500/20 to-amber-500/20',
                  price: 'Full Program'
                },
                { 
                  icon: '🤝', 
                  title: '1-on-1 Mentorship', 
                  desc: 'Personal guidance from Shakur Mac himself. Weekly calls, strategy sessions, and ongoing support.',
                  color: 'from-blue-500/20 to-cyan-500/20',
                  price: 'Premium'
                },
                { 
                  icon: '📋', 
                  title: 'Backend Support', 
                  desc: 'Already running? We handle dispatch, compliance, and admin so you can focus on driving and growing.',
                  color: 'from-purple-500/20 to-pink-500/20',
                  price: 'Monthly Service'
                },
                { 
                  icon: '💰', 
                  title: 'Funding Access', 
                  desc: 'Get connected to business funding, truck financing, and credit building resources through CreditPreneurs.',
                  color: 'from-yellow-500/20 to-orange-500/20',
                  price: 'Partner Program'
                },
                { 
                  icon: '📱', 
                  title: 'Fleet Technology', 
                  desc: 'GPS tracking, route optimization, driver apps, and fleet management tools for scaling operations.',
                  color: 'from-teal-500/20 to-green-500/20',
                  price: 'Included'
                },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className={`group relative bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-green-400/50 transition-all hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(34,197,94,0.15)]`}
                >
                  <span className="text-5xl mb-6 block">{item.icon}</span>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-green-400 transition-colors">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">{item.desc}</p>
                  <span className="text-green-400 font-semibold text-sm">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SHAKUR MAC */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative">
                  <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl aspect-square w-full flex items-center justify-center shadow-2xl overflow-hidden">
                    <img 
                      src="/images/coy-mac.jpg" 
                      alt="Shakur Mac - Trucking Mentor" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-xl">
                    <p className="text-3xl font-black">10+</p>
                    <p className="text-sm font-medium">Years in Trucking</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <span className="text-green-400 font-bold uppercase tracking-widest text-sm">Meet Your Mentor</span>
                <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
                  Shakur Mac
                  <span className="block text-2xl md:text-3xl font-light text-gray-400 mt-2">
                    Trucking Expert & Business Builder
                  </span>
                </h2>
                <p className="text-xl text-gray-400 mb-6 leading-relaxed">
                  I started in this industry with nothing but determination. Today, I&apos;ve helped over 
                  <span className="text-green-400 font-bold"> 247 drivers</span> start and scale their trucking businesses.
                </p>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  Through Coys Logistics, I don&apos;t just teach — I support. When you join my program, 
                  you get access to my dispatch team, my network, and my proven systems.
                  <span className="text-white font-semibold"> Your success is my success.</span>
                </p>

                {/* Credentials */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: '🚛', text: 'Multi-Fleet Owner' },
                    { icon: '📋', text: 'Licensed Dispatcher' },
                    { icon: '📚', text: 'Box Truck eBook Author' },
                    { icon: '💰', text: 'CreditPreneurs Founder' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href="/about" 
                  className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-bold text-lg group"
                >
                  Read My Full Story
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* EBOOK TEASER */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
          </div>
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 text-center">
              <span className="inline-block bg-orange-500 text-white font-bold px-4 py-1 rounded-full text-sm mb-6">
                📖 FROM THE EBOOK
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                How to Start & Scale a
                <span className="block text-orange-400">Box Truck Business</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                The complete blueprint Shakur Mac used to build his trucking empire. 
                Now available as part of the CreditPreneurs eBook bundle.
              </p>

              <div className="bg-white/5 rounded-2xl p-8 mb-10 text-left max-w-2xl mx-auto">
                <h3 className="text-xl font-bold mb-4 text-orange-400">📋 What&apos;s Inside:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'Getting your MC Authority',
                    'Box truck vs semi comparison',
                    'Finding your first loads',
                    'Broker relationship secrets',
                    'Pricing & rate negotiation',
                    'Insurance requirements',
                    'Compliance made simple',
                    'Scaling to multiple trucks'
                  ].map((item, idx) => (
                    <span key={idx} className="flex items-center gap-2 text-sm">
                      <span className="text-orange-400">✓</span> {item}
                    </span>
                  ))}
                </div>
              </div>

              <Link 
                href="https://creditprenuers.netlify.app/ebook" 
                target="_blank"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-12 py-5 rounded-full text-xl transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(249,115,22,0.6)]"
              >
                Get the Full eBook Bundle →
              </Link>
              <p className="text-gray-500 text-sm mt-4">Available on CreditPreneurs.com</p>
            </div>
          </div>
        </section>

        {/* DISPATCH ACADEMY SECTION */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-green-400 font-bold uppercase tracking-widest text-sm">Dispatch Academy</span>
                <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
                  Become a Certified
                  <span className="block text-green-400">Freight Dispatcher</span>
                </h2>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  Learn the art and science of freight dispatching. From finding loads to building broker relationships — our comprehensive program takes you from beginner to pro.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    'Load board mastery (DAT, Truckstop, etc.)',
                    'Broker negotiation & relationship building',
                    'FMCSA compliance & ELD regulations',
                    'Rate calculation & lane optimization',
                    'Driver communication & coordination',
                    'Job placement assistance after completion',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href="/academy" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(34,197,94,0.5)]"
                >
                  View Programs & Pricing
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Pricing Cards */}
              <div className="space-y-6">
                <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-8 hover:border-green-400/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">Dispatch Fundamentals</h3>
                      <p className="text-gray-400 text-sm">Perfect for beginners</p>
                    </div>
                    <span className="text-2xl font-black text-green-400">$197</span>
                  </div>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• 4 core training modules</li>
                    <li>• Video lesson library</li>
                    <li>• Community access</li>
                  </ul>
                </div>

                <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500 rounded-2xl p-8">
                  <div className="absolute -top-3 right-6 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">Dispatch Mastery</h3>
                      <p className="text-gray-400 text-sm">Complete certification</p>
                    </div>
                    <span className="text-2xl font-black text-green-400">$497</span>
                  </div>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• All 6 modules + bonuses</li>
                    <li>• Live coaching calls</li>
                    <li>• 1-on-1 mentorship (3 sessions)</li>
                    <li>• Job placement assistance</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-8 hover:border-green-400/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">Business Builder</h3>
                      <p className="text-gray-400 text-sm">Start your own dispatch company</p>
                    </div>
                    <span className="text-2xl font-black text-green-400">$997</span>
                  </div>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• Everything in Mastery</li>
                    <li>• Business setup guidance</li>
                    <li>• Client acquisition training</li>
                    <li>• Ongoing mentorship access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 relative bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-green-400 font-bold uppercase tracking-widest text-sm">Success Stories</span>
              <h2 className="text-4xl md:text-6xl font-black mt-4">
                Real Drivers. <span className="text-green-400">Real Results.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Marcus Thompson', result: '3 Trucks in 18 Months', revenue: '$75K/mo', quote: 'Started with nothing, now I run 3 trucks. Shakur showed me the exact path to follow.', avatar: '👨🏾' },
                { name: 'Keisha Patterson', result: 'Left Corporate to Drive', revenue: '$12K/mo', quote: 'The dispatch training was incredible. I went from office job to running my own business.', avatar: '👩🏽' },
                { name: 'Jerome Williams', result: 'Owner Operator Success', revenue: '$18K/mo', quote: 'The mentorship and backend support made all the difference. I can focus on driving.', avatar: '👨🏿' },
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-slate-800/50 border border-white/10 rounded-2xl p-8 hover:border-green-400/30 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center text-3xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{testimonial.name}</p>
                      <div className="flex gap-1 text-green-400 text-sm">★★★★★</div>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-6 leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-green-400 font-bold text-lg">{testimonial.result}</p>
                      <p className="text-gray-500 text-xs uppercase">Achievement</p>
                    </div>
                    <div>
                      <p className="text-green-400 font-bold text-lg">{testimonial.revenue}</p>
                      <p className="text-gray-500 text-xs uppercase">Revenue</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BACKEND SUPPORT CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900" />
          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            <span className="text-green-400 font-bold uppercase tracking-widest text-sm">Already Driving?</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
              Let Us Handle the
              <span className="text-green-400"> Backend</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Focus on what you do best — driving and growing. We&apos;ll handle dispatch, compliance, paperwork, and admin. It&apos;s like having a full back office without the overhead.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { icon: '📞', title: 'Dispatch Support', desc: 'Load finding & coordination' },
                { icon: '📋', title: 'Compliance', desc: 'FMCSA, ELD, documentation' },
                { icon: '💼', title: 'Admin', desc: 'Invoicing, factoring, paperwork' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-6">
                  <span className="text-4xl block mb-4">{item.icon}</span>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-10 py-5 rounded-full text-lg transition-all hover:bg-green-400 hover:scale-105"
            >
              Get Backend Support
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNHMxNCA2LjI2OCAxNCAxNHMtNi4yNjggMTQtMTQgMTR6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Ready to Start
              <span className="block">Your Trucking Journey?</span>
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Whether you&apos;re just starting out or looking to scale, Coys Logistics has the training, mentorship, and support you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/academy" 
                className="bg-white text-green-600 font-bold px-10 py-5 rounded-full text-lg transition-all hover:bg-slate-900 hover:text-white hover:scale-105 hover:shadow-2xl"
              >
                🎓 Join Dispatch Academy
              </Link>
              <Link 
                href="/contact" 
                className="bg-white/20 backdrop-blur text-white font-bold px-10 py-5 rounded-full text-lg transition-all hover:bg-white hover:text-green-600 hover:scale-105 border-2 border-white/30"
              >
                📞 Talk to Shakur
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-slate-900 border-t border-white/10 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-10 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="/images/coyslogo.jpg" 
                    alt="Coys Logistics" 
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <span className="font-bold text-xl">Coys Logistics</span>
                </div>
                <p className="text-gray-400 max-w-md">
                  Not just moving freight — moving people forward. Trucking mentorship, dispatch training, and backend support from Shakur Mac.
                </p>
                <div className="flex gap-4 mt-6">
                  {['F', 'X', 'I', 'Y'].map((social, idx) => (
                    <a key={idx} href="#" className="w-10 h-10 bg-white/10 hover:bg-green-500 rounded-full flex items-center justify-center transition-all font-bold">
                      {social}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'Dispatch Academy', path: '/academy' },
                    { name: 'Mentorship', path: '/mentorship' },
                    { name: 'Fleet Management', path: '/fleet' },
                    { name: 'Contact', path: '/contact' }
                  ].map((link, idx) => (
                    <Link key={idx} href={link.path} className="block text-gray-400 hover:text-green-400 transition-colors">
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-4">Sister Company</h4>
                <div className="space-y-2 text-gray-400">
                  <a href="https://creditprenuers.netlify.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-400 transition-colors">
                    💳 CreditPreneurs
                  </a>
                  <p className="text-sm">Credit repair & business funding</p>
                </div>
                <h4 className="font-bold mb-2 mt-6">Contact</h4>
                <div className="space-y-1 text-gray-400 text-sm">
                  <p>📧 info@coyslogistics.com</p>
                  <p>📱 (404) 555-0124</p>
                  <p>📍 Atlanta, GA</p>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2024 Coys Logistics. All rights reserved.
              </p>
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

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        @keyframes scroll {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.5; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes road {
          0% { transform: translateX(0); }
          100% { transform: translateX(-128px); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-float { animation: float ease-in-out infinite; }
        .animate-scroll { animation: scroll 1.5s ease-in-out infinite; }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
        .animate-ticker { animation: ticker 30s linear infinite; }
        .animate-road { animation: road 2s linear infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
      `}</style>
    </>
  )
}
