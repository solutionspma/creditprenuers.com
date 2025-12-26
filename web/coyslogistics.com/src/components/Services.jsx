export default function Services() {
  const services = [
    {
      icon: '🎓',
      title: 'Dispatch Academy',
      description: 'Comprehensive training program to become a certified freight dispatcher. Learn from industry experts.',
      href: '/academy',
      color: 'bg-primary-100',
    },
    {
      icon: '🚛',
      title: 'Fleet Management',
      description: 'Complete fleet solutions including GPS tracking, compliance management, and driver coordination.',
      href: '/fleet',
      color: 'bg-accent-orange/20',
    },
    {
      icon: '📍',
      title: 'Route Planning',
      description: 'Optimize your routes for maximum efficiency. Reduce fuel costs and improve delivery times.',
      href: '/fleet',
      color: 'bg-blue-100',
    },
    {
      icon: '📋',
      title: 'Compliance Support',
      description: 'Stay FMCSA compliant with our documentation management and ELD integration services.',
      href: '/fleet',
      color: 'bg-purple-100',
    },
    {
      icon: '📱',
      title: 'Driver App',
      description: 'Mobile app for drivers with job assignments, GPS tracking, document uploads, and dispatch chat.',
      href: '/app',
      color: 'bg-red-100',
    },
    {
      icon: '🤝',
      title: 'Mentorship',
      description: 'One-on-one guidance from experienced trucking professionals. Build your empire the right way.',
      href: '/academy',
      color: 'bg-green-100',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Everything you need to succeed in the trucking and logistics industry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.href}
              className="card truck-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
            >
              <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                <span className="text-2xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
              <div className="mt-4 text-primary-600 font-medium">
                Learn more →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
