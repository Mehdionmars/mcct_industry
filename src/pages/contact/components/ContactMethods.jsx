import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactMethods = () => {
  const contactMethods = [
    {
      id: 1,
      title: "Project Consultation",
      description: "Schedule a detailed discussion about your industrial construction needs",
      icon: "Building2",
      color: "accent",
      action: "Schedule Meeting",
      details: [
        "Free initial consultation",
        "Site assessment available",
        "Custom project proposals",
        "Technical feasibility review"
      ]
    },
    {
      id: 2,
      title: "Emergency Response",
      description: "24/7 emergency repair and maintenance services for critical facilities",
      icon: "AlertTriangle",
      color: "error",
      action: "Call Emergency Line",
      details: [
        "24/7 availability",
        "Rapid response team",
        "Critical facility priority",
        "Safety-first protocols"
      ]
    },
    {
      id: 3,
      title: "Technical Support",
      description: "Expert guidance on specifications, materials, and construction methods",
      icon: "Settings",
      color: "primary",
      action: "Contact Specialists",
      details: [
        "Engineering consultation",
        "Material specifications",
        "Code compliance guidance",
        "Quality assurance support"
      ]
    },
    {
      id: 4,
      title: "Partnership Inquiry",
      description: "Explore long-term partnerships and vendor qualification processes",
      icon: "Handshake",
      color: "success",
      action: "Explore Partnership",
      details: [
        "Vendor qualification",
        "Long-term agreements",
        "Preferred contractor status",
        "Volume pricing options"
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      accent: "text-accent bg-accent/10 border-accent/20",
      error: "text-error bg-error/10 border-error/20",
      primary: "text-primary bg-primary/10 border-primary/20",
      success: "text-success bg-success/10 border-success/20"
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const getButtonVariant = (color) => {
    const variantMap = {
      accent: "default",
      error: "destructive",
      primary: "secondary",
      success: "success"
    };
    return variantMap?.[color] || "default";
  };

  return (
    <section className="py-20 bg-surface">
      <div className="industrial-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-6 py-3 mb-6">
            <Icon name="MessageSquare" size={20} className="text-accent" />
            <span className="font-cta font-medium text-sm tracking-wide text-accent">CONTACT METHODS</span>
          </div>
          
          <h2 className="font-headline text-3xl lg:text-5xl font-bold text-primary mb-6">
            Choose Your Preferred
            <span className="block text-accent">Communication Channel</span>
          </h2>
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Whether you need immediate emergency support or want to discuss a future project, 
            we have multiple channels designed to serve your specific needs efficiently.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {contactMethods?.map((method) => (
            <div
              key={method?.id}
              className="bg-white rounded-xl shadow-industrial border border-gray-200 p-8 industrial-hover group"
            >
              {/* Header */}
              <div className="flex items-start space-x-4 mb-6">
                <div className={`p-4 rounded-xl border-2 ${getColorClasses(method?.color)} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={method?.icon} size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="font-headline text-xl font-bold text-primary mb-2">
                    {method?.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {method?.description}
                  </p>
                </div>
              </div>

              {/* Details List */}
              <div className="mb-8">
                <ul className="space-y-3">
                  {method?.details?.map((detail, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Button
                variant={getButtonVariant(method?.color)}
                fullWidth
                className="font-cta font-semibold"
                iconName="ArrowRight"
                iconPosition="right"
              >
                {method?.action}
              </Button>
            </div>
          ))}
        </div>

        {/* Quick Contact Bar */}
        <div className="bg-white rounded-xl shadow-industrial border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h3 className="font-headline text-2xl font-bold text-primary mb-2">
              Need Immediate Assistance?
            </h3>
            <p className="text-text-secondary">
              Our team is standing by to help with your industrial construction needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Icon name="Phone" size={24} className="text-accent" />
              </div>
              <h4 className="font-cta font-semibold text-primary mb-2">Call Direct</h4>
              <p className="text-text-secondary text-sm mb-4">Speak with our project specialists</p>
              <Button
                variant="outline"
                size="sm"
                className="border-accent text-accent hover:bg-accent hover:text-white"
                iconName="Phone"
                iconPosition="left"
              >
                (555) 123-4567
              </Button>
            </div>

            {/* Email */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Icon name="Mail" size={24} className="text-primary" />
              </div>
              <h4 className="font-cta font-semibold text-primary mb-2">Send Email</h4>
              <p className="text-text-secondary text-sm mb-4">Detailed project inquiries</p>
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-white"
                iconName="Mail"
                iconPosition="left"
              >
                projects@mcct.com
              </Button>
            </div>

            {/* Location */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4">
                <Icon name="MapPin" size={24} className="text-success" />
              </div>
              <h4 className="font-cta font-semibold text-primary mb-2">Visit Office</h4>
              <p className="text-text-secondary text-sm mb-4">Schedule an in-person meeting</p>
              <Button
                variant="outline"
                size="sm"
                className="border-success text-success hover:bg-success hover:text-white"
                iconName="Navigation"
                iconPosition="left"
              >
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;