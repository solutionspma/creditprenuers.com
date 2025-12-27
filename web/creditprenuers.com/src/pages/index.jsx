import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const videoRef = useRef(null)
  const [stats, setStats] = useState({ clients: 0, funded: 0, score: 0 })

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
          clients: Math.floor(2847 * eased),
          funded: Math.floor(12.5 * eased * 10) / 10,
          score: Math.floor(127 * eased)
        })
        if (progress < 1) requestAnimationFrame(animate)
      }
      animate()
    }
    setTimeout(animateStats, 500)

    // Video autoplay
    if (videoRef.current) {
      videoRef.current.play().catch(console.log)
    }

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
        <title>Credtegy | Transform Your Credit. Transform Your Life.</title>
        <meta name="description" content="Join the #1 Credit Repair & Business Funding Movement. Led by Shakur Mac. 2,847+ lives transformed. Get funded today." />
        <meta property="og:title" content="Credtegy | Transform Your Credit. Transform Your Life." />
        <meta property="og:description" content="Join the #1 Credit Repair & Business Funding Movement. Led by Shakur Mac. 2,847+ lives transformed." />
      </Head>

      <div className="bg-black text-white overflow-hidden">
        {/* Animated Background Gradient */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-30 z-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 158, 11, 0.15), transparent 40%)`
          }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{ backgroundColor: scrollY > 50 ? 'rgba(0,0,0,0.9)' : 'transparent', backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none' }}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-lg p-1">
                <img src="/images/logo.png" alt="Credtegy" className="h-10 w-auto" />
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/ebook" className="text-gray-300 hover:text-accent-gold transition-colors">eBook</Link>
              <Link href="/mentorship" className="text-gray-300 hover:text-accent-gold transition-colors">Mentorship</Link>
              <Link href="/about" className="text-gray-300 hover:text-accent-gold transition-colors">About</Link>
              <Link href="/contact" className="text-gray-300 hover:text-accent-gold transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/signin" className="text-accent-gold hover:text-yellow-400 transition-colors font-medium">Sign In</Link>
              <Link href="/ebook" className="bg-accent-gold hover:bg-yellow-400 text-black font-bold px-6 py-2.5 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]">
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
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105"
              style={{ filter: 'brightness(0.3)' }}
            >
              <source src="/images/credtegyHero.mp4" type="video/mp4" />
            </video>
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-accent-gold rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 animate-fade-in-down">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-gold"></span>
              </span>
              <span className="text-sm font-medium">🔥 Join 2,847+ Credtegy Worldwide</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-none animate-fade-in-up">
              <span className="block">Transform Your</span>
              <span className="block bg-gradient-to-r from-accent-gold via-yellow-400 to-orange-500 bg-clip-text text-transparent animate-gradient-x">
                Credit Score
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl mt-4 font-light text-gray-300">
                Into Unlimited Opportunities
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Master credit repair. Access funding. Build generational wealth.
              <span className="text-white font-semibold"> Your transformation starts now.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <Link 
                href="/ebook" 
                className="group relative bg-accent-gold hover:bg-yellow-400 text-black font-bold px-10 py-5 rounded-full text-lg transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  📖 Get the $27 eBook
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link 
                href="/mentorship" 
                className="group border-2 border-white/30 hover:border-accent-gold text-white hover:text-accent-gold font-bold px-10 py-5 rounded-full text-lg transition-all hover:bg-white/5"
              >
                <span className="flex items-center gap-2">
                  🎓 Join Mentorship
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-accent-gold">{stats.clients.toLocaleString()}+</p>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">Lives Changed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-accent-gold">${stats.funded}M+</p>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">Funding Secured</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-accent-gold">+{stats.score}</p>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">Avg Score Increase</p>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2">
                <div className="w-1.5 h-3 bg-accent-gold rounded-full animate-scroll" />
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF TICKER */}
        <div className="bg-accent-gold text-black py-4 overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-8 mx-4">
                <span className="font-bold">&quot;Went from 520 to 740 in 6 months!&quot; - Marcus J.</span>
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="font-bold">&quot;Got $150K in funding!&quot; - Keisha W.</span>
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="font-bold">&quot;Life-changing mentorship!&quot; - Jerome S.</span>
                <span className="w-2 h-2 bg-black rounded-full" />
                <span className="font-bold">&quot;Best investment ever!&quot; - Tanya D.</span>
                <span className="w-2 h-2 bg-black rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT SHAKUR MAC SECTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent-gold to-orange-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative">
                  <img 
                    src="/images/coy-mac.jpg" 
                    alt="Shakur Mac" 
                    className="rounded-2xl w-full object-cover shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-accent-gold text-black p-6 rounded-2xl shadow-xl">
                    <p className="text-3xl font-black">10+</p>
                    <p className="text-sm font-medium">Years Experience</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <span className="text-accent-gold font-bold uppercase tracking-widest text-sm">Meet Your Mentor</span>
                <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
                  Shakur Mac
                  <span className="block text-2xl md:text-3xl font-light text-gray-400 mt-2">
                    Credit Expert & Wealth Builder
                  </span>
                </h2>
                <p className="text-xl text-gray-400 mb-6 leading-relaxed">
                  From struggling with bad credit to helping thousands achieve financial freedom. 
                  I&apos;ve secured over <span className="text-accent-gold font-bold">$12.5 million</span> in funding for my clients 
                  and built multiple successful businesses.
                </p>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  Now I&apos;m on a mission to share the same strategies that changed my life.
                  <span className="text-white font-semibold"> This isn&apos;t just education—it&apos;s transformation.</span>
                </p>

                {/* Credentials */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: '✅', text: 'Certified Credit Specialist' },
                    { icon: '🏆', text: 'Funding Expert' },
                    { icon: '📚', text: 'Best-Selling Author' },
                    { icon: '🎤', text: 'Motivational Speaker' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href="/about" 
                  className="inline-flex items-center gap-2 text-accent-gold hover:text-yellow-400 font-bold text-lg group"
                >
                  Learn My Story
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT YOU'LL LEARN */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="text-accent-gold font-bold uppercase tracking-widest text-sm">The Blueprint</span>
              <h2 className="text-4xl md:text-6xl font-black mt-4">
                What You&apos;ll <span className="text-accent-gold">Master</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  icon: '🎯', 
                  title: 'Credit Repair Secrets', 
                  desc: 'Learn the exact dispute strategies that delete negative items and boost your score fast.',
                  color: 'from-red-500/20 to-orange-500/20'
                },
                { 
                  icon: '💰', 
                  title: 'Funding Sources', 
                  desc: 'Access business credit lines, grants, and loans that most people never discover.',
                  color: 'from-green-500/20 to-emerald-500/20'
                },
                { 
                  icon: '🏦', 
                  title: 'Business Credit', 
                  desc: 'Build a powerful business credit profile separate from your personal credit.',
                  color: 'from-blue-500/20 to-cyan-500/20'
                },
                { 
                  icon: '📈', 
                  title: 'Score Optimization', 
                  desc: 'Advanced techniques to maximize your credit utilization and payment history.',
                  color: 'from-purple-500/20 to-pink-500/20'
                },
                { 
                  icon: '🔐', 
                  title: 'Identity Protection', 
                  desc: 'Protect yourself from fraud and maintain your credit health long-term.',
                  color: 'from-yellow-500/20 to-orange-500/20'
                },
                { 
                  icon: '🚀', 
                  title: 'Wealth Building', 
                  desc: 'Use credit strategically to build generational wealth and financial freedom.',
                  color: 'from-accent-gold/20 to-yellow-500/20'
                },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className={`group relative bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-accent-gold/50 transition-all hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(245,158,11,0.15)]`}
                >
                  <span className="text-5xl mb-6 block">{item.icon}</span>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-accent-gold transition-colors">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EBOOK CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/10 via-orange-500/10 to-red-500/10" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-gold/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          </div>
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-16 text-center">
              <span className="inline-block bg-accent-gold text-black font-bold px-4 py-1 rounded-full text-sm mb-6">
                📖 DIGITAL EBOOK
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                The Credit Repair
                <span className="block text-accent-gold">Trucking Business Blueprint</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                Everything you need to fix your credit AND start a profitable trucking business. 
                The ultimate guide to financial freedom.
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-10">
                {['Credit Repair Guide', 'Trucking Startup Blueprint', 'Funding Sources', 'Legal Templates', 'Bonus Resources'].map((item, idx) => (
                  <span key={idx} className="flex items-center gap-2 text-sm">
                    <span className="text-accent-gold">✓</span> {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 line-through text-2xl">$97</span>
                  <span className="text-5xl font-black text-accent-gold">$27</span>
                </div>
                <Link 
                  href="/ebook" 
                  className="bg-accent-gold hover:bg-yellow-400 text-black font-bold px-12 py-5 rounded-full text-xl transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(245,158,11,0.6)]"
                >
                  🚀 Get Instant Access
                </Link>
                <p className="text-gray-500 text-sm">Instant download • Lifetime access • 30-day money back guarantee</p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-accent-gold font-bold uppercase tracking-widest text-sm">Success Stories</span>
              <h2 className="text-4xl md:text-6xl font-black mt-4">
                Real People. <span className="text-accent-gold">Real Results.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Marcus Johnson', score: '520 → 740', funded: '$85K', quote: 'Shakur changed my entire life. I went from being denied everywhere to getting approved for my dream car and house.', avatar: '👨🏾' },
                { name: 'Keisha Williams', score: '580 → 750', funded: '$150K', quote: 'The mentorship paid for itself 100x over. I started my trucking company with the funding I got!', avatar: '👩🏽' },
                { name: 'Jerome Smith', score: '490 → 720', funded: '$200K', quote: 'I was skeptical at first, but the results speak for themselves. Best investment I ever made.', avatar: '👨🏿' },
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-8 hover:border-accent-gold/30 transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-accent-gold/20 rounded-full flex items-center justify-center text-3xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{testimonial.name}</p>
                      <div className="flex gap-1 text-accent-gold text-sm">★★★★★</div>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-6 leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-accent-gold font-bold text-lg">{testimonial.score}</p>
                      <p className="text-gray-500 text-xs uppercase">Credit Score</p>
                    </div>
                    <div>
                      <p className="text-accent-gold font-bold text-lg">{testimonial.funded}</p>
                      <p className="text-gray-500 text-xs uppercase">Funding</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MENTORSHIP SECTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-accent-gold font-bold uppercase tracking-widest text-sm">1-on-1 Mentorship</span>
                <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">
                  Ready for the
                  <span className="block text-accent-gold">Next Level?</span>
                </h2>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  Get personalized guidance, weekly coaching calls, and direct access to Shakur Mac. 
                  This isn&apos;t a course—it&apos;s a partnership for your success.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    'Weekly 1-on-1 coaching calls',
                    'Personalized credit repair strategy',
                    'Business funding roadmap',
                    'Private community access',
                    'Lifetime support & updates',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-accent-gold rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href="/mentorship" 
                  className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full text-lg transition-all hover:bg-accent-gold hover:scale-105 hover:shadow-[0_0_50px_rgba(245,158,11,0.5)]"
                >
                  Apply for Mentorship
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Pricing Card */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent-gold to-orange-500 rounded-3xl blur-2xl opacity-30" />
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-accent-gold rounded-3xl p-10">
                  <div className="text-center mb-8">
                    <span className="text-accent-gold font-bold uppercase tracking-widest text-sm">Premium Mentorship</span>
                    <div className="flex items-end justify-center gap-2 mt-4">
                      <span className="text-6xl font-black">$997</span>
                      <span className="text-gray-400 mb-2">/month</span>
                    </div>
                    <p className="text-gray-400 mt-2">or $9,997 one-time (save $2,967)</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {[
                      '4 weekly coaching sessions',
                      'Full credit analysis & strategy',
                      'Funding application assistance',
                      'Business setup guidance',
                      'Priority support (24hr response)',
                      'All course materials included',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        <span className="text-accent-gold">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    href="/mentorship" 
                    className="block w-full bg-accent-gold hover:bg-yellow-400 text-black font-bold py-4 rounded-full text-center text-lg transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                  >
                    Get Started Today
                  </Link>
                  <p className="text-center text-gray-500 text-sm mt-4">Limited spots available each month</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent-gold" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNHMxNCA2LjI2OCAxNCAxNHMtNi4yNjggMTQtMTQgMTR6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-10" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6">
              Stop Dreaming.
              <span className="block">Start Building.</span>
            </h2>
            <p className="text-xl text-black/70 mb-10 max-w-2xl mx-auto">
              Your credit score shouldn&apos;t limit your potential. Take the first step today and join thousands who&apos;ve transformed their financial future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/ebook" 
                className="bg-black text-white font-bold px-10 py-5 rounded-full text-lg transition-all hover:bg-gray-900 hover:scale-105 hover:shadow-2xl"
              >
                📖 Get the $27 eBook
              </Link>
              <Link 
                href="/mentorship" 
                className="bg-white/20 backdrop-blur text-black font-bold px-10 py-5 rounded-full text-lg transition-all hover:bg-white hover:scale-105 border-2 border-black/20"
              >
                🎓 Apply for Mentorship
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-black border-t border-white/10 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-10 mb-12">
              <div className="md:col-span-2">
                <img src="/images/logo.png" alt="Credtegy" className="h-12 mb-4 rounded-lg p-2" />
                <p className="text-gray-400 max-w-md">
                  Empowering entrepreneurs with credit repair strategies, funding access, and mentorship to build generational wealth.
                </p>
                <div className="flex gap-4 mt-6">
                  {['F', 'X', 'I', 'Y'].map((social, idx) => (
                    <a key={idx} href="#" className="w-10 h-10 bg-white/10 hover:bg-accent-gold hover:text-black rounded-full flex items-center justify-center transition-all font-bold">
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
                    { name: 'eBook', path: '/ebook' },
                    { name: 'Mentorship', path: '/mentorship' },
                    { name: 'About', path: '/about' },
                    { name: 'Contact', path: '/contact' }
                  ].map((link, idx) => (
                    <Link key={idx} href={link.path} className="block text-gray-400 hover:text-accent-gold transition-colors">
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <div className="space-y-2 text-gray-400">
                  <p>📧 info@credtegy.com</p>
                  <p>📱 (404) 555-0123</p>
                  <p>📍 Atlanta, GA</p>
                </div>
                <Link href="/signin" className="inline-block mt-4 text-accent-gold hover:text-yellow-400 font-medium">
                  🔐 Back Office Login →
                </Link>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center">
              <p className="text-gray-500 text-sm mb-4">© 2024 Credtegy. All rights reserved. | <a href="#" className="hover:text-accent-gold">Privacy Policy</a> | <a href="#" className="hover:text-accent-gold">Terms of Service</a></p>
              <p className="text-gray-500 text-sm">
                Powered by{' '}
                <a href="https://pitchmodularspaces.com" target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 hover:underline">
                  Pitch Modular Spaces
                </a>
                {' '}|{' '}
                <a href="https://pitchmarketing.agency" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 hover:underline">
                  Pitch Marketing Agency
                </a>
              </p>
              <p className="text-gray-600 text-xs mt-1">
                A division of Pitch Market Strategies & Public Relations LLC
              </p>
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
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; opacity: 0; }
      `}</style>
    </>
  )
}
