export default function Testimonials() {
  const testimonials = [
    {
      name: 'Marcus T.',
      location: 'Atlanta, GA',
      image: '👨🏾',
      quote: "I went from a 520 credit score to 720 in just 6 months following Coy's system. Just got approved for my first business line of credit!",
      result: '520 → 720 Score',
    },
    {
      name: 'Keisha W.',
      location: 'Houston, TX',
      image: '👩🏾',
      quote: "The eBook was worth 100x what I paid. I've already secured $50K in funding for my business. This changed everything for my family.",
      result: '$50K Funded',
    },
    {
      name: 'Devon J.',
      location: 'Chicago, IL',
      image: '👨🏿',
      quote: "The mentorship program is insane. Having direct access to Coy and the community keeps me accountable. On track to hit 6 figures this year.",
      result: '6-Figure Business',
    },
    {
      name: 'Aaliyah M.',
      location: 'Los Angeles, CA',
      image: '👩🏽',
      quote: "I was skeptical at first, but the results speak for themselves. Removed 12 negative items from my report in the first 90 days.",
      result: '12 Items Removed',
    },
    {
      name: 'James R.',
      location: 'New York, NY',
      image: '👨🏽',
      quote: "Best investment I've ever made in myself. The business credit section alone was worth it. Now I have 5 tradelines reporting.",
      result: '5 Tradelines',
    },
    {
      name: 'Tanya C.',
      location: 'Miami, FL',
      image: '👩🏿',
      quote: "From no credit history to an 800+ score and multiple credit cards. Coy's strategies are the real deal. Thank you!",
      result: '800+ Score',
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Real People. Real Results.</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Don't just take our word for it. See what our community members have achieved.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-white rounded-2xl p-6 shadow-lg"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>

              {/* Result Badge */}
              <div className="inline-block bg-accent-green/10 text-accent-green px-3 py-1 rounded-full text-sm font-medium">
                ✓ {testimonial.result}
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mt-4 text-accent-gold">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Ready to write your success story?</p>
          <a href="/ebook" className="btn-primary inline-block">
            Start Your Journey Today
          </a>
        </div>
      </div>
    </section>
  )
}
