import React from "react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../../../hooks/useProjects";

const ProjectsSection = () => {
  const navigate = useNavigate();
  const { projects, loading } = useProjects();

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        {/* Titre */}
        <div className="flex justify-start mb-10">
          <div className="text-left max-w-xs">
            <p className="text-sky-600 text-base uppercase tracking-wide">
              Nos dernières références en
            </p>
            <h2 className="text-sky-700 text-2xl font-semibold leading-snug">
              construction métallique
            </h2>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        )}

        {/* Grille type "bento" */}
        {!loading && (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              className="mb-4 relative block break-inside-avoid rounded-lg overflow-hidden shadow-md group cursor-pointer"
            >
              <img
                src={project.images?.[0] || '/assets/images/no_image.png'}
                alt={project.title}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className="absolute bottom-4 left-4 right-4 p-4 rounded-md shadow-md bg-white"
              >
                <h3 className="text-lg font-bold text-gray-800">{project.title}</h3>
                <p className="text-sm uppercase text-gray-500 mt-1">{project.industry}</p>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;