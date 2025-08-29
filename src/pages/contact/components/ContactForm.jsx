import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    projectType: '',
    projectTimeline: '',
    budget: '',
    location: '',
    description: '',
    urgency: '',
    hasPlans: false,
    needsAssessment: false,
    agreesToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypeOptions = [
    { value: 'new-construction', label: 'New Industrial Construction' },
    { value: 'facility-expansion', label: 'Facility Expansion' },
    { value: 'renovation', label: 'Renovation & Modernization' },
    { value: 'maintenance', label: 'Maintenance & Repair' },
    { value: 'emergency', label: 'Emergency Repair' },
    { value: 'consultation', label: 'Technical Consultation' }
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immediate (Emergency)' },
    { value: '1-3-months', label: '1-3 Months' },
    { value: '3-6-months', label: '3-6 Months' },
    { value: '6-12-months', label: '6-12 Months' },
    { value: '12-months', label: '12+ Months' },
    { value: 'planning', label: 'Planning Phase' }
  ];

  const budgetOptions = [
    { value: 'under-100k', label: 'Under €100,000' },
    { value: '100k-500k', label: '€100,000 - €500,000' },
    { value: '500k-1m', label: '€500,000 - €1,000,000' },
    { value: '1m-5m', label: '€1,000,000 - €5,000,000' },
    { value: 'over-5m', label: 'Over €5,000,000' },
    { value: 'discuss', label: 'Prefer to Discuss' }
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Low - Planning Stage' },
    { value: 'medium', label: 'Medium - Active Planning' },
    { value: 'high', label: 'High - Ready to Start' },
    { value: 'critical', label: 'Critical - Emergency' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.company?.trim()) newErrors.company = 'Company name is required';
    if (!formData?.projectType) newErrors.projectType = 'Project type is required';
    if (!formData?.description?.trim()) newErrors.description = 'Project description is required';
    if (!formData?.agreesToTerms) newErrors.agreesToTerms = 'You must agree to the terms';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData?.email && !emailRegex?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Thank you for your inquiry! Our team will contact you within 24 hours.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        projectType: '',
        projectTimeline: '',
        budget: '',
        location: '',
        description: '',
        urgency: '',
        hasPlans: false,
        needsAssessment: false,
        agreesToTerms: false
      });
    } catch (error) {
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="industrial-container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-6">
              <Icon name="FileText" size={20} className="text-primary" />
              <span className="font-cta font-medium text-sm tracking-wide text-primary">PROJECT INQUIRY</span>
            </div>
            
            <h2 className="font-headline text-3xl lg:text-5xl font-bold text-primary mb-6">
              Start Your Project
              <span className="block text-accent">Consultation</span>
            </h2>
            
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Provide us with your project details and we'll prepare a comprehensive proposal 
              tailored to your industrial construction needs.
            </p>
          </div>

          {/* Form */}
          <div className="bg-surface rounded-xl shadow-industrial border border-gray-200 p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="font-headline text-xl font-bold text-primary mb-6 flex items-center">
                  <Icon name="User" size={20} className="mr-3 text-accent" />
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={formData?.firstName}
                    onChange={handleInputChange}
                    error={errors?.firstName}
                    required
                    placeholder="Enter your first name"
                  />
                  
                  <Input
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={formData?.lastName}
                    onChange={handleInputChange}
                    error={errors?.lastName}
                    required
                    placeholder="Enter your last name"
                  />
                  
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleInputChange}
                    error={errors?.email}
                    required
                    placeholder="your.email@company.com"
                  />
                  
                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData?.phone}
                    onChange={handleInputChange}
                    error={errors?.phone}
                    required
                    placeholder="+33 1 23 45 67 89"
                  />
                  
                  <Input
                    label="Company Name"
                    type="text"
                    name="company"
                    value={formData?.company}
                    onChange={handleInputChange}
                    error={errors?.company}
                    required
                    placeholder="Your company name"
                  />
                  
                  <Input
                    label="Position/Title"
                    type="text"
                    name="position"
                    value={formData?.position}
                    onChange={handleInputChange}
                    placeholder="Your job title"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="font-headline text-xl font-bold text-primary mb-6 flex items-center">
                  <Icon name="Building2" size={20} className="mr-3 text-accent" />
                  Project Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Select
                    label="Project Type"
                    options={projectTypeOptions}
                    value={formData?.projectType}
                    onChange={(value) => handleSelectChange('projectType', value)}
                    error={errors?.projectType}
                    required
                    placeholder="Select project type"
                  />
                  
                  <Select
                    label="Project Timeline"
                    options={timelineOptions}
                    value={formData?.projectTimeline}
                    onChange={(value) => handleSelectChange('projectTimeline', value)}
                    placeholder="Select timeline"
                  />
                  
                  <Select
                    label="Estimated Budget"
                    options={budgetOptions}
                    value={formData?.budget}
                    onChange={(value) => handleSelectChange('budget', value)}
                    placeholder="Select budget range"
                  />
                  
                  <Select
                    label="Project Urgency"
                    options={urgencyOptions}
                    value={formData?.urgency}
                    onChange={(value) => handleSelectChange('urgency', value)}
                    placeholder="Select urgency level"
                  />
                </div>
                
                <Input
                  label="Project Location"
                  type="text"
                  name="location"
                  value={formData?.location}
                  onChange={handleInputChange}
                  placeholder="City, Region, or Address"
                  className="mb-6"
                />
                
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Project Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData?.description}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent resize-none"
                    placeholder="Please describe your project requirements, including:\n• Type of industrial facility\n• Specific construction needs\n• Technical requirements\n• Any special considerations"
                    required
                  />
                  {errors?.description && (
                    <p className="mt-1 text-sm text-error">{errors?.description}</p>
                  )}
                </div>
              </div>

              {/* Additional Options */}
              <div>
                <h3 className="font-headline text-xl font-bold text-primary mb-6 flex items-center">
                  <Icon name="Settings" size={20} className="mr-3 text-accent" />
                  Additional Services
                </h3>
                
                <div className="space-y-4">
                  <Checkbox
                    label="I have existing architectural plans or drawings"
                    description="We can review and work with your existing documentation"
                    checked={formData?.hasPlans}
                    onChange={(e) => handleInputChange(e)}
                    name="hasPlans"
                  />
                  
                  <Checkbox
                    label="I need a site assessment and feasibility study"
                    description="Our team can evaluate your site and provide recommendations"
                    checked={formData?.needsAssessment}
                    onChange={(e) => handleInputChange(e)}
                    name="needsAssessment"
                  />
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="border-t border-gray-200 pt-8">
                <div className="mb-6">
                  <Checkbox
                    label="I agree to the terms and conditions and privacy policy"
                    description="By submitting this form, you consent to MCCT Industry contacting you about your project"
                    checked={formData?.agreesToTerms}
                    onChange={(e) => handleInputChange(e)}
                    name="agreesToTerms"
                    error={errors?.agreesToTerms}
                    required
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <div className="text-sm text-text-secondary">
                    <Icon name="Shield" size={16} className="inline mr-2 text-success" />
                    Your information is secure and will never be shared
                  </div>
                  
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold shadow-industrial"
                    iconName="Send"
                    iconPosition="right"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Project Inquiry'}
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Response Time Notice */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-success/10 rounded-full px-6 py-3">
              <Icon name="Clock" size={16} className="text-success" />
              <span className="text-sm font-cta font-medium text-success">
                We respond to all inquiries within 24 hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;