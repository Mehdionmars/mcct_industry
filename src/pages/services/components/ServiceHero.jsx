import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-primary/90 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative industrial-container py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <Icon name="Settings" size={20} className="text-accent" />
            <span className="font-cta font-medium text-sm tracking-wide">SERVICE MASTERY PAVILION</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-headline text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Comprehensive Industrial
            <span className="block text-accent">Construction Services</span>
          </h1>

          {/* Subheading */}
          <p className="font-body text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            From structural steel erection to emergency repairs, our technical mastery transforms complex industrial challenges into engineered excellence.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-headline font-bold text-accent mb-2">500+</div>
              <div className="text-sm font-cta text-white/80 tracking-wide">PROJECTS COMPLETED</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-headline font-bold text-accent mb-2">25+</div>
              <div className="text-sm font-cta text-white/80 tracking-wide">YEARS EXPERIENCE</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-headline font-bold text-accent mb-2">100%</div>
              <div className="text-sm font-cta text-white/80 tracking-wide">SAFETY RECORD</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-headline font-bold text-accent mb-2">24/7</div>
              <div className="text-sm font-cta text-white/80 tracking-wide">EMERGENCY SUPPORT</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="default"
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold shadow-industrial-lg"
              iconName="Calculator"
              iconPosition="left"
            >
              Capability Assessment Tool
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary font-cta font-medium"
              iconName="Download"
              iconPosition="left"
            >
              Download Service Guide
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-12 lg:h-20">
          <path d="M0,120 L0,60 Q300,0 600,60 T1200,60 L1200,120 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default ServiceHero;