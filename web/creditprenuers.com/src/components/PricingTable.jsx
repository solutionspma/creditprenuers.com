export default function PricingTable({ showFull = false }) {
  const products = [
    {
      id: 'ebook_27',
      name: 'Credtegy eBook',
      price: 27,
      originalPrice: 97,
      type: 'one-time',
      features: [
        '100+ page comprehensive guide',
        'Credit repair strategies',
        'Dispute letter templates (15)',
        'Funding checklist',
        'Business vendor list (50+)',
        'Lifetime access',
      ],
      cta: 'Get the eBook',
      href: '/ebook',
      popular: false,
    },
    {
      id: 'membership_47',
      name: 'Inner Circle Membership',
      price: 47,
      type: 'monthly',
      features: [
        'Everything in eBook, PLUS:',
        'Weekly live coaching calls',
        'Private community access',
        'Direct mentor access',
        'Monthly hot seat sessions',
        'Full course library',
        'Member-only perks & discounts',
      ],
      cta: 'Join Now',
      href: '/mentorship',
      popular: true,
    },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {products.map((product) => (
        <div
          key={product.id}
          className={`card relative ${
            product.popular 
              ? 'border-2 border-accent-gold shadow-xl' 
              : 'border border-gray-200'
          }`}
        >
          {product.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-gold text-black px-4 py-1 rounded-full text-sm font-bold">
              MOST POPULAR
            </div>
          )}

          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-4xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through">${product.originalPrice}</span>
              )}
              <span className="text-gray-500">
                {product.type === 'monthly' ? '/month' : ''}
              </span>
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent-green flex-shrink-0">✓</span>
                <span className={index === 0 && product.popular ? 'font-medium' : ''}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={product.href}
            className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
              product.popular
                ? 'bg-accent-gold text-black hover:bg-yellow-600'
                : 'border-2 border-gray-900 text-gray-900 hover:bg-gray-100'
            }`}
          >
            {product.cta}
          </a>

          {product.type === 'monthly' && (
            <p className="text-center text-sm text-gray-500 mt-3">
              Cancel anytime • No contracts
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
