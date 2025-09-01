import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  projectCounts,
  isFilterActive 
}) => {
  const industries = [
    { value: 'all', label: 'Toutes Industries', icon: 'Building' },
    { value: 'Manufacturing', label: 'Fabrication', icon: 'Factory' },
    { value: 'Energy', label: 'Énergie', icon: 'Zap' },
    { value: 'Chemical Processing', label: 'Chimie', icon: 'Beaker' },
    { value: 'Logistics', label: 'Logistique', icon: 'Truck' }
  ];

  const scales = [
    { value: 'all', label: 'Toutes Échelles' },
    { value: 'small', label: 'Petit (< 5,000 m²)' },
    { value: 'medium', label: 'Moyen (5,000-20,000 m²)' },
    { value: 'large', label: 'Grand (> 20,000 m²)' }
  ];

  const complexities = [
    { value: 'all', label: 'Toute Complexité' },
    { value: 'Low', label: 'Faible' },
    { value: 'Medium', label: 'Moyenne' },
    { value: 'High', label: 'Élevée' }
  ];

  const timelines = [
    { value: 'all', label: 'Toute Durée' },
    { value: 'short', label: 'Court (< 12 mois)' },
    { value: 'medium', label: 'Moyen (12-24 mois)' },
    { value: 'long', label: 'Long (> 24 mois)' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Plus Récents' },
    { value: 'oldest', label: 'Plus Anciens' },
    { value: 'scale', label: 'Par Échelle' },
    { value: 'rating', label: 'Par Note' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-industrial p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Filter" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-bold text-primary">
              Filtres de Projets
            </h3>
            <p className="text-text-secondary text-sm">
              {projectCounts?.total} projets • {projectCounts?.filtered} affichés
            </p>
          </div>
        </div>

        {isFilterActive && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Effacer Filtres
          </Button>
        )}
      </div>
      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Industry Filter */}
        <div>
          <label className="block text-sm font-medium text-primary mb-3">
            SectMAD d'Activité
          </label>
          <div className="space-y-2">
            {industries?.map((industry) => (
              <button
                key={industry?.value}
                onClick={() => onFilterChange('industry', industry?.value)}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filters?.industry === industry?.value
                    ? 'bg-accent text-white' :'bg-surface hover:bg-accent/10 text-text-primary hover:text-accent'
                }`}
              >
                <Icon name={industry?.icon} size={16} />
                <span>{industry?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scale Filter */}
        <div>
          <label className="block text-sm font-medium text-primary mb-3">
            Échelle du Projet
          </label>
          <div className="space-y-2">
            {scales?.map((scale) => (
              <button
                key={scale?.value}
                onClick={() => onFilterChange('scale', scale?.value)}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filters?.scale === scale?.value
                    ? 'bg-accent text-white' :'bg-surface hover:bg-accent/10 text-text-primary hover:text-accent'
                }`}
              >
                {scale?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Complexity Filter */}
        <div>
          <label className="block text-sm font-medium text-primary mb-3">
            Complexité Technique
          </label>
          <div className="space-y-2">
            {complexities?.map((complexity) => (
              <button
                key={complexity?.value}
                onClick={() => onFilterChange('complexity', complexity?.value)}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filters?.complexity === complexity?.value
                    ? 'bg-accent text-white' :'bg-surface hover:bg-accent/10 text-text-primary hover:text-accent'
                }`}
              >
                {complexity?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Filter */}
        <div>
          <label className="block text-sm font-medium text-primary mb-3">
            Durée de Réalisation
          </label>
          <div className="space-y-2">
            {timelines?.map((timeline) => (
              <button
                key={timeline?.value}
                onClick={() => onFilterChange('timeline', timeline?.value)}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filters?.timeline === timeline?.value
                    ? 'bg-accent text-white' :'bg-surface hover:bg-accent/10 text-text-primary hover:text-accent'
                }`}
              >
                {timeline?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-primary mb-3">
            Trier par
          </label>
          <div className="space-y-2">
            {sortOptions?.map((sort) => (
              <button
                key={sort?.value}
                onClick={() => onFilterChange('sort', sort?.value)}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  filters?.sort === sort?.value
                    ? 'bg-accent text-white' :'bg-surface hover:bg-accent/10 text-text-primary hover:text-accent'
                }`}
              >
                {sort?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Quick Filters */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Zap" size={16} className="text-accent" />
          <span className="text-sm font-medium text-primary">Filtres Rapides</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange('featured', !filters?.featured)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
              filters?.featured
                ? 'bg-accent text-white' :'bg-surface hover:bg-accent/10 text-text-primary hover:text-accent'
            }`}
          >
            Projets Phares
          </button>
          <button
            onClick={() => onFilterChange('hasVirtualTour', !filters?.hasVirtualTour)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
              filters?.hasVirtualTour
                ? 'bg-accent text-white' :'bg-surface hover:bg-accent/10 text-text-primary hover:text-accent'
            }`}
          >
            Visite Virtuelle
          </button>
          <button
            onClick={() => onFilterChange('awardWinning', !filters?.awardWinning)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
              filters?.awardWinning
                ? 'bg-accent text-white' :'bg-surface hover:bg-accent/10 text-text-primary hover:text-accent'
            }`}
          >
            Primés
          </button>
          <button
            onClick={() => onFilterChange('sustainableBuild', !filters?.sustainableBuild)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
              filters?.sustainableBuild
                ? 'bg-accent text-white' :'bg-surface hover:bg-accent/10 text-text-primary hover:text-accent'
            }`}
          >
            Construction Durable
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;