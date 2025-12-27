import Link from 'next/link'

export default function MembershipSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Ready to Go Deeper?</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Join the Credtegy Inner Circle for direct mentorship, community access, and accelerated results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free/eBook Tier */}
          <div className="card border-2 border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Start Here</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">$27</span>
                <span className="text-gray-500"> one-time</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <span className="text-accent-green">✓</span>
                <span>100+ page eBook</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-green">✓</span>
                <span>Dispute letter templates</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-green">✓</span>
                <span>Funding checklist</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-green">✓</span>
                <span>Vendor list (50+)</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <span>✗</span>
                <span>Weekly coaching calls</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <span>✗</span>
                <span>Private community</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <span>✗</span>
                <span>Direct mentor access</span>
              </li>
            </ul>

            <Link
              href="/ebook"
              className="block w-full text-center py-3 px-6 border-2 border-accent-gold text-gray-900 font-semibold rounded-lg hover:bg-yellow-50 transition-colors"
            >
              Get the eBook
            </Link>
          </div>

          {/* Membership Tier */}
          <div className="card border-2 border-accent-gold relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-gold text-black px-4 py-1 rounded-full text-sm font-bold">
              MOST VALUE
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Inner Circle</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">$47</span>
                <span className="text-gray-500">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <span className="text-accent-green">✓</span>
                <span className="font-medium">Everything in eBook, PLUS:</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-green">✓</span>
                <span>Weekly live coaching calls</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-green">✓</span>
                <span>Private community access</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-green">✓</span>
                <span>Direct mentor access</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-green">✓</span>
                <span>Monthly hot seat sessions</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-green">✓</span>
                <span>Full course library</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent-green">✓</span>
                <span>Member-only perks</span>
              </li>
            </ul>

            <Link
              href="/mentorship"
              className="btn-primary block w-full text-center"
            >
              Join the Inner Circle
            </Link>

            <p className="text-center text-sm text-gray-500 mt-3">
              Cancel anytime • No contracts
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
