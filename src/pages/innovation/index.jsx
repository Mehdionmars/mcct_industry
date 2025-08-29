import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import InnovationHero from './components/InnovationHero';
import TechnologyShowcase from './components/TechnologyShowcase';
import SustainabilityInitiatives from './components/SustainabilityInitiatives';
import RDPartnerships from './components/RDPartnerships';
import InteractiveTechDemo from './components/InteractiveTechDemo';
import FutureThinking from './components/FutureThinking';
import InnovationCaseStudies from './components/InnovationCaseStudies';

const Innovation = () => {
  return (
    <>
      <Helmet>
        <title>Innovation Laboratory - MCCT Industry | Advanced Construction Technologies</title>
        <meta 
          name="description" 
          content="Explore MCCT Industry's Innovation Laboratory featuring cutting-edge technologies, sustainable practices, R&D partnerships, and future-forward solutions that revolutionize industrial construction." 
        />
        <meta name="keywords" content="industrial construction innovation, advanced welding technology, 3D modeling BIM, drone monitoring, IoT construction, sustainable building, R&D partnerships, smart construction" />
        <meta property="og:title" content="Innovation Laboratory - MCCT Industry" />
        <meta property="og:description" content="Discover how MCCT Industry leads industrial construction innovation through advanced technologies, sustainability initiatives, and collaborative research partnerships." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/innovation" />
      </Helmet>
      <div className="min-h-screen bg-white">
        <Header />
        
        <main>
          <InnovationHero />
          <TechnologyShowcase />
          <SustainabilityInitiatives />
          <RDPartnerships />
          <InteractiveTechDemo />
          <InnovationCaseStudies />
          <FutureThinking />
        </main>

        {/* Footer */}
        <footer className="bg-primary text-white py-16">
          <div className="industrial-container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-headline text-xl font-bold">MCCT Industry</h3>
                    <p className="font-mono text-xs text-gray-300 tracking-wider">ENGINEERED EXCELLENCE</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Leading industrial construction through innovation, precision engineering, and sustainable practices that build tomorrow's infrastructure today.
                </p>
              </div>

              {/* Innovation Links */}
              <div className="space-y-4">
                <h4 className="font-headline text-lg font-bold">Innovation</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#technology" className="hover:text-accent transition-colors">Advanced Technologies</a></li>
                  <li><a href="#sustainability" className="hover:text-accent transition-colors">Sustainability</a></li>
                  <li><a href="#partnerships" className="hover:text-accent transition-colors">R&D Partnerships</a></li>
                  <li><a href="#case-studies" className="hover:text-accent transition-colors">Case Studies</a></li>
                </ul>
              </div>

              {/* Research Areas */}
              <div className="space-y-4">
                <h4 className="font-headline text-lg font-bold">Research Focus</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#materials" className="hover:text-accent transition-colors">Advanced Materials</a></li>
                  <li><a href="#automation" className="hover:text-accent transition-colors">Automation & Robotics</a></li>
                  <li><a href="#digital-twin" className="hover:text-accent transition-colors">Digital Twin Technology</a></li>
                  <li><a href="#green-building" className="hover:text-accent transition-colors">Green Building</a></li>
                </ul>
              </div>

              {/* Contact Innovation Team */}
              <div className="space-y-4">
                <h4 className="font-headline text-lg font-bold">Innovation Team</h4>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <span className="text-accent">📧</span>
                    <span>innovation@mcct-industry.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-accent">📞</span>
                    <span>+33 1 23 45 67 89</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-accent">🔬</span>
                    <span>R&D Lab Tours Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date()?.getFullYear()} MCCT Industry. All rights reserved. | Innovation drives excellence.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/privacy" className="text-gray-400 hover:text-accent text-sm transition-colors">Privacy Policy</a>
                <a href="/terms" className="text-gray-400 hover:text-accent text-sm transition-colors">Terms of Service</a>
                <a href="/innovation-ethics" className="text-gray-400 hover:text-accent text-sm transition-colors">Innovation Ethics</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Innovation;