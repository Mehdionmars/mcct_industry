import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationInfo = () => {
  const locations = [
    {
      id: 1,
      name: "MCCT Industry - Casablanca",
      type: "Siège Technique et Administratif",
      address: "13, rue Ahmed El Mejatti -ex Alpes , rés. les Alpes, 1° étg. 20330 Casablanca - Maroc",
      city: "Casablanca, Maroc",
      phone: "+212 661 49 47 61",
      email: "contact@mcct-industry.ma",
    },
  ];

  const serviceAreas = [
    {
      region: "Auvergne-Rhône-Alpes",
      coverage: "Primary Service Area",
        Time: "Same Day",
      projects: "150+ Active Projects"
    },
    {
      region: "Provence-Alpes-Côte d\'Azur",
      coverage: "Extended Service Area",
        Time: "Next Day",
      projects: "75+ Active Projects"
    },
    {
      region: "Occitanie",
      coverage: "Regional Coverage",
        Time: "48 Hours",
      projects: "50+ Active Projects"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="industrial-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 rounded-full px-6 py-3 mb-6">
            <Icon name="MapPin" size={20} className="text-success" />
            <span className="font-cta font-medium text-sm tracking-wide text-success">Localisation</span>
          </div>
          
          <h2 className="font-headline text-3xl lg:text-5xl font-bold text-primary mb-6">
Trouvez nous facilement
            <span className="block text-accent">Partout au maroc</span>
          </h2>
          
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Avec des installations stratégiquement situées et une couverture régionale complète,
            MCCT Industry est positionnée pour répondre efficacement à vos besoins en construction industrielle.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {locations?.map((location) => (
            <div
              key={location?.id}
              className="bg-surface rounded-xl shadow-industrial border border-gray-200 overflow-hidden industrial-hover"
            >
              {/* Map */}
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={location?.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${location?.coordinates}&z=14&output=embed`}
                  className="border-0"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                  <span className="text-sm font-cta font-semibold text-primary">{location?.type}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="font-headline text-xl font-bold text-primary mb-2">
                    {location?.name}
                  </h3>
                  <div className="flex items-start space-x-2 text-text-secondary mb-4">
                    <Icon name="MapPin" size={16} className="mt-1 flex-shrink-0" />
                    <div>
                      <p>{location?.address}</p>
                      <p>{location?.city}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={16} className="text-accent" />
                    <span className="text-sm font-mono">{location?.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={16} className="text-accent" />
                    <span className="text-sm font-mono">{location?.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={16} className="text-success" />
                    <span className="text-sm">{location?.hours}</span>
                  </div>
                  {/* <div className="flex items-center space-x-3">
                    <Icon name="AlertTriangle" size={16} className="text-error" />
                    <span className="text-sm font-semibold">{location?. }</span>
                  </div> */}
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h4 className="font-cta font-semibold text-primary mb-3">Services Disponibles</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {location?.services?.map((service, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="Check" size={14} className="text-success" />
                        <span className="text-sm text-text-secondary">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-cta font-semibold text-primary mb-3">Caractéristiques de l'établissement</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {location?.features?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="Star" size={14} className="text-accent" />
                        <span className="text-sm text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold flex-1"
                    iconName="Phone"
                    iconPosition="left"
                  >
                    Appeler la localisation
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-white font-cta font-semibold flex-1"
                    iconName="Navigation"
                    iconPosition="left"
                  >
                    Obtenir des directions
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Areas */}
        <div className="bg-surface rounded-xl shadow-industrial border border-gray-200 p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="font-headline text-2xl font-bold text-primary mb-4">
              Couverture des Services Régionaux
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Notre positionnement stratégique nous permet de fournir une couverture complète à travers
              le Maroc avec des délais variables en fonction de l'emplacement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {serviceAreas?.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6 text-center industrial-hover"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                  <Icon name="MapPin" size={24} className="text-accent" />
                </div>
                <h4 className="font-cta font-semibold text-primary mb-2">{area?.region}</h4>
                <p className="text-sm text-text-secondary mb-4">{area?.coverage}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">   Time:</span>
                    <span className="font-semibold text-success">{area?.  Time}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Active Projects:</span>
                    <span className="font-semibold text-primary">{area?.projects}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coverage Map Notice */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3 mb-4">
              <Icon name="Info" size={16} className="text-primary" />
              <span className="text-sm font-cta font-medium text-primary">
                Couverture étendue disponible pour les projets à grande échelle
              </span>
            </div>
            <p className="text-sm text-text-secondary">
              Contactez-nous pour discuter de la disponibilité des services dans d'autres régions du Maroc et des pays voisins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationInfo;