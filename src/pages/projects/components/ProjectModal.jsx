import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose, onVirtualTour }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !project) return null;

  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR')?.format(num);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'Eye' },
    { id: 'technical', label: 'Spécifications', icon: 'Settings' },
    { id: 'timeline', label: 'Chronologie', icon: 'Clock' },
    { id: 'testimonial', label: 'Témoignage', icon: 'MessageSquare' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project?.gallery?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project?.gallery?.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-industrial-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Building" size={24} className="text-white" />
            </div>
            <div>
              <h2 className="font-headline text-xl font-bold text-primary">
                {project?.title}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{project?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>Complété en {project?.completionYear}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {project?.hasVirtualTour && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onVirtualTour(project)}
                iconName="Camera"
                iconPosition="left"
                iconSize={16}
              >
                Visite 360°
              </Button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Icon name="X" size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-120px)]">
          {/* Image Gallery */}
          <div className="w-1/2 relative bg-gray-900">
            <Image
              src={project?.gallery?.[currentImageIndex]}
              alt={`${project?.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            {project?.gallery?.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {project?.gallery?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Details Panel */}
          <div className="w-1/2 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab?.id
                      ? 'text-accent border-b-2 border-accent bg-accent/5' :'text-text-secondary hover:text-primary'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Square" size={16} className="text-accent" />
                        <span className="text-sm font-medium text-text-secondary">Surface</span>
                      </div>
                      <p className="text-xl font-bold text-primary">
                        {formatNumber(project?.squareFootage)} m²
                      </p>
                    </div>
                    <div className="bg-surface rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Weight" size={16} className="text-accent" />
                        <span className="text-sm font-medium text-text-secondary">Acier</span>
                      </div>
                      <p className="text-xl font-bold text-primary">
                        {formatNumber(project?.steelTonnage)} tonnes
                      </p>
                    </div>
                    <div className="bg-surface rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Calendar" size={16} className="text-accent" />
                        <span className="text-sm font-medium text-text-secondary">Durée</span>
                      </div>
                      <p className="text-xl font-bold text-primary">
                        {project?.timeline} mois
                      </p>
                    </div>
                    <div className="bg-surface rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Shield" size={16} className="text-success" />
                        <span className="text-sm font-medium text-text-secondary">Sécurité</span>
                      </div>
                      <p className="text-xl font-bold text-success">
                        {project?.safetyRecord} incidents
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-headline text-lg font-bold text-primary mb-3">
                      Description du Projet
                    </h4>
                    <p className="text-text-secondary leading-relaxed">
                      {project?.fullDescription || project?.description}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="font-headline text-lg font-bold text-primary mb-3">
                      Caractéristiques Principales
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {project?.keyFeatures?.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon name="Check" size={16} className="text-success" />
                          <span className="text-text-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'technical' && (
                <div className="space-y-6">
                  <h4 className="font-headline text-lg font-bold text-primary">
                    Spécifications Techniques
                  </h4>
                  
                  <div className="space-y-4">
                    {project?.technicalSpecs?.map((spec, index) => (
                      <div key={index} className="border-l-4 border-accent pl-4">
                        <h5 className="font-medium text-primary mb-1">{spec?.category}</h5>
                        <p className="text-text-secondary text-sm">{spec?.details}</p>
                      </div>
                    )) || (
                      <div className="text-center py-8">
                        <Icon name="FileText" size={48} className="text-text-secondary mx-auto mb-4" />
                        <p className="text-text-secondary">
                          Spécifications techniques détaillées disponibles sur demande
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-6">
                  <h4 className="font-headline text-lg font-bold text-primary">
                    Chronologie du Projet
                  </h4>
                  
                  <div className="space-y-4">
                    {project?.projectTimeline?.map((phase, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h5 className="font-medium text-primary">{phase?.phase}</h5>
                          <p className="text-text-secondary text-sm">{phase?.duration}</p>
                          <p className="text-text-secondary text-sm mt-1">{phase?.description}</p>
                        </div>
                      </div>
                    )) || (
                      <div className="text-center py-8">
                        <Icon name="Clock" size={48} className="text-text-secondary mx-auto mb-4" />
                        <p className="text-text-secondary">
                          Chronologie détaillée disponible sur demande
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'testimonial' && (
                <div className="space-y-6">
                  <h4 className="font-headline text-lg font-bold text-primary">
                    Témoignage Client
                  </h4>
                  
                  {project?.testimonial ? (
                    <div className="bg-surface rounded-lg p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                          <Icon name="User" size={20} className="text-white" />
                        </div>
                        <div>
                          <h5 className="font-medium text-primary">{project?.testimonial?.author}</h5>
                          <p className="text-text-secondary text-sm">{project?.testimonial?.position}</p>
                          <p className="text-text-secondary text-sm">{project?.client}</p>
                        </div>
                      </div>
                      <blockquote className="text-text-secondary italic leading-relaxed">
                        "{project?.testimonial?.content}"
                      </blockquote>
                      <div className="flex items-center mt-4">
                        {[...Array(5)]?.map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={16}
                            className={i < project?.rating ? 'text-warning fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Icon name="MessageSquare" size={48} className="text-text-secondary mx-auto mb-4" />
                      <p className="text-text-secondary">
                        Témoignage client disponible sur demande
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={i < project?.rating ? 'text-warning fill-current' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-text-secondary text-sm ml-2">
                      {project?.rating}/5
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Télécharger PDF
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-accent hover:bg-accent/90 text-white"
                    iconName="MessageSquare"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Discuter du Projet
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;