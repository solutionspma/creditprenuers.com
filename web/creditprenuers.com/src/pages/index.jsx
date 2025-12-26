import Head from 'next/head'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import AboutCoy from '@/components/AboutCoy'
import Testimonials from '@/components/Testimonials'
import EbookCTA from '@/components/EbookCTA'
import MembershipSection from '@/components/MembershipSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>CreditPreneurs | Economic Empowerment Through Credit & Mentorship</title>
        <meta name="description" content="Transform your financial future with CreditPreneurs. Learn credit repair, secure funding, and join a movement of economic empowerment led by Shakur Coy Mac." />
        <meta property="og:title" content="CreditPreneurs | Economic Empowerment Through Credit & Mentorship" />
        <meta property="og:description" content="Transform your financial future with CreditPreneurs. Learn credit repair, secure funding, and join a movement of economic empowerment." />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <Features />
          <AboutCoy />
          <EbookCTA />
          <Testimonials />
          <MembershipSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
