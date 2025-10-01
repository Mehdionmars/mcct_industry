import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-primary/90 text-white overflow-hidden">
      {/* Motif de fond */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative industrial-container py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row items-stretch gap-12">
          
          {/* Texte à gauche */}
          <div className="lg:w-1/2 flex flex-col justify-center h-full">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <Icon name="Settings" size={20} className="text-accent" />
              <span className="font-cta font-medium text-sm tracking-wide">
                PAVILLON DE MAÎTRISE DES SERVICES
              </span>
            </div>

            {/* Titre principal */}
            <h1 className="font-headline text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Services industriels complets
              <span className="block text-accent">de construction</span>
            </h1>

            {/* Sous-titre */}
            <p className="font-body text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-lg">
              De l’érection de structures métalliques aux réparations, notre maîtrise technique transforme des défis industriels complexes en excellence
              d’ingénierie.
            </p>

            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-2">
              <div className="text-left">
                <div className="text-3xl lg:text-4xl font-headline font-bold text-accent mb-2">50+</div>
                <div className="text-sm font-cta text-white/80 tracking-wide">PROJETS RÉALISÉS</div>
              </div>
              <div className="text-left">
                <div className="text-3xl lg:text-4xl font-headline font-bold text-accent mb-2">10+</div>
                <div className="text-sm font-cta text-white/80 tracking-wide">ANNÉES D’EXPÉRIENCE</div>
              </div>
              <div className="text-left">
                <div className="text-3xl lg:text-4xl font-headline font-bold text-accent mb-2">100%</div>
                <div className="text-sm font-cta text-white/80 tracking-wide">DOSSIER SÉCURITÉ</div>
              </div>
              <div className="text-left">
                <div className="text-3xl lg:text-4xl font-headline font-bold text-accent mb-2">24/7</div>
                <div className="text-sm font-cta text-white/80 tracking-wide">ASSISTANCE</div>
              </div>
            </div>
          </div>

          {/* Image à droite */}
          <div className="lg:w-1/2 flex justify-center items-stretch">
            <img
              src="/assets/images/personel4.jpg"
              alt="Illustration du service"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
