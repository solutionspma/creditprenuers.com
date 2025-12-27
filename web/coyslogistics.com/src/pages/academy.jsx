import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTruck, FaGraduationCap, FaChartLine, FaUsers, FaCheckCircle, FaCertificate, FaPhone, FaMapMarkerAlt, FaBook, FaLaptop, FaHandshake, FaBars, FaTimes } from 'react-icons/fa';

export default function Academy() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Mentorship', href: '/mentorship' },
    { name: 'Academy', href: '/academy' },
    { name: 'Fleet', href: '/fleet' },
    { name: 'Contact', href: '/contact' },
  ];

  const academyFeatures = [
    {
      icon: <FaBook className="w-8 h-8 text-green-400" />,
      title: 'Comprehensive Curriculum',
      description: 'Learn everything from basic dispatch operations to advanced load planning and carrier negotiations.',
      image: '/images/warehouse-1.jpg'
    },
    {
      icon: <FaLaptop className="w-8 h-8 text-green-400" />,
      title: 'Hands-On Training',
      description: 'Real-world simulations and live practice with actual freight booking systems and load boards.',
      image: '/images/truck-delivery-1.jpg'
    },
    {
      icon: <FaCertificate className="w-8 h-8 text-green-400" />,
      title: 'Industry Certification',
      description: 'Earn recognized credentials that demonstrate your expertise to potential clients and employers.',
      image: '/images/truck-highway-1.jpg'
    },
    {
      icon: <FaHandshake className="w-8 h-8 text-green-400" />,
      title: 'Career Placement',
      description: 'Connect with trucking companies and dispatch agencies actively seeking trained dispatchers.',
      image: '/images/truck-delivery-2.jpg'
    }
  ];

  const curriculumModules = [
    {
      week: 'Week 1-2',
      title: 'Foundation & Industry Overview',
      topics: ['Understanding the freight industry', 'Types of trucking operations', 'Key terminology and regulations', 'DOT compliance basics']
    },
    {
      week: 'Week 3-4',
      title: 'Dispatch Operations Fundamentals',
      topics: ['Load board navigation', 'Rate negotiation techniques', 'Building shipper relationships', 'Documentation essentials']
    },
    {
      week: 'Week 5-6',
      title: 'Advanced Dispatch Strategies',
      topics: ['Multi-stop load optimization', 'Deadhead reduction', 'Emergency response protocols', 'Driver communication best practices']
    },
    {
      week: 'Week 7-8',
      title: 'Business Development',
      topics: ['Starting your dispatch service', 'Client acquisition strategies', 'Pricing your services', 'Building long-term partnerships']
    }
  ];

  const testimonials = [
    {
      name: 'Marcus Johnson',
      role: 'Graduate - Now Earning $8K/Month',
      quote: 'The Coys Academy changed my life. Within 3 months of graduating, I was running my own dispatch operation.',
      image: '/images/truck-delivery-3.jpg'
    },
    {
      name: 'Tanya Williams',
      role: 'Graduate - Fleet Dispatcher',
      quote: 'The hands-on training prepared me for real situations. I felt confident from day one on the job.',
      image: '/images/warehouse-2.jpg'
    }
  ];

  return (
    <>
      <Head>
        <title>Dispatch Academy | Logademy - Professional Truck Dispatcher Training</title>
        <meta name="description" content="Join Logademy Dispatch Academy - Comprehensive truck dispatcher training program with hands-on experience, industry certification, and career placement assistance." />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-16 h-10 rounded-lg overflow-hidden border-2 border-green-500">
                <Image
                  src="/images/coyslogo.jpg"
                  alt="Logademy Logo"
                  fill
                  className="object-contain bg-slate-800"
                />
              </div>
              <span className="text-xl font-bold text-white">COYS <span className="text-green-400">LOGISTICS</span></span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    item.href === '/academy' 
                      ? 'text-green-400' 
                      : 'text-gray-300 hover:text-green-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30"
              >
                Enroll Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-slate-800 border-t border-slate-700"
          >
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-gray-300 hover:text-green-400 hover:bg-slate-700 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block text-center bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-semibold mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Enroll Now
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section with Image Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/warehouse-1.jpg"
            alt="Dispatch Academy Training"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
              <FaGraduationCap className="text-green-400" />
              <span className="text-green-400 font-medium">Professional Training Program</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              COYS DISPATCH
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-orange-400">
                ACADEMY
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Transform your career with comprehensive truck dispatcher training. 
              Learn from industry experts and start earning within weeks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-xl shadow-green-500/30 transform hover:scale-105"
              >
                <FaGraduationCap className="mr-2" />
                Start Your Training
              </Link>
              <Link
                href="tel:+1234567890"
                className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
              >
                <FaPhone className="mr-2" />
                Call for Info
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: '500+', label: 'Graduates' },
                { value: '95%', label: 'Placement Rate' },
                { value: '8 Weeks', label: 'Program Length' },
                { value: '$75K+', label: 'Avg First Year Earnings' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
                >
                  <div className="text-3xl md:text-4xl font-bold text-green-400">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="text-green-400">Coys Academy</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our comprehensive training program sets you up for success in the trucking industry
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {academyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-3xl group"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-8 min-h-[300px] flex flex-col justify-end">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-24 bg-slate-800 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/truck-highway-2.jpg"
            alt="Highway Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-slate-800/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              8-Week <span className="text-green-400">Curriculum</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A structured path from beginner to professional dispatcher
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {curriculumModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-green-500/50 transition-all"
              >
                <div className="inline-flex items-center space-x-2 bg-green-500/20 rounded-full px-4 py-1 mb-4">
                  <span className="text-green-400 font-semibold">{module.week}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{module.title}</h3>
                <ul className="space-y-3">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start space-x-3">
                      <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{topic}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Success <span className="text-green-400">Stories</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Hear from our graduates who transformed their careers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-3xl"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/70" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-8 min-h-[300px] flex flex-col justify-end">
                  <p className="text-xl text-white mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-green-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/truck-highway-1.jpg"
            alt="Start Your Journey"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-slate-900/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Join the next cohort of Coys Dispatch Academy and start your journey to financial freedom
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl transform hover:scale-105"
              >
                <FaGraduationCap className="mr-2" />
                Apply Now
              </Link>
              <Link
                href="/mentorship"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
              >
                Learn About Mentorship
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-4">
                <div className="relative w-16 h-10 rounded-lg overflow-hidden border-2 border-green-500">
                  <Image
                    src="/images/coyslogo.jpg"
                    alt="Logademy Logo"
                    fill
                    className="object-contain bg-slate-800"
                  />
                </div>
                <span className="text-xl font-bold text-white">COYS <span className="text-green-400">LOGISTICS</span></span>
              </Link>
              <p className="text-gray-400 mb-4">
                Professional truck dispatcher training and mentorship. Building the next generation of logistics professionals.
              </p>
              <div className="flex items-center space-x-2 text-gray-400">
                <FaMapMarkerAlt className="text-green-400" />
                <span>Serving clients nationwide</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-green-400 transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-2">
                  <FaPhone className="text-green-400" />
                  <span>(XXX) XXX-XXXX</span>
                </li>
                <li>
                  <span>info@logademy.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Logademy. All rights reserved.
              </p>
              <div className="flex flex-col items-center space-y-1">
                <p className="text-gray-500 text-sm">Powered by</p>
                <div className="flex items-center space-x-4">
                  <a href="https://pitchmodularspaces.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                    Pitch Modular Spaces
                  </a>
                  <span className="text-gray-600">|</span>
                  <a href="https://pitchmarketingagency.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                    Pitch Marketing Agency
                  </a>
                </div>
                <p className="text-gray-600 text-xs">
                  A division of Pitch Market Strategies & Public Relations LLC
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
