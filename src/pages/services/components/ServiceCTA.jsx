import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCTA = () => {
  const contactMethods = [
    {
      title: "Consultation de projet",
      description: "Planifiez une discussion détaillée sur vos besoins spécifiques",
      icon: "MessageSquare",
      action: "Planifier un appel",
      color: "bg-accent",
      hoverColor: "hover:bg-accent/90"
    },
    {
      title: "Assistance immédiate",
      description: "Assistance 24/7 pour les besoins industriels urgents",
      icon: "Phone",
      action: "Appeler maintenant",
      color: "bg-warning",
      hoverColor: "hover:bg-warning/90"
    },
    // {
    //   title: "Devis technique",
    //   description: "Obtenez un devis détaillé pour votre projet industriel",
    //   icon: "Calculator",
    //   action: "Demander un devis",
    //   color: "bg-success",
    //   hoverColor: "hover:bg-success/90"
    // }
  ];

  const quickStats = [
    { value: "< 24h", label: "Délai de devis" },
    { value: "500+", label: "Projets livrés" },
    { value: "25+", label: "Années d’expérience" },
    { value: "100%", label: "Satisfaction client" }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-secondary to-primary/90 text-white relative overflow-hidden">
      {/* Motif de fond */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      <div className="relative industrial-container">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Icon name="Zap" size={20} className="text-accent" />
              <span className="font-cta font-medium text-sm tracking-wide">PRÊT À COMMENCER ?</span>
            </div>
            <h2 className="font-headline text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              Transformez votre vision industrielle
              <span className="block text-accent">en réalité d’ingénierie</span>
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Collaborez avec l’équipe d’experts de MCCT Industry pour obtenir des résultats exceptionnels qui dépassent les attentes et les normes du secteur.
            </p>
          </div>

          {/* Statistiques rapides */}
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

          {/* Méthodes de contact */}
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

          {/* Section CTA principale */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="font-headline text-2xl lg:text-3xl font-bold text-white mb-6">
                Prêt à discuter de votre projet de construction industrielle ?
              </h3>
              <p className="text-white/90 font-body text-lg mb-8 leading-relaxed">
                Nos experts en ingénierie sont disponibles pour vous fournir une consultation personnalisée et développer la solution idéale pour vos besoins spécifiques.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button
                  variant="default"
                  size="xl"
                  className="bg-accent hover:bg-accent/90 text-white font-cta font-bold shadow-industrial-lg"
                  iconName="Phone"
                  iconPosition="left"
                >
                  Planifier une consultation gratuite
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-primary font-cta font-semibold"
                  iconName="Download"
                  iconPosition="left"
                >
                  Télécharger la brochure
                </Button>
              </div>

              {/* Informations de contact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div className="text-center">
                  <Icon name="Phone" size={24} className="text-accent mx-auto mb-2" />
                  <div className="font-cta font-semibold text-white mb-1">Appel direct</div>
                  <div className="text-white/80 font-body">+33 1 23 45 67 89</div>
                </div>
                <div className="text-center">
                  <Icon name="Mail" size={24} className="text-accent mx-auto mb-2" />
                  <div className="font-cta font-semibold text-white mb-1">Envoyez-nous un email</div>
                  <div className="text-white/80 font-body">projects@mcct-industry.com</div>
                </div>
                <div className="text-center">
                  <Icon name="MapPin" size={24} className="text-accent mx-auto mb-2" />
                  <div className="font-cta font-semibold text-white mb-1">Visit Office</div>
                  <div className="text-white/80 font-body">Paris, Lyon, Marseille</div>
                </div>
              </div>
            </div>
          </div>

          {/* Indicateurs de confiance */}
          <div className="mt-16 text-center">
            <p className="text-white/60 font-body text-sm mb-6">
              Partenaire de confiance des plus grandes entreprises industrielles à MADope
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-white" />
                <span className="font-cta text-sm text-white">Certifié ISO</span>
              </div> */}
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={20} className="text-white" />
                <span className="font-cta text-sm text-white">Leader du secteur</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} className="text-white" />
                <span className="font-cta text-sm text-white">Équipe d’experts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} className="text-white" />
                <span className="font-cta text-sm text-white">Assistance 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;
