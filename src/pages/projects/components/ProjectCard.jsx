import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails, onVirtualTour }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR')?.format(num);
  };

  const getIndustryIcon = (industry) => {
    const icons = {
      'Manufacturing': 'Factory',
      'Energy': 'Zap',
      'Chemical Processing': 'Beaker',
      'Logistics': 'Truck'
    };
    return icons?.[industry] || 'Building';
  };

  const getComplexityColor = (complexity) => {
    const colors = {
      'High': 'text-error bg-error/10',
      'Medium': 'text-warning bg-warning/10',
      'Low': 'text-success bg-success/10'
    };
    return colors?.[complexity] || 'text-text-secondary bg-muted';
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-industrial hover:shadow-industrial-lg transition-all duration-300 overflow-hidden group industrial-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project?.image}
          alt={project?.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay with Quick Stats */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="grid grid-cols-2 gap-2 text-white text-xs">
              <div className="flex items-center space-x-1">
                <Icon name="Square" size={12} />
                <span>{formatNumber(project?.squareFootage)} m²</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Weight" size={12} />
                <span>{formatNumber(project?.steelTonnage)}t acier</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={12} />
                <span>{project?.timeline} mois</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={12} />
                <span>{project?.safetyRecord} incidents</span>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Badge */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-primary">
            <Icon name={getIndustryIcon(project?.industry)} size={12} />
            <span>{project?.industry}</span>
          </div>
        </div>

        {/* Complexity Badge */}
        <div className="absolute top-4 right-4">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(project?.complexity)}`}>
            {project?.complexity === 'High' ? 'Complexité Élevée' : 
             project?.complexity === 'Medium' ? 'Complexité Moyenne' : 'Complexité Faible'}
          </div>
        </div>

        {/* Virtual Tour Badge */}
        {project?.hasVirtualTour && (
          <div className="absolute bottom-4 right-4">
            <button
              onClick={() => onVirtualTour(project)}
              className="bg-accent hover:bg-accent/90 text-white p-2 rounded-full transition-colors duration-200"
              title="Visite virtuelle 360°"
            >
              <Icon name="Camera" size={16} />
            </button>
          </div>
        )}
      </div>
      {/* Project Content */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="font-headline text-lg font-bold text-primary mb-1 line-clamp-2">
            {project?.title}
          </h3>
          <div className="flex items-center text-text-secondary text-sm">
            <Icon name="MapPin" size={14} className="mr-1" />
            <span>{project?.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
          {project?.description}
        </p>

        {/* Key Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {project?.keyFeatures?.slice(0, 3)?.map((feature, index) => (
              <span
                key={index}
                className="bg-surface text-text-secondary px-2 py-1 rounded text-xs font-medium"
              >
                {feature}
              </span>
            ))}
            {project?.keyFeatures?.length > 3 && (
              <span className="text-text-secondary text-xs px-2 py-1">
                +{project?.keyFeatures?.length - 3} autres
              </span>
            )}
          </div>
        </div>

        {/* Client Info */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <Icon name="Building" size={14} className="text-white" />
            </div>
            <div>
              <p className="font-medium text-primary text-sm">{project?.client}</p>
              <p className="text-text-secondary text-xs">{project?.completionYear}</p>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={12}
                className={i < project?.rating ? 'text-warning fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(project)}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
            className="flex-1"
          >
            Voir Détails
          </Button>
          
          <Button
            variant="default"
            size="sm"
            className="bg-accent hover:bg-accent/90 text-white"
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={14}
          >
            Étude de Cas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;