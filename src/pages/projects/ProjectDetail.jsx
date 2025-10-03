// src/pages/projects/ProjectDetail.jsx
import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import projectsData from '../../data/projects';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData[id];

  // Redirection automatique si le projet n'existe pas
  useEffect(() => {
    if (!project) {
      navigate('/projects#projects');
    }
  }, [project, navigate]);

  if (!project) return null; // Rend rien pendant la redirection

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
       {/* Hero Section */}
<section className="relative h-[500px] md:h-[600px] bg-gray-900 overflow-hidden">
  <img
    src={project.images[0]}
    alt={project.title}
    className="w-full h-full object-cover object-center scale-105 transition-transform duration-500"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  <div className="absolute bottom-8 left-8 text-white">
    <div className="flex items-center space-x-2 mb-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        iconName="ArrowLeft"
        iconPosition="left"
        className="text-white hover:bg-white/20"
      >
        Retour
      </Button>
    </div>
    <span className="text-sky-400 uppercase text-sm font-medium">{project.category}</span>
    <h1 className="text-3xl md:text-4xl font-bold mt-2 max-w-4xl">{project.title}</h1>
  </div>
</section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Description du projet</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
              </div>

              {/* Caractéristiques */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Caractéristiques techniques</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.specifications.map((spec, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
                      <dt className="text-sm font-medium text-gray-500">{spec.label}</dt>
                      <dd className="text-lg font-semibold text-gray-900 mt-1">{spec.value}</dd>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prestations */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Prestations réalisées</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon name="CheckCircle" size={20} className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Galerie */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Galerie photos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-md">
                      <img
                        src={image}
                        alt={`${project.title} - Photo ${index + 1}`}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Informations du projet */}
              <div className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Informations projet</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Localisation</span>
                    <p className="text-gray-800 font-medium">{project.location}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Année de réalisation</span>
                    <p className="text-gray-800 font-medium">{project.year}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Client</span>
                    <p className="text-gray-800 font-medium">{project.client}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Surface</span>
                    <p className="text-gray-800 font-medium">{project.surface}</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-sky-600 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Projet similaire ?</h3>
                <p className="mb-4">Discutons de votre projet de construction métallique.</p>
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-white text-sky-600 hover:bg-gray-100"
                    iconName="Phone"
                    iconPosition="left"
                  >
                    Nous appeler
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-white text-white hover:bg-white hover:text-sky-600"
                    iconName="Mail"
                    iconPosition="left"
                  >
                    Demander un devis
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProjectDetail;
