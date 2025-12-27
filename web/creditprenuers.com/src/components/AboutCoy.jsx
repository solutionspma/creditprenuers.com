import Link from 'next/link'

export default function AboutCoy() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Shakur Photo */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/coy-mac.jpg" 
                alt="Shakur Mac - Credtegy Founder" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating stats */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4">
              <p className="text-3xl font-bold text-accent-gold">500+</p>
              <p className="text-sm text-gray-600">Lives Changed</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="section-title mb-6">Meet Shakur</h2>
            <p className="text-gray-600 text-lg mb-6">
              Shakur Mac isn't just a credit expert—he's someone who's walked the same path you're on. 
              From struggling with bad credit and closed doors to building multiple successful businesses, 
              his journey is proof that transformation is possible.
            </p>
            <p className="text-gray-600 text-lg mb-6">
              Now, he's dedicated to bringing others along for the ride. Through Credtegy, 
              he's created a movement focused on economic empowerment in communities that have been 
              systematically left behind.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-3xl font-bold text-gray-900">7+</p>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">$2M+</p>
                <p className="text-gray-600">Funding Secured</p>
              </div>
            </div>

            <Link href="/about" className="btn-primary inline-block">
              Read His Story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
