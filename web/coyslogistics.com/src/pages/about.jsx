import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function About() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Head>
        <title>About Shakur Mac | Coys Logistics</title>
        <meta name="description" content="Meet Shakur Mac - trucking entrepreneur, credit expert, and mentor. Learn his story and how he's helping others build wealth through trucking and credit." />
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
              <Link href="/about" className="text-green-400 font-semibold">About</Link>
            </div>
            <Link href="/contact" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-2.5 rounded-full transition-all hover:scale-105">
              Get Started
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-2xl opacity-30" />
                <div className="relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl aspect-square w-full flex items-center justify-center shadow-2xl overflow-hidden">
                  <img 
                    src="/images/coy-mac.jpg" 
                    alt="Shakur Mac" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <span className="text-green-400 font-bold uppercase tracking-widest text-sm">The Man Behind the Mission</span>
                <h1 className="text-5xl md:text-6xl font-black mt-4 mb-6">
                  Shakur &quot;Coy&quot; Mac
                </h1>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  Entrepreneur. Trucking Expert. Credit Specialist. Mentor.
                </p>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  I didn&apos;t come from money. I didn&apos;t have connections. What I had was determination, 
                  a willingness to learn, and an unshakeable belief that I could build something better 
                  for myself and my family.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Today, I run multiple businesses, mentor hundreds of aspiring entrepreneurs, and 
                  help people transform their financial lives through credit repair and trucking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* My Story */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16">
              My <span className="text-green-400">Story</span>
            </h2>

            <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
              <p>
                Growing up, I watched my family struggle. We lived paycheck to paycheck, always one 
                emergency away from disaster. I knew early on that I wanted something different — 
                not just for me, but for everyone around me.
              </p>
              <p>
                My journey into trucking started almost by accident. A friend needed help with a delivery, 
                and I saw an opportunity. That one delivery turned into another, then another. Before I knew it, 
                I was obsessed with understanding the logistics industry inside and out.
              </p>
              <p>
                But here&apos;s the thing nobody tells you about starting a trucking business: 
                <span className="text-white font-semibold"> it&apos;s not just about driving.</span> It&apos;s about 
                credit, funding, compliance, dispatching, broker relationships, and a hundred other things 
                they don&apos;t teach you anywhere.
              </p>
              <p>
                I learned it all the hard way — through mistakes, setbacks, and countless hours of trial and error. 
                My credit was terrible when I started. I got rejected for financing more times than I can count. 
                But I refused to give up.
              </p>
              <p>
                I studied credit repair obsessively. I learned the system. I raised my scores. I got funding. 
                I bought my first truck. Then my second. Then I started helping other drivers do the same thing.
              </p>
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 my-12">
                <p className="text-xl text-white font-semibold mb-4">
                  &quot;I realized my purpose wasn&apos;t just to build my own success — it was to create a 
                  blueprint that others could follow.&quot;
                </p>
                <p className="text-green-400">— Shakur Mac</p>
              </div>
              <p>
                That&apos;s why I created <span className="text-green-400 font-bold">Coys Logistics</span> and 
                <span className="text-amber-400 font-bold"> CreditPreneurs</span>. Two sides of the same coin. 
                Coys Logistics teaches you the trucking game — from dispatching to fleet management. 
                CreditPreneurs helps you fix your credit and access funding to make it all possible.
              </p>
              <p>
                Today, I&apos;ve helped over <span className="text-white font-semibold">247 drivers</span> start 
                their trucking businesses. I&apos;ve helped people raise their credit scores by 
                <span className="text-white font-semibold"> 100+ points</span>. I&apos;ve helped entrepreneurs 
                secure over <span className="text-white font-semibold">$12.5 million</span> in funding.
              </p>
              <p>
                And I&apos;m just getting started.
              </p>
            </div>
          </div>
        </section>

        {/* What I Do */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16">
              What I <span className="text-green-400">Do</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-10 hover:border-green-400/30 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🚛</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Coys Logistics</h3>
                <p className="text-gray-400 mb-6">
                  My trucking mentorship and training company. We offer dispatch academy, 1-on-1 mentorship, 
                  backend support, and fleet solutions for aspiring and established trucking entrepreneurs.
                </p>
                <Link href="/" className="text-green-400 font-semibold hover:text-green-300">
                  Learn More →
                </Link>
              </div>

              <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-10 hover:border-amber-400/30 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-3xl">💳</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">CreditPreneurs</h3>
                <p className="text-gray-400 mb-6">
                  My credit repair and funding company. We help entrepreneurs fix their credit, access 
                  business funding, and build the financial foundation for their dreams.
                </p>
                <a href="https://creditprenuers.netlify.app" target="_blank" rel="noopener noreferrer" className="text-amber-400 font-semibold hover:text-amber-300">
                  Visit CreditPreneurs →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16">
              What I <span className="text-green-400">Believe</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: '🎯', 
                  title: 'No Shortcuts', 
                  desc: 'Real success takes work. I don\'t promise overnight riches — I teach proven strategies that build lasting wealth.' 
                },
                { 
                  icon: '🤝', 
                  title: 'Community Over Competition', 
                  desc: 'When we lift each other up, we all rise. My success is measured by how many others I help succeed.' 
                },
                { 
                  icon: '📚', 
                  title: 'Knowledge is Power', 
                  desc: 'The system is designed to keep you uninformed. I\'m here to share everything I\'ve learned so you can beat it.' 
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <span className="text-6xl block mb-6">{item.icon}</span>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '247+', label: 'Drivers Trained' },
                { number: '$12.5M+', label: 'Funding Secured' },
                { number: '89+', label: 'Businesses Started' },
                { number: '10+', label: 'Years Experience' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-4xl md:text-5xl font-black text-green-400">{stat.number}</p>
                  <p className="text-gray-400 uppercase tracking-widest text-sm mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Let&apos;s Build Something Together
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Whether you want to start a trucking business, fix your credit, or both — I&apos;m here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/mentorship" 
                className="bg-white text-green-600 font-bold px-10 py-5 rounded-full text-lg transition-all hover:bg-slate-900 hover:text-white hover:scale-105"
              >
                🤝 Apply for Mentorship
              </Link>
              <Link 
                href="/contact" 
                className="bg-white/20 text-white font-bold px-10 py-5 rounded-full text-lg transition-all hover:bg-white hover:text-green-600 hover:scale-105 border-2 border-white/30"
              >
                📧 Get in Touch
              </Link>
            </div>
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
                <Link href="/mentorship" className="hover:text-green-400">Mentorship</Link>
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
