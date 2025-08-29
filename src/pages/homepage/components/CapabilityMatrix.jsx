import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CapabilityMatrix = () => {
  const [activeCapability, setActiveCapability] = useState(0);

  const capabilities = [
    {
      id: 1,
      title: "Structural Steel",
      subtitle: "Heavy Industrial Framework",
      description: "Complex steel framework installations for manufacturing facilities, warehouses, and industrial complexes with precision engineering.",
      icon: "Building",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
      sectors: ["Manufacturing", "Automotive", "Aerospace", "Energy"],
      specifications: [
        "Up to 5,000 tons capacity",
        "Advanced welding technologies",
        "Seismic-resistant design",
        "Corrosion protection systems"
      ],
      projects: "150+ completed",
      safety: "Zero incidents in 2024"
    },
    {
      id: 2,
      title: "Industrial Fabrication",
      subtitle: "Precision Manufacturing",
      description: "Custom metallic fabrication services including specialized equipment housings, conveyor systems, and industrial machinery components.",
      icon: "Settings",
      image: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?w=600&h=400&fit=crop",
      sectors: ["Chemical", "Pharmaceutical", "Food Processing", "Mining"],
      specifications: [
        "CNC precision cutting",
        "Multi-axis machining",
        "Quality control systems",
        "Custom alloy solutions"
      ],
      projects: "200+ fabrications",
      safety: "ISO 9001 certified"
    },
    {
      id: 3,
      title: "Plant Construction",
      subtitle: "Complete Facility Development",
      description: "End-to-end plant construction services from foundation to commissioning, specializing in industrial and manufacturing facilities.",
      icon: "Factory",
      image: "https://images.pixabay.com/photo/2016/11/29/06/15/adult-1867743_1280.jpg?w=600&h=400&fit=crop",
      sectors: ["Power Generation", "Petrochemical", "Water Treatment", "Renewable Energy"],
      specifications: [
        "Turnkey project delivery",
        "Multi-disciplinary teams",
        "Advanced project management",
        "Environmental compliance"
      ],
      projects: "75+ facilities",
      safety: "OHSAS 18001 certified"
    },
    {
      id: 4,
      title: "Maintenance Services",
      subtitle: "24/7 Industrial Support",
      description: "Comprehensive maintenance and repair services ensuring optimal performance and extended lifecycle of industrial metallic structures.",
      icon: "Wrench",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
      sectors: ["All Industrial Sectors", "Emergency Response", "Preventive Care", "Upgrades"],
      specifications: [
        "24/7 emergency response",
        "Predictive maintenance",
        "Structural health monitoring",
        "Retrofit and upgrades"
      ],
      projects: "500+ maintenance contracts",
      safety: "Emergency certified"
    }
  ];

  const activeData = capabilities?.[activeCapability];

  return (
    <section className="py-20 bg-surface">
      <div className="industrial-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-4 py-2 mb-6">
            <Icon name="Zap" size={16} className="text-accent" />
            <span className="font-cta text-sm font-medium text-accent uppercase tracking-wide">
              Technical Expertise
            </span>
          </div>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-primary mb-6">
            Industrial Capability Matrix
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive technical expertise across different industrial sectors. 
            Each capability represents years of specialized experience and proven project success.
          </p>
        </div>

        {/* Interactive Matrix */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Capability Selector */}
          <div className="space-y-4">
            {capabilities?.map((capability, index) => (
              <div
                key={capability?.id}
                className={`group cursor-pointer transition-all duration-300 ${
                  activeCapability === index 
                    ? 'transform scale-105' 
                    : 'hover:transform hover:scale-102'
                }`}
                onClick={() => setActiveCapability(index)}
              >
                <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  activeCapability === index
                    ? 'bg-white border-accent shadow-industrial-lg'
                    : 'bg-white/50 border-gray-200 hover:border-accent/50 hover:shadow-industrial'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg transition-all duration-300 ${
                      activeCapability === index
                        ? 'bg-accent text-white' :'bg-gray-100 text-primary group-hover:bg-accent/10 group-hover:text-accent'
                    }`}>
                      <Icon name={capability?.icon} size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-headline text-xl font-bold text-primary mb-2">
                        {capability?.title}
                      </h3>
                      <p className="font-cta text-sm font-medium text-accent mb-2">
                        {capability?.subtitle}
                      </p>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {capability?.description}
                      </p>
                    </div>
                    <div className={`transition-all duration-300 ${
                      activeCapability === index ? 'text-accent' : 'text-gray-400'
                    }`}>
                      <Icon name="ChevronRight" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Detailed View */}
          <div className="bg-white rounded-2xl shadow-industrial-lg overflow-hidden">
            {/* Image Header */}
            <div className="relative h-64">
              <Image
                src={activeData?.image}
                alt={activeData?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6">
                <h3 className="font-headline text-2xl font-bold text-white mb-2">
                  {activeData?.title}
                </h3>
                <p className="text-white/90 font-cta">
                  {activeData?.subtitle}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Sectors */}
              <div className="mb-6">
                <h4 className="font-headline text-lg font-bold text-primary mb-3">
                  Industrial Sectors
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeData?.sectors?.map((sector, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-cta font-medium"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="mb-6">
                <h4 className="font-headline text-lg font-bold text-primary mb-3">
                  Technical Specifications
                </h4>
                <div className="space-y-2">
                  {activeData?.specifications?.map((spec, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                      <span className="text-text-secondary text-sm">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-surface rounded-lg p-4 text-center">
                  <div className="font-headline text-2xl font-bold text-accent mb-1">
                    {activeData?.projects}
                  </div>
                  <div className="font-cta text-xs text-text-secondary uppercase tracking-wide">
                    Projects Completed
                  </div>
                </div>
                <div className="bg-surface rounded-lg p-4 text-center">
                  <div className="font-headline text-lg font-bold text-success mb-1">
                    {activeData?.safety}
                  </div>
                  <div className="font-cta text-xs text-text-secondary uppercase tracking-wide">
                    Safety Record
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link to="/services">
                <button className="w-full bg-accent hover:bg-accent/90 text-white font-cta font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
                  <span>Explore {activeData?.title} Services</span>
                  <Icon name="ArrowRight" size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-industrial p-8 max-w-4xl mx-auto">
            <h3 className="font-headline text-2xl font-bold text-primary mb-4">
              Need a Custom Industrial Solution?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Our engineering team specializes in developing tailored solutions for unique industrial challenges. 
              Let's discuss your specific requirements and technical specifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <button className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <Icon name="MessageSquare" size={16} />
                  <span>Discuss Your Project</span>
                </button>
              </Link>
              <Link to="/services">
                <button className="border-2 border-accent text-accent hover:bg-accent hover:text-white font-cta font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <Icon name="FileText" size={16} />
                  <span>View All Services</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilityMatrix;