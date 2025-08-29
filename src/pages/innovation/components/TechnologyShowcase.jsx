import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TechnologyShowcase = () => {
  const [activeTab, setActiveTab] = useState('welding');

  const technologies = {
    welding: {
      title: "Advanced Welding Technologies",
      description: "Revolutionary welding systems that deliver unprecedented precision and strength in metallic construction.",
      features: [
        "Robotic welding systems with AI-guided precision",
        "Laser welding for micro-precision applications",
        "Underwater welding capabilities for marine projects",
        "Real-time quality monitoring and adjustment"
      ],
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop",
      stats: { accuracy: "99.8%", speed: "3x Faster", quality: "Zero Defects" }
    },
    modeling: {
      title: "3D Modeling & BIM Integration",
      description: "Cutting-edge Building Information Modeling that transforms project visualization and execution.",
      features: [
        "4D construction sequencing and timeline modeling",
        "Virtual reality project walkthroughs",
        "Clash detection and resolution automation",
        "Real-time collaboration across global teams"
      ],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      stats: { efficiency: "40% Faster", errors: "85% Reduction", collaboration: "Global Teams" }
    },
    monitoring: {
      title: "Drone-Assisted Project Monitoring",
      description: "Autonomous aerial monitoring systems that provide real-time project insights and safety oversight.",
      features: [
        "Autonomous flight path planning and execution",
        "Thermal imaging for structural analysis",
        "Progress tracking with AI-powered comparison",
        "Safety compliance monitoring and alerts"
      ],
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=400&fit=crop",
      stats: { coverage: "100% Site", frequency: "Daily Updates", safety: "Zero Incidents" }
    },
    iot: {
      title: "IoT & Smart Construction",
      description: "Internet of Things integration that creates intelligent construction sites with predictive capabilities.",
      features: [
        "Smart sensors for structural health monitoring",
        "Predictive maintenance algorithms",
        "Environmental condition tracking",
        "Equipment performance optimization"
      ],
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
      stats: { sensors: "1000+ Active", uptime: "99.9%", prediction: "30 Days Ahead" }
    }
  };

  const tabs = [
    { id: 'welding', label: 'Advanced Welding', icon: 'Zap' },
    { id: 'modeling', label: '3D Modeling', icon: 'Box' },
    { id: 'monitoring', label: 'Drone Monitoring', icon: 'Plane' },
    { id: 'iot', label: 'IoT Integration', icon: 'Wifi' }
  ];

  const currentTech = technologies?.[activeTab];

  return (
    <section className="py-20 bg-white">
      <div className="industrial-container">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
              <Icon name="Cpu" size={24} className="text-white" />
            </div>
            <span className="font-mono text-accent text-sm tracking-wider uppercase">
              Technology Showcase
            </span>
          </div>
          
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-primary mb-6">
            Cutting-Edge Technologies
            <span className="block text-accent">Driving Innovation</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Explore our advanced technology stack that revolutionizes industrial construction 
            through precision, efficiency, and intelligent automation.
          </p>
        </div>

        {/* Technology Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-cta font-medium transition-all duration-300 industrial-transition ${
                activeTab === tab?.id
                  ? 'bg-accent text-white shadow-industrial'
                  : 'bg-surface text-text-primary hover:bg-accent/10 hover:text-accent'
              }`}
            >
              <Icon name={tab?.icon} size={20} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Technology Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="font-headline text-3xl font-bold text-primary">
                {currentTech?.title}
              </h3>
              
              <p className="text-lg text-text-secondary leading-relaxed">
                {currentTech?.description}
              </p>
              
              <div className="space-y-4">
                {currentTech?.features?.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={14} className="text-white" />
                    </div>
                    <span className="text-text-primary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 p-6 bg-surface rounded-xl">
              {Object.entries(currentTech?.stats)?.map(([key, value], index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-accent mb-1">{value}</div>
                  <div className="text-sm text-text-secondary font-mono capitalize">{key}</div>
                </div>
              ))}
            </div>

            <Button
              variant="default"
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-cta font-semibold"
              iconName="ExternalLink"
              iconPosition="right"
            >
              Learn More About This Technology
            </Button>
          </div>

          <div className="relative">
            <Image
              src={currentTech?.image}
              alt={currentTech?.title}
              className="w-full h-[500px] object-cover rounded-2xl shadow-industrial-lg"
            />
            
            {/* Technology Badge */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-industrial">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name={tabs?.find(tab => tab?.id === activeTab)?.icon} size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-primary">Active Technology</div>
                  <div className="text-sm text-text-secondary">{tabs?.find(tab => tab?.id === activeTab)?.label}</div>
                </div>
              </div>
            </div>

            {/* Interactive Elements */}
            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-industrial">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary">Live Technology</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;