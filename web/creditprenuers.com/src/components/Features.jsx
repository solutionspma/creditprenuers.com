export default function Features() {
  const features = [
    {
      icon: '📊',
      title: 'Credit Repair System',
      description: 'Step-by-step process to identify, dispute, and remove negative items from your credit reports.',
      color: 'bg-yellow-100',
    },
    {
      icon: '💰',
      title: 'Funding Strategies',
      description: 'Learn how to access business loans, credit lines, and funding opportunities most people miss.',
      color: 'bg-green-100',
    },
    {
      icon: '📈',
      title: 'Score Optimization',
      description: 'Proven techniques to rapidly boost your credit score using insider strategies.',
      color: 'bg-purple-100',
    },
    {
      icon: '🏢',
      title: 'Business Credit',
      description: 'Build a strong business credit profile separate from your personal credit.',
      color: 'bg-yellow-100',
    },
    {
      icon: '🤝',
      title: 'Mentorship Access',
      description: 'Get direct guidance from Coy Mac and our community of successful entrepreneurs.',
      color: 'bg-red-100',
    },
    {
      icon: '📚',
      title: 'Education Library',
      description: 'Access our complete library of courses, templates, and resources.',
      color: 'bg-indigo-100',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Everything You Need to Win</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            We provide the tools, strategies, and support to transform your financial situation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
