import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroProjects = [
    {
      id: 1,
      title: "Advanced Manufacturing Complex",
      subtitle: "Precision Steel Framework Installation",
      description: "3,500 tons of structural steel for automotive manufacturing facility with zero safety incidents",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop",
      metrics: {
        tonnage: "3,500",
        timeline: "8 months",
        safety: "Zero incidents"
      },
      category: "Manufacturing"
    },
    {
      id: 2,
      title: "Industrial Plant Expansion",
      subtitle: "Complex Structural Engineering",
      description: "Multi-phase expansion project featuring advanced welding technologies and sustainable materials",
      image: "https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg?w=1200&h=800&fit=crop",
      metrics: {
        tonnage: "2,800",
        timeline: "12 months",
        safety: "OHSAS certified"
      },
      category: "Industrial"
    },
    {
      id: 3,
      title: "Energy Infrastructure Project",
      subtitle: "Critical Infrastructure Development",
      description: "High-precision metallic construction for renewable energy facility with advanced corrosion protection",
      image: "https://images.pixabay.com/photo/2017/08/10/02/05/tiles-shapes-2617112_1280.jpg?w=1200&h=800&fit=crop",
      metrics: {
        tonnage: "4,200",
        timeline: "10 months",
        safety: "ISO 9001"
      },
      category: "Energy"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProjects?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroProjects?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroProjects?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroProjects?.length) % heroProjects?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentProject = heroProjects?.[currentSlide];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src={currentProject?.image}
            alt={currentProject?.title}
            className="w-full h-full object-cover transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
        </div>
      </div>
      {/* Content Container */}
      <div className="relative z-10 industrial-container min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-20">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Category Badge */}
            <div className="inline-flex items-center space-x-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2">
              <Icon name="Building" size={16} className="text-accent" />
              <span className="font-cta text-sm font-medium text-accent">
                {currentProject?.category} Excellence
              </span>
            </div>

            {/* Main Headlines */}
            <div className="space-y-4">
              <h1 className="font-headline text-4xl lg:text-6xl font-bold leading-tight">
                {currentProject?.title}
              </h1>
              <h2 className="font-headline text-xl lg:text-2xl font-medium text-white/90">
                {currentProject?.subtitle}
              </h2>
              <p className="text-lg text-white/80 max-w-xl leading-relaxed">
                {currentProject?.description}
              </p>
            </div>

            {/* Project Metrics */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center lg:text-left">
                <div className="font-headline text-2xl lg:text-3xl font-bold text-accent">
                  {currentProject?.metrics?.tonnage}
                </div>
                <div className="font-cta text-sm text-white/70 uppercase tracking-wide">
                  Tons Steel
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-headline text-2xl lg:text-3xl font-bold text-accent">
                  {currentProject?.metrics?.timeline}
                </div>
                <div className="font-cta text-sm text-white/70 uppercase tracking-wide">
                  Completion
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-headline text-2xl lg:text-3xl font-bold text-success">
                  100%
                </div>
                <div className="font-cta text-sm text-white/70 uppercase tracking-wide">
                  Safety Record
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/projects">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold shadow-industrial-lg w-full sm:w-auto"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Explore Our Projects
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 font-cta font-medium w-full sm:w-auto"
                  iconName="Phone"
                  iconPosition="left"
                >
                  Get Consultation
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-success" />
                <span className="font-cta text-sm text-white/80">ISO 9001 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={20} className="text-success" />
                <span className="font-cta text-sm text-white/80">OHSAS 18001</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} className="text-accent" />
                <span className="font-cta text-sm text-white/80">24/7 Emergency</span>
              </div>
            </div>
          </div>

          {/* Right Content - Project Showcase */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main Project Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-industrial-lg">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline text-xl font-bold text-white">
                      Project Highlights
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="font-cta text-sm text-success">Active Project</span>
                    </div>
                  </div>

                  {/* Technical Specifications */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Zap" size={16} className="text-accent" />
                        <span className="font-cta text-sm text-white/70">Welding Tech</span>
                      </div>
                      <div className="font-headline text-lg font-bold text-white">
                        Advanced MIG/TIG
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Shield" size={16} className="text-success" />
                        <span className="font-cta text-sm text-white/70">Safety Rating</span>
                      </div>
                      <div className="font-headline text-lg font-bold text-success">
                        Zero Incidents
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-cta text-sm text-white/70">Project Progress</span>
                      <span className="font-cta text-sm font-medium text-white">85%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full transition-all duration-1000" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 bg-accent rounded-xl p-4 shadow-industrial">
                <div className="text-center">
                  <div className="font-headline text-2xl font-bold text-white">15+</div>
                  <div className="font-cta text-xs text-white/90 uppercase tracking-wide">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {heroProjects?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-accent scale-125' :'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex space-x-2 ml-6">
            <button
              onClick={prevSlide}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
              aria-label="Previous slide"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
              aria-label="Next slide"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="flex flex-col items-center space-y-2 text-white/60">
          <span className="font-cta text-xs uppercase tracking-wide transform rotate-90 origin-center">
            Scroll
          </span>
          <div className="w-px h-8 bg-white/30">
            <div className="w-px h-4 bg-accent animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;