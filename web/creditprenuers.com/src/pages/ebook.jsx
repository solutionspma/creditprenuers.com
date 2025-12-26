import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeadForm from '@/components/LeadForm'
import PricingTable from '@/components/PricingTable'

export default function Ebook() {
  return (
    <>
      <Head>
        <title>The CreditPreneurs eBook | Master Your Credit for $27</title>
        <meta name="description" content="Get the complete CreditPreneurs guide to credit repair and funding. Learn the exact strategies that have helped hundreds achieve financial freedom." />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="hero-gradient text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block bg-accent-gold text-black font-bold px-4 py-2 rounded-full mb-6">
                    🔥 LIMITED TIME OFFER
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    The CreditPreneurs Blueprint
                  </h1>
                  <p className="text-xl text-gray-300 mb-6">
                    The complete guide to credit repair, funding strategies, and building wealth from scratch.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <span className="text-accent-gold">✓</span>
                      Step-by-step credit repair system
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-accent-gold">✓</span>
                      Funding secrets the banks don't tell you
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-accent-gold">✓</span>
                      Dispute letter templates included
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-accent-gold">✓</span>
                      Business credit building strategies
                    </li>
                  </ul>
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold">$27</span>
                    <span className="text-gray-400 line-through text-2xl">$97</span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">72% OFF</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 text-gray-900">
                  <h3 className="text-2xl font-bold mb-6 text-center">Get Instant Access</h3>
                  <LeadForm 
                    formId="ebook_purchase"
                    productId="ebook_27"
                    submitText="Buy Now - $27"
                    showPayment={true}
                  />
                  <p className="text-center text-sm text-gray-500 mt-4">
                    🔒 Secure checkout • Instant digital delivery
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What's Inside */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-4">What's Inside the eBook</h2>
              <p className="section-subtitle text-center mb-12">
                Over 100 pages of actionable strategies and templates
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="card">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-bold mb-2">Chapter 1: Credit Foundations</h3>
                  <p className="text-gray-600">
                    Understand how credit really works, what affects your score, and how to read your reports like a pro.
                  </p>
                </div>

                <div className="card">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl font-bold mb-2">Chapter 2: Dispute Strategies</h3>
                  <p className="text-gray-600">
                    Proven methods for disputing negative items. Includes ready-to-use letter templates.
                  </p>
                </div>

                <div className="card">
                  <div className="text-4xl mb-4">💳</div>
                  <h3 className="text-xl font-bold mb-2">Chapter 3: Credit Building</h3>
                  <p className="text-gray-600">
                    Strategic use of authorized user accounts, secured cards, and credit builder loans.
                  </p>
                </div>

                <div className="card">
                  <div className="text-4xl mb-4">🏢</div>
                  <h3 className="text-xl font-bold mb-2">Chapter 4: Business Credit</h3>
                  <p className="text-gray-600">
                    Build business credit separate from personal. Access funding your competitors can't.
                  </p>
                </div>

                <div className="card">
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="text-xl font-bold mb-2">Chapter 5: Funding Sources</h3>
                  <p className="text-gray-600">
                    Secret funding sources, 0% APR strategies, and how to stack credit lines.
                  </p>
                </div>

                <div className="card">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold mb-2">Chapter 6: The Game Plan</h3>
                  <p className="text-gray-600">
                    Your 90-day action plan to go from where you are to where you want to be.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bonus Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-4">Plus These Bonuses</h2>
              <p className="section-subtitle text-center mb-12">
                Valued at over $200 — Yours FREE with the eBook
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-6 border-2 border-accent-gold">
                  <div className="text-accent-gold font-bold mb-2">BONUS #1</div>
                  <h3 className="text-xl font-bold mb-2">Dispute Letter Pack</h3>
                  <p className="text-gray-600 mb-4">
                    15 proven dispute letter templates ready to customize and send.
                  </p>
                  <p className="text-gray-400 line-through">Value: $47</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-accent-gold">
                  <div className="text-accent-gold font-bold mb-2">BONUS #2</div>
                  <h3 className="text-xl font-bold mb-2">Funding Checklist</h3>
                  <p className="text-gray-600 mb-4">
                    The exact checklist we use to prepare clients for maximum funding.
                  </p>
                  <p className="text-gray-400 line-through">Value: $27</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-accent-gold">
                  <div className="text-accent-gold font-bold mb-2">BONUS #3</div>
                  <h3 className="text-xl font-bold mb-2">Vendor List</h3>
                  <p className="text-gray-600 mb-4">
                    50+ business credit vendors that report to business bureaus.
                  </p>
                  <p className="text-gray-400 line-through">Value: $97</p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Start Your Transformation Today
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                For less than the cost of dinner, you can have the roadmap to financial freedom.
              </p>
              <a href="#top" className="btn-secondary text-lg inline-block">
                Get the eBook - Only $27
              </a>
              <p className="mt-6 text-gray-400 text-sm">
                ✅ Instant download • ✅ Lifetime access • ✅ 30-day money back guarantee
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
