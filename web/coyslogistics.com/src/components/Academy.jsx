import Link from 'next/link'

export default function Academy() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <div className="inline-block bg-accent-orange/10 text-accent-orange font-bold px-4 py-2 rounded-full mb-6">
              🎓 DISPATCH ACADEMY
            </div>
            <h2 className="section-title mb-6">
              Become a Certified Dispatcher
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Our comprehensive dispatch training program takes you from beginner to certified professional. 
              Learn load finding, broker relations, compliance, and everything you need to succeed.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                <div>
                  <p className="font-bold">Industry-Expert Instructors</p>
                  <p className="text-gray-500 text-sm">Learn from dispatchers with 10+ years experience</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                <div>
                  <p className="font-bold">Hands-On Training</p>
                  <p className="text-gray-500 text-sm">Real load boards, real negotiations, real experience</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">✓</span>
                <div>
                  <p className="font-bold">Job Placement Support</p>
                  <p className="text-gray-500 text-sm">We help you find your first dispatch position</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/academy" className="btn-primary">
                View Programs →
              </Link>
              <div>
                <p className="text-sm text-gray-500">Starting at</p>
                <p className="text-2xl font-bold text-gray-900">$197</p>
              </div>
            </div>
          </div>

          {/* Right - Program cards */}
          <div className="space-y-4">
            <div className="card border-l-4 border-primary-500">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">Dispatch Fundamentals</h3>
                  <p className="text-gray-500 text-sm">Perfect for beginners</p>
                </div>
                <span className="text-xl font-bold text-primary-600">$197</span>
              </div>
              <ul className="mt-4 text-sm text-gray-600 space-y-1">
                <li>• 4 core modules</li>
                <li>• Video lessons library</li>
                <li>• Community access</li>
              </ul>
            </div>

            <div className="card border-l-4 border-accent-orange relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent-orange text-white text-xs font-bold px-2 py-1">
                MOST POPULAR
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">Dispatch Mastery</h3>
                  <p className="text-gray-500 text-sm">Complete certification</p>
                </div>
                <span className="text-xl font-bold text-accent-orange">$497</span>
              </div>
              <ul className="mt-4 text-sm text-gray-600 space-y-1">
                <li>• All 6 modules + bonuses</li>
                <li>• Live coaching calls</li>
                <li>• 1-on-1 mentorship (3x)</li>
                <li>• Job placement assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
