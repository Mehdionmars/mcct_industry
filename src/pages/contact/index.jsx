import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ContactHero from './components/ContactHero';
import ContactMethods from './components/ContactMethods';
import ContactForm from './components/ContactForm';
import LocationInfo from './components/LocationInfo';
import TeamContacts from './components/TeamContacts';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact MCCT Industry - EXPERT EN CONSTRUCTION METALLIQUE</title>
        <meta 
          name="description" 
          content="Connect with MCCT Industry's expert team for industrial construction projects. 24/7     , project consultations, and technical support across Southern France." 
        />
        <meta name="keywords" content="MCCT Industry contact, industrial construction consultation,   repair services, project inquiry, metallic construction experts, France" />
        <meta property="og:title" content="Contact MCCT Industry - Partnership Portal" />
        <meta property="og:description" content="Connect with MCCT Industry's expert team for industrial construction projects. 24/7      and technical support." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/contact" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="">
          {/* Hero Section */}
          <ContactHero />
          
          {/* Contact Methods */}
          <ContactMethods />
          
          {/* Contact Form */}
          <ContactForm />
          
          {/* Location Information */}
          {/* <LocationInfo /> */}
          
          {/* Team Contacts */}
          
          {/* <TeamContacts /> */}
        </main>

        {/* Footer */}
        <footer className="bg-primary text-white py-12">
          <div className="industrial-container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-headline text-xl font-bold">MCCT Industry</h3>
                    <p className="font-mono text-xs text-white/70 tracking-wider"> </p>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed mb-4">
                  Expert en construction métallique et industrielle.
                  Nous fournissons des solutions complètes pour vos projets industriels, de la conception à la réalisation, partout au Maroc.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm text-white/70">24/7 Disponible</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-cta font-semibold text-white mb-4">Contact Info</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-accent">📞</span>
                    <span className="text-sm text-white/80"> : +212 661 49 47 61</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-accent">✉️</span>
                    <span className="text-sm text-white/80">contact@mcct-industry.ma</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-accent">📍</span>
                    <span className="text-sm text-white/80">Casablanca, Maroc</span>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div>
                <h4 className="font-cta font-semibold text-white mb-4">Nos Horaires</h4>
                <div className="space-y-2 text-sm text-white/80">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi:</span>
                    <span>7:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi:</span>
                    <span>8:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche:</span>
                  </div>
                  <div className="pt-2 border-t border-white/20">
                    <div className="flex justify-between font-semibold text-success">
                      <span> :</span>
                      <span>24/7 Disponible</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm text-white/60 mb-4 md:mb-0">
                © {new Date()?.getFullYear()} MCCT Industry. Tous droits réservés. | VOTRE VISION, NOTRE MISSION
              </p>
              {/* <div className="flex items-center space-x-6 text-sm text-white/60">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
                <span>Safety Standards</span>
              </div> */}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ContactPage;