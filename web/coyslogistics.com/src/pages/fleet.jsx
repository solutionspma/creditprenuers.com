import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTruck, FaRoute, FaClipboardCheck, FaCogs, FaChartLine, FaShieldAlt, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaUsers, FaDollarSign, FaHeadset, FaBars, FaTimes, FaGasPump, FaTools, FaFileContract } from 'react-icons/fa';

export default function Fleet() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Mentorship', href: '/mentorship' },
    { name: 'Academy', href: '/academy' },
    { name: 'Fleet', href: '/fleet' },
    { name: 'Contact', href: '/contact' },
  ];

  const fleetServices = [
    {
      icon: <FaRoute className="w-8 h-8 text-green-400" />,
      title: 'Dispatch Management',
      description: 'Full-service dispatch operations including load booking, rate negotiation, and driver coordination.',
      image: '/images/truck-highway-1.jpg'
    },
    {
      icon: <FaClipboardCheck className="w-8 h-8 text-green-400" />,
      title: 'Compliance & Documentation',
      description: 'DOT compliance monitoring, ELD management, and complete documentation handling.',
      image: '/images/warehouse-1.jpg'
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-green-400" />,
      title: 'Revenue Optimization',
      description: 'Strategic load planning to maximize your revenue per mile and minimize deadhead.',
      image: '/images/truck-delivery-1.jpg'
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-green-400" />,
      title: 'Risk Management',
      description: 'Insurance coordination, safety protocols, and proactive risk mitigation strategies.',
      image: '/images/truck-highway-2.jpg'
    }
  ];

  const managementFeatures = [
    {
      icon: <FaGasPump className="w-6 h-6 text-green-400" />,
      title: 'Fuel Card Management',
      description: 'Optimized fuel purchasing with discounts and real-time tracking'
    },
    {
      icon: <FaTools className="w-6 h-6 text-green-400" />,
      title: 'Maintenance Scheduling',
      description: 'Preventive maintenance programs to keep your fleet running'
    },
    {
      icon: <FaFileContract className="w-6 h-6 text-green-400" />,
      title: 'Contract Negotiation',
      description: 'Securing the best rates and terms with shippers and brokers'
    },
    {
      icon: <FaHeadset className="w-6 h-6 text-green-400" />,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for drivers and emergencies'
    },
    {
      icon: <FaDollarSign className="w-6 h-6 text-green-400" />,
      title: 'Factoring Services',
      description: 'Quick payment solutions to maintain healthy cash flow'
    },
    {
      icon: <FaUsers className="w-6 h-6 text-green-400" />,
      title: 'Driver Recruiting',
      description: 'Assistance finding and retaining quality drivers'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter Fleet',
      trucks: '1-5 Trucks',
      price: 'Custom',
      features: [
        'Full dispatch services',
        'Load board access',
        'Basic compliance support',
        'Weekly reporting',
        'Email support'
      ]
    },
    {
      name: 'Growing Fleet',
      trucks: '6-15 Trucks',
      price: 'Custom',
      featured: true,
      features: [
        'Everything in Starter',
        'Dedicated dispatcher',
        'Advanced analytics',
        'Fuel optimization',
        '24/7 phone support',
        'Maintenance coordination'
      ]
    },
    {
      name: 'Enterprise Fleet',
      trucks: '16+ Trucks',
      price: 'Custom',
      features: [
        'Everything in Growing',
        'Account manager',
        'Custom integrations',
        'Driver recruiting',
        'Strategic planning',
        'Priority support'
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Fleet Management | Logademy - Professional Fleet Solutions</title>
        <meta name="description" content="Comprehensive fleet management services from Logademy. Dispatch, compliance, revenue optimization, and 24/7 support for trucking companies of all sizes." />
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
                    item.href === '/fleet' 
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
                Get Started
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
                Get Started
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
            src="/images/truck-highway-2.jpg"
            alt="Fleet Management Solutions"
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
              <FaTruck className="text-green-400" />
              <span className="text-green-400 font-medium">Professional Fleet Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              FLEET
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-orange-400">
                MANAGEMENT
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Comprehensive fleet management solutions to maximize your efficiency, 
              revenue, and peace of mind. Let us handle the operations while you grow your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-xl shadow-green-500/30 transform hover:scale-105"
              >
                <FaTruck className="mr-2" />
                Request a Quote
              </Link>
              <Link
                href="tel:+1234567890"
                className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
              >
                <FaPhone className="mr-2" />
                Call Us Today
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: '200+', label: 'Trucks Managed' },
                { value: '98%', label: 'Client Retention' },
                { value: '15%', label: 'Avg Revenue Increase' },
                { value: '24/7', label: 'Support Available' }
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

      {/* Services Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Our Fleet <span className="text-green-400">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Complete fleet management solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {fleetServices.map((service, index) => (
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
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-8 min-h-[300px] flex flex-col justify-end">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-24 bg-slate-800 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/warehouse-2.jpg"
            alt="Warehouse Background"
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
              Complete Fleet <span className="text-green-400">Support</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to run a successful trucking operation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-green-500/50 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-500/20 rounded-xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Flexible <span className="text-green-400">Pricing</span> Plans
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Scalable solutions that grow with your fleet
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-3xl p-8 ${
                  plan.featured 
                    ? 'bg-gradient-to-b from-green-900/50 to-slate-900 border-2 border-green-500' 
                    : 'bg-slate-800 border border-slate-700'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-green-400 font-semibold">{plan.trucks}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <FaCheckCircle className="text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/contact"
                  className={`block text-center py-3 rounded-full font-semibold transition-all ${
                    plan.featured
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-800 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/truck-delivery-3.jpg"
            alt="Truck Delivery"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-slate-800/95" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              How It <span className="text-green-400">Works</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Getting started with Coys Fleet Management is simple
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Consultation', description: 'Free assessment of your fleet and operations' },
              { step: '2', title: 'Custom Plan', description: 'Tailored management solution for your needs' },
              { step: '3', title: 'Onboarding', description: 'Seamless transition to our management system' },
              { step: '4', title: 'Growth', description: 'Watch your revenue and efficiency improve' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg shadow-green-500/30">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
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
            alt="Start Managing Your Fleet"
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
              Ready to Optimize Your Fleet?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Let Logademy handle the details so you can focus on growing your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl transform hover:scale-105"
              >
                <FaTruck className="mr-2" />
                Get Your Free Quote
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
                Professional fleet management and dispatch services. Maximizing efficiency and profitability for trucking companies nationwide.
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
