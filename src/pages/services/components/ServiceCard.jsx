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
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col space-y-4 mb-6">
          {/* Informations principales du service */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${service?.bgColor}`}>
              <Icon name={service?.icon} size={24} className={`sm:w-8 sm:h-8 ${service?.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-headline text-lg sm:text-xl lg:text-2xl font-bold text-primary mb-1 sm:mb-2">{service?.title}</h3>
              <p className="text-sm sm:text-base text-text-secondary font-body">{service?.subtitle}</p>
            </div>
          </div>

          {/* Boutons en bas sur mobile */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1 bg-success/10 text-success px-2 sm:px-3 py-1 rounded-full">
              <Icon name="Shield" size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-cta font-medium">Certifié</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              aria-expanded={isExpanded}
              className="text-sm"
            >
              {isExpanded ? 'Réduire' : 'Développer'}
            </Button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {service?.stats?.map((stat, index) => (
            <div key={index} className="text-center p-3 sm:p-4 bg-surface rounded-lg">
              <div className="text-xl sm:text-2xl font-headline font-bold text-accent mb-1">{stat?.value}</div>
              <div className="text-xs sm:text-sm text-text-secondary font-cta">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Caractéristiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {service?.features?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-2 sm:space-x-3">
              <Icon name="CheckCircle" size={18} className="text-success flex-shrink-0 mt-0.5 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base text-text-primary font-body">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contenu développé */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          {/* Navigation des onglets */}
          <div className="flex border-b border-gray-200 bg-surface overflow-x-auto scrollbar-hide">
            {onglets.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={ongletActif === tab.id}
                aria-controls={`tab-panel-${tab.id}`}
                onClick={() => setOngletActif(tab.id)}
                className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-6 py-3 sm:py-4 font-cta font-medium transition-colors whitespace-nowrap ${
                  ongletActif === tab.id
                    ? 'text-accent border-b-2 border-accent bg-white'
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                <Icon name={tab.icon} size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="text-xs sm:text-sm md:text-base">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Contenu des onglets */}
          <div className="p-4 sm:p-6 lg:p-8">
            {ongletActif === 'overview' && <OverviewTab service={service} />}
            {ongletActif === 'process' && <ProcessTab service={service} />}
            {ongletActif === 'specs' && <SpecsTab service={service} />}
            {ongletActif === 'projects' && <ProjectsTab service={service} />}
            {ongletActif === 'gallery' && <GalleryTab service={service} />}
          </div>

          {/* Pied de carte */}
          <div className="border-t border-gray-200 p-4 sm:p-6 bg-surface">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="w-full sm:w-auto">
                <h5 className="font-cta font-semibold text-primary mb-1 text-base sm:text-lg">Prêt à démarrer ?</h5>
                <p className="text-text-secondary font-body text-xs sm:text-sm">Contactez nos experts pour une solution personnalisée.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button variant="outline" iconName="Phone" iconPosition="left" className="w-full sm:w-auto text-sm sm:text-base justify-center">
                  Appeler un expert
                </Button>
                <Button variant="default" className="bg-accent hover:bg-accent/90 w-full sm:w-auto text-sm sm:text-base justify-center" iconName="MessageSquare" iconPosition="left">
                  Demander un devis
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
