import React from 'react';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
import { useI18n } from '../../i18n/LanguageProvider';
import { bodyFont, navLinks } from '../../components/ui/mcctTheme';
import HomeHero from './components/HomeHero';
import IndustrialExperience from './components/IndustrialExperience';
import HomeIntro from './components/HomeIntro';
import { ActivitiesSection, SavoirFaireSection } from './components/HomeActivities';
import { FeaturedProject, EngagementSection, SectorsSection } from './components/HomeShowcase';
import HomeProjects from './components/HomeProjects';
import { CapabilitiesSection, ClientsSection, QualitySection, ValuesSection } from './components/HomeCapabilities';
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

    <HomeHero />
    <IndustrialExperience />
    <HomeIntro />
    <ActivitiesSection />
    <SavoirFaireSection />
    <FeaturedProject />
    <EngagementSection />
    <SectorsSection />
    <HomeProjects />
    <CapabilitiesSection />
    <ClientsSection />
    <QualitySection />
    <ValuesSection />
    <HomeContact />
    </div>
  );
};

export default Homepage;
