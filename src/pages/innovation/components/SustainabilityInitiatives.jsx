import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SustainabilityInitiatives = () => {
  const initiatives = [
    {
      id: 1,
      title: "Green Building Expertise",
      description: "LEED-certified construction methods that exceed environmental standards while maintaining structural excellence.",
      icon: "Leaf",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=300&fit=crop",
      metrics: [
        { label: "Carbon Reduction", value: "45%" },
        { label: "Energy Efficiency", value: "60%" },
        { label: "LEED Projects", value: "120+" }
      ],
      features: [
        "Sustainable material sourcing and selection",
        "Energy-efficient building design integration",
        "Renewable energy system installation",
        "Water conservation and management systems"
      ]
    },
    {
      id: 2,
      title: "Waste Reduction Programs",
      description: "Comprehensive waste management strategies that minimize environmental impact through innovative recycling and reuse.",
      icon: "Recycle",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
      metrics: [
        { label: "Waste Diverted", value: "85%" },
        { label: "Material Reuse", value: "70%" },
        { label: "Recycling Rate", value: "95%" }
      ],
      features: [
        "On-site material sorting and processing",
        "Steel and metal recycling programs",
        "Construction debris repurposing",
        "Zero-waste-to-landfill initiatives"
      ]
    },
    {
      id: 3,
      title: "Energy-Efficient Methods",
      description: "Advanced construction techniques that optimize energy consumption throughout the building lifecycle.",
      icon: "Zap",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
      metrics: [
        { label: "Energy Savings", value: "40%" },
        { label: "Efficiency Gain", value: "55%" },
        { label: "Green Certifications", value: "25+" }
      ],
      features: [
        "Smart building automation systems",
        "High-performance insulation solutions",
        "LED lighting and smart controls",
        "HVAC optimization and monitoring"
      ]
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="industrial-container">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
              <Icon name="Leaf" size={24} className="text-white" />
            </div>
            <span className="font-mono text-success text-sm tracking-wider uppercase">
              Sustainability Leadership
            </span>
          </div>
          
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-primary mb-6">
            Environmental Excellence
            <span className="block text-success">Through Innovation</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Our commitment to sustainability drives every project decision, creating structures that 
            benefit both our clients and the environment for generations to come.
          </p>
        </div>

        <div className="space-y-16">
          {initiatives?.map((initiative, index) => (
            <div
              key={initiative?.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-success rounded-xl flex items-center justify-center">
                      <Icon name={initiative?.icon} size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-headline text-2xl lg:text-3xl font-bold text-primary">
                        {initiative?.title}
                      </h3>
                      <div className="w-16 h-1 bg-success rounded-full mt-2"></div>
                    </div>
                  </div>
                  
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {initiative?.description}
                  </p>
                  
                  <div className="space-y-3">
                    {initiative?.features?.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon name="Check" size={12} className="text-white" />
                        </div>
                        <span className="text-text-primary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-xl shadow-industrial">
                  {initiative?.metrics?.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-success mb-1">
                        {metric?.value}
                      </div>
                      <div className="text-sm text-text-secondary font-mono">
                        {metric?.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-success text-success hover:bg-success hover:text-white font-cta font-medium"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Explore {initiative?.title}
                </Button>
              </div>

              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <Image
                  src={initiative?.image}
                  alt={initiative?.title}
                  className="w-full h-[400px] object-cover rounded-2xl shadow-industrial-lg"
                />
                
                {/* Sustainability Badge */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-industrial">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                      <Icon name="Award" size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-primary">Certified</div>
                      <div className="text-sm text-text-secondary">Sustainable Practice</div>
                    </div>
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="absolute bottom-6 right-6 bg-success/95 backdrop-blur-sm p-3 rounded-lg shadow-industrial">
                  <div className="flex items-center space-x-2">
                    <Icon name="Leaf" size={16} className="text-white" />
                    <span className="text-sm font-medium text-white">Eco-Friendly</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-industrial-lg max-w-4xl mx-auto">
            <h3 className="font-headline text-2xl lg:text-3xl font-bold text-primary mb-4">
              Ready to Build Sustainably?
            </h3>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Partner with MCCT Industry to create environmentally responsible industrial structures 
              that exceed performance expectations while protecting our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                className="bg-success hover:bg-success/90 text-white font-cta font-semibold"
                iconName="Leaf"
                iconPosition="left"
              >
                Start Sustainable Project
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white font-cta font-medium"
                iconName="Download"
                iconPosition="left"
              >
                Download Sustainability Guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityInitiatives;