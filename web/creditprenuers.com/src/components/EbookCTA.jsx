import Link from 'next/link'

export default function EbookCTA() {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-800 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-700 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <div className="inline-block bg-accent-gold text-black font-bold px-4 py-2 rounded-full mb-6">
              📚 THE BLUEPRINT
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Get the CreditPreneurs eBook
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Over 100 pages of actionable strategies, templates, and insider knowledge to transform your credit and secure funding.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <span className="bg-accent-gold text-black w-6 h-6 rounded-full flex items-center justify-center">✓</span>
                <span>Complete credit repair system</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-accent-gold text-black w-6 h-6 rounded-full flex items-center justify-center">✓</span>
                <span>15 dispute letter templates</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-accent-gold text-black w-6 h-6 rounded-full flex items-center justify-center">✓</span>
                <span>Funding source directory</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-accent-gold text-black w-6 h-6 rounded-full flex items-center justify-center">✓</span>
                <span>Business credit blueprint</span>
              </li>
            </ul>

            <div className="flex items-center gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold">$27</span>
                  <span className="text-gray-400 line-through text-xl">$97</span>
                </div>
                <p className="text-gray-400 text-sm">Limited time offer</p>
              </div>
              <Link href="/ebook" className="btn-secondary text-lg">
                Get Instant Access →
              </Link>
            </div>
          </div>

          {/* Right - Book mockup */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              {/* Book representation */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="border-2 border-white/30 rounded-lg p-6">
                  <div className="text-accent-gold font-bold text-sm mb-2">CREDITPRENEURS</div>
                  <h3 className="text-2xl font-bold mb-4">The Credit Blueprint</h3>
                  <p className="text-gray-300 text-sm mb-6">
                    Master Your Credit. Secure Your Funding. Build Your Empire.
                  </p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-sm text-gray-300">By Shakur "Coy Mac"</p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-accent-gold text-black font-bold px-4 py-2 rounded-full text-sm shadow-lg">
                72% OFF!
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg">
                <p className="text-xs text-gray-500">Includes</p>
                <p className="font-bold">3 Bonuses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
