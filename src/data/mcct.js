// Contenus éditoriaux de la maquette MCCT (activités, savoir-faire, projets, secteurs…).
import { img, thumb, galleryItems } from './gallery';

/** Activités : version longue pour la page Activités, résumé pour l'accueil. */
export const activities = [
  {
    num: '01',
    title: 'Construction métallique',
    short: 'Charpentes, hangars et ossatures acier, de l’étude au levage.',
    description:
      'Charpentes, hangars industriels, auvents et ossatures acier : nous concevons, fabriquons et montons des structures métalliques complètes, de l’étude d’exécution au levage sur site.',
    image: 'IMG_7897',
    tags: ['Charpente', 'Hangars', 'Bardage', 'Couverture']
  },
  {
    num: '02',
    title: 'Chaudronnerie',
    short: 'Fabrication d’ensembles chaudronnés lourds et sur mesure.',
    description:
      'Fabrication d’ensembles chaudronnés lourds et sur mesure : trémies, goulottes, capotages et pièces mécano-soudées, réalisés en atelier avec un contrôle qualité systématique.',
    image: 'IMG_7918',
    tags: ['Trémies', 'Mécano-soudure', 'Tôlerie lourde']
  },
  {
    num: '03',
    title: 'Tuyauterie industrielle',
    short: 'Préfabrication et montage de réseaux de tuyauterie.',
    description:
      'Préfabrication et montage de réseaux de tuyauterie, du grand diamètre aux lignes de process, avec préparation, soudure et contrôle en atelier et sur site.',
    image: 'IMG_7924',
    tags: ['Préfabrication', 'Montage', 'Grand diamètre']
  },
  {
    num: '04',
    title: 'Installation & montage',
    short: 'Levage, assemblage et mise en œuvre sur site.',
    description:
      'Levage, assemblage et mise en œuvre sur site : nos équipes assurent le montage des structures et équipements dans le respect des délais et des règles de sécurité.',
    image: 'IMG_7887',
    tags: ['Levage', 'Assemblage', 'Mise en service']
  },
  {
    num: '05',
    title: 'Maintenance industrielle',
    short: 'Interventions sur installations et équipements en exploitation.',
    description:
      'Interventions préventives et correctives sur installations en exploitation : stations, réseaux, équipements sous pression et structures métalliques.',
    image: 'IMG_7941',
    tags: ['Préventif', 'Correctif', 'Sur site']
  },
  {
    num: '06',
    title: 'Équipements industriels',
    short: 'Convoyeurs, structures support et équipements de process.',
    description:
      'Convoyeurs, structures support, passerelles et équipements de process : des solutions fabriquées sur mesure pour les sites industriels exigeants.',
    image: 'IMG_7905',
    tags: ['Convoyeurs', 'Passerelles', 'Process']
  }
]?.map((activity) => ({ ...activity, src: img(activity?.image), thumbSrc: thumb(activity?.image) }));

/** Étapes du savoir-faire (accueil). */
export const processSteps = [
  { num: '01', title: 'ENGINEERING', desc: 'Études techniques et dimensionnement.' },
  { num: '02', title: 'CONCEPTION', desc: 'Plans d’exécution et préparation.' },
  { num: '03', title: 'FABRICATION', desc: 'Découpe, soudure et assemblage en atelier.' },
  { num: '04', title: 'ASSEMBLAGE', desc: 'Pré-montage et contrôle des ensembles.' },
  { num: '05', title: 'INSTALLATION', desc: 'Levage et montage sur site.' },
  { num: '06', title: 'MAINTENANCE', desc: 'Suivi et interventions en exploitation.' }
];

export const projectCategories = ['TOUS', 'CONSTRUCTION', 'INDUSTRIE', 'ÉNERGIE', 'ÉQUIPEMENTS'];

/** Identifiant d'URL lisible dérivé du titre (« Hangar métallique » → « hangar-metallique »). */
export const slugify = (value) =>
  value
    ?.normalize('NFD')
    ?.replace(/[\u0300-\u036f]/g, '')
    ?.toLowerCase()
    ?.replace(/[^a-z0-9]+/g, '-')
    ?.replace(/(^-|-$)/g, '');

/*
 * Fiches projets.
 *
 * Chaque projet a son propre récit : les rubriques (`sections`) diffèrent d'une
 * fiche à l'autre et seules celles qui existent sont affichées. Les textes
 * décrivent ce que montrent les photos et le périmètre d'intervention MCCT.
 *
 * À COMPLÉTER PAR MCCT quand l'information est disponible : `year`, `client`, et
 * tout chiffre (tonnage, surface, durée). Un champ absent n'est pas affiché —
 * ne jamais y mettre un texte d'attente.
 */
const rawProjects = [
  {
    title: 'Hangar métallique',
    category: 'CONSTRUCTION',
    location: 'Maroc',
    image: 'IMG_7898',
    introduction:
      'Ossature complète d’un hangar industriel : portiques, pannes et contreventements, préparés en atelier puis levés sur site.',
    sections: [
      {
        title: 'L’OUVRAGE',
        body: 'Un bâtiment à portiques acier de grande portée, conçu pour libérer un volume intérieur sans poteau intermédiaire.'
      },
      {
        title: 'EN ATELIER',
        body: 'Débit des profilés, percements et soudures d’assemblage réalisés en atelier, où chaque ensemble est contrôlé avant expédition.'
      },
      {
        title: 'SUR SITE',
        body: 'Levage file par file : poteaux, arbalétriers, puis pannes et contreventements avant la pose de la couverture.'
      }
    ],
    services: ['Étude d’exécution', 'Fabrication', 'Levage', 'Montage'],
    materials: ['Profilés acier', 'Boulonnerie de charpente']
  },
  {
    title: 'Auvent en charpente acier',
    category: 'CONSTRUCTION',
    location: 'Casablanca',
    image: 'IMG_7861',
    introduction:
      'Auvent en charpente acier à couverture translucide, monté au-dessus d’un espace recevant du public.',
    sections: [
      {
        title: 'LE BESOIN',
        body: 'Couvrir une zone extérieure en conservant la lumière naturelle et une structure visuellement légère.'
      },
      {
        title: 'LA RÉPONSE',
        body: 'Une ossature acier peinte, à trame régulière, recevant des panneaux de couverture translucides entre pannes.'
      }
    ],
    services: ['Charpente', 'Couverture', 'Peinture'],
    materials: ['Acier peint', 'Panneaux translucides']
  },
  {
    title: 'Hangar livré clé en main',
    category: 'CONSTRUCTION',
    location: 'Maroc',
    image: 'IMG_7866',
    introduction:
      'Bâtiment industriel livré prêt à l’exploitation : ossature, bardage, couverture, portes et finitions intérieures.',
    sections: [
      {
        title: 'PÉRIMÈTRE',
        body: 'Un lot unique, de la structure aux fermetures, pour un interlocuteur technique unique jusqu’à la réception.'
      },
      {
        title: 'ENVELOPPE',
        body: 'Bardage et couverture posés après montage de l’ossature, avec portes sectionnelles et accès de service.'
      },
      {
        title: 'INTÉRIEUR',
        body: 'Traitement du sol et finitions réalisés avant remise des clés, le volume restant entièrement dégagé.'
      }
    ],
    services: ['Charpente', 'Bardage', 'Couverture', 'Finitions'],
    materials: ['Panneaux sandwich', 'Bac acier']
  },
  {
    title: 'Ossature acier — chantier',
    category: 'CONSTRUCTION',
    location: 'Maroc',
    image: 'IMG_7890',
    introduction: 'Suivi d’une ossature acier en cours d’élévation, du premier portique au contreventement définitif.',
    sections: [
      {
        title: 'SÉQUENCE DE LEVAGE',
        body: 'Les portiques sont dressés dans l’ordre du calepinage, stabilisés provisoirement, puis reliés par les pannes.'
      },
      {
        title: 'STABILITÉ',
        body: 'Contreventements de long pan et de versant posés au fur et à mesure pour figer la géométrie de l’ossature.'
      }
    ],
    services: ['Levage', 'Montage', 'Contrôle dimensionnel']
  },
  {
    title: 'Convoyeur industriel',
    category: 'INDUSTRIE',
    location: 'Maroc',
    image: 'IMG_7905',
    introduction:
      'Convoyeur à bande et sa structure support, fabriqués puis installés sous couverture sur un site de production.',
    sections: [
      {
        title: 'FONCTION',
        body: 'Assurer un transfert continu de matière entre deux postes, avec un accès de maintenance sur toute la longueur.'
      },
      {
        title: 'STRUCTURE SUPPORT',
        body: 'Châssis et stations à rouleaux alignés sur une ossature dédiée, réglée pour garantir le suivi de bande.'
      },
      {
        title: 'INSTALLATION',
        body: 'Montage par tronçons préfabriqués, raccordement et réglages réalisés sur site par nos équipes.'
      }
    ],
    services: ['Fabrication', 'Structure support', 'Installation'],
    materials: ['Acier', 'Stations à rouleaux']
  },
  {
    title: 'Structure de process',
    category: 'INDUSTRIE',
    location: 'Maroc',
    image: 'IMG_7907',
    introduction: 'Supports et berceaux de process assemblés sur site, destinés à recevoir des équipements industriels.',
    sections: [
      {
        title: 'CONCEPTION',
        body: 'Des supports dimensionnés pour les charges et les accès d’exploitation, avec platines de fixation repérées.'
      },
      {
        title: 'MISE EN PLACE',
        body: 'Assemblage au sol puis mise en position à la grue, avec réglage des niveaux avant scellement.'
      }
    ],
    services: ['Étude d’exécution', 'Fabrication', 'Montage'],
    materials: ['Acier peint']
  },
  {
    title: 'Réservoir métallique',
    category: 'INDUSTRIE',
    location: 'Maroc',
    image: 'IMG_7886',
    introduction:
      'Montage sur site d’un réservoir métallique : viroles préparées en atelier, assemblées puis levées à la grue.',
    sections: [
      {
        title: 'CHAUDRONNERIE',
        body: 'Roulage et soudure des viroles en atelier, contrôlées avant transport vers le site.'
      },
      {
        title: 'LEVAGE',
        body: 'Chaque panneau est présenté à la grue, maintenu le temps de l’assemblage, puis soudé en position.'
      }
    ],
    services: ['Chaudronnerie', 'Levage', 'Soudure sur site'],
    materials: ['Tôle acier']
  },
  {
    title: 'Installations gaz',
    category: 'ÉNERGIE',
    location: 'Maroc',
    image: 'IMG_7943',
    introduction:
      'Poste de détente et lignes associées : tuyauterie, robinetterie et supports, sur une installation en exploitation.',
    sections: [
      {
        title: 'INTERVENTION',
        body: 'Travaux menés sur un site en service, avec balisage, consignation et plan de prévention préalables.'
      },
      {
        title: 'TUYAUTERIE',
        body: 'Lignes préfabriquées puis raccordées sur place, avec reprise des supports et de la robinetterie.'
      }
    ],
    services: ['Tuyauterie', 'Montage', 'Sécurité chantier']
  },
  {
    title: 'Maintenance de station',
    category: 'ÉNERGIE',
    location: 'Maroc',
    image: 'IMG_7938',
    introduction: 'Intervention de maintenance sur un réservoir et ses accessoires, en site exploité.',
    sections: [
      {
        title: 'DIAGNOSTIC',
        body: 'Relevé de l’état de la capacité et de ses piquages avant définition du périmètre d’intervention.'
      },
      {
        title: 'REMISE EN ÉTAT',
        body: 'Reprises métalliques et accessoires traités sur place, avec accès sécurisé pour les équipes.'
      }
    ],
    services: ['Maintenance corrective', 'Travaux sur site']
  },
  {
    title: 'Levage d’équipements',
    category: 'ÉNERGIE',
    location: 'Maroc',
    image: 'IMG_7939',
    introduction: 'Déchargement et mise en place d’un module technique à la grue sur une plateforme industrielle.',
    sections: [
      {
        title: 'PRÉPARATION',
        body: 'Étude des points d’élingage, choix du moyen de levage et balisage de la zone avant manœuvre.'
      },
      {
        title: 'MANŒUVRE',
        body: 'Le module est repris du camion, orienté, puis posé sur ses appuis sous la conduite d’un chef de manœuvre.'
      }
    ],
    services: ['Levage', 'Manutention', 'Mise en place']
  },
  {
    title: 'Ensembles chaudronnés',
    category: 'ÉQUIPEMENTS',
    location: 'Atelier MCCT',
    image: 'IMG_7918',
    introduction:
      'Trémies et ensembles mécano-soudés fabriqués en atelier, contrôlés puis chargés pour livraison sur site.',
    sections: [
      {
        title: 'FABRICATION',
        body: 'Découpe, pliage et soudure des tôles sur gabarit, avec reprise des angles et des raidisseurs.'
      },
      {
        title: 'CONTRÔLE ET EXPÉDITION',
        body: 'Vérification dimensionnelle et visuelle avant chargement au pont roulant pour le transport.'
      }
    ],
    services: ['Chaudronnerie', 'Mécano-soudure', 'Contrôle qualité'],
    materials: ['Tôle forte']
  },
  {
    title: 'Tuyauterie grand diamètre',
    category: 'ÉQUIPEMENTS',
    location: 'Atelier MCCT',
    image: 'IMG_7924',
    introduction: 'Préfabrication de tronçons de tuyauterie de grand diamètre en atelier, prêts au montage.',
    sections: [
      {
        title: 'PRÉFABRICATION',
        body: 'Débit, préparation des chanfreins et pointage des tronçons sur berceaux avant soudure définitive.'
      },
      {
        title: 'POURQUOI EN ATELIER',
        body: 'Travailler au sol et à poste fixe améliore la qualité des soudures et réduit la durée d’intervention sur site.'
      }
    ],
    services: ['Préfabrication', 'Soudure', 'Contrôle'],
    materials: ['Tubes acier']
  }
];

export const projects = rawProjects?.map((project) => {
  const slug = slugify(project?.title);
  return {
    ...project,
    slug,
    src: img(project?.image),
    thumbSrc: thumb(project?.image),
    /** Images de la galerie explicitement rattachées à ce projet. */
    gallery: galleryItems?.filter((item) => item?.projectSlug === slug)
  };
});

export const projectBySlug = (slug) => projects?.find((project) => project?.slug === slug);

/** Projets mis en avant sur l'accueil (sous-ensemble de la page Projets). */
const HOME_PROJECT_IMAGES = ['IMG_7898', 'IMG_7861', 'IMG_7905', 'IMG_7907', 'IMG_7943', 'IMG_7938', 'IMG_7918', 'IMG_7924'];
export const homeProjects = projects?.filter((project) => HOME_PROJECT_IMAGES?.includes(project?.image));

export const sectors = [
  {
    title: 'BÂTIMENTS INDUSTRIELS',
    desc: 'Hangars, ateliers et unités de production en charpente métallique.',
    image: 'IMG_7898'
  },
  {
    title: 'STRUCTURES COMMERCIALES',
    desc: 'Auvents, halls et ossatures pour sites recevant du public.',
    image: 'IMG_7861'
  },
  {
    title: 'INSTALLATIONS SPÉCIALISÉES',
    desc: 'Équipements de process, tuyauterie et structures techniques.',
    image: 'IMG_7907'
  }
]?.map((sector) => ({ ...sector, src: img(sector?.image), thumbSrc: thumb(sector?.image) }));

export const capabilities = [
  ['FABRICATION', 'Ateliers équipés pour la fabrication de structures et d’ensembles métalliques.'],
  ['SOUDURE', 'Procédés de soudure maîtrisés pour aciers de construction et tôlerie lourde.'],
  ['DÉCOUPE', 'Découpe et préparation des profilés, tôles et pièces primaires.'],
  ['USINAGE', 'Reprise et ajustage des pièces mécaniques et assemblages.'],
  ['ASSEMBLAGE', 'Pré-assemblage en atelier pour fiabiliser le montage sur site.'],
  ['PEINTURE', 'Traitement de surface et mise en peinture des structures.'],
  ['CONTRÔLE QUALITÉ', 'Contrôles dimensionnels et visuels à chaque étape de production.'],
  ['LOGISTIQUE', 'Transport, levage et coordination des livraisons sur chantier.']
]?.map(([title, desc], index) => ({ num: String(index + 1)?.padStart(2, '0'), title, desc }));

export const values = [
  { num: '01', title: 'EXCELLENCE' },
  { num: '02', title: 'SÉCURITÉ' },
  { num: '03', title: 'INNOVATION' },
  { num: '04', title: 'ENGAGEMENT' }
];

export const keyFigures = [
  { value: 15, label: 'ANNÉES D’EXPÉRIENCE' },
  { value: 52, label: 'PROJETS RÉALISÉS' },
  { value: 10, label: 'COLLABORATEURS' },
  { value: 30, label: 'SECTEURS INDUSTRIELS' }
];

/**
 * Logos clients — à alimenter avec les fichiers fournis par MCCT
 * (ex. { name: 'Client', src: '/assets/clients/client.svg' }).
 * Tant que la liste est vide, la section n'est pas affichée.
 */
export const clients = [];

/** Brochure PDF : renseigner le chemin (ex. '/mcct-brochure.pdf') pour afficher le bloc. */
export const brochureUrl = '';
