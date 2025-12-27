import '@/styles/globals.css'
import Head from 'next/head'
import LeadGate from '@/components/LeadGate'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Logademy - Not just moving freight, moving people forward. Trucking mentorship, dispatching programs, and fleet management solutions by Shakur Mac." />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <LeadGate>
        <Component {...pageProps} />
      </LeadGate>
    </>
  )
}
