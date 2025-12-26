export default function CTAButton({ 
  href = '#', 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props 
}) {
  const baseClasses = 'inline-block font-semibold rounded-lg transition-all duration-300'
  
  const variants = {
    primary: 'bg-accent-gold hover:bg-yellow-600 text-black shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-900 hover:bg-gray-800 text-white',
    outline: 'border-2 border-gray-900 text-gray-900 hover:bg-gray-100',
    ghost: 'bg-white/20 hover:bg-white/30 text-white',
  }

  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6',
    lg: 'py-4 px-8 text-lg',
  }

  return (
    <a
      href={href}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}
