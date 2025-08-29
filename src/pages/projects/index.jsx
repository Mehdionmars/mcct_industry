import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import ProjectFilters from './components/ProjectFilters';
import ProjectTimeline from './components/ProjectTimeline';
import ProjectModal from './components/ProjectModal';
import VirtualTourModal from './components/VirtualTourModal';

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
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [virtualTourProject, setVirtualTourProject] = useState(null);

  // Mock projects data
  const allProjects = [
    {
      id: 1,
      title: "Centre de Production Automobile Renault",
      location: "Lyon, France",
      industry: "Manufacturing",
      client: "Renault Group",
      completionYear: 2023,
      squareFootage: 45000,
      steelTonnage: 2800,
      timeline: 18,
      safetyRecord: 0,
      complexity: "High",
      rating: 5,
      projectValue: 12500000,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
      description: "Complexe industriel moderne pour la production de véhicules électriques avec technologies de pointe et systèmes automatisés.",
      fullDescription: `Ce projet ambitieux représente l'avenir de la production automobile en France. Le centre intègre des technologies de fabrication de dernière génération pour la production de véhicules électriques, avec des systèmes robotisés avancés et des processus de production durables.\n\nLa structure métallique complexe a été conçue pour supporter des équipements lourds tout en maintenant une flexibilité maximale pour les futures évolutions technologiques.`,
      keyFeatures: [
        "Structure métallique haute résistance",
        "Systèmes de ventilation industrielle",
        "Ponts roulants 50 tonnes",
        "Certification ISO 14001",
        "Éclairage LED intelligent",
        "Systèmes anti-incendie avancés"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop"
      ],
      hasVirtualTour: true,
      featured: true,
      awardWinning: true,
      sustainableBuild: true,
      coordinates: { lat: 45.7640, lng: 4.8357 },
      testimonial: {
        author: "Pierre Dubois",
        position: "Directeur de Production",
        content: "MCCT Industry a livré un projet exceptionnel qui dépasse toutes nos attentes. La qualité de construction et le respect des délais ont été remarquables."
      },
      technicalSpecs: [
        {
          category: "Structure Principale",
          details: "Charpente métallique en acier S355, portées jusqu'à 40m sans appui intermédiaire"
        },
        {
          category: "Fondations",details: "Fondations profondes sur pieux forés, capacité portante 500 kN/m²"
        },
        {
          category: "Couverture",details: "Bac acier isolé, étanchéité membrane TPO, résistance au feu 2h"
        }
      ],
      projectTimeline: [
        {
          phase: "Études et conception",duration: "3 mois",description: "Analyse des besoins, conception détaillée et validation technique"
        },
        {
          phase: "Préparation du site",duration: "2 mois", description: "Terrassement, fondations et préparation des infrastructures"
        },
        {
          phase: "Montage structure",duration: "8 mois",description: "Assemblage de la charpente métallique et installation des équipements"
        },
        {
          phase: "Finitions et tests",duration: "5 mois",description: "Finitions, tests de sécurité et mise en service"
        }
      ]
    },
    {
      id: 2,
      title: "Centrale Solaire Thermique EDF",location: "Marseille, France",industry: "Energy",client: "EDF Énergies Nouvelles",completionYear: 2023,squareFootage: 28000,steelTonnage: 1850,timeline: 14,safetyRecord: 0,complexity: "High",rating: 5,projectValue: 8900000,image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",description: "Installation de production d\'énergie solaire thermique avec systèmes de stockage avancés et infrastructure de distribution.",
      keyFeatures: [
        "Supports de panneaux solaires","Systèmes de tracking automatique","Infrastructure électrique HT","Bâtiment de contrôle climatisé","Systèmes de stockage d\'énergie","Certification environnementale"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop"
      ],
      hasVirtualTour: true,
      featured: true,
      sustainableBuild: true,
      coordinates: { lat: 43.2965, lng: 5.3698 }
    },
    {
      id: 3,
      title: "Complexe Chimique Total Petrochemicals",location: "Le Havre, France",industry: "Chemical Processing",client: "TotalEnergies",completionYear: 2022,squareFootage: 62000,steelTonnage: 4200,timeline: 24,safetyRecord: 0,complexity: "High",rating: 5,projectValue: 18500000,image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=800&h=600&fit=crop",description: "Unité de traitement pétrochimique avec systèmes de sécurité renforcés et technologies de traitement environnemental.",
      keyFeatures: [
        "Structures résistantes aux produits chimiques","Systèmes de sécurité ATEX","Unités de traitement des effluents","Systèmes de détection de fuites","Infrastructure anti-explosion","Conformité SEVESO III"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop"
      ],
      hasVirtualTour: false,
      featured: true,
      awardWinning: false,
      sustainableBuild: true,
      coordinates: { lat: 49.4944, lng: 0.1079 }
    },
    {
      id: 4,
      title: "Centre Logistique Amazon",location: "Metz, France",industry: "Logistics",client: "Amazon Logistics",completionYear: 2023,squareFootage: 75000,steelTonnage: 3600,timeline: 16,safetyRecord: 0,complexity: "Medium",rating: 4,projectValue: 15200000,image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",description: "Entrepôt automatisé de grande envergure avec systèmes de tri robotisés et infrastructure logistique moderne.",
      keyFeatures: [
        "Systèmes de convoyage automatisé","Zones de stockage haute densité","Quais de chargement multiples","Systèmes de tri robotisés","Infrastructure IT avancée","Certification BREEAM Excellent"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop"
      ],
      hasVirtualTour: true,
      featured: false,
      sustainableBuild: true,
      coordinates: { lat: 49.1193, lng: 6.1757 }
    },
    {
      id: 5,
      title: "Usine Pharmaceutique Sanofi",location: "Tours, France",industry: "Manufacturing",client: "Sanofi",completionYear: 2022,squareFootage: 32000,steelTonnage: 2100,timeline: 20,safetyRecord: 0,complexity: "High",rating: 5,projectValue: 11800000,image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop",description: "Facility de production pharmaceutique avec salles blanches et systèmes de contrôle environnemental strict.",
      keyFeatures: [
        "Salles blanches ISO 7","Systèmes HVAC pharmaceutiques","Contrôle d\'accès biométrique","Systèmes de traçabilité","Infrastructure GMP","Certification FDA"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop"
      ],
      hasVirtualTour: false,
      featured: false,
      awardWinning: true,
      sustainableBuild: false,
      coordinates: { lat: 47.3941, lng: 0.6848 }
    },
    {
      id: 6,
      title: "Parc Éolien Offshore Normandie",location: "Courseulles-sur-Mer, France",industry: "Energy",client: "EDF Renouvelables",completionYear: 2021,squareFootage: 15000,steelTonnage: 8500,timeline: 30,safetyRecord: 1,complexity: "High",rating: 4,projectValue: 25000000,image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&h=600&fit=crop",description: "Infrastructure maritime pour parc éolien offshore avec fondations spécialisées et systèmes de maintenance.",
      keyFeatures: [
        "Fondations marines spécialisées","Structures résistantes à la corrosion","Systèmes de maintenance offshore","Infrastructure de raccordement","Héliport de maintenance","Systèmes de monitoring"
      ],
      gallery: [
        "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600&fit=crop"
      ],
      hasVirtualTour: true,
      featured: true,
      awardWinning: true,
      sustainableBuild: true,
      coordinates: { lat: 49.3370, lng: -0.4552 }
    }
  ];

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
        <meta name="keywords" content="projets industriels, construction métallique, réalisations MCCT, études de cas, visite virtuelle, excellence industrielle" />
        <meta property="og:title" content="Projets - MCCT Industry | Excellence en Construction Métallique" />
        <meta property="og:description" content="Explorez nos projets industriels exceptionnels avec visites virtuelles 360° et études de cas détaillées." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://mcct-industry.fr/projects" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 lg:pt-24 pb-12 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="industrial-container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                  <Icon name="Building" size={32} className="text-white" />
                </div>
                <div className="text-left">
                  <h1 className="font-headline text-4xl lg:text-5xl font-bold text-white mb-2">
                    Nos Projets
                  </h1>
                  <p className="text-white/80 font-mono text-sm tracking-wider">
                    EXCELLENCE • INNOVATION • RÉALISATIONS
                  </p>
                </div>
              </div>

              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Découvrez nos réalisations exceptionnelles en construction métallique industrielle.\n
                Chaque projet témoigne de notre expertise technique et de notre engagement envers l'excellence.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">150+</div>
                  <div className="text-white/70 text-sm">Projets Réalisés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">2M+</div>
                  <div className="text-white/70 text-sm">m² Construits</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">50K+</div>
                  <div className="text-white/70 text-sm">Tonnes d'Acier</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">98%</div>
                  <div className="text-white/70 text-sm">Satisfaction Client</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold shadow-industrial"
                  iconName="Eye"
                  iconPosition="left"
                  iconSize={20}
                >
                  Explorer les Projets
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 font-cta font-medium"
                  iconName="Camera"
                  iconPosition="left"
                  iconSize={20}
                >
                  Visites Virtuelles
                </Button>
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
                    viewMode === 'grid' ?'bg-white text-primary shadow-sm' :'text-text-secondary hover:text-primary'
                  }`}
                >
                  <Icon name="Grid3X3" size={16} />
                  <span>Grille</span>
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'timeline' ?'bg-white text-primary shadow-sm' :'text-text-secondary hover:text-primary'
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
                Discutons de vos besoins en construction métallique industrielle.\n
                Notre équipe d'experts est prête à transformer votre vision en réalité.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold shadow-industrial"
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={20}
                >
                  Demander un Devis
                </Button>
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
        <VirtualTourModal
          project={virtualTourProject}
          isOpen={isVirtualTourOpen}
          onClose={handleCloseVirtualTour}
        />
      </div>
    </>
  );
};

export default Projects;