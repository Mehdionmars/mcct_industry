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
      email: "m.idbelkacem@mcct-industry.ma",
      phone: "+212 661 494761",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      specialties: [
        "Large-scale Industrial Projects",
        "Multi-phase Construction",
        "Client Relationship Management",
        "Project Timeline Optimization"
      ],
      experience: "",
      languages: [""],
      availability: ""
    },
  ];

  const  Contacts = [
    {
      title: "Support Technique d'Urgence",
      description: "24/7 Support technique pour les situations critiques",
      phone: "+212 661 49 47 61",
      email: "contact@mcct-industry.ma",
      icon: "AlertTriangle",
      color: "error"
    },
    {
      title: "Hors-Temps Support",
      description: "Non-urgent support outside business hours",
      phone: "+212 661 49 47 63",
      email: "contact@mcct-industry.ma",
      icon: "Clock",
      color: "warning"
    },
    {
      title: "Direction Technique",
      description: "Consultation et support technique spécialisé immédiat",
      phone: "+212 661 49 47 62",
      email: "D.Technique@mcct-industry.ma",
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

        {/*   Contacts */}
        <div className="bg-white rounded-xl shadow-industrial border border-gray-200 p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="font-headline text-2xl font-bold text-primary mb-4">
                & After-Hours Support
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              When urgent situations arise, our specialized support teams are available 
              to provide immediate assistance and technical guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            { Contacts?.map((contact, index) => (
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
                All   calls are prioritized and logged for quality assurance
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