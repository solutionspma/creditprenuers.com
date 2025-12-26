import Head from 'next/head'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Academy from '@/components/Academy'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import MobileApp from '@/components/MobileApp'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Coys Logistics | Trucking Mentorship & Dispatch Training</title>
        <meta name="description" content="Not just moving freight — moving people forward. Learn trucking, master dispatching, and build your logistics empire with Coys Logistics." />
        <meta property="og:title" content="Coys Logistics | Trucking Mentorship & Dispatch Training" />
        <meta property="og:description" content="Not just moving freight — moving people forward. Learn trucking, master dispatching, and build your logistics empire." />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <Services />
          <Academy />
          <Features />
          <MobileApp />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </>
  )
}
