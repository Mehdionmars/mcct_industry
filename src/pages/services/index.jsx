import React, { useState } from "react";
import Header from "../../components/ui/Header";
import ServiceHero from "./components/ServiceHero";
import ServiceCard from "./components/ServiceCard";
import ServiceCTA from "./components/ServiceCTA";
import { services } from "../../data/services";

const ServicesPage = () => {
  const [expandedService, setExpandedService] = useState(null);

  const handleServiceToggle = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <ServiceHero />

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="industrial-container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <span className="font-cta font-medium text-sm tracking-wide">
                OUR EXPERTISE
              </span>
            </div>
            <h2 className="font-headline text-3xl lg:text-4xl font-bold text-primary mb-4">
              Comprehensive Service Portfolio
            </h2>
            <p className="text-text-secondary font-body text-lg max-w-3xl mx-auto">
              Explore our complete range of industrial construction services.
            </p>
          </div>

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
        </div>
      </section>

      {/* Call to Action */}
      <ServiceCTA />
    </div>
  );
};

export default ServicesPage;
