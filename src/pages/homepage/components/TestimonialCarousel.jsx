import React from 'react';
import Icon from '../../../components/AppIcon';

const TestimonialCTA = () => {
  return (
    <div className="text-center mt-16 mb-16">
      <div className="bg-white rounded-2xl shadow-industrial p-8 max-w-4xl mx-auto">
        <h3 className="font-headline text-2xl font-bold text-primary mb-4">
          Prêt à commencer votre success story ?
        </h3>
        <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
          Rejoignez la liste croissante de clients satisfaits qui font confiance à MCCT Industry 
          pour leurs projets industriels les plus critiques.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
            <Icon name="MessageSquare" size={16} />
            {/* <span>Partagez votre projet</span> */}
            {/* links to contact section of the page */}
            <a href="#contact" className="text-white">Partagez votre projet</a>
          </button>
          {/* <button className="border-2 border-accent text-accent hover:bg-accent hover:text-white font-cta font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
            <Icon name="Users" size={16} />
            <span>Voir tous les témoignages</span>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCTA;
