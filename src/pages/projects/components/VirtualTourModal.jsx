import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VirtualTourModal = ({ project, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('exterior');

  if (!isOpen || !project) return null;

  const tourViews = [
    { id: 'exterior', label: 'Vue Extérieure', icon: 'Building' },
    { id: 'interior', label: 'Vue Intérieure', icon: 'Home' },
    { id: 'aerial', label: 'Vue Aérienne', icon: 'Plane' },
    { id: 'technical', label: 'Zones Techniques', icon: 'Settings' }
  ];

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Mock 360° tour URLs - in real implementation, these would be actual tour URLs
  const getTourUrl = (view) => {
    const baseUrl = "https://www.google.com/maps/embed";
    const coords = project?.coordinates || { lat: 48.8566, lng: 2.3522 }; // Default to Paris
    return `${baseUrl}?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d${coords?.lng}!3d${coords?.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzI0LjAiTiAywrAyMScwNy45IkU!5e0!3m2!1sfr!2sfr!4v1640995200000!5m2!1sfr!2sfr`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-industrial-lg max-w-7xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary to-secondary">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name="Camera" size={24} className="text-white" />
            </div>
            <div>
              <h2 className="font-headline text-xl font-bold text-white">
                Visite Virtuelle 360°
              </h2>
              <p className="text-white/80 text-sm">
                {project?.title} - {project?.location}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Controls */}
            <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
              {tourViews?.map((view) => (
                <button
                  key={view?.id}
                  onClick={() => {
                    setCurrentView(view?.id);
                    setIsLoading(true);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentView === view?.id
                      ? 'bg-white text-primary' :'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon name={view?.icon} size={16} />
                  <span className="hidden md:inline">{view?.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              <Icon name="X" size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Tour Content */}
        <div className="relative h-[calc(95vh-120px)] bg-gray-900">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white text-lg font-medium">
                  Chargement de la visite virtuelle...
                </p>
                <p className="text-white/60 text-sm mt-2">
                  Préparation de la vue {tourViews?.find(v => v?.id === currentView)?.label?.toLowerCase()}
                </p>
              </div>
            </div>
          )}

          {/* 360° Tour Iframe */}
          <iframe
            src={getTourUrl(currentView)}
            className="w-full h-full border-0"
            loading="lazy"
            title={`Visite virtuelle 360° - ${project?.title} - ${tourViews?.find(v => v?.id === currentView)?.label}`}
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={handleIframeLoad}
            allowFullScreen
          />

          {/* Tour Controls Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                {/* Current View Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <Icon 
                      name={tourViews?.find(v => v?.id === currentView)?.icon || 'Camera'} 
                      size={20} 
                      className="text-white" 
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">
                      {tourViews?.find(v => v?.id === currentView)?.label}
                    </h4>
                    <p className="text-white/60 text-sm">
                      Utilisez la souris pour naviguer • Molette pour zoomer
                    </p>
                  </div>
                </div>

                {/* Tour Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    iconName="Maximize"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Plein Écran
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    iconName="Share"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Partager
                  </Button>
                </div>
              </div>

              {/* Navigation Hints */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-white/80">
                    <Icon name="Mouse" size={16} />
                    <span>Clic + glisser pour regarder autour</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/80">
                    <Icon name="MousePointer" size={16} />
                    <span>Molette pour zoomer/dézoomer</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/80">
                    <Icon name="Smartphone" size={16} />
                    <span>Compatible mobile et tablette</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Info Sidebar */}
          <div className="absolute top-6 right-6 w-80 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-industrial">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Info" size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-headline text-base font-bold text-primary">
                  Informations Projet
                </h4>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Surface totale:</span>
                <span className="font-medium text-primary">
                  {new Intl.NumberFormat('fr-FR')?.format(project?.squareFootage)} m²
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Acier utilisé:</span>
                <span className="font-medium text-primary">
                  {new Intl.NumberFormat('fr-FR')?.format(project?.steelTonnage)} tonnes
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Durée construction:</span>
                <span className="font-medium text-primary">{project?.timeline} mois</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Année d'achèvement:</span>
                <span className="font-medium text-primary">{project?.completionYear}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Client:</span>
                <span className="font-medium text-primary">{project?.client}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <Button
                variant="default"
                size="sm"
                fullWidth
                className="bg-accent hover:bg-accent/90 text-white"
                iconName="MessageSquare"
                iconPosition="left"
                iconSize={16}
              >
                Discuter de ce Projet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTourModal;