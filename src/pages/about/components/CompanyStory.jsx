import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CompanyStory = () => {
  const milestones = [
    {
      year: "Fondée en",
      title: "2023",
      description: "Depuis sa création en 2023, la société MCCT Industry s'est imposée comme un leader dans le domaine de la métallurgie, de la serrurerie et de la fumisterie. Forte d'une expérience solide et d'un engagement envers l'excellence, notre entreprise offre des solutions métallurgiques innovantes et sur mesure pour répondre aux besoins spécifiques de nos clients.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      icon: "Building"
    },
    {
      year: "Expertise",
      title: "",
      description: "Chez MCCT Industry, nous combinons une expertise technique approfondie avec une créativité sans faille pour concevoir, fabriquer et installer une large gamme de produits métalliques. Que ce soit des structures métalliques complexes, des équipements industriels sur mesure, des systèmes de ventilation ou des solutions de sécurité, notre équipe expérimentée est prête à relever les défis les plus exigeants.",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      icon: "Cpu"
    },
    {
      year: "Qualité et Innovation",
      title: "",
      description: "Lancement d'initiatives de construction écologique complètes, devenant l'un des premiers entrepreneurs industriels à atteindre des opérations neutres en carbone.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      icon: "Leaf"
    },
    {
      year: "Service Clientèle de Premier Ordre",
      title: "",
      description: "Chez MCCT Industry, nous plaçons nos clients au centre de nos préoccupations. Nous travaillons en étroite collaboration avec chaque client pour comprendre leurs besoins uniques et leur fournir des solutions personnalisées qui dépassent leurs attentes. Notre équipe dévouée est là pour vous accompagner à chaque étape du processus, de la conception à l'installation et au-delà.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      icon: "Smartphone"
    },
    {
      year: "Engagement envers l'Environnement et la Sécurité",
      title: "",
      description: "Nous sommes conscients de notre responsabilité envers l'environnement et la sécurité de nos employés et de nos clients. C'est pourquoi nous nous engageons à respecter les normes les plus strictes en matière de santé, de sécurité et d'environnement dans toutes nos opérations. Que vous ayez besoin d'une solution métallurgique sur mesure ou que vous souhaitiez en savoir plus sur nos services, n'hésitez pas à nous contacter. Chez MCCT Industry, nous sommes là pour transformer vos idées en réalité.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      icon: "Rocket"
    }
  ];

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="industrial-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={24} className="text-white" />
            </div>
            <span className="font-mono text-accent text-sm tracking-wider uppercase">
              Our Journey
            </span>
          </div>
          
          <h2 className="font-headline text-3xl lg:text-5xl font-bold text-primary mb-6">
            Three Decades of
            <span className="block text-accent">Engineering Excellence</span>
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            From humble beginnings to industry leadership, our story is one of continuous innovation, 
            unwavering commitment to quality, and the relentless pursuit of engineering perfection.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent via-primary to-accent hidden lg:block" />

          <div className="space-y-16 lg:space-y-24">
            {milestones?.map((milestone, index) => (
              <div
                key={milestone?.year}
                className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white border-4 border-accent rounded-full flex items-center justify-center z-10 hidden lg:flex">
                  <Icon name={milestone?.icon} size={24} className="text-accent" />
                </div>

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right lg:pr-24' : 'lg:text-left lg:pl-24'}`}>
                  <div className="bg-surface p-8 rounded-2xl industrial-shadow hover:shadow-industrial-lg industrial-transition">
                    <div className="flex items-center space-x-3 mb-4 lg:hidden">
                      <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                        <Icon name={milestone?.icon} size={20} className="text-white" />
                      </div>
                      <span className="font-headline text-2xl font-bold text-accent">{milestone?.year}</span>
                    </div>
                    
                    <span className="font-headline text-3xl font-bold text-accent hidden lg:block mb-2">
                      {milestone?.year}
                    </span>
                    
                    <h3 className="font-headline text-xl lg:text-2xl font-bold text-primary mb-4">
                      {milestone?.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {milestone?.description}
                    </p>
                    
                    <div className="inline-flex items-center space-x-2 text-accent font-cta font-medium">
                      <span>Learn More</span>
                      <Icon name="ArrowRight" size={16} />
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="flex-1">
                  <div className="relative rounded-2xl overflow-hidden industrial-shadow">
                    <Image
                      src={milestone?.image}
                      alt={`${milestone?.title} - MCCT Industry milestone`}
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Values */}
        <div className="mt-20 lg:mt-32 text-center">
          <h3 className="font-headline text-2xl lg:text-3xl font-bold text-primary mb-12">
            Nos valeurs fondamentales guident toutes nos actions
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "Shield",
                title: "La sécurité avant tout",
                description: "Approche sans compromis en matière de sécurité au travail et de sécurité des projets"
              },
              {
                icon: "Award",
                title: "Qualité Excellence",
                description: "Dépasser les normes de l'industrie grâce à une attention méticuleuse aux détails"
              },
              {
                icon: "Users",
                title: "Collaboration",
                description: "Favoriser des partenariats qui créent des résultats extraordinaires"
              },
              {
                icon: "Lightbulb",
                title: "Innovation",
                description: "Faire progresser continuellement la technologie et les méthodes de construction"
              }
            ]?.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 industrial-transition">
                  <Icon name={value?.icon} size={28} className="text-white" />
                </div>
                <h4 className="font-headline text-lg font-bold text-primary mb-2">
                  {value?.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;