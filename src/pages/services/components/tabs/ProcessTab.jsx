import React from "react";
import Icon from "../../../../components/AppIcon";

const ProcessTab = () => {
  const steps = [
    {
      title: "Planification",
      description: "Établir une feuille de route détaillée et stratégique.",
      icon: "ClipboardList",
    },
    {
      title: "Conception",
      description: "Traduire les besoins en solutions techniques concrètes.",
      icon: "PenTool",
    },
    {
      title: "Construction",
      description: "Exécuter avec rigueur et précision sur le terrain.",
      icon: "Hammer",
    },
    {
      title: "Contrôle qualité",
      description: "Vérifier chaque étape pour garantir l’excellence.",
      icon: "ShieldCheck",
    },
  ];

  return (
    <div className="space-y-10">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start space-x-4">
          <Icon name={step.icon} size={32} className="text-accent flex-shrink-0" />
          <div>
            <h3 className="font-headline text-xl font-bold mb-2">{step.title}</h3>
            <p className="font-body text-white/80">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessTab;
