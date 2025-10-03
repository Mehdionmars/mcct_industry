import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import ProjectFilters from './components/ProjectFilters';
import ProjectTimeline from './components/ProjectTimeline';
import ProjectModal from './components/ProjectModal';
import projectsData from '../../data/projects';

const Projects = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    industry: 'all',
    scale: 'all',
    complexity: 'all',
    timeline: 'all',
    sort: 'recent',
    featured: false,
    hasVirtualTour: false,
    awardWinning: false,
    sustainableBuild: false
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [virtualTourProject, setVirtualTourProject] = useState(null);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);

  // Transforme l'objet en tableau
  const allProjects = Object.values(projectsData);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = [...allProjects];

    // Apply filters
    if (filters?.industry !== 'all') {
      filtered = filtered?.filter(p => p?.industry === filters?.industry);
    }

    if (filters?.scale !== 'all') {
      filtered = filtered?.filter(p => {
        if (filters?.scale === 'small') return p?.squareFootage < 5000;
        if (filters?.scale === 'medium') return p?.squareFootage >= 5000 && p?.squareFootage <= 20000;
        if (filters?.scale === 'large') return p?.squareFootage > 20000;
        return true;
      });
    }

    if (filters?.complexity !== 'all') {
      filtered = filtered?.filter(p => p?.complexity === filters?.complexity);
    }

    if (filters?.timeline !== 'all') {
      filtered = filtered?.filter(p => {
        if (filters?.timeline === 'short') return p?.timeline < 12;
        if (filters?.timeline === 'medium') return p?.timeline >= 12 && p?.timeline <= 24;
        if (filters?.timeline === 'long') return p?.timeline > 24;
        return true;
      });
    }

    if (filters?.featured) {
      filtered = filtered?.filter(p => p?.featured);
    }

    if (filters?.hasVirtualTour) {
      filtered = filtered?.filter(p => p?.hasVirtualTour);
    }

    if (filters?.awardWinning) {
      filtered = filtered?.filter(p => p?.awardWinning);
    }

    if (filters?.sustainableBuild) {
      filtered = filtered?.filter(p => p?.sustainableBuild);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (filters?.sort) {
        case 'recent':
          return b?.completionYear - a?.completionYear;
        case 'oldest':
          return a?.completionYear - b?.completionYear;
        case 'scale':
          return b?.squareFootage - a?.squareFootage;
        case 'rating':
          return b?.rating - a?.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, allProjects]);

  const projectCounts = {
    total: allProjects?.length,
    filtered: filteredProjects?.length
  };

  const isFilterActive = Object.values(filters)?.some(value => 
    value !== 'all' && value !== 'recent' && value !== false
  );

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      industry: 'all',
      scale: 'all',
      complexity: 'all',
      timeline: 'all',
      sort: 'recent',
      featured: false,
      hasVirtualTour: false,
      awardWinning: false,
      sustainableBuild: false
    });
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleVirtualTour = (project) => {
    setVirtualTourProject(project);
    setIsVirtualTourOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleCloseVirtualTour = () => {
    setIsVirtualTourOpen(false);
    setVirtualTourProject(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Projets - MCCT Industry | Excellence en Construction Métallique Industrielle</title>
        <meta name="description" content="Découvrez nos réalisations exceptionnelles en construction métallique industrielle. Projets dans la fabrication, l'énergie, la chimie et la logistique avec visites virtuelles 360°." />
        <meta name="keywords" content="projets industriels, construction métallique, réalisations MCCT, études de cas, excellence industrielle" />
        <meta property="og:title" content="Projets - MCCT Industry | Excellence en Construction Métallique" />
        <meta property="og:description" content="Explorez nos projets industriels exceptionnels avec visites virtuelles 360° et études de cas détaillées." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://mcct-industry.fr/projects" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-[120px] lg:pt-[140px] pb-12 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="industrial-container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-3 mb-9">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                  <Icon name="Building" size={32} className="text-white" />
                </div>
                <div className="text-left">
                  <h1 className="font-headline text-4xl lg:text-5xl font-bold text-white mb-2">
                    Nos Projets
                  </h1>
                  <p className="text-orange-500 font-mono text-sm tracking-wider">
                    EXCELLENCE • INNOVATION • RÉALISATIONS
                  </p>
                </div>
              </div>

              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Découvrez nos réalisations exceptionnelles en construction métallique industrielle.
                Chaque projet témoigne de notre expertise technique et de notre engagement envers l'excellence.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {/* <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">150+</div>
                  <div className="text-orange-500 font-mono text-sm tracking-wider">Projets Réalisés</div>
                </div> */}
                {/* <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">2M+</div>
                  <div className="text-orange-500 font-mono text-sm tracking-wider">m² Construits</div>
                </div> */}
                {/* <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">50K+</div>
                  <div className="text-orange-500 font-mono text-sm tracking-wider">Tonnes d'Acier</div>
                </div> */}
                {/* <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">98%</div>
                  <div className="text-orange-500 font-mono text-sm tracking-wider">Satisfaction Client</div>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="industrial-container">
            {/* Filters */}
            <ProjectFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              projectCounts={projectCounts}
              isFilterActive={isFilterActive}
            />

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-headline text-2xl font-bold text-primary mb-2">
                  Projets Sélectionnés
                </h2>
                <p className="text-text-secondary">
                  {filteredProjects?.length} projet{filteredProjects?.length !== 1 ? 's' : ''} 
                  {isFilterActive ? ' correspondant aux filtres' : ' au total'}
                </p>
              </div>

              <div className="flex items-center space-x-2 bg-surface rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-primary'
                  }`}
                >
                  <Icon name="Grid3X3" size={16} />
                  <span>Grille</span>
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'timeline' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-primary'
                  }`}
                >
                  <Icon name="Clock" size={16} />
                  <span>Chronologie</span>
                </button>
              </div>
            </div>

            {/* Projects Display */}
            {viewMode === 'grid' ? (
              <div className="precision-grid">
                {filteredProjects?.map((project) => (
                  <ProjectCard
                    key={project?.id}
                    project={project}
                    onViewDetails={handleViewDetails}
                    onVirtualTour={handleVirtualTour}
                  />
                ))}
              </div>
            ) : (
              <ProjectTimeline
                projects={filteredProjects}
                onProjectSelect={handleViewDetails}
              />
            )}

            {/* No Results */}
            {filteredProjects?.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Search" size={32} className="text-text-secondary" />
                </div>
                <h3 className="font-headline text-xl font-bold text-primary mb-2">
                  Aucun projet trouvé
                </h3>
                <p className="text-text-secondary mb-6">
                  Aucun projet ne correspond aux critères sélectionnés.
                </p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  iconName="RotateCcw"
                  iconPosition="left"
                  iconSize={16}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary">
          <div className="industrial-container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Icon name="MessageSquare" size={32} className="text-white" />
              </div>
              
              <h2 className="font-headline text-3xl lg:text-4xl font-bold text-white mb-4">
                Prêt à Démarrer Votre Projet ?
              </h2>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Discutons de vos besoins en construction métallique industrielle.
                Notre équipe d'experts est prête à transformer votre vision en réalité.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
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
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 font-cta font-medium"
                  iconName="Phone"
                  iconPosition="left"
                  iconSize={20}
                >
                  Consultation Gratuite
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onVirtualTour={handleVirtualTour}
        />

        {/* Virtual Tour Modal */}
        {/* <VirtualTourModal
          project={virtualTourProject}
          isOpen={isVirtualTourOpen}
          onClose={handleCloseVirtualTour}
        /> */}
      </div>
    </>
  );
};

export default Projects;