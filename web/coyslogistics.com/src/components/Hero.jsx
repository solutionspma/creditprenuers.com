import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero-gradient road-pattern text-white py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium">🚛 Moving People Forward</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Not Just<br />
              Moving Freight.<br />
              <span className="text-accent-orange">Moving Lives.</span>
            </h1>
            
            <p className="text-xl text-green-100 mb-8 max-w-lg">
              Master trucking. Build your fleet. Launch your dispatch career. 
              Coys Logistics is your complete roadmap to success in the logistics industry.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/academy" className="btn-secondary text-center text-lg">
                Join Dispatch Academy
              </Link>
              <Link href="/fleet" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all text-center text-lg">
                Fleet Solutions
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-accent-orange">200+</p>
                <p className="text-sm text-green-200">Drivers Trained</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent-orange">50+</p>
                <p className="text-sm text-green-200">Fleet Partners</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent-orange">48</p>
                <p className="text-sm text-green-200">States Covered</p>
              </div>
            </div>
          </div>

          {/* Right side - Feature card */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Start Your Journey:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="bg-accent-orange text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                  <span>Learn dispatching from industry experts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-accent-orange text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                  <span>Get certified and job-ready in weeks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-accent-orange text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                  <span>Access our driver network and fleet tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-accent-orange text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">4</span>
                  <span>Build your own trucking empire</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-200">Academy starts at</p>
                    <p className="text-3xl font-bold">$197</p>
                  </div>
                  <Link href="/academy" className="btn-secondary">
                    Enroll Now →
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
