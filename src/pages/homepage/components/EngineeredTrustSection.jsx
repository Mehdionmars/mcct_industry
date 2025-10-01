import React from 'react';
import Icon from '../../../components/AppIcon';

const EngineeredTrustSection = () => {
  return (
    <div className="text-center mt-16 mb-16">
      <div className="max-w-4xl mx-auto">
        <blockquote className="text-xl lg:text-2xl font-headline font-medium text-accent italic mb-6">
          "La confiance se construit grâce à une performance constante, une communication transparente,
          et un engagement indéfectible envers la sécurité et la qualité dans chaque projet que nous entreprenons."
        </blockquote>
        <div className="flex items-center justify-center space-x-4">
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
            <Icon name="Quote" size={20} className="text-accent" />
          </div>
          <div className="text-left">
            <div className="font-cta font-semibold text-primary">
              Mohammed Belkacem
            </div>
            <div className="font-cta text-sm text-text-secondary">
              CEO & Founder, MCCT Industry
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineeredTrustSection;
