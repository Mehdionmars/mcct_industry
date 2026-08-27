// Contenus éditoriaux MCCT, français et anglais.
// Chaque chaîne traduisible est un objet { fr, en } ; les getters ci-dessous
// renvoient des objets déjà localisés pour la langue demandée.
import { img, thumb, getGalleryItems } from './gallery';
import { localize } from '../i18n/LanguageProvider';

/** Identifiant d'URL lisible, toujours dérivé du titre français (URL stables). */
export const slugify = (value) =>
  value
    ?.normalize('NFD')
    ?.replace(/[\u0300-\u036f]/g, '')
    ?.toLowerCase()
    ?.replace(/[^a-z0-9]+/g, '-')
    ?.replace(/(^-|-$)/g, '');

const rawActivities = [
  {
    num: '01',
    title: { fr: 'Charpente métallique', en: 'Steel structures' },
    short: {
      fr: 'Charpentes, hangars et ossatures acier, de l’étude au levage.',
      en: 'Frames, warehouses and steel structures, from design to erection.'
    },
    description: {
      fr: 'Charpentes, hangars industriels, auvents et ossatures acier : nous concevons, fabriquons et montons des structures métalliques complètes, de l’étude d’exécution au levage sur site. Grâce à nos moyens techniques avancés et à notre équipe de professionnels qualifiés, nous proposons des solutions pratiques et adaptées à chaque besoin, au meilleur rapport qualité-prix.',
      en: 'Frames, industrial warehouses, canopies and steel structures: we design, fabricate and erect complete steel structures, from shop drawings to lifting on site. With our advanced technical resources and a team of qualified professionals, we deliver practical solutions tailored to each need, at the best value for money.'
    },
    bullets: {
      fr: [
        'Étude d’exécution et plans d’atelier',
        'Fabrication en atelier et traitement de surface',
        'Montage, bardage et couverture sur site',
        'Respect des délais et des règles de sécurité'
      ],
      en: [
        'Shop drawings and detailed design',
        'Workshop fabrication and surface treatment',
        'Erection, cladding and roofing on site',
        'Deadlines and safety rules respected'
      ]
    },
    image: 'charpente-montage-telescopique',
    tags: {
      fr: ['Charpente', 'Hangars', 'Bardage', 'Couverture'],
      en: ['Steelwork', 'Warehouses', 'Cladding', 'Roofing']
    }
  },
  {
    num: '02',
    title: { fr: 'Chaudronnerie métallique', en: 'Boilermaking' },
    short: {
      fr: 'Fabrication d’ensembles chaudronnés lourds et sur mesure.',
      en: 'Heavy, bespoke fabricated assemblies.'
    },
    description: {
      fr: 'En combinant notre expertise en chaudronnerie métallique avec des techniques de fabrication avancées, nous garantissons des solutions robustes et durables pour répondre aux besoins spécifiques de chaque projet : trémies, goulottes, cyclones, capotages et pièces mécano-soudées, réalisés en atelier avec un contrôle qualité systématique.',
      en: 'Combining our boilermaking expertise with advanced fabrication techniques, we deliver robust, durable solutions matched to the specific needs of each project: hoppers, chutes, cyclones, enclosures and welded parts, produced in the workshop with systematic quality control.'
    },
    bullets: {
      fr: [
        'Ensembles chaudronnés sur mesure',
        'Mécano-soudure et tôlerie lourde',
        'Procédés de soudure qualifiés',
        'Contrôle dimensionnel avant expédition'
      ],
      en: [
        'Bespoke fabricated assemblies',
        'Welded assemblies and heavy plate work',
        'Qualified welding processes',
        'Dimensional checks before shipping'
      ]
    },
    image: 'IMG_7918',
    tags: {
      fr: ['Trémies', 'Mécano-soudure', 'Tôlerie lourde'],
      en: ['Hoppers', 'Welded assemblies', 'Heavy plate']
    }
  },
  {
    num: '03',
    title: { fr: 'Tuyauterie industrielle', en: 'Industrial piping' },
    short: {
      fr: 'Préfabrication et montage de réseaux de tuyauterie.',
      en: 'Prefabrication and installation of piping networks.'
    },
    description: {
      fr: 'MCCT Industry fabrique et répare les tuyauteries en respectant les normes en vigueur, les réglementations de sécurité, les différents codes de construction et les spécifications de ses clients — du grand diamètre aux lignes de process.',
      en: 'MCCT Industry fabricates and repairs piping in line with current standards, safety regulations, the relevant construction codes and client specifications — from large diameters to process lines.'
    },
    bullets: {
      fr: [
        'Étude, planification et conception',
        'Approvisionnement et réquisition du matériel',
        'Fabrication et livraison',
        'Intervention sur site',
        'Levage et mise en place d’équipements',
        'Pilotage des travaux associés'
      ],
      en: [
        'Study, planning and design',
        'Procurement and material requisition',
        'Fabrication and delivery',
        'On-site intervention',
        'Lifting and installation of equipment',
        'Management of associated works'
      ]
    },
    image: 'IMG_7924',
    tags: {
      fr: ['Préfabrication', 'Montage', 'Grand diamètre'],
      en: ['Prefabrication', 'Installation', 'Large diameter']
    }
  },
  {
    num: '04',
    title: { fr: 'Installation d’équipements industriels', en: 'Industrial equipment installation' },
    short: {
      fr: 'Levage, assemblage et mise en œuvre sur site.',
      en: 'Lifting, assembly and installation on site.'
    },
    description: {
      fr: 'Muni d’une connaissance acquise au fil du temps, MCCT Industry vous offre un service d’installation efficace et précis. Une équipe d’experts procède à l’installation complète de vos équipements, dans le respect des délais et des règles de sécurité.',
      en: 'Drawing on knowledge built over time, MCCT Industry offers a precise, efficient installation service. A team of experts carries out the complete installation of your equipment, on schedule and to safety rules.'
    },
    bullets: {
      fr: [
        'Maîtrise d’ouvrage des matériels',
        'Contrôle du fonctionnement de l’équipement',
        'Identification des éléments défectueux',
        'Techniques de soudure et mise en service'
      ],
      en: [
        'Materials management',
        'Functional checks on the equipment',
        'Identification of faulty components',
        'Welding techniques and commissioning'
      ]
    },
    image: 'IMG_7887',
    tags: {
      fr: ['Levage', 'Assemblage', 'Mise en service'],
      en: ['Lifting', 'Assembly', 'Commissioning']
    }
  },
  {
    num: '05',
    title: { fr: 'Maintenance et entretien des usines', en: 'Plant maintenance' },
    short: {
      fr: 'Programme préventif et prédictif pour un fonctionnement optimal.',
      en: 'Preventive and predictive programmes for optimal operation.'
    },
    description: {
      fr: 'Vous souhaitez faire entretenir vos usines, machines et installations ? MCCT Industry vous assure un programme de maintenance et un entretien préventif et prédictif pour un fonctionnement optimal de vos installations.',
      en: 'Need your plants, machines and installations maintained? MCCT Industry provides a maintenance programme with preventive and predictive servicing to keep your installations running optimally.'
    },
    bullets: {
      fr: [
        'Organiser et planifier les travaux et interventions de maintenance',
        'Optimiser les résultats et le fonctionnement des équipements dans le respect de la réglementation',
        'Gestion des activités de sous-traitance',
        'Entretien régulier, pour vous éviter les arrêts imprévus et réduire la durée des arrêts'
      ],
      en: [
        'Organise and plan maintenance works and interventions',
        'Optimise equipment results and operation within the applicable regulations',
        'Management of subcontracted activities',
        'Regular servicing to avoid unplanned shutdowns and shorten outages'
      ]
    },
    image: 'IMG_7941',
    tags: {
      fr: ['Préventif', 'Prédictif', 'Sur site'],
      en: ['Preventive', 'Predictive', 'On site']
    }
  },
  {
    num: '06',
    title: { fr: 'Manutention et transfert', en: 'Handling & transfer' },
    short: {
      fr: 'Prise en charge complète, de la mise en place des outils à la livraison sur site.',
      en: 'End-to-end handling, from tooling to delivery on site.'
    },
    description: {
      fr: 'Spécialisée dans tous les travaux de manutention, MCCT Industry vous assure la prise en charge complète de vos projets, de la mise en place des outils à la livraison sur site. Nos techniciens ont la capacité de vous fournir une expertise correspondant à tous vos besoins.',
      en: 'Specialised in all handling operations, MCCT Industry takes full charge of your projects, from setting up the tooling to delivery on site. Our technicians provide expertise matched to every requirement.'
    },
    bullets: {
      fr: [
        'Planification et optimisation des équipes et du matériel',
        'Plans de levage et manutention d’équipements lourds',
        'Mise en place des outils et moyens de levage',
        'Transfert et livraison sur site'
      ],
      en: [
        'Planning and optimisation of teams and equipment',
        'Lifting plans and handling of heavy equipment',
        'Set-up of tooling and lifting means',
        'Transfer and delivery on site'
      ]
    },
    image: 'IMG_7939',
    tags: {
      fr: ['Levage lourd', 'Plans de levage', 'Transfert'],
      en: ['Heavy lifting', 'Lifting plans', 'Transfer']
    }
  },
  {
    num: '07',
    title: { fr: 'Équipements industriels', en: 'Industrial equipment' },
    short: {
      fr: 'Convoyeurs, structures support et équipements de process.',
      en: 'Conveyors, support structures and process equipment.'
    },
    description: {
      fr: 'Convoyeurs, structures support, passerelles et équipements de process : des solutions fabriquées sur mesure pour les sites industriels exigeants, conçues pour s’intégrer aux installations existantes.',
      en: 'Conveyors, support structures, walkways and process equipment: bespoke solutions for demanding industrial sites, designed to fit into existing installations.'
    },
    bullets: {
      fr: [
        'Convoyeurs et structures support',
        'Passerelles, escaliers et garde-corps',
        'Équipements de process sur mesure',
        'Intégration aux installations existantes'
      ],
      en: [
        'Conveyors and support structures',
        'Walkways, stairs and handrails',
        'Bespoke process equipment',
        'Integration with existing installations'
      ]
    },
    image: 'IMG_7905',
    tags: {
      fr: ['Convoyeurs', 'Passerelles', 'Process'],
      en: ['Conveyors', 'Walkways', 'Process']
    }
  }
];

export const getActivities = (lang = 'fr') =>
  rawActivities?.map((activity) => ({
    num: activity?.num,
    title: localize(activity?.title, lang),
    short: localize(activity?.short, lang),
    description: localize(activity?.description, lang),
    tags: localize(activity?.tags, lang),
    bullets: localize(activity?.bullets, lang),
    image: activity?.image,
    src: img(activity?.image),
    thumbSrc: thumb(activity?.image)
  }));

const rawProcessSteps = [
  {
    num: '01',
    title: { fr: 'ENGINEERING', en: 'ENGINEERING' },
    icon: 'engineering',
    desc: { fr: 'Études techniques et dimensionnement.', en: 'Technical studies and sizing.' }
  },
  {
    num: '02',
    title: { fr: 'CONCEPTION', en: 'DESIGN' },
    icon: 'design',
    desc: { fr: 'Plans d’exécution et préparation.', en: 'Shop drawings and preparation.' }
  },
  {
    num: '03',
    title: { fr: 'FABRICATION', en: 'FABRICATION' },
    icon: 'fabrication',
    desc: { fr: 'Découpe, soudure et assemblage en atelier.', en: 'Cutting, welding and assembly in the workshop.' }
  },
  {
    num: '04',
    title: { fr: 'ASSEMBLAGE', en: 'ASSEMBLY' },
    icon: 'assembly',
    desc: { fr: 'Pré-montage et contrôle des ensembles.', en: 'Pre-assembly and inspection of the units.' }
  },
  {
    num: '05',
    title: { fr: 'INSTALLATION', en: 'ERECTION' },
    icon: 'installation',
    desc: { fr: 'Levage et montage sur site.', en: 'Lifting and erection on site.' }
  },
  {
    num: '06',
    title: { fr: 'MAINTENANCE', en: 'MAINTENANCE' },
    icon: 'maintenance',
    desc: { fr: 'Suivi et interventions en exploitation.', en: 'Follow-up and work during operation.' }
  }
];

export const getProcessSteps = (lang = 'fr') =>
  rawProcessSteps?.map((step) => ({
    num: step?.num,
    title: localize(step?.title, lang),
    desc: localize(step?.desc, lang),
    icon: step?.icon
  }));

/** Catégories de projets : `key` stable pour le filtrage, `label` traduit. */
export const projectCategories = [
  { key: 'ALL', label: { fr: 'TOUS', en: 'ALL' } },
  { key: 'CONSTRUCTION', label: { fr: 'CONSTRUCTION', en: 'CONSTRUCTION' } },
  { key: 'INDUSTRIE', label: { fr: 'INDUSTRIE', en: 'INDUSTRY' } },
  { key: 'ENERGIE', label: { fr: 'ÉNERGIE', en: 'ENERGY' } },
  { key: 'EQUIPEMENTS', label: { fr: 'ÉQUIPEMENTS', en: 'EQUIPMENT' } }
];

export const projectCategoryLabel = (key, lang) =>
  localize(projectCategories?.find((category) => category?.key === key)?.label, lang) ?? key;

const LOCATIONS = {
  maroc: { fr: 'Maroc', en: 'Morocco' },
  casablanca: { fr: 'Casablanca', en: 'Casablanca' },
  rabat: { fr: 'Rabat', en: 'Rabat' },
  atelier: { fr: 'Atelier MCCT', en: 'MCCT workshop' }
};

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
    title: { fr: 'Hangar métallique', en: 'Steel warehouse' },
    category: 'CONSTRUCTION',
    location: LOCATIONS?.maroc,
    image: 'charpente-profiles-attente',
    introduction: {
      fr: 'Ossature complète d’un hangar industriel : portiques, pannes et contreventements, préparés en atelier puis levés sur site.',
      en: 'Complete frame for an industrial warehouse: portal frames, purlins and bracing, prepared in the workshop then lifted on site.'
    },
    sections: [
      {
        title: { fr: 'L’OUVRAGE', en: 'THE BUILDING' },
        body: {
          fr: 'Un bâtiment à portiques acier de grande portée, conçu pour libérer un volume intérieur sans poteau intermédiaire.',
          en: 'A long-span steel portal building, designed to free the interior volume of any intermediate column.'
        }
      },
      {
        title: { fr: 'EN ATELIER', en: 'IN THE WORKSHOP' },
        body: {
          fr: 'Débit des profilés, percements et soudures d’assemblage réalisés en atelier, où chaque ensemble est contrôlé avant expédition.',
          en: 'Sections cut, drilled and welded in the workshop, where every assembly is checked before dispatch.'
        }
      },
      {
        title: { fr: 'SUR SITE', en: 'ON SITE' },
        body: {
          fr: 'Levage file par file : poteaux, arbalétriers, puis pannes et contreventements avant la pose de la couverture.',
          en: 'Bay-by-bay lifting: columns, rafters, then purlins and bracing before the roofing goes on.'
        }
      }
    ],
    services: {
      fr: ['Étude d’exécution', 'Fabrication', 'Levage', 'Montage'],
      en: ['Shop drawings', 'Fabrication', 'Lifting', 'Erection']
    },
    materials: { fr: ['Profilés acier', 'Boulonnerie de charpente'], en: ['Steel sections', 'Structural bolts'] }
  },
  {
    title: { fr: 'Auvent en charpente acier', en: 'Steel canopy' },
    category: 'CONSTRUCTION',
    location: LOCATIONS?.casablanca,
    image: 'IMG_7861',
    introduction: {
      fr: 'Auvent en charpente acier à couverture translucide, monté au-dessus d’un espace recevant du public.',
      en: 'Steel canopy with translucent roofing, erected over a space open to the public.'
    },
    sections: [
      {
        title: { fr: 'LE BESOIN', en: 'THE BRIEF' },
        body: {
          fr: 'Couvrir une zone extérieure en conservant la lumière naturelle et une structure visuellement légère.',
          en: 'Cover an outdoor area while keeping natural light and a visually light structure.'
        }
      },
      {
        title: { fr: 'LA RÉPONSE', en: 'THE ANSWER' },
        body: {
          fr: 'Une ossature acier peinte, à trame régulière, recevant des panneaux de couverture translucides entre pannes.',
          en: 'A painted steel frame on a regular grid, carrying translucent roofing panels between purlins.'
        }
      }
    ],
    services: { fr: ['Charpente', 'Couverture', 'Peinture'], en: ['Steelwork', 'Roofing', 'Paint'] },
    materials: { fr: ['Acier peint', 'Panneaux translucides'], en: ['Painted steel', 'Translucent panels'] }
  },
  {
    title: { fr: 'Hangar livré clé en main', en: 'Turnkey warehouse' },
    category: 'CONSTRUCTION',
    location: LOCATIONS?.maroc,
    image: 'IMG_7951',
    introduction: {
      fr: 'Bâtiment industriel livré prêt à l’exploitation : ossature, bardage, couverture, portes et finitions intérieures.',
      en: 'Industrial building handed over ready to use: frame, cladding, roofing, doors and interior finishing.'
    },
    sections: [
      {
        title: { fr: 'PÉRIMÈTRE', en: 'SCOPE' },
        body: {
          fr: 'Un lot unique, de la structure aux fermetures, pour un interlocuteur technique unique jusqu’à la réception.',
          en: 'A single package, from structure to closures, with one technical contact through to handover.'
        }
      },
      {
        title: { fr: 'ENVELOPPE', en: 'ENVELOPE' },
        body: {
          fr: 'Bardage et couverture posés après montage de l’ossature, avec portes sectionnelles et accès de service.',
          en: 'Cladding and roofing installed after the frame is up, with sectional doors and service access.'
        }
      },
      {
        title: { fr: 'INTÉRIEUR', en: 'INTERIOR' },
        body: {
          fr: 'Traitement du sol et finitions réalisés avant remise des clés, le volume restant entièrement dégagé.',
          en: 'Floor treatment and finishing completed before handover, leaving the volume entirely clear.'
        }
      }
    ],
    services: {
      fr: ['Charpente', 'Bardage', 'Couverture', 'Finitions'],
      en: ['Steelwork', 'Cladding', 'Roofing', 'Finishing']
    },
    materials: { fr: ['Panneaux sandwich', 'Bac acier'], en: ['Sandwich panels', 'Profiled steel sheet'] }
  },
  {
    title: { fr: 'Ossature acier — chantier', en: 'Steel frame — site' },
    category: 'CONSTRUCTION',
    location: LOCATIONS?.maroc,
    image: 'charpente-ossature-elevation',
    introduction: {
      fr: 'Suivi d’une ossature acier en cours d’élévation, du premier portique au contreventement définitif.',
      en: 'Following a steel frame as it goes up, from the first portal to the final bracing.'
    },
    sections: [
      {
        title: { fr: 'SÉQUENCE DE LEVAGE', en: 'LIFTING SEQUENCE' },
        body: {
          fr: 'Les portiques sont dressés dans l’ordre du calepinage, stabilisés provisoirement, puis reliés par les pannes.',
          en: 'Portal frames are raised in setting-out order, temporarily stabilised, then tied together by the purlins.'
        }
      },
      {
        title: { fr: 'STABILITÉ', en: 'STABILITY' },
        body: {
          fr: 'Contreventements de long pan et de versant posés au fur et à mesure pour figer la géométrie de l’ossature.',
          en: 'Wall and roof bracing installed as work progresses to lock in the geometry of the frame.'
        }
      }
    ],
    services: { fr: ['Levage', 'Montage', 'Contrôle dimensionnel'], en: ['Lifting', 'Erection', 'Dimensional check'] }
  },
  {
    title: { fr: 'Convoyeur industriel', en: 'Industrial conveyor' },
    category: 'INDUSTRIE',
    location: LOCATIONS?.maroc,
    image: 'IMG_7905',
    introduction: {
      fr: 'Convoyeur à bande et sa structure support, fabriqués puis installés sous couverture sur un site de production.',
      en: 'Belt conveyor and its support structure, fabricated then installed under cover on a production site.'
    },
    sections: [
      {
        title: { fr: 'FONCTION', en: 'PURPOSE' },
        body: {
          fr: 'Assurer un transfert continu de matière entre deux postes, avec un accès de maintenance sur toute la longueur.',
          en: 'Provide continuous material transfer between two stations, with maintenance access along its full length.'
        }
      },
      {
        title: { fr: 'STRUCTURE SUPPORT', en: 'SUPPORT STRUCTURE' },
        body: {
          fr: 'Châssis et stations à rouleaux alignés sur une ossature dédiée, réglée pour garantir le suivi de bande.',
          en: 'Frames and idler stations aligned on a dedicated structure, set to keep the belt tracking true.'
        }
      },
      {
        title: { fr: 'INSTALLATION', en: 'INSTALLATION' },
        body: {
          fr: 'Montage par tronçons préfabriqués, raccordement et réglages réalisés sur site par nos équipes.',
          en: 'Installed in prefabricated sections, connected and adjusted on site by our teams.'
        }
      }
    ],
    services: {
      fr: ['Fabrication', 'Structure support', 'Installation'],
      en: ['Fabrication', 'Support structure', 'Installation']
    },
    materials: { fr: ['Acier', 'Stations à rouleaux'], en: ['Steel', 'Idler stations'] }
  },
  {
    title: { fr: 'Structure de process', en: 'Process structure' },
    category: 'INDUSTRIE',
    location: LOCATIONS?.maroc,
    image: 'IMG_7907',
    introduction: {
      fr: 'Supports et berceaux de process assemblés sur site, destinés à recevoir des équipements industriels.',
      en: 'Process supports and cradles assembled on site to carry industrial equipment.'
    },
    sections: [
      {
        title: { fr: 'CONCEPTION', en: 'DESIGN' },
        body: {
          fr: 'Des supports dimensionnés pour les charges et les accès d’exploitation, avec platines de fixation repérées.',
          en: 'Supports sized for the loads and for operating access, with fixing plates individually marked.'
        }
      },
      {
        title: { fr: 'MISE EN PLACE', en: 'SETTING OUT' },
        body: {
          fr: 'Assemblage au sol puis mise en position à la grue, avec réglage des niveaux avant scellement.',
          en: 'Assembled at ground level then craned into position, with levels adjusted before grouting.'
        }
      }
    ],
    services: { fr: ['Étude d’exécution', 'Fabrication', 'Montage'], en: ['Shop drawings', 'Fabrication', 'Erection'] },
    materials: { fr: ['Acier peint'], en: ['Painted steel'] }
  },
  {
    title: { fr: 'Réservoir métallique', en: 'Steel tank' },
    category: 'INDUSTRIE',
    location: LOCATIONS?.maroc,
    image: 'IMG_7886',
    introduction: {
      fr: 'Montage sur site d’un réservoir métallique : viroles préparées en atelier, assemblées puis levées à la grue.',
      en: 'On-site erection of a steel tank: shell courses prepared in the workshop, assembled then craned into place.'
    },
    sections: [
      {
        title: { fr: 'CHAUDRONNERIE', en: 'FABRICATION' },
        body: {
          fr: 'Roulage et soudure des viroles en atelier, contrôlées avant transport vers le site.',
          en: 'Shell courses rolled and welded in the workshop, inspected before transport to site.'
        }
      },
      {
        title: { fr: 'LEVAGE', en: 'LIFTING' },
        body: {
          fr: 'Chaque panneau est présenté à la grue, maintenu le temps de l’assemblage, puis soudé en position.',
          en: 'Each panel is presented by crane, held while it is assembled, then welded in position.'
        }
      }
    ],
    services: {
      fr: ['Chaudronnerie', 'Levage', 'Soudure sur site'],
      en: ['Boilermaking', 'Lifting', 'On-site welding']
    },
    materials: { fr: ['Tôle acier'], en: ['Steel plate'] }
  },
  {
    title: { fr: 'Installations gaz', en: 'Gas installations' },
    category: 'ENERGIE',
    location: LOCATIONS?.maroc,
    image: 'IMG_7943',
    introduction: {
      fr: 'Poste de détente et lignes associées : tuyauterie, robinetterie et supports, sur une installation en exploitation.',
      en: 'Pressure-reduction skid and associated lines: piping, valves and supports, on an operating installation.'
    },
    sections: [
      {
        title: { fr: 'INTERVENTION', en: 'THE INTERVENTION' },
        body: {
          fr: 'Travaux menés sur un site en service, avec balisage, consignation et plan de prévention préalables.',
          en: 'Work carried out on a live site, with prior barriering, lock-out and a safety plan in place.'
        }
      },
      {
        title: { fr: 'TUYAUTERIE', en: 'PIPING' },
        body: {
          fr: 'Lignes préfabriquées puis raccordées sur place, avec reprise des supports et de la robinetterie.',
          en: 'Lines prefabricated then connected in place, with supports and valves reworked as needed.'
        }
      }
    ],
    services: { fr: ['Tuyauterie', 'Montage', 'Sécurité chantier'], en: ['Piping', 'Installation', 'Site safety'] }
  },
  {
    title: { fr: 'Maintenance de station', en: 'Station maintenance' },
    category: 'ENERGIE',
    location: LOCATIONS?.maroc,
    image: 'IMG_7938',
    introduction: {
      fr: 'Intervention de maintenance sur un réservoir et ses accessoires, en site exploité.',
      en: 'Maintenance work on a tank and its fittings, on an operating site.'
    },
    sections: [
      {
        title: { fr: 'DIAGNOSTIC', en: 'SURVEY' },
        body: {
          fr: 'Relevé de l’état de la capacité et de ses piquages avant définition du périmètre d’intervention.',
          en: 'Condition survey of the vessel and its nozzles before the scope of work is set.'
        }
      },
      {
        title: { fr: 'REMISE EN ÉTAT', en: 'REPAIR' },
        body: {
          fr: 'Reprises métalliques et accessoires traités sur place, avec accès sécurisé pour les équipes.',
          en: 'Steel repairs and fittings dealt with in place, with safe access for the teams.'
        }
      }
    ],
    services: { fr: ['Maintenance corrective', 'Travaux sur site'], en: ['Corrective maintenance', 'On-site work'] }
  },
  {
    title: { fr: 'Levage d’équipements', en: 'Equipment lifting' },
    category: 'ENERGIE',
    location: LOCATIONS?.maroc,
    image: 'IMG_7939',
    introduction: {
      fr: 'Déchargement et mise en place d’un module technique à la grue sur une plateforme industrielle.',
      en: 'Unloading and craning a technical module into place on an industrial platform.'
    },
    sections: [
      {
        title: { fr: 'PRÉPARATION', en: 'PREPARATION' },
        body: {
          fr: 'Étude des points d’élingage, choix du moyen de levage et balisage de la zone avant manœuvre.',
          en: 'Sling points studied, lifting gear selected and the area barriered before the lift.'
        }
      },
      {
        title: { fr: 'MANŒUVRE', en: 'THE LIFT' },
        body: {
          fr: 'Le module est repris du camion, orienté, puis posé sur ses appuis sous la conduite d’un chef de manœuvre.',
          en: 'The module is taken off the truck, turned, then set on its bearings under a lift supervisor.'
        }
      }
    ],
    services: { fr: ['Levage', 'Manutention', 'Mise en place'], en: ['Lifting', 'Handling', 'Setting in place'] }
  },
  {
    title: { fr: 'Ensembles chaudronnés', en: 'Fabricated assemblies' },
    category: 'EQUIPEMENTS',
    location: LOCATIONS?.atelier,
    image: 'IMG_7918',
    introduction: {
      fr: 'Trémies et ensembles mécano-soudés fabriqués en atelier, contrôlés puis chargés pour livraison sur site.',
      en: 'Hoppers and welded assemblies built in the workshop, inspected then loaded for delivery to site.'
    },
    sections: [
      {
        title: { fr: 'FABRICATION', en: 'FABRICATION' },
        body: {
          fr: 'Découpe, pliage et soudure des tôles sur gabarit, avec reprise des angles et des raidisseurs.',
          en: 'Plates cut, folded and welded on jigs, with corners and stiffeners finished by hand.'
        }
      },
      {
        title: { fr: 'CONTRÔLE ET EXPÉDITION', en: 'INSPECTION AND DISPATCH' },
        body: {
          fr: 'Vérification dimensionnelle et visuelle avant chargement au pont roulant pour le transport.',
          en: 'Dimensional and visual checks before loading by overhead crane for transport.'
        }
      }
    ],
    services: {
      fr: ['Chaudronnerie', 'Mécano-soudure', 'Contrôle qualité'],
      en: ['Boilermaking', 'Welded assemblies', 'Quality control']
    },
    materials: { fr: ['Tôle forte'], en: ['Heavy plate'] }
  },
  {
    title: { fr: 'Tuyauterie grand diamètre', en: 'Large-diameter piping' },
    category: 'EQUIPEMENTS',
    location: LOCATIONS?.atelier,
    image: 'IMG_7924',
    introduction: {
      fr: 'Préfabrication de tronçons de tuyauterie de grand diamètre en atelier, prêts au montage.',
      en: 'Large-diameter pipe spools prefabricated in the workshop, ready for installation.'
    },
    sections: [
      {
        title: { fr: 'PRÉFABRICATION', en: 'PREFABRICATION' },
        body: {
          fr: 'Débit, préparation des chanfreins et pointage des tronçons sur berceaux avant soudure définitive.',
          en: 'Cutting, bevel preparation and tack welding on cradles before the final weld.'
        }
      },
      {
        title: { fr: 'POURQUOI EN ATELIER', en: 'WHY IN THE WORKSHOP' },
        body: {
          fr: 'Travailler au sol et à poste fixe améliore la qualité des soudures et réduit la durée d’intervention sur site.',
          en: 'Working at ground level in a fixed position improves weld quality and shortens time spent on site.'
        }
      }
    ],
    services: { fr: ['Préfabrication', 'Soudure', 'Contrôle'], en: ['Prefabrication', 'Welding', 'Inspection'] },
    materials: { fr: ['Tubes acier'], en: ['Steel pipe'] }
  }
];

export const getProjects = (lang = 'fr') => {
  const gallery = getGalleryItems(lang);
  return rawProjects?.map((project) => {
    const slug = slugify(project?.title?.fr);
    return {
      slug,
      title: localize(project?.title, lang),
      category: project?.category,
      categoryLabel: projectCategoryLabel(project?.category, lang),
      location: localize(project?.location, lang),
      year: project?.year,
      client: project?.client,
      image: project?.image,
      src: img(project?.image),
      thumbSrc: thumb(project?.image),
      introduction: localize(project?.introduction, lang),
      sections: project?.sections?.map((section) => ({
        title: localize(section?.title, lang),
        body: localize(section?.body, lang)
      })),
      services: localize(project?.services, lang),
      materials: localize(project?.materials, lang),
      gallery: gallery?.filter((item) => item?.projectSlug === slug)
    };
  });
};

export const getProjectBySlug = (slug, lang = 'fr') => getProjects(lang)?.find((project) => project?.slug === slug);

/** Projets mis en avant sur l'accueil (sous-ensemble de la page Projets). */
const HOME_PROJECT_IMAGES = ['charpente-profiles-attente', 'IMG_7861', 'IMG_7905', 'IMG_7907', 'IMG_7943', 'IMG_7938', 'IMG_7918', 'IMG_7924'];
export const getHomeProjects = (lang = 'fr') =>
  getProjects(lang)?.filter((project) => HOME_PROJECT_IMAGES?.includes(project?.image));

/**
 * Avis clients — volontairement anonymes : seuls la fonction et le secteur du
 * donneur d'ordre sont indiqués, aucun nom de personne ni d'entreprise.
 */
const rawReviews = [
  {
    id: 'r1',
    role: { fr: 'Directeur technique', en: 'Technical director' },
    sector: { fr: 'Agro-industrie', en: 'Agri-industry' },
    text: {
      fr: 'Hangar de 1 800 m² livré dans les délais annoncés, sans reprise. Les plans d’exécution étaient justes du premier coup, ce qui nous a évité deux semaines d’arrêt.',
      en: 'An 1,800 m² building delivered on the announced schedule, with no rework. The shop drawings were right first time, which saved us two weeks of downtime.'
    }
  },
  {
    id: 'r2',
    role: { fr: 'Responsable maintenance', en: 'Maintenance manager' },
    sector: { fr: 'Énergie', en: 'Energy' },
    text: {
      fr: 'Intervention sur une ligne de tuyauterie pendant un arrêt de 72 h. Équipe sur site à l’heure, consignations respectées, remise en service sans incident.',
      en: 'Work on a piping line during a 72-hour shutdown. Crew on site on time, lock-out procedures respected, restart without incident.'
    }
  },
  {
    id: 'r3',
    role: { fr: 'Chef de projet', en: 'Project manager' },
    sector: { fr: 'Traitement de l’eau', en: 'Water treatment' },
    text: {
      fr: 'Ce que j’apprécie, c’est d’avoir un seul interlocuteur technique du chiffrage à la réception. Quand une contrainte apparaît, on est prévenu tout de suite.',
      en: 'What I value is having one technical contact from quotation to handover. When a constraint comes up, we hear about it straight away.'
    }
  },
  {
    id: 'r4',
    role: { fr: 'Directeur d’usine', en: 'Plant director' },
    sector: { fr: 'Chimie', en: 'Chemicals' },
    text: {
      fr: 'Trémies et goulottes fabriquées sur mesure pour une ligne existante. Les cotes étaient bonnes, le montage s’est fait en deux jours au lieu de cinq prévus.',
      en: 'Hoppers and chutes made to measure for an existing line. Dimensions were right, erection took two days instead of the five we planned.'
    }
  },
  {
    id: 'r5',
    role: { fr: 'Responsable travaux neufs', en: 'New works manager' },
    sector: { fr: 'Mines & phosphates', en: 'Mining & phosphates' },
    text: {
      fr: 'Levage d’un module technique en zone contrainte. Plan de levage détaillé fourni en amont, balisage sérieux, aucun incident sur toute la durée du chantier.',
      en: 'Lifting a technical module in a constrained area. A detailed lifting plan provided upfront, proper exclusion zones, no incident for the whole job.'
    }
  },
  {
    id: 'r6',
    role: { fr: 'Ingénieur méthodes', en: 'Methods engineer' },
    sector: { fr: 'Emballage industriel', en: 'Industrial packaging' },
    text: {
      fr: 'Le pré-assemblage en atelier change tout : on récupère des ensembles contrôlés, et le temps passé sur site est divisé par deux.',
      en: 'Workshop pre-assembly changes everything: we receive inspected units, and time spent on site is halved.'
    }
  },
  {
    id: 'r7',
    role: { fr: 'Directeur des opérations', en: 'Operations director' },
    sector: { fr: 'Sucrerie', en: 'Sugar' },
    text: {
      fr: 'Trois campagnes de suite avec la même équipe. Ils connaissent nos installations, ce qui fait gagner un temps considérable sur chaque intervention.',
      en: 'Three campaigns in a row with the same crew. They know our installations, which saves considerable time on every job.'
    }
  },
  {
    id: 'r8',
    role: { fr: 'Responsable HSE', en: 'HSE manager' },
    sector: { fr: 'Pétrole & gaz', en: 'Oil & gas' },
    text: {
      fr: 'Sur nos sites, la sécurité n’est pas négociable. Leurs équipes arrivent équipées, formées, et acceptent nos procédures sans discuter.',
      en: 'On our sites, safety is not negotiable. Their crews arrive equipped, trained, and accept our procedures without argument.'
    }
  }
];

export const getReviews = (lang = 'fr') =>
  rawReviews?.map((review) => ({
    id: review?.id,
    role: localize(review?.role, lang),
    sector: localize(review?.sector, lang),
    text: localize(review?.text, lang)
  }));

/**
 * Récit d'ouverture joué au défilement (section épinglée sous le hero).
 * Quatre chapitres, quatre photos réelles : de l'atelier à l'ouvrage livré.
 */
const rawJourney = [
  {
    num: '01',
    label: { fr: 'ATELIER', en: 'WORKSHOP' },
    title: { fr: 'TOUT PART\nDE L’ATELIER.', en: 'IT ALL STARTS\nIN THE WORKSHOP.' },
    desc: {
      fr: 'Découpe, soudure, assemblage. Chaque profilé est préparé et contrôlé avant de quitter nos ateliers.',
      en: 'Cutting, welding, assembly. Every section is prepared and inspected before it leaves our workshops.'
    },
    image: 'IMG_7916'
  },
  {
    num: '02',
    label: { fr: 'CHAUDRONNERIE', en: 'BOILERMAKING' },
    title: { fr: 'DES ENSEMBLES\nTAILLÉS SUR MESURE.', en: 'ASSEMBLIES BUILT\nTO MEASURE.' },
    desc: {
      fr: 'Trémies, goulottes, capotages : des pièces lourdes fabriquées pour un site et un process précis.',
      en: 'Hoppers, chutes, enclosures: heavy parts fabricated for one specific site and process.'
    },
    image: 'IMG_7918'
  },
  {
    num: '03',
    label: { fr: 'LEVAGE', en: 'LIFTING' },
    title: { fr: 'PUIS TOUT SE JOUE\nSUR LE CHANTIER.', en: 'THEN EVERYTHING\nHAPPENS ON SITE.' },
    desc: {
      fr: 'Plans de levage, coordination des équipes, montage au millimètre. C’est là que la préparation paie.',
      en: 'Lifting plans, crew coordination, millimetre-accurate erection. This is where the preparation pays off.'
    },
    image: 'IMG_7887'
  },
  {
    num: '04',
    label: { fr: 'OUVRAGE', en: 'DELIVERED' },
    title: { fr: 'ET L’OUVRAGE\nRESTE DEBOUT.', en: 'AND THE STRUCTURE\nSTANDS.' },
    desc: {
      fr: 'Un bâtiment livré, conforme aux normes, prêt à encaisser trente ans d’exploitation industrielle.',
      en: 'A completed building, compliant with the standards, ready for thirty years of industrial service.'
    },
    image: 'IMG_7871'
  }
];

export const getJourney = (lang = 'fr') =>
  rawJourney?.map((chapter) => ({
    num: chapter?.num,
    label: localize(chapter?.label, lang),
    title: localize(chapter?.title, lang),
    desc: localize(chapter?.desc, lang),
    src: img(chapter?.image),
    thumbSrc: thumb(chapter?.image)
  }));

const rawSectors = [
  {
    title: { fr: 'BÂTIMENTS INDUSTRIELS', en: 'INDUSTRIAL BUILDINGS' },
    desc: {
      fr: 'Hangars, ateliers et unités de production en charpente métallique.',
      en: 'Warehouses, workshops and production units in structural steel.'
    },
    image: 'charpente-profiles-attente'
  },
  {
    title: { fr: 'STRUCTURES COMMERCIALES', en: 'COMMERCIAL STRUCTURES' },
    desc: {
      fr: 'Auvents, halls et ossatures pour sites recevant du public.',
      en: 'Canopies, halls and frames for sites open to the public.'
    },
    image: 'IMG_7861'
  },
  {
    title: { fr: 'INSTALLATIONS SPÉCIALISÉES', en: 'SPECIALISED INSTALLATIONS' },
    desc: {
      fr: 'Équipements de process, tuyauterie et structures techniques.',
      en: 'Process equipment, piping and technical structures.'
    },
    image: 'IMG_7907'
  }
];

export const getSectors = (lang = 'fr') =>
  rawSectors?.map((sector) => ({
    title: localize(sector?.title, lang),
    desc: localize(sector?.desc, lang),
    src: img(sector?.image),
    thumbSrc: thumb(sector?.image)
  }));

const rawValues = [
  {
    num: '01',
    title: { fr: 'EXCELLENCE', en: 'EXCELLENCE' },
    desc: {
      fr: 'Chaque pièce sort de l’atelier contrôlée. Les normes de l’industrie et les spécifications du client ne sont pas négociables — c’est ce qui fait qu’un ouvrage tient trente ans.',
      en: 'Every part leaves the workshop inspected. Industry standards and client specifications are not negotiable — that is what makes a structure last thirty years.'
    },
    image: 'IMG_7916'
  },
  {
    num: '02',
    title: { fr: 'SÉCURITÉ', en: 'SAFETY' },
    desc: {
      fr: 'Plans de levage, balisage, équipements de protection : sur nos chantiers, la sécurité conditionne le planning, jamais l’inverse. Nos équipes rentrent entières.',
      en: 'Lifting plans, exclusion zones, protective equipment: on our sites safety drives the schedule, never the other way round. Our crews go home whole.'
    },
    image: 'IMG_7941'
  },
  {
    num: '03',
    title: { fr: 'INNOVATION', en: 'INNOVATION' },
    desc: {
      fr: 'Techniques de fabrication avancées, préfabrication en atelier, pré-assemblage : nous cherchons en permanence la méthode qui réduit les risques et les délais sur site.',
      en: 'Advanced fabrication techniques, workshop prefabrication, pre-assembly: we constantly look for the method that cuts risk and time on site.'
    },
    image: 'IMG_7918'
  },
  {
    num: '04',
    title: { fr: 'ENGAGEMENT', en: 'COMMITMENT' },
    desc: {
      fr: 'Un interlocuteur technique dédié du premier chiffrage à la réception. Nous tenons les délais annoncés, et nous le disons quand une contrainte apparaît.',
      en: 'A dedicated technical contact from first estimate to handover. We hold the deadlines we announce — and we say so when a constraint appears.'
    },
    image: 'IMG_7887'
  }
];

export const getValues = (lang = 'fr') =>
  rawValues?.map((value) => ({
    num: value?.num,
    title: localize(value?.title, lang),
    desc: localize(value?.desc, lang),
    image: value?.image,
    src: img(value?.image),
    thumbSrc: thumb(value?.image)
  }));

const rawKeyFigures = [
  { value: 15, label: { fr: 'ANNÉES D’EXPÉRIENCE', en: 'YEARS OF EXPERIENCE' } },
  { value: 52, label: { fr: 'PROJETS RÉALISÉS', en: 'PROJECTS DELIVERED' } },
  { value: 10, label: { fr: 'COLLABORATEURS', en: 'TEAM MEMBERS' } },
  { value: 30, label: { fr: 'SECTEURS INDUSTRIELS', en: 'INDUSTRIAL SECTORS' } }
];

export const getKeyFigures = (lang = 'fr') =>
  rawKeyFigures?.map((figure) => ({ value: figure?.value, label: localize(figure?.label, lang) }));

/** Baseline de marque (couverture brochure MCCT). */
const rawBaseline = [
  {
    key: 'excellence',
    title: { fr: 'EXCELLENCE', en: 'EXCELLENCE' },
    desc: {
      fr: 'Des réalisations conformes aux normes de l’industrie, contrôlées à chaque étape.',
      en: 'Work that meets industry standards, checked at every stage.'
    }
  },
  {
    key: 'rapidite',
    title: { fr: 'RAPIDITÉ', en: 'SPEED' },
    desc: {
      fr: 'Des délais tenus, de l’étude d’exécution à la réception sur site.',
      en: 'Deadlines held, from shop drawings to site handover.'
    }
  },
  {
    key: 'satisfaction',
    title: { fr: 'SATISFACTION', en: 'SATISFACTION' },
    desc: {
      fr: 'Un interlocuteur technique dédié et un service personnalisé sur toute la durée du projet.',
      en: 'A dedicated technical contact and personalised service for the whole project.'
    }
  }
];

export const getBaseline = (lang = 'fr') =>
  rawBaseline?.map((item) => ({
    key: item?.key,
    title: localize(item?.title, lang),
    desc: localize(item?.desc, lang)
  }));

/** Signature de marque reprise de la brochure MCCT. */
export const signatureQuote = {
  fr: 'La construction métallique est notre spécialité, et notre savoir-faire se transmet avec fierté.',
  en: 'Steel construction is our speciality, and our know-how is passed on with pride.'
};

/** Brochure PDF : renseigner le chemin (ex. '/mcct-brochure.pdf') pour afficher le bloc. */
export const brochureUrl = '';
