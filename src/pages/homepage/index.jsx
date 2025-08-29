import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import CapabilityMatrix from './components/CapabilityMatrix';
import EngineeredTrustSection from './components/EngineeredTrustSection';
import TestimonialCarousel from './components/TestimonialCarousel';
import InnovationSpotlight from './components/InnovationSpotlight';
import EmergencyContactSection from './components/EmergencyContactSection';

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>MCCT Industry - Engineered Excellence in Industrial Construction</title>
        <meta name="description" content="Leading metallic industrial construction authority specializing in structural steel, plant construction, and advanced welding technologies. 15+ years of zero-incident safety record." />
        <meta name="keywords" content="industrial construction, structural steel, metallic fabrication, plant construction, welding technologies, MCCT Industry" />
        <meta property="og:title" content="MCCT Industry - Engineered Excellence in Industrial Construction" />
        <meta property="og:description" content="Your trusted partner for complex industrial construction projects with proven expertise in structural steel and advanced manufacturing facilities." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/homepage" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16 lg:pt-20">
          {/* Hero Section with Dynamic Project Showcase */}
          <HeroSection />
          
          {/* Interactive Capability Matrix */}
          <CapabilityMatrix />
          
          {/* Engineered Trust - Safety & Quality Metrics */}
          <EngineeredTrustSection />
          
          {/* Client Testimonial Carousel */}
          <TestimonialCarousel />
          
          {/* Innovation Spotlight */}
          <InnovationSpotlight />
          
          {/* Emergency Contact Section */}
          <EmergencyContactSection />
        </main>

        {/* Footer */}
        <footer className="bg-primary text-white py-16">
          <div className="industrial-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-warning rounded-lg flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-headline text-2xl font-bold">MCCT Industry</h3>
                    <p className="font-mono text-xs text-white/70 tracking-wider">ENGINEERED EXCELLENCE</p>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed mb-6 max-w-md">
                  Leading the future of industrial metallic construction with precision engineering, 
                  unwavering safety standards, and innovative solutions for complex infrastructure projects.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-success text-sm font-cta font-medium">24/7 Emergency Available</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-headline text-lg font-bold mb-4">Services</h4>
                <ul className="space-y-2 text-white/80">
                  <li><a href="/services" className="hover:text-accent transition-colors">Structural Steel</a></li>
                  <li><a href="/services" className="hover:text-accent transition-colors">Industrial Fabrication</a></li>
                  <li><a href="/services" className="hover:text-accent transition-colors">Plant Construction</a></li>
                  <li><a href="/services" className="hover:text-accent transition-colors">Maintenance Services</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-headline text-lg font-bold mb-4">Contact</h4>
                <div className="space-y-3 text-white/80">
                  <div className="flex items-center space-x-2">
                    <span className="text-accent">📞</span>
                    <span className="text-sm">+33 1 42 86 15 30</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-error">🚨</span>
                    <span className="text-sm font-medium text-error">Emergency: +33 1 42 86 24 7</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-accent">✉️</span>
                    <span className="text-sm">contact@mcct-industry.fr</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-accent">📍</span>
                    <span className="text-sm">Paris, Île-de-France</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-white/60 text-sm">
                © {new Date()?.getFullYear()} MCCT Industry. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <span className="text-white/60 text-sm">ISO 9001 • OHSAS 18001 • EN 1090</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;