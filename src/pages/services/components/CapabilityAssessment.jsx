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
    { value: 'manufacturing', label: 'Usine de fabrication' },
    { value: 'warehouse', label: 'Entrepôt & Distribution' },
    { value: 'power', label: 'Centrale de production d’énergie' },
    { value: 'chemical', label: 'Usine de traitement chimique' },
    { value: 'automotive', label: 'Assemblage automobile' },
    { value: 'food', label: 'Usine de transformation alimentaire' },
    { value: 'pharmaceutical', label: 'Usine pharmaceutique' },
    { value: 'other', label: 'Autre installation industrielle' }
  ];

  const projectScales = [
    { value: 'small', label: 'Petit (< 500K DHS)' },
    { value: 'medium', label: 'Moyen (500K – 2M DHS)' },
    { value: 'large', label: 'Grand (2M – 10M DHS)' },
    { value: 'enterprise', label: 'Très grand (> 10M DHS)' }
  ];

  const timelines = [
    { value: 'urgent', label: 'Urgent (< 3 mois)' },
    { value: 'standard', label: 'Standard (3-6 mois)' },
    { value: 'extended', label: 'Étendu (6-12 mois)' },
    { value: 'phased', label: 'Par phases (> 12 mois)' }
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
    const recommendations = {
      primaryServices: [],
      additionalServices: [],
      timeline: '',
      budgetRange: '',
      nextSteps: []
    };

    if (formData?.facilityType === 'manufacturing' || formData?.facilityType === 'automotive') {
      recommendations?.primaryServices?.push('Montage de structures métalliques', 'Fabrication industrielle');
    }
    if (formData?.projectScale === 'large' || formData?.projectScale === 'enterprise') {
      recommendations?.additionalServices?.push('Gestion de projet', 'Support 24/7');
    }
    if (formData?.timeline === 'urgent') {
      recommendations?.additionalServices?.push('Équipe d’intervention rapide');
    }

    recommendations.timeline = `En fonction de votre délai ${formData?.timeline}, nous recommandons une approche ${
      formData?.timeline === 'urgent' ? 'accélérée en 3 phases' : 'standard en 4 phases'
    }.`;

    recommendations.budgetRange = `Pour un projet ${formData?.projectScale} de type ${formData?.facilityType}, 
    l’investissement typique varie entre ${
      formData?.projectScale === 'small' ? '300K – 700K DHS' :
      formData?.projectScale === 'medium' ? '700K – 2,5M DHS' :
      formData?.projectScale === 'large' ? '2M – 12M DHS' : '10M+ DHS'
    }.`;

    recommendations.nextSteps = [
      'Planifier une consultation technique avec notre équipe d’ingénieurs',
      'Réaliser une étude de site et de faisabilité détaillée',
      'Développer une proposition personnalisée avec budget et calendrier',
      'Présenter la solution à vos parties prenantes'
    ];

    setResults(recommendations);
    setCurrentStep(4);
  };

  const steps = [
    { number: 1, title: 'Détails du projet', icon: 'Building' },
    { number: 2, title: 'Exigences', icon: 'Settings' },
    { number: 3, title: 'Coordonnées', icon: 'User' },
    { number: 4, title: 'Recommandations', icon: 'Target' }
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="industrial-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
              <Icon name="Calculator" size={20} />
              <span className="font-cta font-medium text-sm tracking-wide">ÉVALUATION DES CAPACITÉS</span>
            </div>
            <h2 className="font-headline text-3xl lg:text-4xl font-bold text-primary mb-4">
              Trouvez le service idéal pour votre projet
            </h2>
            <p className="text-text-secondary font-body text-lg max-w-2xl mx-auto">
              Répondez à quelques questions et recevez des recommandations personnalisées avec délais et estimations budgétaires.
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
                <h3 className="font-headline text-2xl font-bold text-primary mb-6">Détails du projet</h3>
                
                <Select
                  label="Type d’installation"
                  description="Quel type d’installation industrielle possédez-vous ?"
                  options={facilityTypes}
                  value={formData?.facilityType}
                  onChange={(value) => handleInputChange('facilityType', value)}
                  required
                />

                <Select
                  label="Échelle du projet"
                  description="Quelle est la fourchette budgétaire estimée ?"
                  options={projectScales}
                  value={formData?.projectScale}
                  onChange={(value) => handleInputChange('projectScale', value)}
                  required
                />

                <Select
                  label="Délai"
                  description="Quand souhaitez-vous que le projet soit terminé ?"
                  options={timelines}
                  value={formData?.timeline}
                  onChange={(value) => handleInputChange('timeline', value)}
                  required
                />

                <Input
                  label="Localisation du projet"
                  type="text"
                  placeholder="Ville, Pays"
                  value={formData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                  description="Cela nous permet d’affecter l’équipe régionale appropriée"
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="font-headline text-2xl font-bold text-primary mb-6">Exigences spéciales</h3>
                
                <div className="space-y-4">
                  <label className="font-cta font-medium text-primary">
                    Exigences ou défis particuliers
                  </label>
                  <textarea
                    className="w-full p-4 border border-gray-200 rounded-lg font-body resize-none focus:ring-2 focus:ring-accent focus:border-accent"
                    rows="6"
                    placeholder="Décrivez les exigences, défis ou contraintes spécifiques de votre projet..."
                    value={formData?.specialRequirements}
                    onChange={(e) => handleInputChange('specialRequirements', e?.target?.value)}
                  />
                  <p className="text-sm text-text-secondary">
                    Incluez des détails sur les conditions environnementales, exigences de sécurité, conformité réglementaire ou spécifications techniques.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-surface rounded-lg">
                    <h4 className="font-cta font-semibold text-primary mb-4">Exigences courantes</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span>Conformité aux environnements dangereux</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span>Exigences de résistance sismique</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span>Applications à haute température</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <span>Matériaux résistants à la corrosion</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-surface rounded-lg">
                    <h4 className="font-cta font-semibold text-primary mb-4">Services spécialisés</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <Icon name="Zap" size={16} className="text-accent" />
                        <span>Capacité d’intervention rapide</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Zap" size={16} className="text-accent" />
                        <span>Support maintenance 24/7</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Zap" size={16} className="text-accent" />
                        <span>Approche de construction par phases</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Zap" size={16} className="text-accent" />
                        <span>Minimisation des interruptions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="font-headline text-2xl font-bold text-primary mb-6">Coordonnées</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Nom complet"
                    type="text"
                    placeholder="Votre nom complet"
                    value={formData?.contactInfo?.name}
                    onChange={(e) => handleInputChange('contactInfo.name', e?.target?.value)}
                    required
                  />

                  <Input
                    label="Entreprise"
                    type="text"
                    placeholder="Nom de l’entreprise"
                    value={formData?.contactInfo?.company}
                    onChange={(e) => handleInputChange('contactInfo.company', e?.target?.value)}
                    required
                  />

                  <Input
                    label="Adresse e-mail"
                    type="email"
                    placeholder="votre.email@entreprise.com"
                    value={formData?.contactInfo?.email}
                    onChange={(e) => handleInputChange('contactInfo.email', e?.target?.value)}
                    required
                  />

                  <Input
                    label="Numéro de téléphone"
                    type="tel"
                    placeholder="+212 6 12 34 56 78"
                    value={formData?.contactInfo?.phone}
                    onChange={(e) => handleInputChange('contactInfo.phone', e?.target?.value)}
                    required
                  />
                </div>

                <div className="p-4 bg-surface rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="Shield" size={20} className="text-success flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-cta font-semibold text-primary mb-2">Confidentialité & Protection des données</h4>
                      <p className="text-sm text-text-secondary">
                        Vos informations sont protégées conformément au RGPD. Nous utiliserons ces données uniquement pour fournir vos recommandations personnalisées et pour le suivi de votre projet. Vous pouvez demander la suppression de vos données à tout moment.
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
                    Vos recommandations personnalisées
                  </h3>
                  <p className="text-text-secondary font-body">
                    En fonction de votre projet, voici nos recommandations de services adaptées.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="p-6 bg-accent/5 rounded-lg border border-accent/20">
                      <h4 className="font-cta font-semibold text-primary mb-4 flex items-center">
                        <Icon name="Star" size={20} className="text-accent mr-2" />
                        Services principaux recommandés
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
                        Services supplémentaires
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
                        Recommandation de délai
                      </h4>
                      <p className="font-body text-primary">{results?.timeline}</p>
                    </div>

                    <div className="p-6 bg-surface rounded-lg">
                      <h4 className="font-cta font-semibold text-primary mb-4 flex items-center">
                        <Icon name="MADo" size={20} className="text-accent mr-2" />
                        Estimation budgétaire
                      </h4>
                      <p className="font-body text-primary">{results?.budgetRange}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-cta font-semibold text-primary mb-4 flex items-center">
                    <Icon name="MapPin" size={20} className="text-accent mr-2" />
                    Étapes suivantes recommandées
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
                  Précédent
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
                  Continuer
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
                  Obtenir recommandations
                </Button>
              )}

              {currentStep === 4 && (
                <div className="flex gap-4 ml-auto">
                  <Button
                    variant="outline"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Télécharger le rapport
                  </Button>
                  <Button
                    variant="default"
                    className="bg-accent hover:bg-accent/90"
                    iconName="Phone"
                    iconPosition="left"
                  >
                    Planifier une consultation
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
