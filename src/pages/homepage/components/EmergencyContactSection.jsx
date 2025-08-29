import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContactSection = () => {
  const [selectedService, setSelectedService] = useState('emergency');

  const emergencyServices = [
    {
      id: 'emergency',
      title: '24/7 Emergency Response',
      subtitle: 'Critical Infrastructure Support',
      description: 'Immediate response for structural failures, safety hazards, and critical maintenance needs.',
      phone: '+33 1 42 86 24 7',
      responseTime: '< 2 hours',
      availability: '24/7/365',
      icon: 'AlertTriangle',
      color: 'error'
    },
    {
      id: 'maintenance',
      title: 'Urgent Maintenance',
      subtitle: 'Preventive & Corrective Services',
      description: 'Rapid response for equipment failures, structural issues, and maintenance emergencies.',
      phone: '+33 1 42 86 15 30',
      responseTime: '< 4 hours',
      availability: 'Mon-Sun 6AM-10PM',
      icon: 'Wrench',
      color: 'warning'
    },
    {
      id: 'consultation',
      title: 'Technical Consultation',
      subtitle: 'Expert Engineering Support',
      description: 'Immediate technical guidance for complex structural and engineering challenges.',
      phone: '+33 1 42 86 18 45',
      responseTime: '< 1 hour',
      availability: 'Business Hours',
      icon: 'Phone',
      color: 'accent'
    }
  ];

  const activeService = emergencyServices?.find(service => service?.id === selectedService);

  const emergencyChecklist = [
    'Assess immediate safety risks',
    'Secure the affected area',
    'Document the situation with photos',
    'Contact our emergency hotline',
    'Provide detailed location information',
    'Wait for our response team arrival'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-error/5 to-warning/5">
      <div className="industrial-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-error/10 rounded-full px-4 py-2 mb-6">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <span className="font-cta text-sm font-medium text-error uppercase tracking-wide">
              Emergency Support
            </span>
          </div>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-primary mb-6">
            24/7 Emergency Response
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            When industrial infrastructure emergencies occur, every minute counts. 
            Our certified emergency response team is available around the clock to ensure your safety and minimize downtime.
          </p>
        </div>

        {/* Emergency Services Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Service Selector */}
          <div className="space-y-4">
            <h3 className="font-headline text-2xl font-bold text-primary mb-6">
              Emergency Services Available
            </h3>
            
            {emergencyServices?.map((service) => (
              <div
                key={service?.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedService === service?.id ? 'transform scale-105' : 'hover:transform hover:scale-102'
                }`}
                onClick={() => setSelectedService(service?.id)}
              >
                <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedService === service?.id
                    ? `bg-white border-${service?.color} shadow-industrial-lg`
                    : 'bg-white/70 border-gray-200 hover:border-gray-300 hover:shadow-industrial'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg transition-all duration-300 ${
                      selectedService === service?.id
                        ? `bg-${service?.color} text-white`
                        : `bg-${service?.color}/10 text-${service?.color}`
                    }`}>
                      <Icon name={service?.icon} size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-headline text-xl font-bold text-primary mb-2">
                        {service?.title}
                      </h4>
                      <p className={`font-cta text-sm font-medium text-${service?.color} mb-2`}>
                        {service?.subtitle}
                      </p>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4">
                        {service?.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Icon name="Clock" size={16} className={`text-${service?.color}`} />
                          <span className="text-sm font-cta font-medium text-primary">
                            {service?.responseTime}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Calendar" size={16} className={`text-${service?.color}`} />
                          <span className="text-sm font-cta font-medium text-primary">
                            {service?.availability}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Service Details */}
          <div className="bg-white rounded-2xl shadow-industrial-lg p-8">
            <div className="text-center mb-8">
              <div className={`w-20 h-20 bg-${activeService?.color}/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon name={activeService?.icon} size={32} className={`text-${activeService?.color}`} />
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-2">
                {activeService?.title}
              </h3>
              <p className={`font-cta text-lg font-medium text-${activeService?.color} mb-4`}>
                {activeService?.subtitle}
              </p>
            </div>

            {/* Emergency Contact */}
            <div className={`bg-${activeService?.color}/5 border border-${activeService?.color}/20 rounded-xl p-6 mb-6`}>
              <div className="text-center">
                <h4 className="font-headline text-lg font-bold text-primary mb-2">
                  Emergency Hotline
                </h4>
                <div className={`font-headline text-3xl font-bold text-${activeService?.color} mb-2`}>
                  {activeService?.phone}
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  Available {activeService?.availability}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="default"
                    fullWidth
                    className={`bg-${activeService?.color} hover:bg-${activeService?.color}/90 text-white font-cta font-semibold`}
                    iconName="Phone"
                    iconPosition="left"
                  >
                    Call Emergency Line
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    className={`border-${activeService?.color} text-${activeService?.color} hover:bg-${activeService?.color} hover:text-white font-cta font-medium`}
                    iconName="MessageSquare"
                    iconPosition="left"
                  >
                    Send SMS Alert
                  </Button>
                </div>
              </div>
            </div>

            {/* Response Details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={20} className={`text-${activeService?.color}`} />
                  <span className="font-cta font-medium text-primary">Response Time</span>
                </div>
                <span className={`font-headline text-lg font-bold text-${activeService?.color}`}>
                  {activeService?.responseTime}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className={`text-${activeService?.color}`} />
                  <span className="font-cta font-medium text-primary">Coverage Area</span>
                </div>
                <span className={`font-headline text-lg font-bold text-${activeService?.color}`}>
                  Île-de-France
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Users" size={20} className={`text-${activeService?.color}`} />
                  <span className="font-cta font-medium text-primary">Team Size</span>
                </div>
                <span className={`font-headline text-lg font-bold text-${activeService?.color}`}>
                  8-12 Specialists
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Checklist */}
        <div className="bg-white rounded-2xl shadow-industrial-lg p-8 mb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-6">
                Emergency Response Checklist
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Follow these steps when facing an industrial infrastructure emergency 
                to ensure safety and facilitate our rapid response.
              </p>
              
              <div className="space-y-3">
                {emergencyChecklist?.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-text-secondary">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-error/5 to-warning/5 rounded-xl p-6">
              <div className="text-center mb-6">
                <Icon name="AlertTriangle" size={48} className="text-error mx-auto mb-4" />
                <h4 className="font-headline text-xl font-bold text-primary mb-2">
                  Critical Safety Notice
                </h4>
              </div>
              
              <div className="space-y-4 text-sm text-text-secondary">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0 mt-1" />
                  <span>
                    <strong>Immediate Evacuation:</strong> If structural collapse is imminent, 
                    evacuate the area immediately and call emergency services.
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Shield" size={16} className="text-warning flex-shrink-0 mt-1" />
                  <span>
                    <strong>Safety First:</strong> Do not attempt repairs yourself. 
                    Wait for our certified emergency response team.
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Phone" size={16} className="text-success flex-shrink-0 mt-1" />
                  <span>
                    <strong>Stay Connected:</strong> Keep your phone available for updates 
                    and coordination with our response team.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <h3 className="font-headline text-3xl font-bold mb-4">
              Your Safety is Our Priority
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
              With over 15 years of emergency response experience and a perfect safety record, 
              MCCT Industry is your trusted partner for critical industrial infrastructure support.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="font-headline text-2xl font-bold text-accent mb-2">
                  &lt; 2 Hours
                </div>
                <div className="font-cta text-sm text-white/80 uppercase tracking-wide">
                  Average Response Time
                </div>
              </div>
              <div className="text-center">
                <div className="font-headline text-2xl font-bold text-accent mb-2">
                  100%
                </div>
                <div className="font-cta text-sm text-white/80 uppercase tracking-wide">
                  Emergency Resolution Rate
                </div>
              </div>
              <div className="text-center">
                <div className="font-headline text-2xl font-bold text-accent mb-2">
                  24/7
                </div>
                <div className="font-cta text-sm text-white/80 uppercase tracking-wide">
                  Availability
                </div>
              </div>
            </div>

            <Button
              variant="default"
              size="lg"
              className="bg-error hover:bg-error/90 text-white font-cta font-bold shadow-industrial-lg"
              iconName="Phone"
              iconPosition="left"
            >
              Call Emergency Hotline: +33 1 42 86 24 7
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyContactSection;