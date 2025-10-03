import React from "react";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    id: 2,
    title: "Complexe sportif en charpente métallique à Saint-Sauveur-des-Landes (35)",
    category: "Tertiaire et collectivités",
    image: "/assets/images/image (17).jpg",
    bg: "bg-white",
  },
  {
    id: 3,
    title: "Bâtiment en charpente métallique pour les carrières Henry Frères à Javené (35)",
    category: "BTP et artisanat",
    image: "/assets/images/image (16).jpg",
    bg: "bg-white",
  },
  {
    id: 4,
    title: "Bâtiment artisanal en charpente métallique à Cléguer (56)",
    category: "BTP et artisanat",
    image: "/assets/images/image (15).jpg",
    bg: "bg-white",
  },
];

const ProjectsSection = () => {
  const navigate = useNavigate();

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

        {/* Grille type "bento" */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              className="mb-4 relative block break-inside-avoid rounded-lg overflow-hidden shadow-md group cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className={`absolute bottom-4 left-4 right-4 p-4 rounded-md shadow-md ${project.bg}`}
              >
                <h3 className="text-lg font-bold text-gray-800">{project.title}</h3>
                <p className="text-sm uppercase text-gray-500 mt-1">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;