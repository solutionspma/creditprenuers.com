import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeadForm from '@/components/LeadForm'

export default function Academy() {
  return (
    <>
      <Head>
        <title>Dispatch Academy | Coys Logistics</title>
        <meta name="description" content="Learn dispatching from industry experts. Our comprehensive program takes you from beginner to certified dispatcher ready to earn." />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="hero-gradient road-pattern text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block bg-accent-orange px-4 py-2 rounded-full mb-6 font-bold">
                    🎓 DISPATCH ACADEMY
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Become a Certified Dispatcher
                  </h1>
                  <p className="text-xl text-green-100 mb-8">
                    Learn the art and science of freight dispatching. From finding loads to building broker relationships — we teach it all.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="#pricing" className="btn-secondary">
                      View Programs
                    </a>
                    <a href="#curriculum" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all">
                      See Curriculum
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                        <span className="text-6xl">🚛</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Fast Track to Success</h3>
                      <p className="text-green-100">Start earning in as little as 4 weeks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Curriculum Section */}
          <section id="curriculum" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-4">What You'll Learn</h2>
              <p className="section-subtitle text-center mb-12">
                A comprehensive curriculum designed for real-world success
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Module 1: Industry Fundamentals</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Understanding the freight industry</li>
                    <li>• Key players and relationships</li>
                    <li>• Types of freight and equipment</li>
                    <li>• Industry terminology</li>
                  </ul>
                </div>

                <div className="card">
                  <div className="w-12 h-12 bg-accent-orange/20 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Module 2: Finding Loads</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Load board mastery (DAT, Truckstop)</li>
                    <li>• Direct shipper relationships</li>
                    <li>• Rate negotiation tactics</li>
                    <li>• Lane optimization</li>
                  </ul>
                </div>

                <div className="card">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Module 3: Broker Relations</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Building broker relationships</li>
                    <li>• Negotiation strategies</li>
                    <li>• Contract management</li>
                    <li>• Getting paid faster</li>
                  </ul>
                </div>

                <div className="card">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Module 4: Operations</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Scheduling and routing</li>
                    <li>• Driver communication</li>
                    <li>• Problem resolution</li>
                    <li>• Documentation handling</li>
                  </ul>
                </div>

                <div className="card">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">⚖️</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Module 5: Compliance</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• FMCSA regulations</li>
                    <li>• HOS rules and ELD</li>
                    <li>• Insurance requirements</li>
                    <li>• Safety protocols</li>
                  </ul>
                </div>

                <div className="card">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Module 6: Business Building</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Starting your dispatch business</li>
                    <li>• Pricing your services</li>
                    <li>• Finding clients</li>
                    <li>• Scaling operations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-4">Choose Your Path</h2>
              <p className="section-subtitle text-center mb-12">
                Programs designed for different levels and goals
              </p>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Basic Program */}
                <div className="card border-2 border-gray-200">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Dispatch Fundamentals</h3>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$197</span>
                      <span className="text-gray-500"> one-time</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <span className="text-primary-600">✓</span>
                      <span>Modules 1-4 access</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary-600">✓</span>
                      <span>Video lessons library</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary-600">✓</span>
                      <span>Resource downloads</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary-600">✓</span>
                      <span>Community access</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-400">
                      <span>✗</span>
                      <span>Live coaching calls</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-400">
                      <span>✗</span>
                      <span>1-on-1 mentorship</span>
                    </li>
                  </ul>

                  <a
                    href="#enroll-basic"
                    className="block w-full text-center py-3 px-6 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    Enroll Now
                  </a>
                </div>

                {/* Premium Program */}
                <div className="card border-2 border-primary-500 relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    BEST VALUE
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Dispatch Mastery</h3>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$497</span>
                      <span className="text-gray-500"> one-time</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <span className="text-primary-600">✓</span>
                      <span className="font-medium">All 6 modules + bonuses</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary-600">✓</span>
                      <span>Everything in Fundamentals</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary-600">✓</span>
                      <span>Weekly live coaching calls</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary-600">✓</span>
                      <span>1-on-1 mentor sessions (3x)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary-600">✓</span>
                      <span>Job placement assistance</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary-600">✓</span>
                      <span>Certificate of completion</span>
                    </li>
                  </ul>

                  <a
                    href="#enroll-premium"
                    className="btn-primary block w-full text-center"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Enrollment Form */}
          <section className="py-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-4">Ready to Start?</h2>
              <p className="section-subtitle text-center mb-12">
                Fill out the form below and we'll get you enrolled
              </p>

              <div className="card">
                <LeadForm 
                  formId="academy_enrollment"
                  submitText="Request Enrollment Info"
                  showPayment={false}
                />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
