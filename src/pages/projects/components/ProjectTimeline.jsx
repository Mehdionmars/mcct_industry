import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectTimeline = ({ projects, onProjectSelect }) => {
  const [selectedYear, setSelectedYear] = useState(null);

  // Group projects by year
  const projectsByYear = projects?.reduce((acc, project) => {
    const year = project?.completionYear;
    if (!acc?.[year]) {
      acc[year] = [];
    }
    acc?.[year]?.push(project);
    return acc;
  }, {});

  const years = Object.keys(projectsByYear)?.sort((a, b) => b - a);

  const getYearStats = (year) => {
    const yearProjects = projectsByYear?.[year];
    return {
      count: yearProjects?.length,
      totalValue: yearProjects?.reduce((sum, p) => sum + (p?.projectValue || 0), 0),
      totalArea: yearProjects?.reduce((sum, p) => sum + p?.squareFootage, 0),
      industries: [...new Set(yearProjects.map(p => p.industry))]?.length
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('fr-FR')?.format(num);
  };

  return (
    <div className="bg-white rounded-lg shadow-industrial p-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <Icon name="Clock" size={24} className="text-white" />
        </div>
        <div>
          <h3 className="font-headline text-xl font-bold text-primary">
            Chronologie des Projets
          </h3>
          <p className="text-text-secondary">
            Évolution de nos capacités et réalisations au fil des années
          </p>
        </div>
      </div>
      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-secondary"></div>

        {/* Year Entries */}
        <div className="space-y-8">
          {years?.map((year, index) => {
            const stats = getYearStats(year);
            const isSelected = selectedYear === year;
            const yearProjects = projectsByYear?.[year];

            return (
              <div key={year} className="relative">
                {/* Year Marker */}
                <div className="flex items-center">
                  <div className="relative z-10 w-16 h-16 bg-white border-4 border-accent rounded-full flex items-center justify-center shadow-industrial">
                    <span className="font-headline text-lg font-bold text-accent">
                      {year}
                    </span>
                  </div>

                  {/* Year Stats */}
                  <div className="ml-6 flex-1">
                    <button
                      onClick={() => setSelectedYear(isSelected ? null : year)}
                      className="w-full text-left bg-surface hover:bg-accent/5 rounded-lg p-4 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-headline text-lg font-bold text-primary">
                          Année {year}
                        </h4>
                        <Icon 
                          name={isSelected ? "ChevronUp" : "ChevronDown"} 
                          size={20} 
                          className="text-accent" 
                        />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Icon name="Building" size={16} className="text-primary" />
                          <span className="text-text-secondary">
                            <strong className="text-primary">{stats?.count}</strong> projets
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Euro" size={16} className="text-success" />
                          <span className="text-text-secondary">
                            <strong className="text-primary">{formatCurrency(stats?.totalValue)}</strong>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Square" size={16} className="text-accent" />
                          <span className="text-text-secondary">
                            <strong className="text-primary">{formatNumber(stats?.totalArea)}</strong> m²
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Factory" size={16} className="text-secondary" />
                          <span className="text-text-secondary">
                            <strong className="text-primary">{stats?.industries}</strong> secteurs
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
                {/* Expanded Project Details */}
                {isSelected && (
                  <div className="ml-16 mt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
                    {yearProjects?.map((project) => (
                      <div
                        key={project?.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-industrial transition-shadow duration-200"
                      >
                        <div className="flex items-start space-x-4">
                          {/* Project Image */}
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={project?.image}
                              alt={project?.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Project Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h5 className="font-headline text-base font-bold text-primary mb-1 truncate">
                                  {project?.title}
                                </h5>
                                <div className="flex items-center space-x-4 text-sm text-text-secondary mb-2">
                                  <div className="flex items-center space-x-1">
                                    <Icon name="MapPin" size={12} />
                                    <span>{project?.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Icon name="Calendar" size={12} />
                                    <span>{project?.timeline} mois</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Icon name="Building" size={12} />
                                    <span>{project?.client}</span>
                                  </div>
                                </div>
                                <p className="text-text-secondary text-sm line-clamp-2">
                                  {project?.description}
                                </p>
                              </div>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onProjectSelect(project)}
                                iconName="Eye"
                                iconPosition="right"
                                iconSize={14}
                              >
                                Voir
                              </Button>
                            </div>

                            {/* Project Metrics */}
                            <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-gray-100">
                              <div className="flex items-center space-x-1 text-xs text-text-secondary">
                                <Icon name="Square" size={12} />
                                <span>{formatNumber(project?.squareFootage)} m²</span>
                              </div>
                              <div className="flex items-center space-x-1 text-xs text-text-secondary">
                                <Icon name="Weight" size={12} />
                                <span>{formatNumber(project?.steelTonnage)}t</span>
                              </div>
                              <div className="flex items-center space-x-1 text-xs">
                                <Icon name="Star" size={12} className="text-warning" />
                                <span className="text-text-secondary">{project?.rating}/5</span>
                              </div>
                              {project?.hasVirtualTour && (
                                <div className="flex items-center space-x-1 text-xs text-accent">
                                  <Icon name="Camera" size={12} />
                                  <span>Visite 360°</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Timeline End Marker */}
        <div className="relative flex items-center mt-8">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-industrial">
            <Icon name="Rocket" size={24} className="text-white" />
          </div>
          <div className="ml-6">
            <h4 className="font-headline text-lg font-bold text-primary">
              L'Avenir Continue
            </h4>
            <p className="text-text-secondary">
              Nouveaux projets en cours de développement pour {new Date()?.getFullYear() + 1}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;