import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InnovationCaseStudies = () => {
  const [selectedCase, setSelectedCase] = useState(0);

  const caseStudies = [
    {
      id: 1,
      title: "AI-Powered Structural Optimization",
      client: "EuroSteel Manufacturing",
      industry: "Steel Production",
      challenge: "Complex structural design requiring 40% weight reduction while maintaining load capacity",
      solution: "Implemented AI-driven topology optimization and generative design algorithms",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
      results: [
        { metric: "Weight Reduction", value: "42%", icon: "TrendingDown" },
        { metric: "Cost Savings", value: "€2.3M", icon: "Euro" },
        { metric: "Timeline", value: "6 weeks faster", icon: "Clock" },
        { metric: "Load Capacity", value: "Maintained 100%", icon: "Shield" }
      ],
      technologies: ["AI Optimization", "Generative Design", "3D Modeling", "Stress Analysis"],
      timeline: "8 months",
      innovation: "First use of quantum-inspired algorithms for structural optimization in Europe",
      testimonial: {
        quote: "MCCT's innovative approach saved us millions while delivering a structure that exceeded our performance requirements.",
        author: "Klaus Weber",
        position: "Chief Engineer, EuroSteel Manufacturing"
      }
    },
    {
      id: 2,
      title: "Drone-Assisted Quality Control System",
      client: "Nordic Industrial Complex",
      industry: "Chemical Processing",
      challenge: "Ensuring quality control across 50,000m² facility with hazardous areas inaccessible to humans",
      solution: "Deployed autonomous drone fleet with thermal imaging and AI-powered defect detection",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=400&fit=crop",
      results: [
        { metric: "Inspection Coverage", value: "100%", icon: "Eye" },
        { metric: "Defect Detection", value: "99.2% accuracy", icon: "Target" },
        { metric: "Safety Incidents", value: "Zero", icon: "Shield" },
        { metric: "Inspection Time", value: "75% reduction", icon: "Zap" }
      ],
      technologies: ["Autonomous Drones", "Thermal Imaging", "AI Detection", "Real-time Analytics"],
      timeline: "4 months",
      innovation: "First fully autonomous quality control system for hazardous industrial environments",
      testimonial: {
        quote: "The drone system revolutionized our quality control process, making it safer and more efficient than ever before.",
        author: "Astrid Larsson",
        position: "Operations Director, Nordic Industrial Complex"
      }
    },
    {
      id: 3,
      title: "Smart Material Integration Project",
      client: "GreenTech Energy Solutions",
      industry: "Renewable Energy",
      challenge: "Building self-monitoring wind turbine foundations that adapt to environmental conditions",
      solution: "Integrated IoT sensors and self-healing concrete with predictive maintenance algorithms",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
      results: [
        { metric: "Maintenance Reduction", value: "60%", icon: "Wrench" },
        { metric: "Lifespan Extension", value: "25 years", icon: "Calendar" },
        { metric: "Energy Efficiency", value: "15% increase", icon: "Zap" },
        { metric: "Environmental Impact", value: "Carbon neutral", icon: "Leaf" }
      ],
      technologies: ["IoT Sensors", "Self-Healing Materials", "Predictive Analytics", "Smart Concrete"],
      timeline: "12 months",
      innovation: "World\'s first self-healing concrete foundation with integrated IoT monitoring",
      testimonial: {
        quote: "This innovative foundation technology will transform how we approach renewable energy infrastructure.",
        author: "Dr. Emma Thompson",
        position: "CTO, GreenTech Energy Solutions"
      }
    }
  ];

  const currentCase = caseStudies?.[selectedCase];

  return (
    <section className="py-20 bg-surface">
      <div className="industrial-container">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
              <Icon name="Award" size={24} className="text-white" />
            </div>
            <span className="font-mono text-success text-sm tracking-wider uppercase">
              Innovation Case Studies
            </span>
          </div>
          
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-primary mb-6">
            Innovation in Action
            <span className="block text-success">Real Results</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Discover how our innovative approaches solved complex technical challenges 
            and delivered superior outcomes for our clients across diverse industries.
          </p>
        </div>

        {/* Case Study Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {caseStudies?.map((caseStudy, index) => (
            <button
              key={caseStudy?.id}
              onClick={() => setSelectedCase(index)}
              className={`p-4 rounded-xl text-left transition-all duration-300 industrial-transition max-w-xs ${
                selectedCase === index
                  ? 'bg-success text-white shadow-industrial'
                  : 'bg-white text-text-primary hover:bg-success/10 hover:text-success shadow-industrial'
              }`}
            >
              <div className="text-xs font-mono mb-1 opacity-80">
                {caseStudy?.industry}
              </div>
              <div className="font-semibold mb-1">
                {caseStudy?.title}
              </div>
              <div className="text-sm opacity-80">
                {caseStudy?.client}
              </div>
            </button>
          ))}
        </div>

        {/* Case Study Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Details */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-success/10 text-success text-sm font-medium rounded-full">
                  {currentCase?.industry}
                </span>
                <div className="flex items-center space-x-2 text-text-secondary text-sm">
                  <Icon name="Clock" size={14} />
                  <span>{currentCase?.timeline}</span>
                </div>
              </div>
              
              <h3 className="font-headline text-3xl font-bold text-primary">
                {currentCase?.title}
              </h3>
              
              <div className="text-lg text-text-secondary">
                <strong className="text-primary">Client:</strong> {currentCase?.client}
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-industrial">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
                    <Icon name="AlertTriangle" size={20} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-primary">Challenge</h4>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  {currentCase?.challenge}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-industrial">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                    <Icon name="Lightbulb" size={20} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-primary">Innovation Solution</h4>
                </div>
                <p className="text-text-secondary leading-relaxed mb-4">
                  {currentCase?.solution}
                </p>
                <div className="bg-accent/10 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Star" size={16} className="text-accent" />
                    <span className="font-semibold text-accent">Innovation Highlight</span>
                  </div>
                  <p className="text-sm text-text-primary">
                    {currentCase?.innovation}
                  </p>
                </div>
              </div>
            </div>

            {/* Technologies Used */}
            <div className="space-y-4">
              <h4 className="font-semibold text-primary">Technologies Implemented</h4>
              <div className="flex flex-wrap gap-2">
                {currentCase?.technologies?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white p-6 rounded-xl shadow-industrial">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Quote" size={20} className="text-white" />
                </div>
                <h4 className="font-semibold text-primary">Client Testimonial</h4>
              </div>
              <blockquote className="text-text-secondary italic mb-4">
                "{currentCase?.testimonial?.quote}"
              </blockquote>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-primary">{currentCase?.testimonial?.author}</div>
                  <div className="text-sm text-text-secondary">{currentCase?.testimonial?.position}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual & Results */}
          <div className="space-y-8">
            <div className="relative">
              <Image
                src={currentCase?.image}
                alt={currentCase?.title}
                className="w-full h-[400px] object-cover rounded-2xl shadow-industrial-lg"
              />
              
              {/* Innovation Badge */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-industrial">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Innovation Project</div>
                    <div className="text-sm text-text-secondary">{currentCase?.industry}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 gap-4">
              {currentCase?.results?.map((result, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-industrial text-center">
                  <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name={result?.icon} size={20} className="text-white" />
                  </div>
                  <div className="text-2xl font-bold text-success mb-1">
                    {result?.value}
                  </div>
                  <div className="text-sm text-text-secondary font-mono">
                    {result?.metric}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <Button
                variant="default"
                size="lg"
                className="bg-success hover:bg-success/90 text-white font-cta font-semibold"
                iconName="FileText"
                iconPosition="left"
                fullWidth
              >
                Download Full Case Study
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white font-cta font-medium"
                iconName="Phone"
                iconPosition="left"
                fullWidth
              >
                Discuss Similar Project
              </Button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-industrial-lg max-w-4xl mx-auto">
            <h3 className="font-headline text-2xl lg:text-3xl font-bold text-primary mb-4">
              Ready to Innovate Your Next Project?
            </h3>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Let our innovation team develop custom solutions that solve your unique challenges 
              and deliver exceptional results that exceed industry standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold"
                iconName="Lightbulb"
                iconPosition="left"
              >
                Start Innovation Consultation
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white font-cta font-medium"
                iconName="Download"
                iconPosition="left"
              >
                Innovation Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationCaseStudies;