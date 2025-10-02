import React, { useState } from "react";
import Header from "../../components/ui/Header";
import ServiceHero from "./components/ServiceHero";
import ServiceCard from "./components/ServiceCard";
import ServiceCTA from "./components/ServiceCTA";
import { useServices } from "../../hooks/useServices";
import Icon from "../../components/AppIcon";

const ServicesPage = () => {
  const { services, loading, error } = useServices();
  const [expandedService, setExpandedService] = useState(null);

  const handleServiceToggle = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Section Héros */}
      <ServiceHero />

      {/* Grille des Services */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="industrial-container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <span className="font-cta font-medium text-sm tracking-wide">
                NOTRE EXPERTISE
              </span>
            </div>
            <h2 className="font-headline text-3xl lg:text-4xl font-bold text-primary mb-4">
              Portefeuille de services complet
            </h2>
            <p className="text-text-secondary font-body text-lg max-w-3xl mx-auto">
              Découvrez notre gamme complète de services de construction
              industrielle.
            </p>
          </div>

          {loading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary">Chargement des services...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="AlertCircle" size={32} className="text-red-500" />
              </div>
              <h3 className="font-headline text-xl font-bold text-primary mb-2">
                Erreur de chargement
              </h3>
              <p className="text-text-secondary mb-6">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isExpanded={expandedService === service.id}
                  onToggle={() => handleServiceToggle(service.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Appel à l’action */}
      <ServiceCTA />
    </div>
  );
};

export default ServicesPage;
