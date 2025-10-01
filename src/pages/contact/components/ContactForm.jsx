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
//traduit tous en francais
  const projectTypeOptions = [
    { value: 'new-construction', label: 'Nouvelle Construction Industrielle' },
    { value: 'facility-expansion', label: 'Expansion d\'Installation' },
    { value: 'renovation', label: 'Renovation & Modernisation' },
    { value: 'maintenance', label: 'Maintenance & Réparation' },
    { value: 'repair', label: 'Réparation' },
    { value: 'consultation', label: 'Consultation Technique' }
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immédiat (0-1 mois)' },
    { value: '1-3-Mois', label: '1-3 Mois' },
    { value: '3-6-Mois', label: '3-6 Mois' },
    { value: '6-12-Mois', label: '6-12 Mois' },
    { value: '12-Mois', label: '12+ Mois' },
  ];

  const budgetOptions = [
    { value: 'Moins de 100 DHS', label: 'Moins de 100 DHS' },
    { value: ' 100k-500 DHS', label: 'DHS100,000 - €500,000 DHS' },
    { value: '500k-1m', label: '€500,000 - €1,000,000' },
    { value: '1m-5m', label: '€1,000,000 - €5,000,000' },
    { value: 'Plus de 5m', label: 'Plus de €5,000,000' },
    { value: 'discuter', label: 'Préférer discuter' }
  ];

  const urgencyOptions = [
    { value: 'faible', label: 'Faible - Phase de Planification' },
    { value: 'moyenne', label: 'Moyenne - Planification Active' },
    { value: 'élevée', label: 'Élevée - Prêt à Commencer' },
    { value: 'critique', label: 'Critique - Urgent' }
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

    if (!formData?.firstName?.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData?.email?.trim()) newErrors.email = 'L\'email est requis';
    if (!formData?.phone?.trim()) newErrors.phone = 'Le numéro de téléphone est requis';
    if (!formData?.company?.trim()) newErrors.company = 'Le nom de l\'entreprise est requis';
    if (!formData?.projectType) newErrors.projectType = 'Le type de projet est requis';
    if (!formData?.description?.trim()) newErrors.description = 'La description du projet est requise';
    if (!formData?.agreesToTerms) newErrors.agreesToTerms = 'Vous devez accepter les conditions';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData?.email && !emailRegex?.test(formData?.email)) {
      newErrors.email = 'Veuillez entrer une adresse email valide';
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
      alert('Merci pour votre demande ! Notre équipe vous contactera dans les 24 heures.');
      
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
      alert('Une erreur s\'est produite lors de l\'envoi de votre formulaire. Veuillez réessayer.');
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
              <span className="font-cta font-medium text-sm tracking-wide text-primary">DEMANDE DE PROJET</span>
            </div>
            
            <h2 className="font-headline text-3xl lg:text-5xl font-bold text-primary mb-6">
              Démarrez Votre Projet
              <span className="block text-accent">Consultation</span>
            </h2>
            
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Remplissez le formulaire ci-dessous pour discuter de votre projet industriel avec notre équipe d'experts. Nous sommes impatients de collaborer avec vous pour concrétiser votre vision.
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
                    label="Prénom"
                    type="text"
                    name="firstName"
                    value={formData?.firstName}
                    onChange={handleInputChange}
                    error={errors?.firstName}
                    required
                    placeholder="Entrez votre prénom"
                  />
                  
                  <Input
                    label="Nom"
                    type="text"
                    name="lastName"
                    value={formData?.lastName}
                    onChange={handleInputChange}
                    error={errors?.lastName}
                    required
                    placeholder="Entrez votre nom"
                  />
                  
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleInputChange}
                    error={errors?.email}
                    required
                    placeholder="your.email@company.com"
                  />
                  
                  <Input
                    label="Téléphone"
                    type="tel"
                    name="phone"
                    value={formData?.phone}
                    onChange={handleInputChange}
                    error={errors?.phone}
                    required
                    placeholder="+33 1 23 45 67 89"
                  />
                  
                  <Input
                    label="Nom de l'entreprise"
                    type="text"
                    name="company"
                    value={formData?.company}
                    onChange={handleInputChange}
                    error={errors?.company}
                    required
                    placeholder="Your company name"
                  />
                  
                  <Input
                    label="Position/Titre"
                    type="text"
                    name="position"
                    value={formData?.position}
                    onChange={handleInputChange}
                    placeholder="Votre poste"
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
                    label="Type de projet"
                    options={projectTypeOptions}
                    value={formData?.projectType}
                    onChange={(value) => handleSelectChange('projectType', value)}
                    error={errors?.projectType}
                    required
                    placeholder="Choisissez le type de projet"
                  />
                  
                  <Select
                    label="Timeline du projet"
                    options={timelineOptions}
                    value={formData?.projectTimeline}
                    onChange={(value) => handleSelectChange('projectTimeline', value)}
                    placeholder="Choisissez la timeline du projet"
                  />
                  
                  <Select
                    label="Budget estimé"
                    options={budgetOptions}
                    value={formData?.budget}
                    onChange={(value) => handleSelectChange('budget', value)}
                    placeholder="Choisissez la fourchette de budget"
                  />
                
                </div>
                
                <Input
                  label="Project Location"
                  type="text"
                  name="location"
                  value={formData?.location}
                  onChange={handleInputChange}
                  placeholder="Ville, Région ou Adresse"
                  className="mb-6"
                />
                
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Description du projet *
                  </label>
                  <textarea
                    name="description"
                    value={formData?.description}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent resize-none"
                    placeholder="Veuillez décrire vos besoins en matière de projet, y compris :\n• Type d'installation industrielle\n• Besoins spécifiques en matière de construction\n• Exigences techniques\n• Considérations particulières"
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
                  Services supplémentaires
                </h3>
                
                <div className="space-y-4">
                  <Checkbox
                    label="J'ai des plans ou des dessins architecturaux existants"
                    description="Nous pouvons examiner et travailler avec votre documentation existante"
                    checked={formData?.hasPlans}
                    onChange={(e) => handleInputChange(e)}
                    name="hasPlans"
                  />
                  
                  <Checkbox
                    label="J'ai besoin d'une évaluation du site et d'une étude de faisabilité"
                    description="Notre équipe peut évaluer votre site et fournir des recommandations"
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
                    label="J'accepte les termes et conditions ainsi que la politique de confidentialité"
                    description="En soumettant ce formulaire, vous consentez à ce que MCCT Industry vous contacte au sujet de votre projet"
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
                    Vos informations sont sécurisées et confidentielles.
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
                    {isSubmitting ? 'Submitting...' : 'Soumettre la demande de projet'}
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/*    Time Notice */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-success/10 rounded-full px-6 py-3">
              <Icon name="Clock" size={16} className="text-success" />
              <span className="text-sm font-cta font-medium text-success">
                Nous répondons généralement dans les 24 heures
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;