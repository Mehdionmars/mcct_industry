import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

// Utility: color styles for cards
// Utility: color styles for cards
const getColorClasses = (color) => {
  const colorMap = {
    accent: "text-accent bg-accent/10 border-accent/20",
    error: "text-error bg-error/10 border-error/20",
    primary: "text-primary bg-primary/10 border-primary/20",
    success: "text-success bg-success/10 border-success/20",
  };
  return colorMap[color] || colorMap.primary;
};

// Utility: button variant by color
const getButtonVariant = (color) => {
  const variantMap = {
    accent: "default",
    error: "destructive",
    primary: "secondary",
    success: "success",
  };
  return variantMap[color] || "default";
};

// Contact Method Card
const ContactCard = ({ method }) => (
  <div className="bg-white rounded-xl shadow-industrial border border-gray-200 p-8 industrial-hover group">
    <div className="flex items-start space-x-4 mb-6">
      <div
        className={`p-4 rounded-xl border-2 ${getColorClasses(
          method.color
        )} group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon name={method.icon} size={32} />
      </div>
      <div className="flex-1">
        <h3 className="font-headline text-xl font-bold text-primary mb-2">
          {method.title}
        </h3>
        <p className="text-text-secondary leading-relaxed">
          {method.description}
        </p>
      </div>
    </div>

    <ul className="space-y-3 mb-8">
      {method.details.map((detail, index) => (
        <li key={index} className="flex items-center space-x-3">
          <Icon name="Check" size={16} className="text-success flex-shrink-0" />
          <span className="text-sm text-text-secondary">{detail}</span>
        </li>
      ))}
    </ul>

    <Button
      variant={getButtonVariant(method.color)}
      fullWidth
      className="font-cta font-semibold"
      iconName="ArrowRight"
      iconPosition="right"
    >
      {method.action}
    </Button>
  </div>
);

// Location Card
const LocationCard = ({ location }) => (
  <div className="bg-surface rounded-xl shadow-industrial border border-gray-200 overflow-hidden industrial-hover">
    <div className="h-64 bg-gray-200 relative overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title={location.name}
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${location.coordinates}&z=14&output=embed`}
        className="border-0"
      />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
        <span className="text-sm font-cta font-semibold text-primary">
          {location.type}
        </span>
      </div>
    </div>
  </div>
);

const ContactMethods = () => {
  const contactMethods = [
    {
      id: 1,
      title: "Consultation de Projet",
      description:
        "Planifiez une consultation avec nos experts pour discuter de vos besoins spécifiques en matière de construction industrielle.",
      icon: "Building2",
      color: "accent",
      action: "Planifier une Réunion",
      details: [
        // "Consultation initiale gratuite",
        // "",
        // "Propositions de projets personnalisés",
        // "Examen de faisabilité technique",
      ],
    },
  ];

  const locations = [
    {
      id: 2,
      name: "Branch Office",
      type: "Regional Office",
      coordinates: "34.0209,-6.8416", // Example: Rabat
    },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="industrial-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 rounded-full px-6 py-3 mb-6">
            <Icon name="MessageSquare" size={20} className="text-accent" />
            <span className="font-cta font-medium text-sm tracking-wide text-accent">
              METHODES DE CONTACT
            </span>
          </div>

          <h2 className="font-headline text-3xl lg:text-5xl font-bold text-primary mb-6">
            Choisissez Votre Préféré
            <span className="block text-accent">Canal de Communication</span>
          </h2>

          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Que vous préfériez un appel téléphonique direct, un e-mail détaillé,
            ou une visite en personne, MCCT Industry est prêt à vous assister.
          </p>
        </div>

        {/* Unified Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {contactMethods.map((method) => (
            <ContactCard key={method.id} method={method} />
          ))}
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>

        {/* Quick Contact Bar goes here if needed */}
      </div>
    </section>
  );
};

export default ContactMethods;
