export const services = [
  {
    id: 1,
    title: "Montage de structures métalliques",
    subtitle: "Ingénierie de précision pour structures industrielles",
    icon: "Building",
    bgColor: "bg-accent/10",
    iconColor: "text-accent",
    description: `Nos services de montage de structures métalliques combinent des décennies d'expertise avec des technologies de pointe pour livrer des cadres industriels robustes et précis. Des installations complexes multi-étages aux plateformes pour équipements spécialisés, chaque poutre, colonne et connexion respecte les normes les plus strictes de sécurité et d'intégrité structurelle.`,
    stats: [
      { value: "200+", label: "Structures Réalisées" },
      { value: "99,8%", label: "Précision" },
      { value: "Zéro", label: "Incident de Sécurité" }
    ],
    features: [
      "Modélisation 3D avancée et intégration BIM",
      "Soudeurs et spécialistes certifiés",
      "Conformité aux charges sismiques et vent",
      "Méthodologies de construction accélérées"
    ],
    applications: [
      "Structures d'usines de fabrication",
      "Entrepôts et centres de distribution",
      "Supports pour équipements industriels",
      "Plateformes industrielles multi-niveaux"
    ],
    industries: [
      "Industrie automobile",
      "Industrie chimique",
      "Agroalimentaire",
      "Production pharmaceutique"
    ],
    process: [
      {
        title: "Étude et conception",
        description: "Analyse complète des exigences structurelles, calcul des charges et vérification de conformité aux normes locales."
      },
      {
        title: "Approvisionnement et fabrication",
        description: "Sélection de matériaux certifiés et fabrication précise avec technologies de découpe et de soudage avancées."
      },
      {
        title: "Préparation du site et fondations",
        description: "Inspection du site, fondations et préparation des équipements de montage et systèmes de sécurité."
      },
      {
        title: "Montage séquentiel",
        description: "Installation systématique selon les séquences prévues avec contrôle qualité et sécurité en temps réel."
      },
      {
        title: "Contrôle qualité et livraison",
        description: "Inspections finales, tests de charge, documentation et formation du client pour la maintenance."
      }
    ],
    specifications: [
      {
        category: "Types d’aciers",
        items: [
          { name: "Standard", value: "S235, S275, S355" },
          { name: "Haute résistance", value: "S420, S460" },
          { name: "Résistant aux intempéries", value: "S355J2W" }
        ]
      },
      {
        category: "Types de connexions",
        items: [
          { name: "Soudées", value: "Certifiées AWS D1.1" },
          { name: "Boulonnées", value: "Grade haute résistance 8.8" },
          { name: "Hybrides", value: "Conception personnalisée" }
        ]
      }
    ],
    projects: [
      {
        name: "Usine automobile - Casablanca",
        description: "Installation de 30 000 m² avec structures multi-niveaux et ponts roulants.",
        duration: "7 mois",
        scale: "120M DHS"
      },
      {
        name: "Centre logistique - Tanger",
        description: "Entrepôt de distribution avec mezzanines et structures résistantes à la corrosion.",
        duration: "6 mois",
        scale: "85M DHS"
      }
    ],
    gallery: [
      { src: '/assets/images/steel1.jpg', alt: 'Structure métallique 1' },
      { src: '/assets/images/steel2.jpg', alt: 'Structure métallique 2' },
      { src: '/assets/images/steel3.jpg', alt: 'Structure métallique 3' },
      { src: '/assets/images/steel4.jpg', alt: 'Structure métallique 4' }
    ]
  },
  {
    id: 2,
    title: "Fabrication industrielle",
    subtitle: "Solutions sur mesure pour applications spécialisées",
    icon: "Settings",
    bgColor: "bg-success/10",
    iconColor: "text-success",
    description: `Nos services de fabrication industrielle offrent des solutions métalliques de précision adaptées à vos besoins opérationnels spécifiques. Du tuyautage complexe aux coffrages d’équipements spécialisés, nous combinons savoir-faire traditionnel et technologies modernes pour créer des composants industriels durables et performants.`,
    stats: [
      { value: "1000+", label: "Composants réalisés" },
      { value: "±0,5 mm", label: "Tolérance" },
      { value: "15+", label: "Types de matériaux" }
    ],
    features: [
      "Découpe CNC plasma et laser",
      "Fabrication certifiée d’appareils à pression",
      "Traitement et finitions spécialisées",
      "Conception de gabarits et supports sur mesure"
    ],
    applications: [
      "Réservoirs et cuves",
      "Systèmes de tuyautage et collecteurs",
      "Coffrages et boîtiers d’équipements",
      "Convoyeurs et trémies"
    ],
    industries: [
      "Traitement pétrochimique",
      "Stations d’eau et assainissement",
      "Industrie minière",
      "Centrales électriques"
    ],
    process: [
      {
        title: "Conception et ingénierie",
        description: "Développement collaboratif avec analyse de contraintes, choix des matériaux et optimisation de la fabrication."
      },
      {
        title: "Sélection et approvisionnement des matériaux",
        description: "Matériaux spécialisés avec traçabilité complète et certifications."
      },
      {
        title: "Fabrication de précision",
        description: "Production avec équipements CNC, soudage certifié et contrôle qualité à chaque étape."
      },
      {
        title: "Tests et validation",
        description: "Tests complets, inspections NDT et validation des performances."
      },
      {
        title: "Finition et livraison",
        description: "Finitions professionnelles, revêtements protecteurs, emballage et livraison coordonnée."
      }
    ],
    specifications: [
      {
        category: "Capacités de fabrication",
        items: [
          { name: "Poids maximum", value: "50 tonnes" },
          { name: "Épaisseur des plaques", value: "jusqu'à 100 mm" },
          { name: "Tolérance de découpe", value: "±0,5 mm" }
        ]
      },
      {
        category: "Options de matériaux",
        items: [
          { name: "Acier carbone", value: "Tous grades" },
          { name: "Acier inoxydable", value: "304, 316, 321, 904L" },
          { name: "Alliages spéciaux", value: "Hastelloy, Inconel" }
        ]
      }
    ],
    projects: [
      {
        name: "Cuves pétrochimiques - Jorf Lasfar",
        description: "Fabrication de cuves haute pression avec composants internes spécialisés et systèmes de sécurité.",
        duration: "6 mois",
        scale: "80M DHS"
      },
      {
        name: "Station de traitement d’eau - Casablanca",
        description: "Système complet de tuyautage avec contrôle automatisé et suivi de performance.",
        duration: "4 mois",
        scale: "35M DHS"
      }
    ],
    gallery: [
      { src: '/assets/images/stairs.jpg', alt: 'Usine 1' },
      { src: '/assets/images/tuyau.jpg', alt: 'Usine 2' },
      { src: '/assets/images/tuyaux.jpg', alt: 'Usine 3' },
      { src: '/assets/images/atelier.jpg', alt: 'Usine 4' }
    ]
  },
  // Les autres services (Maintenance, Réparations) peuvent être traduits de la même façon avec des exemples marocains si tu veux.
];
