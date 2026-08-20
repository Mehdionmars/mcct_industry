import React from 'react';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
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
  { num: '03', label: 'SAVOIR-FAIRE', href: '#savoirfaire' },
  { ...navLinks?.[2], num: '04' },
  { ...navLinks?.[3], num: '05' },
  { ...navLinks?.[4], num: '06' }
];

const Homepage = () => (
  <div className="min-h-screen bg-[#F5F5F2] text-[#17191C] antialiased" style={bodyFont}>
    <PageMeta title="MCCT Industrie — charpente métallique et ingénierie industrielle à Casablanca" description="MCCT Industrie accompagne les acteurs industriels marocains dans la conception, la fabrication et la réalisation de solutions métalliques à forte valeur ajoutée." />

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

export default Homepage;
