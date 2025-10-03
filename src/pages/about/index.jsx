import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import CompanyStory from './components/CompanyStory';
import LeadershipTeam from './components/LeadershipTeam';
import CertificationsWall from './components/CertificationsWall';
import InnovationLab from './components/InnovationLab';

const About = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'A Propos de nous - MCCT Industry | Maitres de la Construction Industrielle';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 
        'Decouvre le parcours de MCCT Industry dans l\'excellence de la construction industrielle. Rencontrez notre équipe de direction, explorez nos certifications et découvrez notre approche innovante de la construction métallique.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Main Content */}
      <main className="">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Company Story & Timeline */}
        <CompanyStory />
        
        {/* Leadership Team */}
        <LeadershipTeam />
        
        {/* Certifications Wall */}
        {/* <CertificationsWall /> */}
        
        {/* Innovation Laboratory */}
        {/* <InnovationLab /> */}
      </main>
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="industrial-container">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold">MCCT Industry</h3>
                  <p className="font-mono text-xs text-gray-400 tracking-wider">INGÉNIÉRIE D'EXCELLENCE</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Grâce à notre solide expérience, nos ressources
 techniques et humaines, MCCT INDUSTRY s'est
 forgé une réputation de leader dans le secteur de
 la construction métallique. Nous avons gagné la
 confiance de nos clients en livrant des réalisations
 qui répondent pleinement à leurs attentes.
              </p>
              
              {/* <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">30+</div>
                  <div className="text-xs text-gray-400">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">500+</div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">99.8%</div>
                  <div className="text-xs text-gray-400">Safety</div>
                </div>
              </div> */}
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-headline text-lg font-bold mb-4">Lien rapide</h4>
              <ul className="space-y-2">
                {[
                  { name: 'Nos Services', href: '/services' },
                  { name: 'Portefeuille de Projets', href: '/projects' },
                  { name: 'Laboratoire d\'Innovation', href: '/innovation' },
                  { name: 'Contactez-nous', href: '/contact' }
                ]?.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link?.href}
                      className="text-gray-300 hover:text-accent industrial-transition text-sm"
                    >
                      {link?.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-headline text-lg font-bold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="text-sm text-gray-300">
                  <div className="font-medium">Notre Bureau</div>

                                     <span className="text-sm">13, rue Ahmed El Mejatti -ex Alpes , rés. les Alpes, 1° étg. 20330 Casablanca - Maroc</span>

                </div>
                <div className="text-sm text-gray-300">
                  <div className="font-medium">Phone</div>
                  <div>+33 1 42 86 83 00</div>
                </div>
                <div className="text-sm text-gray-300">
                  <div className="font-medium">Email</div>
                  <div>contact@mcct-industry.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © {new Date()?.getFullYear()} MCCT Industry. tout droit est reserve.
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-accent industrial-transition">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-accent industrial-transition">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-accent industrial-transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;