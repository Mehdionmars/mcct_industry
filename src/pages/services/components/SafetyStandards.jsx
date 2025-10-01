import React from 'react';
import Icon from '../../../components/AppIcon';

const SafetyStandards = () => {
  const certifications = [
    {
      id: 1,
      name: "ISO 45001:2018",
      description: "Gestion de la santé et de la sécurité au travail",
      icon: "Shield",
      status: "Certifié",
      validUntil: "2025-12-31",
      color: "text-success"
    },
    {
      id: 2,
      name: "ISO 9001:2015",
      description: "Systèmes de gestion de la qualité",
      icon: "Award",
      status: "Certifié",
      validUntil: "2025-08-15",
      color: "text-success"
    },
    {
      id: 3,
      name: "ISO 14001:2015",
      description: "Systèmes de management environnemental",
      icon: "Leaf",
      status: "Certifié",
      validUntil: "2025-10-20",
      color: "text-success"
    },
    {
      id: 4,
      name: "OHSAS 18001",
      description: "Évaluation santé et sécurité au travail",
      icon: "HardHat",
      status: "Certifié",
      validUntil: "2025-06-30",
      color: "text-success"
    },
    {
      id: 5,
      name: "EN 1090 Classe d’exécution 4",
      description: "Certification des structures en acier et aluminium",
      icon: "Building",
      status: "Certifié",
      validUntil: "2026-03-15",
      color: "text-success"
    },
    {
      id: 6,
      name: "Directive ATEX 2014/34/UE",
      description: "Équipements pour atmosphères explosives",
      icon: "Zap",
      status: "Certifié",
      validUntil: "2025-11-10",
      color: "text-success"
    }
  ];

  const safetyStats = [
    {
      value: "0",
      label: "Incidents avec arrêt de travail",
      period: "2024 YTD",
      icon: "Shield",
      color: "text-success"
    },
    {
      value: "2,5M+",
      label: "Heures de travail sécurisées",
      period: "24 derniers mois",
      icon: "Clock",
      color: "text-accent"
    },
    {
      value: "100%",
      label: "Conformité aux formations sécurité",
      period: "Tout le personnel",
      icon: "GraduationCap",
      color: "text-success"
    },
    {
      value: "24/7",
      label: "Assistance sécurité",
      period: "Disponible en permanence",
      icon: "Phone",
      color: "text-warning"
    }
  ];

  const safetyProtocols = [
    {
      category: "Sécurité avant projet",
      protocols: [
        "Évaluation complète des risques et identification des dangers",
        "Élaboration d’un plan de sécurité spécifique au site",
        "Formation et vérification des certifications du personnel",
        "Inspection des équipements et vérification de conformité"
      ]
    },
    {
      category: "Mesures de sécurité sur site",
      protocols: [
        "Briefings quotidiens et causeries sécurité",
        "Surveillance et supervision continues",
        "Application stricte des équipements de protection individuelle (EPI)",
        "Audits réguliers et vérifications de conformité"
      ]
    },
    {
      category: "Procédures d’urgence",
      protocols: [
        "Disponibilité d’une équipe 24/7",
        "Signalement et enquête immédiats des incidents",
        "Protocoles médicaux d’urgence",
        "Procédures d’évacuation et contacts d’urgence"
      ]
    },
    {
      category: "Assurance qualité",
      protocols: [
        "Revue régulière des performances sécurité",
        "Mise en œuvre de programmes d’amélioration continue",
        "Rapports transparents aux clients",
        "Audits et évaluations par des tiers"
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="industrial-container">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full mb-6">
            <Icon name="Shield" size={20} />
            <span className="font-cta font-medium text-sm tracking-wide">EXCELLENCE EN SÉCURITÉ</span>
          </div>
          <h2 className="font-headline text-3xl lg:text-4xl font-bold text-primary mb-4">
            Normes de sécurité intransigeantes
          </h2>
          <p className="text-text-secondary font-body text-lg max-w-3xl mx-auto">
            Notre engagement en matière de sécurité va au-delà de la conformité. Nous respectons les normes les plus élevées de l’industrie pour protéger nos équipes, vos installations et l’environnement.
          </p>
        </div>

        {/* Statistiques sécurité */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {safetyStats?.map((stat, index) => (
            <div key={index} className="bg-surface rounded-xl p-6 text-center industrial-hover">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                stat?.color === 'text-success' ? 'bg-success/10' :
                stat?.color === 'text-accent'? 'bg-accent/10' : 'bg-warning/10'
              }`}>
                <Icon name={stat?.icon} size={32} className={stat?.color} />
              </div>
              <div className="text-3xl lg:text-4xl font-headline font-bold text-primary mb-2">
                {stat?.value}
              </div>
              <div className="font-cta font-semibold text-primary mb-1">{stat?.label}</div>
              <div className="text-sm text-text-secondary">{stat?.period}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="font-headline text-2xl font-bold text-primary text-center mb-8">
            Certifications & Conformité
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications?.map((cert) => (
              <div key={cert?.id} className="bg-white border border-gray-200 rounded-xl p-6 industrial-hover shadow-industrial">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    cert?.color === 'text-success' ? 'bg-success/10' : 'bg-accent/10'
                  }`}>
                    <Icon name={cert?.icon} size={24} className={cert?.color} />
                  </div>
                  <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full">
                    <Icon name="CheckCircle" size={14} />
                    <span className="text-xs font-cta font-medium">{cert?.status}</span>
                  </div>
                </div>
                <h4 className="font-cta font-bold text-primary mb-2">{cert?.name}</h4>
                <p className="text-text-secondary font-body text-sm mb-4">{cert?.description}</p>
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>Valide jusqu’au :</span>
                  <span className="font-cta font-medium">{new Date(cert.validUntil)?.toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protocoles sécurité */}
        <div className="bg-surface rounded-2xl p-8 lg:p-12">
          <h3 className="font-headline text-2xl font-bold text-primary text-center mb-12">
            Protocoles de sécurité complets
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {safetyProtocols?.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-industrial">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="CheckSquare" size={20} className="text-accent" />
                  </div>
                  <h4 className="font-cta font-bold text-primary">{category?.category}</h4>
                </div>
                <ul className="space-y-3">
                  {category?.protocols?.map((protocol, protocolIndex) => (
                    <li key={protocolIndex} className="flex items-start space-x-3">
                      <Icon name="ArrowRight" size={16} className="text-accent flex-shrink-0 mt-1" />
                      <span className="text-text-primary font-body text-sm">{protocol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Sécurité */}
        <div className="mt-16 bg-gradient-to-r from-warning/10 to-accent/10 rounded-2xl p-8 lg:p-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Phone" size={40} className="text-warning" />
            </div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-4">
              Assistance sécurité 24/7
            </h3>
            <p className="text-text-secondary font-body text-lg mb-8 max-w-2xl mx-auto">
              Notre équipe dédiée est disponible en permanence pour gérer tout incident de sécurité, panne d’équipement ou besoin urgent de maintenance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="font-headline text-2xl font-bold text-primary mb-2">Hotline</div>
                <div className="font-cta text-lg text-accent font-semibold">+33 1 23 45 67 89</div>
                <div className="text-sm text-text-secondary mt-1">Disponible 24/7/365</div>
              </div>
              <div className="text-center">
                <div className="font-headline text-2xl font-bold text-primary mb-2">Délai d’intervention</div>
                <div className="font-cta text-lg text-accent font-semibold">&lt; 2 heures</div>
                <div className="text-sm text-text-secondary mt-1">Arrivée sur site</div>
              </div>
              <div className="text-center">
                <div className="font-headline text-2xl font-bold text-primary mb-2">Zone de couverture</div>
                <div className="font-cta text-lg text-accent font-semibold">toute l'Afrique</div>
                <div className="text-sm text-text-secondary mt-1">Support multi-sites</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyStandards;
