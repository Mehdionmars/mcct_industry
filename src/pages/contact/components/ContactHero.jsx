import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactHero = () => {
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
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Icon name="Phone" size={20} className="text-accent" />
            <span className="font-cta font-medium text-sm tracking-wide">PARTNERSHIP PORTAL</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-headline text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Let's Build Your
            <span className="block text-accent">Industrial Vision</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            From initial consultation to project completion, MCCT Industry is your trusted partner in metallic industrial construction excellence.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <Icon name="Clock" size={24} className="text-accent" />
              <span className="font-cta font-medium">24/7 Emergency Response</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <Icon name="Shield" size={24} className="text-accent" />
              <span className="font-cta font-medium">Safety First Approach</span>
            </div>
            <div className="flex items-center justify-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <Icon name="Award" size={24} className="text-accent" />
              <span className="font-cta font-medium">Certified Excellence</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              variant="default"
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold shadow-industrial-lg"
              iconName="ArrowDown"
              iconPosition="right"
            >
              Start Your Project
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary font-cta font-semibold"
              iconName="Phone"
              iconPosition="left"
            >
              Emergency: (555) 123-4567
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-sm text-white/70 mb-4 font-mono tracking-wide">TRUSTED BY INDUSTRY LEADERS</p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-2xl font-bold">500+</div>
              <div className="w-px h-8 bg-white/30"></div>
              <div className="text-2xl font-bold">25 Years</div>
              <div className="w-px h-8 bg-white/30"></div>
              <div className="text-2xl font-bold">Zero Incidents</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-accent/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-white/20 rotate-45"></div>
    </section>
  );
};

export default ContactHero;