import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RDPartnerships = () => {
  const partnerships = [
    {
      id: 1,
      name: "TechSteel Innovations",
      type: "Technology Provider",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
      description: "Advanced metallurgy research and smart steel solutions for next-generation industrial construction.",
      collaboration: "Joint development of self-healing steel alloys and smart structural materials",
      projects: 12,
      duration: "5 years",
      focus: ["Smart Materials", "Metallurgy Research", "Structural Innovation"],
      achievements: [
        "Developed 40% stronger steel alloys",
        "Created self-monitoring structural elements",
        "Reduced material costs by 25%"
      ]
    },
    {
      id: 2,
      name: "Industrial Engineering Institute",
      type: "Educational Institution",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop",
      description: "Leading research university specializing in industrial engineering and construction technology advancement.",
      collaboration: "Student internship programs and collaborative research on sustainable construction methods",
      projects: 8,
      duration: "3 years",
      focus: ["Sustainable Construction", "Student Development", "Research Innovation"],
      achievements: [
        "Trained 150+ engineering students",
        "Published 25 research papers",
        "Developed 3 patented technologies"
      ]
    },
    {
      id: 3,
      name: "GreenBuild Solutions",
      type: "Sustainability Partner",
      logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
      description: "Environmental technology company focused on sustainable building practices and green construction solutions.",
      collaboration: "Development of carbon-neutral construction processes and renewable energy integration",
      projects: 15,
      duration: "4 years",
      focus: ["Carbon Neutrality", "Renewable Energy", "Green Certification"],
      achievements: [
        "Achieved 50% carbon reduction",
        "Integrated solar in 100+ projects",
        "Earned 30+ green certifications"
      ]
    },
    {
      id: 4,
      name: "RoboConstruct Labs",
      type: "Automation Partner",
      logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop",
      description: "Robotics and automation specialists developing autonomous construction systems and AI-driven project management.",
      collaboration: "Integration of robotic systems for precision welding and automated quality control",
      projects: 20,
      duration: "6 years",
      focus: ["Robotics", "AI Integration", "Automation"],
      achievements: [
        "Deployed 50+ robotic systems",
        "Increased precision by 95%",
        "Reduced labor costs by 30%"
      ]
    }
  ];

  const researchAreas = [
    {
      title: "Advanced Materials Research",
      description: "Developing next-generation steel alloys and composite materials",
      icon: "Atom",
      progress: 85
    },
    {
      title: "Sustainable Construction Methods",
      description: "Creating eco-friendly building processes and techniques",
      icon: "Leaf",
      progress: 92
    },
    {
      title: "Automation & Robotics",
      description: "Integrating AI and robotics for enhanced precision",
      icon: "Bot",
      progress: 78
    },
    {
      title: "Digital Twin Technology",
      description: "Virtual modeling for predictive maintenance and optimization",
      icon: "Monitor",
      progress: 88
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="industrial-container">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Users" size={24} className="text-white" />
            </div>
            <span className="font-mono text-primary text-sm tracking-wider uppercase">
              R&D Partnerships
            </span>
          </div>
          
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-primary mb-6">
            Collaborative Innovation
            <span className="block text-accent">Network</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Our strategic partnerships with leading technology providers and educational institutions 
            drive breakthrough innovations that advance the entire industrial construction industry.
          </p>
        </div>

        {/* Research Areas */}
        <div className="mb-16">
          <h3 className="font-headline text-2xl font-bold text-primary mb-8 text-center">
            Active Research Areas
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchAreas?.map((area, index) => (
              <div key={index} className="bg-surface p-6 rounded-xl shadow-industrial hover:shadow-industrial-lg industrial-transition">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <Icon name={area?.icon} size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-mono text-text-secondary mb-1">Progress</div>
                    <div className="text-lg font-bold text-primary">{area?.progress}%</div>
                  </div>
                </div>
                <h4 className="font-headline text-lg font-bold text-primary mb-2">
                  {area?.title}
                </h4>
                <p className="text-sm text-text-secondary mb-4">
                  {area?.description}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${area?.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Cards */}
        <div className="space-y-12">
          {partnerships?.map((partner, index) => (
            <div
              key={partner?.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-start space-x-4">
                  <Image
                    src={partner?.logo}
                    alt={`${partner?.name} logo`}
                    className="w-16 h-16 object-cover rounded-xl shadow-industrial"
                  />
                  <div className="flex-1">
                    <h3 className="font-headline text-2xl font-bold text-primary mb-1">
                      {partner?.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                        {partner?.type}
                      </span>
                      <div className="flex items-center space-x-1 text-text-secondary text-sm">
                        <Icon name="Calendar" size={14} />
                        <span>{partner?.duration}</span>
                      </div>
                    </div>
                    <p className="text-text-secondary leading-relaxed">
                      {partner?.description}
                    </p>
                  </div>
                </div>

                <div className="bg-surface p-6 rounded-xl">
                  <h4 className="font-semibold text-primary mb-3">Collaboration Focus</h4>
                  <p className="text-text-secondary mb-4">{partner?.collaboration}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {partner?.focus?.map((focus, focusIndex) => (
                      <span
                        key={focusIndex}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-accent">{partner?.projects}</div>
                      <div className="text-sm text-text-secondary font-mono">Joint Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">{partner?.duration}</div>
                      <div className="text-sm text-text-secondary font-mono">Partnership</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Key Achievements</h4>
                  {partner?.achievements?.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={12} className="text-white" />
                      </div>
                      <span className="text-text-primary">{achievement}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white font-cta font-medium"
                  iconName="ExternalLink"
                  iconPosition="right"
                >
                  View Partnership Details
                </Button>
              </div>

              {/* Visual */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="relative">
                  <Image
                    src={`https://images.unsplash.com/photo-${1560472354 + index}?w=600&h=400&fit=crop`}
                    alt={`${partner?.name} collaboration`}
                    className="w-full h-[400px] object-cover rounded-2xl shadow-industrial-lg"
                  />
                  
                  {/* Partnership Badge */}
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-industrial">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <Icon name="Handshake" size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-primary">Active Partnership</div>
                        <div className="text-sm text-text-secondary">{partner?.type}</div>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute bottom-6 right-6 bg-success/95 backdrop-blur-sm p-3 rounded-lg shadow-industrial">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-white">Active Research</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="mt-16 text-center">
          <div className="bg-primary p-8 lg:p-12 rounded-2xl shadow-industrial-lg max-w-4xl mx-auto">
            <h3 className="font-headline text-2xl lg:text-3xl font-bold text-white mb-4">
              Interested in Research Collaboration?
            </h3>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Join our innovation network and help shape the future of industrial construction 
              through collaborative research and development initiatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold"
                iconName="Users"
                iconPosition="left"
              >
                Explore Partnership Opportunities
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary font-cta font-medium"
                iconName="FileText"
                iconPosition="left"
              >
                Download Research Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RDPartnerships;