import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeadForm from '@/components/LeadForm'

export default function Fleet() {
  return (
    <>
      <Head>
        <title>Fleet Management | Coys Logistics</title>
        <meta name="description" content="Advanced fleet management solutions for trucking companies. Track, manage, and optimize your fleet with Coys Logistics." />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="hero-gradient road-pattern text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-block bg-white/20 px-4 py-2 rounded-full mb-6">
                🚛 FLEET SOLUTIONS
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Manage Your Fleet<br />Like a Pro
              </h1>
              <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
                Complete fleet management solutions including GPS tracking, compliance management, and driver coordination — all in one platform.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="#features" className="btn-secondary">
                  See Features
                </a>
                <a href="#contact" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all">
                  Get a Demo
                </a>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section id="features" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-4">Fleet Management Features</h2>
              <p className="section-subtitle text-center mb-12">
                Everything you need to run an efficient trucking operation
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card truck-card">
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">📍</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">GPS Tracking</h3>
                  <p className="text-gray-600">
                    Real-time location tracking for all vehicles. Know where your fleet is at all times with precision GPS.
                  </p>
                </div>

                <div className="card truck-card">
                  <div className="w-14 h-14 bg-accent-orange/20 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Compliance Management</h3>
                  <p className="text-gray-600">
                    Stay FMCSA compliant with automated ELD tracking, document management, and expiration alerts.
                  </p>
                </div>

                <div className="card truck-card">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Driver Management</h3>
                  <p className="text-gray-600">
                    Manage driver profiles, certifications, performance metrics, and communication all in one place.
                  </p>
                </div>

                <div className="card truck-card">
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🗺️</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Route Optimization</h3>
                  <p className="text-gray-600">
                    Plan efficient routes, reduce fuel costs, and improve delivery times with smart routing.
                  </p>
                </div>

                <div className="card truck-card">
                  <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Maintenance Tracking</h3>
                  <p className="text-gray-600">
                    Schedule and track vehicle maintenance. Get alerts before issues become problems.
                  </p>
                </div>

                <div className="card truck-card">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Analytics & Reports</h3>
                  <p className="text-gray-600">
                    Detailed reports on fleet performance, fuel usage, driver metrics, and profitability.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Map Preview Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="section-title mb-6">Real-Time Fleet Visibility</h2>
                  <p className="text-gray-600 text-lg mb-6">
                    Our ModuRoute tracking system gives you complete visibility into your fleet operations. See every truck, every route, every delivery — in real time.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <span className="text-primary-600">✓</span>
                      <span>Live GPS tracking updates</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary-600">✓</span>
                      <span>Geofencing alerts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary-600">✓</span>
                      <span>ETA calculations</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary-600">✓</span>
                      <span>Historical route playback</span>
                    </li>
                  </ul>
                  <a href="#contact" className="btn-primary inline-block">
                    Request a Demo
                  </a>
                </div>
                <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="text-6xl mb-4 block">🗺️</span>
                    <p className="text-gray-500">Interactive map preview</p>
                    <p className="text-gray-400 text-sm">ModuRoute tracking interface</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-4">Get Started with Fleet Management</h2>
              <p className="section-subtitle text-center mb-12">
                Tell us about your fleet and we'll show you how we can help
              </p>

              <div className="card">
                <LeadForm 
                  formId="fleet_inquiry"
                  submitText="Request Fleet Demo"
                  showPayment={false}
                  fields={['name', 'email', 'phone', 'message']}
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
