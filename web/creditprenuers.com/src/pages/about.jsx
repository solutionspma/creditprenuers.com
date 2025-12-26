import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <>
      <Head>
        <title>About Shakur Coy Mac | CreditPreneurs</title>
        <meta name="description" content="Learn about Shakur Coy Mac's journey from struggle to success, and how he's helping others achieve financial freedom through credit mastery and mentorship." />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="hero-gradient text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Meet Shakur "Coy Mac"
                  </h1>
                  <p className="text-xl text-blue-100 mb-8">
                    Entrepreneur. Credit Expert. Community Leader. Movement Builder.
                  </p>
                  <div className="flex gap-4">
                    <a href="/ebook" className="btn-secondary">
                      Get the eBook
                    </a>
                    <a href="/mentorship" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all">
                      Join Mentorship
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square bg-white/10 rounded-2xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-48 h-48 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                        <span className="text-6xl">👨🏾‍💼</span>
                      </div>
                      <p className="text-blue-100">Photo placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-12">The Story</h2>
              
              <div className="prose prose-lg mx-auto">
                <div className="card mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">From Struggle to Strategy</h3>
                  <p className="text-gray-600 mb-4">
                    Like many in our community, Shakur faced the harsh realities of a system that wasn't designed for our success. Bad credit, limited options, and doors that seemed permanently closed.
                  </p>
                  <p className="text-gray-600">
                    But instead of accepting defeat, he chose to master the game. He studied credit, learned the strategies that the wealthy use, and most importantly—he started winning.
                  </p>
                </div>

                <div className="card mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Building the Movement</h3>
                  <p className="text-gray-600 mb-4">
                    Success alone wasn't enough. Shakur saw too many people in his community struggling with the same issues he'd overcome. That's when CreditPreneurs was born.
                  </p>
                  <p className="text-gray-600">
                    This isn't just a business—it's a movement. A commitment to lifting others up, sharing the knowledge, and creating generational wealth in communities that have been left behind.
                  </p>
                </div>

                <div className="card">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">The Vision</h3>
                  <p className="text-gray-600 mb-4">
                    Today, CreditPreneurs has helped hundreds of people repair their credit, secure funding, and start building the lives they deserve. But we're just getting started.
                  </p>
                  <p className="text-gray-600">
                    Through the eBook, mentorship programs, and community support, Shakur is creating a network of financially empowered individuals who will change their families' trajectories forever.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-12">Core Values</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl">💪🏾</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Empowerment</h3>
                  <p className="text-gray-600">
                    We don't just teach—we empower. Every strategy shared is designed to make you independent and self-sufficient.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-accent-gold/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl">🤝🏾</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community</h3>
                  <p className="text-gray-600">
                    We rise together. Our success is measured by how many people we bring with us on this journey.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-accent-green/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl">📈</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Results</h3>
                  <p className="text-gray-600">
                    No fluff, no hype—just proven strategies that deliver real results. Your success is our success.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary-900 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-blue-200 mb-8">
                Join thousands who have transformed their financial futures with CreditPreneurs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/ebook" className="btn-secondary text-lg">
                  Get the $27 eBook
                </a>
                <a href="/mentorship" className="bg-white text-primary-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all text-lg">
                  Join $47/mo Mentorship
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
