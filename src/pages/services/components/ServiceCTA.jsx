import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCTA = () => {
  const contactMethods = [
    {
      title: "Project Consultation",
      description: "Schedule a detailed discussion about your specific requirements",
      icon: "MessageSquare",
      action: "Schedule Call",
      color: "bg-accent",
      hoverColor: "hover:bg-accent/90"
    },
    {
      title: "Emergency Response",
      description: "24/7 immediate assistance for urgent industrial needs",
      icon: "Phone",
      action: "Call Now",
      color: "bg-warning",
      hoverColor: "hover:bg-warning/90"
    },
    // {
    //   title: "Technical Quote",
    //   description: "Get detailed pricing for your industrial construction project",
    //   icon: "Calculator",
    //   action: "Request Quote",
    //   color: "bg-success",
    //   hoverColor: "hover:bg-success/90"
    // }
  ];

  const quickStats = [
    { value: "< 24h", label: "Quote Response Time" },
    { value: "500+", label: "Projects Delivered" },
    { value: "25+", label: "Years Experience" },
    { value: "100%", label: "Client Satisfaction" }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-secondary to-primary/90 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      <div className="relative industrial-container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Icon name="Zap" size={20} className="text-accent" />
              <span className="font-cta font-medium text-sm tracking-wide">READY TO START?</span>
            </div>
            <h2 className="font-headline text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              Transform Your Industrial Vision
              <span className="block text-accent">Into Engineered Reality</span>
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Partner with MCCT Industry's expert team to deliver exceptional results that exceed expectations and industry standards.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {quickStats?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-headline font-bold text-accent mb-2">
                  {stat?.value}
                </div>
                <div className="text-sm font-cta text-white/80 tracking-wide">
                  {stat?.label}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            {contactMethods?.map((method, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center industrial-hover">
                <div className={`w-16 h-16 ${method?.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                  <Icon name={method?.icon} size={32} className="text-white" />
                </div>
                <h3 className="font-cta font-bold text-xl text-white mb-4">{method?.title}</h3>
                <p className="text-white/80 font-body mb-6 leading-relaxed">{method?.description}</p>
                <Button
                  variant="outline"
                  size="lg"
                  className={`border-white text-white hover:bg-white hover:text-primary font-cta font-semibold w-full`}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  {method?.action}
                </Button>
              </div>
            ))}
          </div>

          {/* Main CTA Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="font-headline text-2xl lg:text-3xl font-bold text-white mb-6">
                Ready to discuss your industrial construction project?
              </h3>
              <p className="text-white/90 font-body text-lg mb-8 leading-relaxed">
                Our engineering experts are standing by to provide personalized consultation and develop the perfect solution for your specific requirements.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button
                  variant="default"
                  size="xl"
                  className="bg-accent hover:bg-accent/90 text-white font-cta font-bold shadow-industrial-lg"
                  iconName="Phone"
                  iconPosition="left"
                >
                  Schedule Free Consultation
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-primary font-cta font-semibold"
                  iconName="Download"
                  iconPosition="left"
                >
                  Download Service Brochure
                </Button>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div className="text-center">
                  <Icon name="Phone" size={24} className="text-accent mx-auto mb-2" />
                  <div className="font-cta font-semibold text-white mb-1">Call Direct</div>
                  <div className="text-white/80 font-body">+33 1 23 45 67 89</div>
                </div>
                <div className="text-center">
                  <Icon name="Mail" size={24} className="text-accent mx-auto mb-2" />
                  <div className="font-cta font-semibold text-white mb-1">Email Us</div>
                  <div className="text-white/80 font-body">projects@mcct-industry.com</div>
                </div>
                <div className="text-center">
                  <Icon name="MapPin" size={24} className="text-accent mx-auto mb-2" />
                  <div className="font-cta font-semibold text-white mb-1">Visit Office</div>
                  <div className="text-white/80 font-body">Casablanca, Maroc</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-white/60 font-body text-sm mb-6">
              Trusted by leading industrial companies across MADope
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-white" />
                <span className="font-cta text-sm text-white">ISO Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={20} className="text-white" />
                <span className="font-cta text-sm text-white">Industry Leader</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} className="text-white" />
                <span className="font-cta text-sm text-white">Expert Team</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} className="text-white" />
                <span className="font-cta text-sm text-white">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;