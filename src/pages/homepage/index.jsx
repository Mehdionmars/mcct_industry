import React from 'react';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
import { useI18n } from '../../i18n/LanguageProvider';
import { bodyFont, navLinks } from '../../components/ui/mcctTheme';
import HomeHero from './components/HomeHero';
import HomeJourney from './components/HomeJourney';
import HomeBaseline from './components/HomeBaseline';
import HomeIntro from './components/HomeIntro';
import { ActivitiesSection, SavoirFaireSection } from './components/HomeActivities';
import { FeaturedProject, EngagementSection, SectorsSection } from './components/HomeShowcase';
import HomeProjects from './components/HomeProjects';
import HomeQuality from './components/HomeQuality';
import HomeReviews from './components/HomeReviews';
import HomeValues from './components/HomeValues';
import HomeContact from './components/HomeContact';

// L'accueil ajoute l'ancre « savoir-faire » à la navigation partagée.
const homeNavLinks = [
  navLinks?.[0],
  navLinks?.[1],
  { num: '03', key: 'expertise', href: '#savoirfaire' },
  { ...navLinks?.[2], num: '04' },
  { ...navLinks?.[3], num: '05' },
  { ...navLinks?.[4], num: '06' }
];

const Homepage = () => {
  const { t } = useI18n();

  return (
  <div className="min-h-screen bg-[#F5F5F2] text-[#17191C] antialiased" style={bodyFont}>
    <PageMeta title={t('meta.home.title')} description={t('meta.home.description')} />

    <WhatsAppFab />
    <SiteHeader variant="hero" links={homeNavLinks} />

    {/*
      Ordre pensé pour le rythme, pas seulement pour la logique éditoriale.
      Deux règles tiennent la séquence :

      1. Alternance des fonds — jamais plus de deux sections sombres de suite,
         et quand il y en a deux, leurs formats s'opposent (plein cadre puis
         bandeau typographique, photo puis carrousel, etc.).
      2. Alternance des formats — deux sections voisines n'emploient jamais le
         même dispositif. « Projet à la une » et « Notre engagement » sont tous
         deux des photos plein cadre avec un gros titre : ils sont désormais
         séparés par six sections.

      Le récit épinglé (3 240 px) est descendu au milieu de page : en deuxième
      position il imposait un très long défilement avant qu'on sache seulement
      ce que fait MCCT.
    */}
    <HomeHero />
    <HomeBaseline />
    <HomeIntro />
    <FeaturedProject />
    <SectorsSection />
    <ActivitiesSection />
    <HomeJourney />
    <SavoirFaireSection />
    <EngagementSection />
    <HomeProjects />
    <HomeReviews />
    <HomeQuality />
    <HomeValues />
    <HomeContact />
    </div>
  );
};

export default Homepage;
