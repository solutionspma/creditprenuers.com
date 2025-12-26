import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="hero-gradient text-white py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">🚀 Join the Movement</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Credit.<br />
              Your Power.<br />
              <span className="text-accent-gold">Your Future.</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 max-w-lg">
              Economic empowerment through credit repair, funding strategies, and mentorship. 
              Join thousands transforming their financial futures with CreditPreneurs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/ebook" className="btn-secondary text-center text-lg">
                Get the $27 eBook
              </Link>
              <Link href="/mentorship" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all text-center text-lg">
                Join Mentorship
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-sm"
                  >
                    {['👨🏾', '👩🏽', '👨🏿', '👩🏾', '👨🏽'][i - 1]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-accent-gold">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <p className="text-sm text-blue-200">500+ Lives Changed</p>
              </div>
            </div>
          </div>

          {/* Right side - Feature highlights */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">What You'll Learn:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="bg-accent-gold text-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                  <span>Master credit repair strategies that actually work</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-accent-gold text-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                  <span>Access funding sources most people don't know exist</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-accent-gold text-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                  <span>Build business credit separate from personal</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-accent-gold text-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">4</span>
                  <span>Create generational wealth for your family</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-200">Starting at</p>
                    <p className="text-3xl font-bold">$27</p>
                  </div>
                  <Link href="/ebook" className="btn-secondary">
                    Start Now →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
