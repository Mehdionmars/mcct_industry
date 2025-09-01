import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CapabilityAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    facilityType: '',
    projectScale: '',
    timeline: '',
    specialRequirements: '',
    budget: '',
    location: '',
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      company: ''
    }
  });
  const [results, setResults] = useState(null);

  const facilityTypes = [
    { value: 'manufacturing', label: 'Manufacturing Plant' },
    { value: 'warehouse', label: 'Warehouse & Distribution' },
    { value: 'power', label: 'Power Generation Facility' },
    { value: 'chemical', label: 'Chemical Processing Plant' },
    { value: 'automotive', label: 'Automotive Assembly' },
    { value: 'food', label: 'Food Processing Facility' },
    { value: 'pharmaceutical', label: 'Pharmaceutical Plant' },
    { value: 'other', label: 'Other Industrial Facility' }
  ];

  const projectScales = [
    { value: 'small', label: 'Small (< €500K)' },
    { value: 'medium', label: 'Medium (€500K - €2M)' },
    { value: 'large', label: 'Large (€2M - €10M)' },
    { value: 'enterprise', label: 'Enterprise (> €10M)' }
  ];

  const timelines = [
    { value: 'urgent', label: 'Urgent (< 3 months)' },
    { value: 'standard', label: 'Standard (3-6 months)' },
    { value: 'extended', label: 'Extended (6-12 months)' },
    { value: 'phased', label: 'Phased (> 12 months)' }
  ];

  const handleInputChange = (field, value) => {
    if (field?.includes('.')) {
      const [parent, child] = field?.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev?.[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const generateRecommendations = () => {
    // Mock recommendation logic based on form data
    const recommendations = {
      primaryServices: [],
      additionalServices: [],
      timeline: '',
      budgetRange: '',
      nextSteps: []
    };

    // Logic based on facility type and scale
    if (formData?.facilityType === 'manufacturing' || formData?.facilityType === 'automotive') {
      recommendations?.primaryServices?.push('Structural Steel Erection', 'Industrial Fabrication');
    }
    if (formData?.projectScale === 'large' || formData?.projectScale === 'enterprise') {
      recommendations?.additionalServices?.push('Project Management', '24/7 Support');
    }
    if (formData?.timeline === 'urgent') {
      recommendations?.additionalServices?.push('Emergency Response Team');
    }

    recommendations.timeline = `Based on your ${formData?.timeline} timeline, we recommend a ${
      formData?.timeline === 'urgent' ? '3-phase accelerated' : 'standard 4-phase'
    } approach.`;

    recommendations.budgetRange = `For a ${formData?.projectScale} ${formData?.facilityType} project, typical investment ranges from €${
      formData?.projectScale === 'small' ? '300K-700K' :
      formData?.projectScale === 'medium' ? '700K-2.5M' :
      formData?.projectScale === 'large' ? '2M-12M' : '10M+'
    }.`;

    recommendations.nextSteps = [
      'Schedule technical consultation with our engineering team',
      'Conduct detailed site assessment and feasibility study',
      'Develop customized project proposal with timeline and budget',
      'Present solution to your stakeholder team'
    ];

    setResults(recommendations);
    setCurrentStep(4);
  };

  const steps = [
    { number: 1, title: 'Project Details', icon: 'Building' },
    { number: 2, title: 'Requirements', icon: 'Settings' },
    { number: 3, title: 'Contact Info', icon: 'User' },
    { number: 4, title: 'Recommendations', icon: 'Target' }
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="industrial-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
              <Icon name="Calculator" size={20} />
              <span className="font-cta font-medium text-sm tracking-wide">CAPABILITY ASSESSMENT</span>
            </div>
            <h2 className="font-headline text-3xl lg:text-4xl font-bold text-primary mb-4">
              Find Your Perfect Service Match
            </h2>
            <p className="text-text-secondary font-body text-lg max-w-2xl mx-auto">
              Answer a few questions about your project and receive customized service recommendations with timeline and budget estimates.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {steps?.map((step, index) => (
                <React.Fragment key={step?.number}>
                  <div className={`flex items-center space-x-3 ${
                    currentStep >= step?.number ? 'text-accent' : 'text-text-secondary'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-cta font-bold text-sm ${
                      currentStep >= step?.number 
                        ? 'bg-accent text-white' :'bg-gray-200 text-text-secondary'
                    }`}>
                      {currentStep > step?.number ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        step?.number
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <div className="font-cta font-medium text-sm">{step?.title}</div>
                    </div>
                  </div>
                  {index < steps?.length - 1 && (
                    <div className={`w-8 h-0.5 ${
                      currentStep > step?.number ? 'bg-accent' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Assessment Form */}
          <div className="bg-white rounded-xl shadow-industrial p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="font-headline text-2xl font-bold text-primary mb-6">Project Details</h3>
                
                <Select
                  label="Facility Type"
                  description="What type of industrial facility are you working with?"
                  options={facilityTypes}
                  value={formData?.facilityType}
                  onChange={(value) => handleInputChange('facilityType', value)}
                  required
                />

                <Select
                  label="Project Scale"
                  description="What's the estimated budget range for this project?"
                  options={projectScales}
                  value={formData?.projectScale}
                  onChange={(value) => handleInputChange('projectScale', value)}
                  required
                />

                <Select
                  label="Timeline"
                  description="When do you need the project completed?"
                  options={timelines}
                  value={formData?.timeline}
                  onChange={(value) => handleInputChange('timeline', value)}
                  required
                />

                <Input
                  label="Project Location"
                  type="text"
                  placeholder="City, Country"
                  value={formData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                  description="This helps us assign the right regional team"
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="font-headline text-2xl font-bold text-primary mb-6">Special Requirements</h3>
                
                <div className="space-y-4">
                  <label className="font-cta font-medium text-primary">
                    Special Requirements or Challenges
                  </label>
                  <textarea
                    className="w-full p-4 border border-gray-200 rounded-lg font-body resize-none focus:ring-2 focus:ring-accent focus:border-accent"
                    rows="6"
                    placeholder="Describe any specific requirements, challenges, or constraints for your project..."
                    value={formData?.specialRequirements}
                    onChange={(e) => handleInputChange('specialRequirements', e?.target?.value)}
                  />
                  <p className="text-sm text-text-secondary">
                    Include details about environmental conditions, safety requirements, regulatory compliance, or technical specifications.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-surface rounded-lg">
                    <h4 className="font-cta font-semibold text-primary mb-4">Common Requirements</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span>Hazardous environment compliance</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span>Seismic resistance requirements</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span>High-temperature applications</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span>Corrosion-resistant materials</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-surface rounded-lg">
                    <h4 className="font-cta font-semibold text-primary mb-4">Specialized Services</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <Icon name="Zap" size={16} className="text-accent" />
                        <span>Emergency response capability</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Zap" size={16} className="text-accent" />
                        <span>24/7 maintenance support</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Zap" size={16} className="text-accent" />
                        <span>Phased construction approach</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Zap" size={16} className="text-accent" />
                        <span>Minimal downtime requirements</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="font-headline text-2xl font-bold text-primary mb-6">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Your full name"
                    value={formData?.contactInfo?.name}
                    onChange={(e) => handleInputChange('contactInfo.name', e?.target?.value)}
                    required
                  />

                  <Input
                    label="Company"
                    type="text"
                    placeholder="Company name"
                    value={formData?.contactInfo?.company}
                    onChange={(e) => handleInputChange('contactInfo.company', e?.target?.value)}
                    required
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your.email@company.com"
                    value={formData?.contactInfo?.email}
                    onChange={(e) => handleInputChange('contactInfo.email', e?.target?.value)}
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+33 1 23 45 67 89"
                    value={formData?.contactInfo?.phone}
                    onChange={(e) => handleInputChange('contactInfo.phone', e?.target?.value)}
                    required
                  />
                </div>

                <div className="p-4 bg-surface rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="Shield" size={20} className="text-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-cta font-semibold text-primary mb-2">Privacy & Data Protection</h4>
                      <p className="text-sm text-text-secondary">
                        Your information is protected under GDPR regulations. We'll only use this data to provide your customized recommendations and follow up on your project inquiry. You can request data deletion at any time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && results && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-success" />
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-primary mb-2">
                    Your Customized Recommendations
                  </h3>
                  <p className="text-text-secondary font-body">
                    Based on your project requirements, here are our tailored service recommendations.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="p-6 bg-accent/5 rounded-lg border border-accent/20">
                      <h4 className="font-cta font-semibold text-primary mb-4 flex items-center">
                        <Icon name="Star" size={20} className="text-accent mr-2" />
                        Primary Services Recommended
                      </h4>
                      <ul className="space-y-2">
                        {results?.primaryServices?.map((service, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Icon name="ArrowRight" size={16} className="text-accent" />
                            <span className="font-body text-primary">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 bg-surface rounded-lg">
                      <h4 className="font-cta font-semibold text-primary mb-4 flex items-center">
                        <Icon name="Plus" size={20} className="text-accent mr-2" />
                        Additional Services
                      </h4>
                      <ul className="space-y-2">
                        {results?.additionalServices?.map((service, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Icon name="CheckCircle" size={16} className="text-success" />
                            <span className="font-body text-primary">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-surface rounded-lg">
                      <h4 className="font-cta font-semibold text-primary mb-4 flex items-center">
                        <Icon name="Clock" size={20} className="text-accent mr-2" />
                        Timeline Recommendation
                      </h4>
                      <p className="font-body text-primary">{results?.timeline}</p>
                    </div>

                    <div className="p-6 bg-surface rounded-lg">
                      <h4 className="font-cta font-semibold text-primary mb-4 flex items-center">
                        <Icon name="MADo" size={20} className="text-accent mr-2" />
                        Budget Estimate
                      </h4>
                      <p className="font-body text-primary">{results?.budgetRange}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-cta font-semibold text-primary mb-4 flex items-center">
                    <Icon name="MapPin" size={20} className="text-accent mr-2" />
                    Recommended Next Steps
                  </h4>
                  <ol className="space-y-3">
                    {results?.nextSteps?.map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center font-cta font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="font-body text-primary">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 && currentStep < 4 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>
              )}
              
              {currentStep < 3 && (
                <Button
                  variant="default"
                  className="bg-accent hover:bg-accent/90 ml-auto"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Continue
                </Button>
              )}

              {currentStep === 3 && (
                <Button
                  variant="default"
                  className="bg-accent hover:bg-accent/90 ml-auto"
                  onClick={generateRecommendations}
                  iconName="Target"
                  iconPosition="right"
                >
                  Get Recommendations
                </Button>
              )}

              {currentStep === 4 && (
                <div className="flex gap-4 ml-auto">
                  <Button
                    variant="outline"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Download Report
                  </Button>
                  <Button
                    variant="default"
                    className="bg-accent hover:bg-accent/90"
                    iconName="Phone"
                    iconPosition="left"
                  >
                    Schedule Consultation
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilityAssessment;