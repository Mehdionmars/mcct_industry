import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const InteractiveTechDemo = () => {
  const [activeDemo, setActiveDemo] = useState('project-management');

  const techDemos = {
    'project-management': {
      title: "Digital Project Management System",
      description: "Real-time project tracking and collaboration platform that connects all stakeholders in one unified dashboard.",
      features: [
        "Live project timeline visualization",
        "Resource allocation and optimization",
        "Real-time communication hub",
        "Automated progress reporting"
      ],
      interface: {
        title: "Project Dashboard - Steel Manufacturing Facility",
        status: "In Progress - Phase 2 of 4",
        progress: 68,
        timeline: "12 weeks remaining",
        team: "24 active members",
        updates: [
          { time: "2 hours ago", message: "Foundation inspection completed - All systems green", type: "success" },
          { time: "5 hours ago", message: "Weather delay expected tomorrow - Adjusting schedule", type: "warning" },
          { time: "1 day ago", message: "Steel delivery confirmed for next week", type: "info" }
        ]
      }
    },
    'bim-modeling': {
      title: "BIM & 3D Visualization Platform",
      description: "Advanced Building Information Modeling with immersive 3D visualization and collaborative design capabilities.",
      features: [
        "4D construction sequencing",
        "Virtual reality walkthroughs",
        "Clash detection automation",
        "Multi-user collaboration"
      ],
      interface: {
        title: "BIM Model - Industrial Complex Phase 3",
        status: "Design Review - Version 2.4",
        progress: 85,
        timeline: "Review deadline: 3 days",
        team: "8 design professionals",
        updates: [
          { time: "30 minutes ago", message: "Structural analysis completed - No conflicts detected", type: "success" },
          { time: "2 hours ago", message: "MEP systems integrated successfully", type: "success" },
          { time: "4 hours ago", message: "Client feedback incorporated into design", type: "info" }
        ]
      }
    },
    'quality-tracking': {
      title: "Real-Time Quality Tracking",
      description: "AI-powered quality assurance system that monitors construction standards and ensures compliance in real-time.",
      features: [
        "Automated quality inspections",
        "Compliance monitoring",
        "Defect detection and alerts",
        "Quality metrics dashboard"
      ],
      interface: {
        title: "Quality Control - Welding Operations",
        status: "Active Monitoring - 12 Stations",
        progress: 94,
        timeline: "Next inspection: 2 hours",
        team: "6 quality inspectors",
        updates: [
          { time: "15 minutes ago", message: "Station 7 - Weld quality exceeds specifications", type: "success" },
          { time: "45 minutes ago", message: "Temperature variance detected at Station 3 - Corrected", type: "warning" },
          { time: "1 hour ago", message: "Daily quality report generated", type: "info" }
        ]
      }
    }
  };

  const demoTabs = [
    { id: 'project-management', label: 'Project Management', icon: 'BarChart3' },
    { id: 'bim-modeling', label: 'BIM Modeling', icon: 'Box' },
    { id: 'quality-tracking', label: 'Quality Tracking', icon: 'Shield' }
  ];

  const currentDemo = techDemos?.[activeDemo];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="industrial-container">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
              <Icon name="Monitor" size={24} className="text-white" />
            </div>
            <span className="font-mono text-accent text-sm tracking-wider uppercase">
              Interactive Technology Demo
            </span>
          </div>
          
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-primary mb-6">
            Experience Our Digital
            <span className="block text-accent">Innovation Platform</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Explore our cutting-edge digital tools that revolutionize project management, 
            enhance collaboration, and ensure superior quality outcomes.
          </p>
        </div>

        {/* Demo Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {demoTabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveDemo(tab?.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-cta font-medium transition-all duration-300 industrial-transition ${
                activeDemo === tab?.id
                  ? 'bg-accent text-white shadow-industrial'
                  : 'bg-white text-text-primary hover:bg-accent/10 hover:text-accent shadow-industrial'
              }`}
            >
              <Icon name={tab?.icon} size={20} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Demo Description */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="font-headline text-3xl font-bold text-primary">
                {currentDemo?.title}
              </h3>
              
              <p className="text-lg text-text-secondary leading-relaxed">
                {currentDemo?.description}
              </p>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Key Features:</h4>
                {currentDemo?.features?.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={14} className="text-white" />
                    </div>
                    <span className="text-text-primary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold"
                iconName="Play"
                iconPosition="left"
              >
                Request Live Demo
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white font-cta font-medium"
                iconName="Download"
                iconPosition="left"
              >
                Download Brochure
              </Button>
            </div>
          </div>

          {/* Interactive Demo Interface */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-industrial-lg overflow-hidden">
              {/* Demo Header */}
              <div className="bg-primary p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-white font-mono text-sm">
                    MCCT Digital Platform
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-white text-sm">Live</span>
                </div>
              </div>

              {/* Demo Content */}
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-headline text-xl font-bold text-primary">
                    {currentDemo?.interface?.title}
                  </h4>
                  <span className="px-3 py-1 bg-success/10 text-success text-sm font-medium rounded-full">
                    {currentDemo?.interface?.status}
                  </span>
                </div>

                {/* Progress Section */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Overall Progress</span>
                    <span className="font-bold text-primary">{currentDemo?.interface?.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-accent h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${currentDemo?.interface?.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Clock" size={16} className="text-accent" />
                      <span className="text-sm text-text-secondary">Timeline</span>
                    </div>
                    <div className="font-semibold text-primary">{currentDemo?.interface?.timeline}</div>
                  </div>
                  <div className="bg-surface p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Users" size={16} className="text-accent" />
                      <span className="text-sm text-text-secondary">Team</span>
                    </div>
                    <div className="font-semibold text-primary">{currentDemo?.interface?.team}</div>
                  </div>
                </div>

                {/* Recent Updates */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-primary">Recent Updates</h5>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {currentDemo?.interface?.updates?.map((update, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-surface rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          update?.type === 'success' ? 'bg-success' :
                          update?.type === 'warning' ? 'bg-warning' : 'bg-primary'
                        }`}></div>
                        <div className="flex-1">
                          <div className="text-sm text-text-primary">{update?.message}</div>
                          <div className="text-xs text-text-secondary mt-1">{update?.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Badge */}
            <div className="absolute -top-4 -right-4 bg-accent text-white px-4 py-2 rounded-lg shadow-industrial font-cta font-semibold">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} />
                <span>Live Demo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Benefits */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-industrial">
            <div className="w-16 h-16 bg-success rounded-xl flex items-center justify-center mx-auto mb-4">
              <Icon name="TrendingUp" size={28} className="text-white" />
            </div>
            <h4 className="font-headline text-xl font-bold text-primary mb-3">
              Increased Efficiency
            </h4>
            <p className="text-text-secondary">
              Our digital tools increase project efficiency by 40% through automated workflows and real-time collaboration.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-industrial">
            <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={28} className="text-white" />
            </div>
            <h4 className="font-headline text-xl font-bold text-primary mb-3">
              Enhanced Quality
            </h4>
            <p className="text-text-secondary">
              AI-powered quality monitoring ensures 99.8% accuracy and reduces defects by 85% across all projects.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-industrial">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" size={28} className="text-white" />
            </div>
            <h4 className="font-headline text-xl font-bold text-primary mb-3">
              Better Collaboration
            </h4>
            <p className="text-text-secondary">
              Seamless communication and shared visibility improve team coordination and client satisfaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTechDemo;