export default function Testimonials() {
  const testimonials = [
    {
      name: 'Marcus J.',
      role: 'Fleet Owner',
      image: '👨🏾',
      quote: "The dispatch academy changed everything for me. Went from driving to owning 3 trucks in under 2 years. Coy's mentorship is the real deal.",
      result: '3 Truck Owner',
    },
    {
      name: 'Sandra W.',
      role: 'Dispatcher',
      image: '👩🏽',
      quote: "I took the Mastery course and had a job within 3 weeks of completing it. The job placement assistance really works!",
      result: 'Hired in 3 Weeks',
    },
    {
      name: 'Derek T.',
      role: 'Owner Operator',
      image: '👨🏿',
      quote: "The fleet management tools helped me optimize my routes and save over $800/month in fuel costs. ROI was immediate.",
      result: '$800/mo Saved',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">What Our Community Says</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Real results from real people in the trucking industry.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="truck-card bg-white rounded-2xl p-6 shadow-lg"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>

              {/* Result Badge */}
              <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                ✓ {testimonial.result}
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mt-4 text-accent-orange">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
