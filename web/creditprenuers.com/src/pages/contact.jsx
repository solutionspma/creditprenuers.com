import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeadForm from '@/components/LeadForm'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | Credtegy</title>
        <meta name="description" content="Get in touch with the Credtegy team. We're here to help you on your journey to financial freedom." />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="hero-gradient text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Have questions? Want to learn more? We're here to help you on your journey.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>
                  <p className="text-gray-600 mb-8">
                    Whether you have a question about our programs, need support, or just want to say hello — we'd love to hear from you.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📧</span>
                      </div>
                      <div>
                        <h3 className="font-bold">Email</h3>
                        <p className="text-gray-600">admin@credtegy.com</p>
                        <p className="text-sm text-gray-400">We respond within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📱</span>
                      </div>
                      <div>
                        <h3 className="font-bold">Phone/SMS</h3>
                        <p className="text-gray-600">+1 (000) 000-0000</p>
                        <p className="text-sm text-gray-400">Text or call • Mon-Fri 9am-6pm EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">💬</span>
                      </div>
                      <div>
                        <h3 className="font-bold">Social Media</h3>
                        <div className="flex gap-4 mt-2">
                          <a href="#" className="text-gray-600 hover:text-accent-gold transition-colors">Instagram</a>
                          <a href="#" className="text-gray-600 hover:text-accent-gold transition-colors">Facebook</a>
                          <a href="#" className="text-gray-600 hover:text-accent-gold transition-colors">YouTube</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-bold mb-2">🎯 Quick Links</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="/ebook" className="text-accent-gold hover:underline">→ Get the $27 eBook</a>
                      </li>
                      <li>
                        <a href="/mentorship" className="text-accent-gold hover:underline">→ Join the $47/mo Mentorship</a>
                      </li>
                      <li>
                        <a href="/about" className="text-accent-gold hover:underline">→ Learn about Shakur Mac</a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="card">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <LeadForm 
                    formId="contact_form"
                    submitText="Send Message"
                    showPayment={false}
                    fields={['name', 'email', 'phone', 'message']}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Map / Location Placeholder */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Serving Clients Nationwide</h2>
              <p className="text-gray-600 mb-8">
                Credtegy operates 100% online, serving clients across all 50 states.
              </p>
              <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                <p className="text-gray-500">Map placeholder - Nationwide coverage</p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
