import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const InnovationSpotlight = () => {
  const [activeInnovation, setActiveInnovation] = useState(0);

  const innovations = [
    {
      id: 1,
      title: "Advanced Welding Technologies",
      subtitle: "Precision MIG/TIG Systems",
      description: "State-of-the-art automated welding systems with real-time quality monitoring and adaptive control for superior joint integrity and consistency.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
      category: "Technology",
      impact: "40% faster welding with 99.8% quality consistency",
      features: [
        "Automated seam tracking",
        "Real-time penetration control",
        "Multi-pass optimization",
        "Quality documentation system"
      ],
      sustainability: "Reduced material waste by 25%",
      implementation: "2024 Q1"
    },
    {
      id: 2,
      title: "Sustainable Steel Solutions",
      subtitle: "Green Construction Initiative",
      description: "Revolutionary approach to industrial construction using recycled steel and carbon-neutral processes, reducing environmental impact while maintaining structural excellence.",
      image: "https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg?w=600&h=400&fit=crop",
      category: "Sustainability",
      impact: "60% reduction in carbon footprint",
      features: [
        "100% recycled steel content",
        "Carbon-neutral welding processes",
        "Renewable energy powered facilities",
        "Circular economy principles"
      ],
      sustainability: "Carbon negative by 2025",
      implementation: "Ongoing since 2023"
    },
    {
      id: 3,
      title: "Digital Twin Technology",
      subtitle: "Predictive Maintenance Systems",
      description: "Advanced IoT sensors and AI-powered analytics create digital replicas of structures, enabling predictive maintenance and optimized performance monitoring.",
      image: "https://images.pixabay.com/photo/2016/11/29/06/15/adult-1867743_1280.jpg?w=600&h=400&fit=crop",
      category: "Digital Innovation",
      impact: "85% reduction in unplanned downtime",
      features: [
        "Real-time structural monitoring",
        "Predictive failure analysis",
        "Automated maintenance scheduling",
        "Performance optimization algorithms"
      ],
      sustainability: "Extended structure lifespan by 30%",
      implementation: "2024 Q2"
    },
    {
      id: 4,
      title: "Modular Construction Systems",
      subtitle: "Rapid Assembly Solutions",
      description: "Innovative modular steel systems designed for rapid on-site assembly, reducing construction time and minimizing site disruption for industrial facilities.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
      category: "Efficiency",
      impact: "50% faster project completion",
      features: [
        "Pre-fabricated modular components",
        "Standardized connection systems",
        "Quality-controlled manufacturing",
        "Rapid on-site assembly"
      ],
      sustainability: "Reduced construction waste by 40%",
      implementation: "2024 Q3"
    }
  ];

  const activeData = innovations?.[activeInnovation];

  const sustainabilityMetrics = [
    {
      metric: "Carbon Footprint Reduction",
      value: "60%",
      icon: "Leaf",
      trend: "down"
    },
    {
      metric: "Material Waste Reduction",
      value: "35%",
      icon: "Recycle",
      trend: "down"
    },
    {
      metric: "Energy Efficiency Improvement",
      value: "45%",
      icon: "Zap",
      trend: "up"
    },
    {
      metric: "Recycled Content Usage",
      value: "85%",
      icon: "RotateCcw",
      trend: "up"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
      <div className="industrial-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Icon name="Lightbulb" size={16} className="text-primary" />
            <span className="font-cta text-sm font-medium text-primary uppercase tracking-wide">
              Innovation Laboratory
            </span>
          </div>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-primary mb-6">
            Engineering Tomorrow's Solutions
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            At MCCT Industry, innovation drives everything we do. From advanced welding technologies 
            to sustainable construction practices, we're pioneering the future of industrial metallic construction.
          </p>
        </div>

        {/* Innovation Showcase */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Innovation Selector */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {innovations?.map((innovation, index) => (
                <div
                  key={innovation?.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeInnovation === index ? 'transform scale-105' : 'hover:transform hover:scale-102'
                  }`}
                  onClick={() => setActiveInnovation(index)}
                >
                  <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    activeInnovation === index
                      ? 'bg-white border-primary shadow-industrial-lg'
                      : 'bg-white/70 border-gray-200 hover:border-primary/30 hover:shadow-industrial'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg transition-all duration-300 ${
                        activeInnovation === index
                          ? 'bg-primary text-white' :'bg-gray-100 text-primary'
                      }`}>
                        <Icon 
                          name={
                            innovation?.category === 'Technology' ? 'Zap' :
                            innovation?.category === 'Sustainability' ? 'Leaf' :
                            innovation?.category === 'Digital Innovation' ? 'Cpu' : 'Settings'
                          } 
                          size={20} 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-cta font-medium ${
                            innovation?.category === 'Technology' ? 'bg-accent/10 text-accent' :
                            innovation?.category === 'Sustainability' ? 'bg-success/10 text-success' :
                            innovation?.category === 'Digital Innovation'? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'
                          }`}>
                            {innovation?.category}
                          </span>
                        </div>
                        <h3 className="font-headline text-lg font-bold text-primary mb-1">
                          {innovation?.title}
                        </h3>
                        <p className="font-cta text-sm text-accent mb-2">
                          {innovation?.subtitle}
                        </p>
                        <p className="text-text-secondary text-sm">
                          {innovation?.description?.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Innovation View */}
          <div className="lg:col-span-2">
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
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-cta font-medium ${
                      activeData?.category === 'Technology' ? 'bg-accent/20 text-accent' :
                      activeData?.category === 'Sustainability' ? 'bg-success/20 text-success' :
                      activeData?.category === 'Digital Innovation'? 'bg-primary/20 text-white' : 'bg-warning/20 text-warning'
                    }`}>
                      {activeData?.category}
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-cta font-medium">
                      {activeData?.implementation}
                    </span>
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-white mb-1">
                    {activeData?.title}
                  </h3>
                  <p className="text-white/90 font-cta">
                    {activeData?.subtitle}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Description */}
                <p className="text-text-secondary leading-relaxed mb-6">
                  {activeData?.description}
                </p>

                {/* Impact Highlight */}
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Icon name="TrendingUp" size={20} className="text-accent" />
                    <div>
                      <h4 className="font-headline text-lg font-bold text-accent">
                        Measurable Impact
                      </h4>
                      <p className="text-text-secondary text-sm">
                        {activeData?.impact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-headline text-lg font-bold text-primary mb-3">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {activeData?.features?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                        <span className="text-text-secondary text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sustainability Impact */}
                <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Leaf" size={20} className="text-success" />
                    <div>
                      <h4 className="font-headline text-sm font-bold text-success uppercase tracking-wide">
                        Sustainability Impact
                      </h4>
                      <p className="text-text-secondary text-sm">
                        {activeData?.sustainability}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Metrics */}
        <div className="bg-white rounded-2xl shadow-industrial-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="font-headline text-2xl font-bold text-primary mb-4">
              Our Sustainability Commitment
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Environmental responsibility is at the core of our innovation strategy. 
              Here's how our technologies are making a measurable difference.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {sustainabilityMetrics?.map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  metric?.trend === 'up' ? 'bg-success/20' : 'bg-accent/20'
                }`}>
                  <Icon 
                    name={metric?.icon} 
                    size={24} 
                    className={metric?.trend === 'up' ? 'text-success' : 'text-accent'} 
                  />
                </div>
                <div className={`font-headline text-3xl font-bold mb-2 ${
                  metric?.trend === 'up' ? 'text-success' : 'text-accent'
                }`}>
                  {metric?.value}
                </div>
                <div className="font-cta text-sm text-text-secondary uppercase tracking-wide">
                  {metric?.metric}
                </div>
                <div className={`flex items-center justify-center space-x-1 mt-2 ${
                  metric?.trend === 'up' ? 'text-success' : 'text-accent'
                }`}>
                  <Icon 
                    name={metric?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={12} 
                  />
                  <span className="text-xs font-cta font-medium">
                    {metric?.trend === 'up' ? 'Improved' : 'Reduced'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* R&D Investment */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <div className="max-w-4xl mx-auto">
              <h3 className="font-headline text-3xl font-bold mb-4">
                Investing in Tomorrow's Technology
              </h3>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                We invest 15% of our annual revenue in research and development, 
                partnering with leading universities and technology institutes to pioneer 
                the next generation of industrial construction solutions.
              </p>
              
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="font-headline text-3xl font-bold text-accent mb-2">
                    €2.4M
                  </div>
                  <div className="font-cta text-sm text-white/80 uppercase tracking-wide">
                    Annual R&D Investment
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-headline text-3xl font-bold text-accent mb-2">
                    12
                  </div>
                  <div className="font-cta text-sm text-white/80 uppercase tracking-wide">
                    Active Research Projects
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-headline text-3xl font-bold text-accent mb-2">
                    5
                  </div>
                  <div className="font-cta text-sm text-white/80 uppercase tracking-wide">
                    University Partnerships
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/innovation">
                  <button className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center space-x-2">
                    <Icon name="Lightbulb" size={16} />
                    <span>Explore All Innovations</span>
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="border-2 border-white/30 text-white hover:bg-white/10 font-cta font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center space-x-2">
                    <Icon name="MessageSquare" size={16} />
                    <span>Discuss Innovation Partnership</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationSpotlight;