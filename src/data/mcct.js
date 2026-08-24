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
    title: { fr: 'Construction métallique', en: 'Steel construction' },
    short: {
      fr: 'Charpentes, hangars et ossatures acier, de l’étude au levage.',
      en: 'Frames, warehouses and steel structures, from design to erection.'
    },
    description: {
      fr: 'Charpentes, hangars industriels, auvents et ossatures acier : nous concevons, fabriquons et montons des structures métalliques complètes, de l’étude d’exécution au levage sur site.',
      en: 'Frames, industrial warehouses, canopies and steel structures: we design, fabricate and erect complete steel structures, from shop drawings to lifting on site.'
    },
    image: 'charpente-montage-telescopique',
    tags: {
      fr: ['Charpente', 'Hangars', 'Bardage', 'Couverture'],
      en: ['Steelwork', 'Warehouses', 'Cladding', 'Roofing']
    }
  },
  {
    num: '02',
    title: { fr: 'Chaudronnerie', en: 'Boilermaking' },
    short: {
      fr: 'Fabrication d’ensembles chaudronnés lourds et sur mesure.',
      en: 'Heavy, bespoke fabricated assemblies.'
    },
    description: {
      fr: 'Fabrication d’ensembles chaudronnés lourds et sur mesure : trémies, goulottes, capotages et pièces mécano-soudées, réalisés en atelier avec un contrôle qualité systématique.',
      en: 'Heavy, bespoke fabricated assemblies: hoppers, chutes, enclosures and welded parts, produced in the workshop with systematic quality control.'
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
      fr: 'Préfabrication et montage de réseaux de tuyauterie, du grand diamètre aux lignes de process, avec préparation, soudure et contrôle en atelier et sur site.',
      en: 'Prefabrication and installation of piping networks, from large diameters to process lines, with preparation, welding and inspection in the workshop and on site.'
    },
    image: 'IMG_7924',
    tags: {
      fr: ['Préfabrication', 'Montage', 'Grand diamètre'],
      en: ['Prefabrication', 'Installation', 'Large diameter']
    }
  },
  {
    num: '04',
    title: { fr: 'Installation & montage', en: 'Installation & erection' },
    short: {
      fr: 'Levage, assemblage et mise en œuvre sur site.',
      en: 'Lifting, assembly and installation on site.'
    },
    description: {
      fr: 'Levage, assemblage et mise en œuvre sur site : nos équipes assurent le montage des structures et équipements dans le respect des délais et des règles de sécurité.',
      en: 'Lifting, assembly and installation on site: our teams erect structures and equipment on schedule and to safety rules.'
    },
    image: 'IMG_7887',
    tags: {
      fr: ['Levage', 'Assemblage', 'Mise en service'],
      en: ['Lifting', 'Assembly', 'Commissioning']
    }
  },
  {
    num: '05',
    title: { fr: 'Maintenance industrielle', en: 'Industrial maintenance' },
    short: {
      fr: 'Interventions sur installations et équipements en exploitation.',
      en: 'Work on installations and equipment in service.'
    },
    description: {
      fr: 'Interventions préventives et correctives sur installations en exploitation : stations, réseaux, équipements sous pression et structures métalliques.',
      en: 'Preventive and corrective work on operating installations: stations, networks, pressure equipment and steel structures.'
    },
    image: 'IMG_7941',
    tags: {
      fr: ['Préventif', 'Correctif', 'Sur site'],
      en: ['Preventive', 'Corrective', 'On site']
    }
  },
  {
    num: '06',
    title: { fr: 'Équipements industriels', en: 'Industrial equipment' },
    short: {
      fr: 'Convoyeurs, structures support et équipements de process.',
      en: 'Conveyors, support structures and process equipment.'
    },
    description: {
      fr: 'Convoyeurs, structures support, passerelles et équipements de process : des solutions fabriquées sur mesure pour les sites industriels exigeants.',
      en: 'Conveyors, support structures, walkways and process equipment: bespoke solutions for demanding industrial sites.'
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
    image: activity?.image,
    src: img(activity?.image),
    thumbSrc: thumb(activity?.image)
  }));

const rawProcessSteps = [
  {
    num: '01',
    title: { fr: 'ENGINEERING', en: 'ENGINEERING' },
    desc: { fr: 'Études techniques et dimensionnement.', en: 'Technical studies and sizing.' }
  },
  {
    num: '02',
    title: { fr: 'CONCEPTION', en: 'DESIGN' },
    desc: { fr: 'Plans d’exécution et préparation.', en: 'Shop drawings and preparation.' }
  },
  {
    num: '03',
    title: { fr: 'FABRICATION', en: 'FABRICATION' },
    desc: { fr: 'Découpe, soudure et assemblage en atelier.', en: 'Cutting, welding and assembly in the workshop.' }
  },
  {
    num: '04',
    title: { fr: 'ASSEMBLAGE', en: 'ASSEMBLY' },
    desc: { fr: 'Pré-montage et contrôle des ensembles.', en: 'Pre-assembly and inspection of the units.' }
  },
  {
    num: '05',
    title: { fr: 'INSTALLATION', en: 'ERECTION' },
    desc: { fr: 'Levage et montage sur site.', en: 'Lifting and erection on site.' }
  },
  {
    num: '06',
    title: { fr: 'MAINTENANCE', en: 'MAINTENANCE' },
    desc: { fr: 'Suivi et interventions en exploitation.', en: 'Follow-up and work during operation.' }
  }
];

export const getProcessSteps = (lang = 'fr') =>
  rawProcessSteps?.map((step) => ({
    num: step?.num,
    title: localize(step?.title, lang),
    desc: localize(step?.desc, lang)
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

const rawCapabilities = [
  [
    { fr: 'FABRICATION', en: 'FABRICATION' },
    {
      fr: 'Ateliers équipés pour la fabrication de structures et d’ensembles métalliques.',
      en: 'Workshops equipped to fabricate steel structures and assemblies.'
    }
  ],
  [
    { fr: 'SOUDURE', en: 'WELDING' },
    {
      fr: 'Procédés de soudure maîtrisés pour aciers de construction et tôlerie lourde.',
      en: 'Proven welding processes for structural steel and heavy plate.'
    }
  ],
  [
    { fr: 'DÉCOUPE', en: 'CUTTING' },
    {
      fr: 'Découpe et préparation des profilés, tôles et pièces primaires.',
      en: 'Cutting and preparation of sections, plates and primary parts.'
    }
  ],
  [
    { fr: 'USINAGE', en: 'MACHINING' },
    {
      fr: 'Reprise et ajustage des pièces mécaniques et assemblages.',
      en: 'Machining and fitting of mechanical parts and assemblies.'
    }
  ],
  [
    { fr: 'ASSEMBLAGE', en: 'ASSEMBLY' },
    {
      fr: 'Pré-assemblage en atelier pour fiabiliser le montage sur site.',
      en: 'Workshop pre-assembly to de-risk erection on site.'
    }
  ],
  [
    { fr: 'PEINTURE', en: 'PAINTING' },
    {
      fr: 'Traitement de surface et mise en peinture des structures.',
      en: 'Surface treatment and painting of structures.'
    }
  ],
  [
    { fr: 'CONTRÔLE QUALITÉ', en: 'QUALITY CONTROL' },
    {
      fr: 'Contrôles dimensionnels et visuels à chaque étape de production.',
      en: 'Dimensional and visual checks at every production stage.'
    }
  ],
  [
    { fr: 'LOGISTIQUE', en: 'LOGISTICS' },
    {
      fr: 'Transport, levage et coordination des livraisons sur chantier.',
      en: 'Transport, lifting and coordination of site deliveries.'
    }
  ]
];

export const getCapabilities = (lang = 'fr') =>
  rawCapabilities?.map(([title, desc], index) => ({
    num: String(index + 1)?.padStart(2, '0'),
    title: localize(title, lang),
    desc: localize(desc, lang)
  }));

const rawValues = [
  { num: '01', title: { fr: 'EXCELLENCE', en: 'EXCELLENCE' } },
  { num: '02', title: { fr: 'SÉCURITÉ', en: 'SAFETY' } },
  { num: '03', title: { fr: 'INNOVATION', en: 'INNOVATION' } },
  { num: '04', title: { fr: 'ENGAGEMENT', en: 'COMMITMENT' } }
];

export const getValues = (lang = 'fr') =>
  rawValues?.map((value) => ({ num: value?.num, title: localize(value?.title, lang) }));

const rawKeyFigures = [
  { value: 15, label: { fr: 'ANNÉES D’EXPÉRIENCE', en: 'YEARS OF EXPERIENCE' } },
  { value: 52, label: { fr: 'PROJETS RÉALISÉS', en: 'PROJECTS DELIVERED' } },
  { value: 10, label: { fr: 'COLLABORATEURS', en: 'TEAM MEMBERS' } },
  { value: 30, label: { fr: 'SECTEURS INDUSTRIELS', en: 'INDUSTRIAL SECTORS' } }
];

export const getKeyFigures = (lang = 'fr') =>
  rawKeyFigures?.map((figure) => ({ value: figure?.value, label: localize(figure?.label, lang) }));

/**
 * Logos clients — à alimenter avec les fichiers fournis par MCCT
 * (ex. { name: 'Client', src: '/assets/clients/client.svg' }).
 * Tant que la liste est vide, la section n'est pas affichée.
 */
export const clients = [];

/** Brochure PDF : renseigner le chemin (ex. '/mcct-brochure.pdf') pour afficher le bloc. */
export const brochureUrl = '';
