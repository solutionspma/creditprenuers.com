import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LeadForm from '@/components/LeadForm'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | Coys Logistics</title>
        <meta name="description" content="Get in touch with Coys Logistics. Questions about dispatch training, fleet management, or trucking mentorship? We're here to help." />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="hero-gradient text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Coys Logistics</h1>
              <p className="text-xl text-green-100 max-w-2xl mx-auto">
                Ready to move forward? We're here to answer your questions and help you get started.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                  <p className="text-gray-600 mb-8">
                    Whether you're interested in our dispatch academy, fleet management solutions, or general trucking mentorship — reach out and let's talk.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📧</span>
                      </div>
                      <div>
                        <h3 className="font-bold">Email</h3>
                        <p className="text-gray-600">admin@coyslogistics.com</p>
                        <p className="text-sm text-gray-400">We respond within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-accent-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📱</span>
                      </div>
                      <div>
                        <h3 className="font-bold">Phone/SMS</h3>
                        <p className="text-gray-600">+1 (000) 000-0001</p>
                        <p className="text-sm text-gray-400">Text or call • Mon-Fri 8am-6pm EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📲</span>
                      </div>
                      <div>
                        <h3 className="font-bold">Driver App Support</h3>
                        <p className="text-gray-600">support@coyslogistics.com</p>
                        <p className="text-sm text-gray-400">For FieldOps app technical support</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-bold mb-2">🚛 Quick Links</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="/academy" className="text-primary-600 hover:underline">→ Dispatch Academy Programs</a>
                      </li>
                      <li>
                        <a href="/fleet" className="text-primary-600 hover:underline">→ Fleet Management Solutions</a>
                      </li>
                      <li>
                        <a href="/" className="text-primary-600 hover:underline">→ About Coys Logistics</a>
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

          {/* Service Areas */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Nationwide Operations</h2>
              <p className="text-gray-600 mb-8">
                Coys Logistics serves clients across the continental United States. Our dispatch academy and fleet solutions are available nationwide.
              </p>
              <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                <p className="text-gray-500">Map placeholder - 48 contiguous states coverage</p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
