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
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-accent-gold hover:bg-yellow-600 text-black',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
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
