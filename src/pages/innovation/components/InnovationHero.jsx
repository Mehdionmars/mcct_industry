import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InnovationHero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white rotate-12"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 border-2 border-accent rotate-45"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-accent rotate-12"></div>
      </div>

      <div className="relative industrial-container pt-24 lg:pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Lightbulb" size={24} className="text-white" />
                </div>
                <span className="font-mono text-accent text-sm tracking-wider uppercase">
                  Innovation Laboratory
                </span>
              </div>
              
              <h1 className="font-headline text-4xl lg:text-6xl font-bold text-white leading-tight">
                Engineering Tomorrow's
                <span className="block text-accent">Industrial Future</span>
              </h1>
              
              <p className="text-xl text-gray-200 leading-relaxed max-w-2xl">
                At MCCT Industry, innovation isn't just a buzzword—it's the foundation of everything we build. 
                Our Innovation Laboratory drives cutting-edge solutions that redefine industrial construction standards.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold shadow-industrial-lg"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Explore Technologies
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary font-cta font-medium"
                iconName="Play"
                iconPosition="left"
              >
                Watch Innovation Story
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">50+</div>
                <div className="text-sm text-gray-300 font-mono">R&D Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">15</div>
                <div className="text-sm text-gray-300 font-mono">Tech Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">98%</div>
                <div className="text-sm text-gray-300 font-mono">Efficiency Gain</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=700&fit=crop"
                alt="Advanced industrial technology and innovation"
                className="w-full h-[500px] object-cover rounded-2xl shadow-industrial-lg"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-industrial">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary">AI-Powered</div>
                    <div className="text-sm text-text-secondary">Project Analysis</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-industrial">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <Icon name="Cpu" size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary">IoT Integration</div>
                    <div className="text-sm text-text-secondary">Smart Monitoring</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-3xl transform scale-110"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-white" />
      </div>
    </section>
  );
};

export default InnovationHero;