import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Accueil', path: '/homepage', icon: 'Home' },
    { name: 'Nos Services', path: '/services', icon: 'Settings' },
    { name: 'Nos Projets', path: '/projects', icon: 'Building' },
    { name: 'À Propos', path: '/about', icon: 'Users' },
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
<header className="sticky top-0 z-50">
  {/* Top Info Bar */}
 <div className="bg-white text-gray-800 text-xs sm:text-xs lg:text-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 flex flex-wrap lg:flex-nowrap justify-center lg:justify-end items-center min-h-8 lg:h-10 gap-1 sm:gap-2 lg:gap-6 py-1 lg:py-0">
            <span className="flex items-center gap-1 text-center">📍 Casablanca</span>
            <span className="flex items-center gap-1">📞 +212 661 49 47 61</span>
            <span className="hidden md:flex items-center gap-1">🏢 13, Rue Ahmed El Majjati, Res Les Alpes</span>
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
<a href="/contact">
  <Button 
    variant="default" 
    className="bg-accent hover:bg-accent/90" 
    iconName="MessageSquare" 
    iconPosition="left"
  >
    Demander un devis
  </Button>
</a>
                <div className="text-sm text-text-secondary text-center">
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
