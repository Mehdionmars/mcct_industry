import React from "react";
import Icon from '../../../../components/AppIcon';

const SpecsTab = () => {
  const specs = [
    { label: "Matériaux", value: "Acier, Aluminium, Béton renforcé" },
    { label: "Normes", value: "ISO 9001, ISO 45001, EN 1090" },
    { label: "Capacité", value: "Jusqu’à 10 000 m²" },
    { label: "Durabilité", value: "Conçu pour résister 50+ ans" }
  ];

  return (
    <div className="space-y-6">
      <h3 className="font-headline text-2xl font-bold text-primary text-center">
        Spécifications Techniques
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specs.map((spec, index) => (
          <div key={index} className="p-6 bg-white rounded-xl shadow-industrial flex items-center justify-between">
            <div className="font-cta text-primary font-semibold">{spec.label}</div>
            <div className="text-text-secondary text-sm">{spec.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecsTab;
