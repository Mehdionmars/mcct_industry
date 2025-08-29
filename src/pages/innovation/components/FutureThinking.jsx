import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FutureThinking = () => {
  const [activeInsight, setActiveInsight] = useState(0);

  const insights = [
    {
      id: 1,
      category: "Industry Trends",
      title: "The Rise of Smart Industrial Infrastructure",
      author: "Dr. Sarah Mitchell, Chief Innovation Officer",
      date: "December 15, 2024",
      readTime: "8 min read",
      excerpt: "Exploring how IoT integration and AI-driven systems are transforming industrial construction into intelligent, self-monitoring infrastructure that adapts to operational needs.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
      tags: ["IoT", "Smart Infrastructure", "AI Integration"],
      keyPoints: [
        "IoT sensors reduce maintenance costs by 35%",
        "Predictive analytics prevent 90% of equipment failures",
        "Smart buildings adapt energy consumption in real-time"
      ]
    },
    {
      id: 2,
      category: "Regulatory Changes",
      title: "New European Safety Standards for Industrial Construction",
      author: "Jean-Pierre Dubois, Safety Director",
      date: "December 10, 2024",
      readTime: "6 min read",
      excerpt: "Comprehensive analysis of upcoming EU regulations that will reshape safety protocols and compliance requirements for industrial construction projects across Europe.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
      tags: ["Regulations", "Safety Standards", "Compliance"],
      keyPoints: [
        "New standards effective January 2025",
        "Enhanced worker protection requirements",
        "Digital documentation mandates"
      ]
    },
    {
      id: 3,
      category: "Emerging Technologies",
      title: "Quantum Computing Applications in Structural Engineering",
      author: "Prof. Maria Rodriguez, Research Lead",
      date: "December 5, 2024",
      readTime: "12 min read",
      excerpt: "Investigating how quantum computing will revolutionize structural analysis, enabling complex calculations that optimize material usage and enhance building performance.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
      tags: ["Quantum Computing", "Structural Analysis", "Innovation"],
      keyPoints: [
        "Complex structural simulations in minutes",
        "Material optimization reduces waste by 25%",
        "Enhanced earthquake resistance modeling"
      ]
    }
  ];

  const futureTechnologies = [
    {
      title: "Autonomous Construction Robots",
      description: "Self-operating robotic systems for precision welding and assembly",
      timeline: "2025-2027",
      impact: "High",
      icon: "Bot",
      progress: 65
    },
    {
      title: "Holographic Project Visualization",
      description: "3D holographic displays for immersive project planning",
      timeline: "2026-2028",
      impact: "Medium",
      icon: "Eye",
      progress: 35
    },
    {
      title: "Self-Healing Materials",
      description: "Smart materials that automatically repair micro-damage",
      timeline: "2027-2030",
      impact: "Revolutionary",
      icon: "Sparkles",
      progress: 25
    },
    {
      title: "Carbon-Negative Construction",
      description: "Building processes that actively remove CO2 from atmosphere",
      timeline: "2025-2026",
      impact: "High",
      icon: "Leaf",
      progress: 80
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="industrial-container">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Telescope" size={24} className="text-white" />
            </div>
            <span className="font-mono text-primary text-sm tracking-wider uppercase">
              Future-Forward Thinking
            </span>
          </div>
          
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-primary mb-6">
            Thought Leadership &
            <span className="block text-accent">Industry Vision</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Stay ahead of industry evolution with insights from our innovation leaders, 
            regulatory analysis, and emerging technology forecasts.
          </p>
        </div>

        {/* Featured Insights */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                    {insights?.[activeInsight]?.category}
                  </span>
                  <div className="flex items-center space-x-2 text-text-secondary text-sm">
                    <Icon name="Calendar" size={14} />
                    <span>{insights?.[activeInsight]?.date}</span>
                  </div>
                </div>
                
                <h3 className="font-headline text-2xl lg:text-3xl font-bold text-primary">
                  {insights?.[activeInsight]?.title}
                </h3>
                
                <div className="flex items-center space-x-4 text-text-secondary">
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={16} />
                    <span className="text-sm">{insights?.[activeInsight]?.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} />
                    <span className="text-sm">{insights?.[activeInsight]?.readTime}</span>
                  </div>
                </div>
                
                <p className="text-lg text-text-secondary leading-relaxed">
                  {insights?.[activeInsight]?.excerpt}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Key Insights:</h4>
                {insights?.[activeInsight]?.keyPoints?.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="ArrowRight" size={12} className="text-white" />
                    </div>
                    <span className="text-text-primary">{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {insights?.[activeInsight]?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Button
                variant="default"
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold"
                iconName="ExternalLink"
                iconPosition="right"
              >
                Read Full Article
              </Button>
            </div>

            {/* Image & Navigation */}
            <div className="space-y-6">
              <div className="relative">
                <Image
                  src={insights?.[activeInsight]?.image}
                  alt={insights?.[activeInsight]?.title}
                  className="w-full h-[400px] object-cover rounded-2xl shadow-industrial-lg"
                />
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-industrial">
                  <div className="flex items-center space-x-2">
                    <Icon name="BookOpen" size={16} className="text-accent" />
                    <span className="text-sm font-medium text-primary">{insights?.[activeInsight]?.category}</span>
                  </div>
                </div>
              </div>

              {/* Insight Navigation */}
              <div className="grid grid-cols-3 gap-3">
                {insights?.map((insight, index) => (
                  <button
                    key={insight?.id}
                    onClick={() => setActiveInsight(index)}
                    className={`p-4 rounded-xl text-left transition-all duration-300 industrial-transition ${
                      activeInsight === index
                        ? 'bg-accent text-white shadow-industrial'
                        : 'bg-surface text-text-primary hover:bg-accent/10'
                    }`}
                  >
                    <div className="text-xs font-mono mb-1 opacity-80">
                      {insight?.category}
                    </div>
                    <div className="text-sm font-semibold line-clamp-2">
                      {insight?.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Future Technologies Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="font-headline text-3xl font-bold text-primary mb-4">
              Future Technology Roadmap
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Our vision for the next generation of industrial construction technologies 
              and their expected implementation timeline.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {futureTechnologies?.map((tech, index) => (
              <div key={index} className="bg-surface p-6 rounded-xl shadow-industrial hover:shadow-industrial-lg industrial-transition">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={tech?.icon} size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-headline text-lg font-bold text-primary">
                        {tech?.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        tech?.impact === 'Revolutionary' ? 'bg-accent/10 text-accent' :
                        tech?.impact === 'High'? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
                      }`}>
                        {tech?.impact}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm mb-3">
                      {tech?.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>{tech?.timeline}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="TrendingUp" size={14} />
                        <span>{tech?.progress}% Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Development Progress</span>
                    <span className="font-medium text-primary">{tech?.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${tech?.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-secondary p-8 lg:p-12 rounded-2xl shadow-industrial-lg max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon name="Mail" size={24} className="text-white" />
              </div>
              <h3 className="font-headline text-2xl lg:text-3xl font-bold text-white">
                Stay Ahead of Innovation
              </h3>
            </div>
            
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Subscribe to our innovation newsletter and receive monthly insights on industry trends, 
              emerging technologies, and regulatory updates directly from our research team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-accent focus:outline-none"
                />
              </div>
              <Button
                variant="default"
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold whitespace-nowrap"
                iconName="Send"
                iconPosition="right"
              >
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-gray-300 mt-4">
              Join 2,500+ industry professionals. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureThinking;