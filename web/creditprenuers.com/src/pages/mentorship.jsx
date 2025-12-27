import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeadForm from '@/components/LeadForm'

export default function Mentorship() {
  return (
    <>
      <Head>
        <title>Credtegy Mentorship | Direct Access to Success</title>
        <meta name="description" content="Join the Credtegy mentorship program. Get direct access to Shakur Mac, weekly calls, and a community of winners building wealth together." />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="hero-gradient text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-block bg-white/20 px-4 py-2 rounded-full mb-6">
                🎯 LIMITED SPOTS AVAILABLE
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Credtegy<br />Inner Circle
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Stop trying to figure it out alone. Get direct mentorship from Shakur Mac and a community of action-takers building wealth together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#join" className="btn-secondary text-lg">
                  Join for $47/month
                </a>
                <a href="#features" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all text-lg">
                  See What's Included
                </a>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section id="features" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-4">What You Get as a Member</h2>
              <p className="section-subtitle text-center mb-12">
                Everything you need to transform your financial situation
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card text-center">
                  <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">📞</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Weekly Group Calls</h3>
                  <p className="text-gray-600">
                    Live sessions every week with Shakur. Get your questions answered in real-time.
                  </p>
                </div>

                <div className="card text-center">
                  <div className="w-16 h-16 mx-auto bg-accent-gold/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">💬</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Private Community</h3>
                  <p className="text-gray-600">
                    Access to our exclusive Discord/Slack community. Network with other winners.
                  </p>
                </div>

                <div className="card text-center">
                  <div className="w-16 h-16 mx-auto bg-accent-green/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">📚</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Full Course Library</h3>
                  <p className="text-gray-600">
                    Access to all Credtegy courses, guides, and resources. Updated monthly.
                  </p>
                </div>

                <div className="card text-center">
                  <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Personalized Roadmap</h3>
                  <p className="text-gray-600">
                    Custom action plan based on your current situation and goals.
                  </p>
                </div>

                <div className="card text-center">
                  <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">🔥</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Hot Seat Sessions</h3>
                  <p className="text-gray-600">
                    Get one-on-one spotlight coaching during our monthly hot seat sessions.
                  </p>
                </div>

                <div className="card text-center">
                  <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">🎁</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Member Perks</h3>
                  <p className="text-gray-600">
                    Exclusive discounts on tools, services, and partner offerings.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-12">Why the Inner Circle Wins</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-400 mb-6">Going It Alone ❌</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-gray-500">
                      <span className="text-red-500">✗</span>
                      Months of trial and error
                    </li>
                    <li className="flex items-start gap-3 text-gray-500">
                      <span className="text-red-500">✗</span>
                      Conflicting information online
                    </li>
                    <li className="flex items-start gap-3 text-gray-500">
                      <span className="text-red-500">✗</span>
                      No one to answer questions
                    </li>
                    <li className="flex items-start gap-3 text-gray-500">
                      <span className="text-red-500">✗</span>
                      Easy to give up
                    </li>
                    <li className="flex items-start gap-3 text-gray-500">
                      <span className="text-red-500">✗</span>
                      Isolated journey
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900 text-white rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-accent-gold text-black font-bold px-4 py-1 rounded-bl-lg text-sm">
                    RECOMMENDED
                  </div>
                  <h3 className="text-xl font-bold mb-6">Inner Circle Member ✅</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-accent-gold">✓</span>
                      Proven shortcut to results
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent-gold">✓</span>
                      Clear, tested strategies
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent-gold">✓</span>
                      Direct access to experts
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent-gold">✓</span>
                      Accountability & support
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent-gold">✓</span>
                      Community of winners
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section id="join" className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-4">Join the Inner Circle</h2>
              <p className="section-subtitle text-center mb-12">
                Less than $1.60 per day to transform your financial future
              </p>

              <div className="bg-white rounded-2xl shadow-xl border-2 border-accent-gold overflow-hidden">
                <div className="bg-accent-gold text-black py-4 text-center">
                  <span className="font-bold">MOST POPULAR</span>
                </div>
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-5xl font-bold text-gray-900">$47</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <p className="text-gray-500">Cancel anytime • No contracts</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <span className="text-accent-green">✓</span>
                      Weekly group coaching calls
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-accent-green">✓</span>
                      Private community access
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-accent-green">✓</span>
                      Full course library
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-accent-green">✓</span>
                      Monthly hot seat sessions
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-accent-green">✓</span>
                      Templates & resources
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-accent-green">✓</span>
                      Member-only perks
                    </li>
                  </ul>

                  <LeadForm 
                    formId="membership_signup"
                    productId="membership_47"
                    submitText="Start My Membership - $47/mo"
                    showPayment={true}
                  />

                  <p className="text-center text-sm text-gray-500 mt-4">
                    🔒 Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-12">Frequently Asked Questions</h2>

              <div className="space-y-6">
                <div className="card">
                  <h3 className="font-bold text-lg mb-2">When are the weekly calls?</h3>
                  <p className="text-gray-600">
                    Calls are typically held on Wednesday evenings at 8 PM EST. All calls are recorded if you can't make it live.
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-bold text-lg mb-2">Can I cancel anytime?</h3>
                  <p className="text-gray-600">
                    Absolutely. No contracts, no commitments. Cancel with one click whenever you want.
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-bold text-lg mb-2">How do I access the community?</h3>
                  <p className="text-gray-600">
                    After signup, you'll receive login credentials for our private community platform within minutes.
                  </p>
                </div>

                <div className="card">
                  <h3 className="font-bold text-lg mb-2">Is this right for beginners?</h3>
                  <p className="text-gray-600">
                    Yes! We have members at all levels. Whether you're just starting or looking to scale, there's value here for you.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
