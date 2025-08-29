import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InnovationLab = () => {
  const [activeTab, setActiveTab] = useState('research');

  const tabs = [
    { id: 'research', name: 'R&D Initiatives', icon: 'Lightbulb' },
    { id: 'technology', name: 'New Technologies', icon: 'Cpu' },
    { id: 'sustainability', name: 'Green Practices', icon: 'Leaf' },
    { id: 'future', name: 'Future Vision', icon: 'Rocket' }
  ];

  const innovations = {
    research: [
      {
        title: "AI-Powered Project Management",
        description: "Developing machine learning algorithms to optimize project scheduling, resource allocation, and risk prediction with 95% accuracy improvement.",
        status: "In Development",
        progress: 75,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        impact: "40% reduction in project delays",
        timeline: "Q2 2025"
      },
      {
        title: "Smart Welding Automation",
        description: "Revolutionary robotic welding systems with real-time quality monitoring and adaptive parameter adjustment for complex industrial structures.",
        status: "Testing Phase",
        progress: 60,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        impact: "60% faster welding speeds",
        timeline: "Q4 2025"
      },
      {
        title: "Structural Health Monitoring",
        description: "IoT sensor networks integrated into steel structures for continuous monitoring of stress, fatigue, and environmental conditions.",
        status: "Pilot Testing",
        progress: 85,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        impact: "Predictive maintenance capabilities",
        timeline: "Q1 2025"
      }
    ],
    technology: [
      {
        title: "3D Steel Printing",
        description: "Large-scale additive manufacturing for complex steel components, reducing waste and enabling previously impossible geometries.",
        status: "Research Phase",
        progress: 30,
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        impact: "50% material waste reduction",
        timeline: "2026"
      },
      {
        title: "Augmented Reality Assembly",
        description: "AR-guided assembly processes providing real-time instructions and quality verification for complex industrial installations.",
        status: "Beta Testing",
        progress: 70,
        image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        impact: "25% faster assembly times",
        timeline: "Q3 2025"
      },
      {
        title: "Digital Twin Technology",
        description: "Complete digital replicas of industrial facilities for simulation, optimization, and predictive maintenance planning.",
        status: "Implementation",
        progress: 90,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        impact: "Real-time facility optimization",
        timeline: "Q1 2025"
      }
    ],
    sustainability: [
      {
        title: "Carbon-Neutral Steel Production",
        description: "Partnership with steel manufacturers to develop hydrogen-based production methods, eliminating carbon emissions from steel manufacturing.",
        status: "Collaboration",
        progress: 45,
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        impact: "Zero carbon steel structures",
        timeline: "2027"
      },
      {
        title: "Circular Construction Economy",
        description: "Comprehensive steel recycling and reuse programs, creating closed-loop construction cycles with minimal waste generation.",
        status: "Active Program",
        progress: 80,
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        impact: "95% material reuse rate",
        timeline: "Ongoing"
      },
      {
        title: "Energy-Positive Buildings",
        description: "Designing industrial structures that generate more energy than they consume through integrated renewable energy systems.",
        status: "Design Phase",
        progress: 55,
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        impact: "Net positive energy facilities",
        timeline: "Q4 2025"
      }
    ],
    future: [
      {
        title: "Space Construction Capabilities",
        description: "Developing specialized welding and assembly techniques for zero-gravity construction of space-based industrial facilities.",
        status: "Conceptual",
        progress: 15,
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        impact: "Space industry expansion",
        timeline: "2030+"
      },
      {
        title: "Self-Healing Materials",
        description: "Research into smart materials that can automatically repair minor structural damage, extending building lifespans indefinitely.",
        status: "Early Research",
        progress: 20,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        impact: "Maintenance-free structures",
        timeline: "2028+"
      },
      {
        title: "Quantum Computing Integration",
        description: "Leveraging quantum computing for complex structural analysis and optimization of massive industrial construction projects.",
        status: "Theoretical",
        progress: 10,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        impact: "Unprecedented design optimization",
        timeline: "2032+"
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active Program': case'Implementation': return 'bg-success text-white';
      case 'Beta Testing': case'Testing Phase': case'Pilot Testing': return 'bg-warning text-white';
      case 'In Development': case'Design Phase': return 'bg-accent text-white';
      case 'Collaboration': return 'bg-primary text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-white py-20 lg:py-32">
      <div className="industrial-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Lightbulb" size={24} className="text-white" />
            </div>
            <span className="font-mono text-accent text-sm tracking-wider uppercase">
              Innovation Laboratory
            </span>
          </div>
          
          <h2 className="font-headline text-3xl lg:text-5xl font-bold text-primary mb-6">
            Pioneering the Future of
            <span className="block text-accent">Industrial Construction</span>
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            Our innovation laboratory is where tomorrow's construction technologies are born today. 
            We're not just building structures—we're architecting the future of industrial infrastructure.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-cta font-medium transition-all duration-200 industrial-transition ${
                activeTab === tab?.id
                  ? 'bg-accent text-white shadow-industrial'
                  : 'bg-white text-gray-600 hover:bg-accent/10 hover:text-accent industrial-shadow'
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              <span>{tab?.name}</span>
            </button>
          ))}
        </div>

        {/* Innovation Cards */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {innovations?.[activeTab]?.map((innovation, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden industrial-shadow hover:shadow-industrial-lg industrial-transition"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={innovation?.image}
                  alt={innovation?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(innovation?.status)}`}>
                  {innovation?.status}
                </div>
                
                {/* Progress Bar */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-xs font-medium">Progress</span>
                    <span className="text-white text-xs font-bold">{innovation?.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-500"
                      style={{ width: `${innovation?.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-headline text-xl font-bold text-primary mb-3">
                  {innovation?.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {innovation?.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Expected Impact:</span>
                    <span className="text-sm font-medium text-accent">{innovation?.impact}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Timeline:</span>
                    <span className="text-sm font-medium text-primary">{innovation?.timeline}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    className="text-accent hover:bg-accent/10 font-cta font-medium"
                    iconName="ArrowRight"
                    iconPosition="right"
                    iconSize={14}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Innovation Stats */}
        <div className="bg-white rounded-2xl p-8 industrial-shadow">
          <h3 className="font-headline text-2xl font-bold text-primary text-center mb-8">
            Innovation Impact Metrics
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "€2.5M", label: "R&D Investment", icon: "TrendingUp", color: "text-accent" },
              { number: "15", label: "Active Projects", icon: "Lightbulb", color: "text-primary" },
              { number: "8", label: "Patent Applications", icon: "FileText", color: "text-success" },
              { number: "25%", label: "Efficiency Gains", icon: "Zap", color: "text-warning" }
            ]?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 bg-surface rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <Icon name={stat?.icon} size={20} className={stat?.color} />
                </div>
                <div className={`text-2xl lg:text-3xl font-bold mb-1 ${stat?.color}`}>
                  {stat?.number}
                </div>
                <div className="text-sm text-gray-600 font-mono tracking-wide">
                  {stat?.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <h3 className="font-headline text-2xl lg:text-3xl font-bold mb-4">
              Partner with Innovation Leaders
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Join us in shaping the future of industrial construction. Our innovation partnerships 
              create competitive advantages that last for decades.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary font-cta font-semibold"
              iconName="Rocket"
              iconPosition="left"
            >
              Explore Partnership Opportunities
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationLab;