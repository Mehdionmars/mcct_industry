import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TeamContacts = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Jean-Pierre Dubois",
      position: "Project Director",
      department: "Project Management",
      email: "jp.dubois@mcct.com",
      phone: "+33 4 72 34 56 79",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      specialties: [
        "Large-scale Industrial Projects",
        "Multi-phase Construction",
        "Client Relationship Management",
        "Project Timeline Optimization"
      ],
      experience: "15+ years",
      languages: ["French", "English", "German"],
      availability: "Monday - Friday, 8:00 AM - 6:00 PM"
    },
    {
      id: 2,
      name: "Marie-Claire Rousseau",
      position: "Safety Coordinator",
      department: "Safety & Compliance",
      email: "mc.rousseau@mcct.com",
      phone: "+33 4 72 34 56 80",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      specialties: [
        "Industrial Safety Standards",
        "OSHA Compliance",
        "Risk Assessment",
        "Safety Training Programs"
      ],
      experience: "12+ years",
      languages: ["French", "English"],
      availability: "Monday - Friday, 7:00 AM - 5:00 PM"
    },
    {
      id: 3,
      name: "Antoine Moreau",
      position: "Technical Specialist",
      department: "Engineering & Design",
      email: "a.moreau@mcct.com",
      phone: "+33 4 72 34 56 81",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      specialties: [
        "Structural Engineering",
        "Material Specifications",
        "CAD Design & Modeling",
        "Technical Documentation"
      ],
      experience: "18+ years",
      languages: ["French", "English", "Italian"],
      availability: "Monday - Friday, 8:00 AM - 6:00 PM"
    },
    {
      id: 4,
      name: "Sophie Lefevre",
      position: "Client Relations Manager",
      department: "Business Development",
      email: "s.lefevre@mcct.com",
      phone: "+33 4 72 34 56 82",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      specialties: [
        "Partnership Development",
        "Contract Negotiation",
        "Vendor Relations",
        "Business Strategy"
      ],
      experience: "10+ years",
      languages: ["French", "English", "Spanish"],
      availability: "Monday - Friday, 9:00 AM - 6:00 PM"
    }
  ];

  const emergencyContacts = [
    {
      title: "Emergency Response Team",
      description: "24/7 emergency repair and maintenance services",
      phone: "+33 4 72 34 56 99",
      email: "emergency@mcct.com",
      icon: "AlertTriangle",
      color: "error"
    },
    {
      title: "After-Hours Support",
      description: "Non-emergency support outside business hours",
      phone: "+33 4 72 34 57 00",
      email: "support@mcct.com",
      icon: "Clock",
      color: "warning"
    },
    {
      title: "Technical Hotline",
      description: "Immediate technical consultation and guidance",
      phone: "+33 4 72 34 57 01",
      email: "technical@mcct.com",
      icon: "Settings",
      color: "primary"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      error: "text-error bg-error/10 border-error/20",
      warning: "text-warning bg-warning/10 border-warning/20",
      primary: "text-primary bg-primary/10 border-primary/20"
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-20 bg-surface">
      <div className="industrial-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
            <Icon name="Users" size={20} className="text-primary" />
            <span className="font-cta font-medium text-sm tracking-wide text-primary">EXPERT TEAM</span>
          </div>
          
          <h2 className="font-headline text-3xl lg:text-5xl font-bold text-primary mb-6">
            Connect with Our
            <span className="block text-accent">Industry Specialists</span>
          </h2>
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Our experienced team of professionals is ready to provide expert guidance 
            and personalized support for your industrial construction projects.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {teamMembers?.map((member) => (
            <div
              key={member?.id}
              className="bg-white rounded-xl shadow-industrial border border-gray-200 p-8 industrial-hover"
            >
              {/* Header */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="relative">
                  <Image
                    src={member?.avatar}
                    alt={member?.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-accent/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-white flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-headline text-xl font-bold text-primary mb-1">
                    {member?.name}
                  </h3>
                  <p className="text-accent font-cta font-semibold mb-1">{member?.position}</p>
                  <p className="text-sm text-text-secondary">{member?.department}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-accent" />
                  <span className="text-sm font-mono">{member?.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-accent" />
                  <span className="text-sm font-mono">{member?.email}</span>
                </div>
              </div>

              {/* Experience & Languages */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Award" size={16} className="text-success" />
                    <span className="text-sm font-cta font-semibold text-primary">Experience</span>
                  </div>
                  <p className="text-sm text-text-secondary">{member?.experience}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Globe" size={16} className="text-success" />
                    <span className="text-sm font-cta font-semibold text-primary">Languages</span>
                  </div>
                  <p className="text-sm text-text-secondary">{member?.languages?.join(", ")}</p>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Star" size={16} className="text-accent" />
                  <span className="text-sm font-cta font-semibold text-primary">Specialties</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {member?.specialties?.map((specialty, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={12} className="text-success" />
                      <span className="text-sm text-text-secondary">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-sm font-cta font-semibold text-primary">Availability</span>
                </div>
                <p className="text-sm text-text-secondary">{member?.availability}</p>
              </div>

              {/* Contact Actions */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold flex-1"
                  iconName="Phone"
                  iconPosition="left"
                >
                  Call Direct
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-white font-cta font-semibold flex-1"
                  iconName="Mail"
                  iconPosition="left"
                >
                  Send Email
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-xl shadow-industrial border border-gray-200 p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="font-headline text-2xl font-bold text-primary mb-4">
              Emergency & After-Hours Support
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              When urgent situations arise, our specialized support teams are available 
              to provide immediate assistance and technical guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyContacts?.map((contact, index) => (
              <div
                key={index}
                className="bg-surface rounded-lg border border-gray-200 p-6 text-center industrial-hover"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 border-2 ${getColorClasses(contact?.color)}`}>
                  <Icon name={contact?.icon} size={24} />
                </div>
                
                <h4 className="font-cta font-semibold text-primary mb-2">{contact?.title}</h4>
                <p className="text-sm text-text-secondary mb-4">{contact?.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <Icon name="Phone" size={16} className="text-accent" />
                    <span className="text-sm font-mono font-semibold">{contact?.phone}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Icon name="Mail" size={16} className="text-accent" />
                    <span className="text-sm font-mono">{contact?.email}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full border-accent text-accent hover:bg-accent hover:text-white font-cta font-semibold"
                  iconName="Phone"
                  iconPosition="left"
                >
                  Call Now
                </Button>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <div className="inline-flex items-center space-x-2 bg-success/10 rounded-full px-6 py-3 mb-4">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm font-cta font-medium text-success">
                All emergency calls are prioritized and logged for quality assurance
              </span>
            </div>
            <p className="text-sm text-text-secondary">
              For non-urgent matters during business hours, please contact our main office or use the project inquiry form above.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamContacts;