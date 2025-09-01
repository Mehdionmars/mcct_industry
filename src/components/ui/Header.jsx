import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Services', path: '/services', icon: 'Settings' },
    { name: 'Projects', path: '/projects', icon: 'Building' },
    { name: 'About', path: '/about', icon: 'Users' },
  ];

  const secondaryItems = [
    { name: 'Contact', path: '/contact', icon: 'Phone' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
<header className="fixed top-0 left-0 right-0 z-50">
  {/* Top Info Bar */}
  <div className="bg-white text-text-primary text-xs lg:text-sm border-b border-gray-200">
    <div className="industrial-container flex justify-end items-center h-8 lg:h-10 space-x-6">
      <span>📍 Casablanca, Maroc</span>
      <span>📞 +212 555 123 456</span>
      <span>🏢 123 Rue Exemple, Casablanca</span>
    </div>
  </div>


      {/* Main Header */}
      <div 
        className={`transition-all duration-300 industrial-transition ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-industrial border-b border-gray-200' 
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="industrial-container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link
                to="/homepage"
                className="flex items-center space-x-3 industrial-hover"
                onClick={closeMenu}
              >
                <div className="relative">
                  <img
                    src="/logo.svg"
                    alt="MCCT Industry Logo"
                    className="w-14 h-14 lg:w-20 lg:h-20 object-contain "
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`relative px-4 py-2 rounded-md font-cta font-medium text-sm transition-all duration-200 industrial-transition group ${
                    isActivePath(item?.path)
                      ? 'text-accent bg-accent/10' :'text-text-primary hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.name}</span>
                  </span>
                  {isActivePath(item?.path) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA & Contact */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/contact"
                className="text-text-secondary hover:text-primary industrial-transition flex items-center space-x-1"
              >
                <Icon name="Phone" size={16} />
                <span className="font-cta text-sm font-medium">Contact</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-text-primary hover:text-accent hover:bg-accent/5 industrial-transition"
                aria-label="Toggle menu"
              >
                <Icon 
                  name={isMenuOpen ? "X" : "Menu"} 
                  size={24} 
                  className="transition-transform duration-200"
                />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div 
            className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              isMenuOpen 
                ? 'max-h-96 opacity-100 pb-6' :'max-h-0 opacity-0 pb-0'
            }`}
          >
            <nav className="pt-4 border-t border-gray-200">
              <div className="space-y-2">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-cta font-medium transition-all duration-200 industrial-transition ${
                      isActivePath(item?.path)
                        ? 'text-accent bg-accent/10 border-l-4 border-accent' :'text-text-primary hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.name}</span>
                    {isActivePath(item?.path) && (
                      <Icon name="ChevronRight" size={16} className="ml-auto text-accent" />
                    )}
                  </Link>
                ))}
                
                {secondaryItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-cta font-medium transition-all duration-200 industrial-transition ${
                      isActivePath(item?.path)
                        ? 'text-accent bg-accent/10 border-l-4 border-accent' :'text-text-primary hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile CTA Section */}
              <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
                <Button
                  variant="default"
                  fullWidth
                  className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold shadow-metallic"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Request Project Consultation
                </Button>
                
                <div className="text-center">
                  <p className="text-xs text-text-secondary font-mono tracking-wide">
                    EMERGENCY RESPONSE AVAILABLE 24/7
                  </p>
                  <p className="text-sm font-cta font-semibold text-success mt-1">
                    Call: (555) 123-4567
                  </p>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
