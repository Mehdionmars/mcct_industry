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
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'Eye' },
    // { id: 'technical', label: 'Spécifications', icon: 'Settings' },
    // { id: 'timeline', label: 'Chronologie', icon: 'Clock' },
    // { id: 'testimonial', label: 'Témoignage', icon: 'MessageSquare' }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-industrial-lg max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Building" size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-headline text-base sm:text-xl font-bold text-primary truncate">
                {project?.title}
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} className="sm:w-3.5 sm:h-3.5" />
                  <span className="truncate">{project?.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} className="sm:w-3.5 sm:h-3.5" />
                  <span>Complété en {project?.completionYear}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {/* {project?.hasVirtualTour && (
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
            )} */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Icon name="X" size={18} className="text-text-secondary sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row h-auto md:h-[calc(90vh-120px)]">
          {/* Image Gallery */}
          <div className="w-full md:w-1/2 relative bg-gray-900 h-64 sm:h-80 md:h-full">
            <Image
              src={project?.gallery?.[currentImageIndex]}
              alt={`${project?.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain md:object-cover"
            />

            {/* Image Navigation */}
            {project?.gallery?.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
          <div className="w-full md:w-1/2 flex flex-col max-h-[60vh] md:max-h-full">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'text-accent border-b-2 border-accent bg-accent/5' :'text-text-secondary hover:text-primary'
                  }`}
                >
                  <Icon name={tab?.icon} size={14} className="sm:w-4 sm:h-4" />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-surface rounded-lg p-3 sm:p-4">
                      <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2">
                        <Icon name="Square" size={14} className="text-accent sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm font-medium text-text-secondary">Surface</span>
                      </div>
                      <p className="text-base sm:text-xl font-bold text-primary">
                        {formatNumber(project?.squareFootage)} m²
                      </p>
                    </div>
                    <div className="bg-surface rounded-lg p-3 sm:p-4">
                      <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2">
                        <Icon name="Weight" size={14} className="text-accent sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm font-medium text-text-secondary">Acier</span>
                      </div>
                      <p className="text-base sm:text-xl font-bold text-primary">
                        {formatNumber(project?.steelTonnage)} tonnes
                      </p>
                    </div>
                    <div className="bg-surface rounded-lg p-3 sm:p-4">
                      <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2">
                        <Icon name="Calendar" size={14} className="text-accent sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm font-medium text-text-secondary">Durée</span>
                      </div>
                      <p className="text-base sm:text-xl font-bold text-primary">
                        {project?.timeline} mois
                      </p>
                    </div>
                    <div className="bg-surface rounded-lg p-3 sm:p-4">
                      <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2">
                        <Icon name="Shield" size={14} className="text-success sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm font-medium text-text-secondary">Sécurité</span>
                      </div>
                      <p className="text-base sm:text-xl font-bold text-success">
                        {project?.safetyRecord} incidents
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-headline text-base sm:text-lg font-bold text-primary mb-2 sm:mb-3">
                      Description du Projet
                    </h4>
                    <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                      {project?.fullDescription || project?.description}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="font-headline text-base sm:text-lg font-bold text-primary mb-2 sm:mb-3">
                      Caractéristiques Principales
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {project?.keyFeatures?.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Icon name="Check" size={14} className="text-success flex-shrink-0 mt-0.5 sm:w-4 sm:h-4" />
                          <span className="text-text-secondary text-sm sm:text-base">{feature}</span>
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
            <div className="border-t border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={`${i < project?.rating ? 'text-warning fill-current' : 'text-gray-300'} sm:w-4 sm:h-4`}
                      />
                    ))}
                    <span className="text-text-secondary text-xs sm:text-sm ml-1 sm:ml-2">
                      {project?.rating}/5
                    </span>
                  </div>
                </div>

                {/* <div className="flex space-x-3">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;