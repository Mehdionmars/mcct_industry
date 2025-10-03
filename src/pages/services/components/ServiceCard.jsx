import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

// Import des sous-composants (onglets)
import OverviewTab from './tabs/OverviewTab.jsx';
import ProcessTab from './tabs/ProcessTab.jsx';
import SpecsTab from './tabs/SpecsTab.jsx';
import ProjectsTab from './tabs/ProjectsTab.jsx';
import GalleryTab from './tabs/GalleryTab.jsx';

const ServiceCard = ({ service, isExpanded, onToggle }) => {
  const [ongletActif, setOngletActif] = useState('overview');
  const carteRef = useRef(null);

  // Gestion du clic à l’extérieur pour fermer la carte
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (carteRef.current && !carteRef.current.contains(event.target) && isExpanded) {
        onToggle();
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, onToggle]);

  // Liste des onglets
  const onglets = [
    { id: 'overview', label: 'Vue d’ensemble', icon: 'Eye' },
    { id: 'process', label: 'Processus', icon: 'GitBranch' },
    { id: 'specs', label: 'Spécifications', icon: 'FileText' },
    { id: 'projects', label: 'Projets', icon: 'Building' },
    { id: 'gallery', label: 'Galerie', icon: 'Image' }
  ];

  return (
    <div
      ref={carteRef}
      className={`bg-white rounded-xl shadow-industrial border border-gray-200 overflow-hidden transition-all duration-500 ${
        isExpanded ? 'col-span-full' : ''
      }`}
    >
      {/* En-tête de la carte */}
      <div className="p-6 lg:p-8">
        <div className="flex items-start justify-between mb-6">
          {/* Informations principales du service */}
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${service?.bgColor}`}>
              <Icon name={service?.icon} size={32} className={service?.iconColor} />
            </div>
            <div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-2">{service?.title}</h3>
              <p className="text-text-secondary font-body">{service?.subtitle}</p>
            </div>
          </div>

          {/* Boutons à droite */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-success/10 text-success px-3 py-1 rounded-full">
              <Icon name="Shield" size={16} />
              <span className="text-sm font-cta font-medium">Certifié</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              aria-expanded={isExpanded}
            >
              {isExpanded ? 'Réduire' : 'Développer'}
            </Button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {service?.stats?.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-surface rounded-lg">
              <div className="text-2xl font-headline font-bold text-accent mb-1">{stat?.value}</div>
              <div className="text-sm text-text-secondary font-cta">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Caractéristiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {service?.features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0" />
              <span className="text-text-primary font-body">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contenu développé */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          {/* Navigation des onglets */}
          <div className="flex border-b border-gray-200 bg-surface overflow-x-auto">
            {onglets.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={ongletActif === tab.id}
                aria-controls={`tab-panel-${tab.id}`}
                onClick={() => setOngletActif(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-cta font-medium transition-colors ${
                  ongletActif === tab.id
                    ? 'text-accent border-b-2 border-accent bg-white'
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                <Icon name={tab.icon} size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Contenu des onglets */}
          <div className="p-6 lg:p-8">
            {ongletActif === 'overview' && <OverviewTab service={service} />}
            {ongletActif === 'process' && <ProcessTab service={service} />}
            {ongletActif === 'specs' && <SpecsTab service={service} />}
            {ongletActif === 'projects' && <ProjectsTab service={service} />}
            {ongletActif === 'gallery' && <GalleryTab service={service} />}
          </div>

          {/* Pied de carte */}
          <div className="border-t border-gray-200 p-6 bg-surface">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div>
                <h5 className="font-cta font-semibold text-primary mb-1">Prêt à démarrer ?</h5>
                <p className="text-text-secondary font-body text-sm">Contactez nos experts pour une solution personnalisée.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" iconName="Phone" iconPosition="left">
                  Appeler un expert
                </Button>
<a href="/contact">
  <Button 
    variant="default" 
    className="bg-accent hover:bg-accent/90" 
    iconName="MessageSquare" 
    iconPosition="left"
  >
    Demander un devis
  </Button>
</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
