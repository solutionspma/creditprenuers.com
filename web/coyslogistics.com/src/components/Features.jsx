export default function Features() {
  const features = [
    {
      icon: '📍',
      title: 'Real-Time Tracking',
      description: 'GPS tracking for all fleet vehicles with live updates, geofencing, and ETA calculations.',
    },
    {
      icon: '📋',
      title: 'Compliance Management',
      description: 'FMCSA, ELD, and DOT compliance tools. Never miss an expiration or audit requirement.',
    },
    {
      icon: '📊',
      title: 'Performance Analytics',
      description: 'Detailed reports on driver performance, fuel efficiency, and operational costs.',
    },
    {
      icon: '💬',
      title: 'Driver Communication',
      description: 'Built-in messaging, push notifications, and dispatch coordination tools.',
    },
  ]

  return (
    <section className="py-20 bg-trucking-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Why Choose Coys Logistics?</h2>
          <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
            Industry-leading technology combined with real-world experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="w-16 h-16 mx-auto bg-primary-600/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-accent-orange">99.9%</p>
            <p className="text-gray-400">Uptime</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-accent-orange">24/7</p>
            <p className="text-gray-400">Support</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-accent-orange">500+</p>
            <p className="text-gray-400">Active Drivers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-accent-orange">48</p>
            <p className="text-gray-400">States</p>
          </div>
        </div>
      </div>
    </section>
  )
}
