// src/data/projects.js

const projectsData = [
  {
    id: 1,
    title: "Bureaux et atelier de réparation en charpente métallique à Casablanca",
    industry: "Manufacturing",
    scale: "small",
    complexity: "Medium",
    timeline: "short",
    featured: true,
    hasVirtualTour: false,
    awardWinning: false,
    sustainableBuild: true,
    location: "Casablanca, Maroc",
    year: "2024",
    surface: "1 500 m²",
    client: "Garage Auto Maroc",
    budget: "3 000 000 MAD",
    duration: "4 mois",
    description: "Construction d'un complexe moderne comprenant bureaux administratifs et atelier de réparation automobile.",
    images: [
      "/assets/images/maroc1.jpg",
      "/assets/images/maroc2.jpg",
      "/assets/images/maroc3.jpg",
      "/assets/images/maroc4.jpg"
    ]
  },
  {
    id: 2,
    title: "Centre sportif en charpente métallique à Marrakech",
    industry: "Energy",
    scale: "medium",
    complexity: "High",
    timeline: "medium",
    featured: true,
    hasVirtualTour: true,
    awardWinning: true,
    sustainableBuild: false,
    location: "Marrakech, Maroc",
    year: "2024",
    surface: "3 000 m²",
    client: "Commune de Marrakech",
    budget: "12 000 000 MAD",
    duration: "8 mois",
    description: "Construction d'un complexe sportif municipal avec gymnase, vestiaires et locaux techniques.",
    images: [
      "/assets/images/maroc5.jpg",
      "/assets/images/maroc6.jpg",
      "/assets/images/maroc7.jpg",
      "/assets/images/maroc8.jpg"
    ]
  },
  {
    id: 3,
    title: "Entrepôt industriel pour matériaux à Casablanca",
    industry: "Logistics",
    scale: "large",
    complexity: "High",
    timeline: "medium",
    featured: false,
    hasVirtualTour: false,
    awardWinning: false,
    sustainableBuild: true,
    location: "Casablanca, Maroc",
    year: "2024",
    surface: "4 000 m²",
    client: "Matériaux Maroc SARL",
    budget: "7 500 000 MAD",
    duration: "6 mois",
    description: "Bâtiment industriel pour stockage et traitement de matériaux lourds.",
    images: [
      "/assets/images/maroc9.jpg",
      "/assets/images/maroc10.jpg",
      "/assets/images/maroc11.jpg",
      "/assets/images/maroc12.jpg"
    ]
  }
];

export default projectsData;
