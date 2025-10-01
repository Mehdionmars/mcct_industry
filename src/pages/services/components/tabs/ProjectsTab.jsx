import React from "react";
import Icon from "../../../../components/AppIcon";

const ProjectsTab = () => {
  const projects = [
    { id: 1, name: "Usine Automobile", description: "Construction clé en main d’un complexe industriel.", image: "/images/project1.jpg" },
    { id: 2, name: "Entrepôt Logistique", description: "Structure métallique haute capacité.", image: "/images/project2.jpg" },
    { id: 3, name: "Centre Énergétique", description: "Infrastructure durable et certifiée ISO.", image: "/images/project3.jpg" }
  ];

  return (
    <div className="space-y-8">
      <h3 className="font-headline text-2xl font-bold text-primary text-center">
        Projets Réalisés
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white rounded-xl shadow-industrial overflow-hidden">
            <img src={project.image} alt={project.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h4 className="font-cta font-bold text-primary">{project.name}</h4>
              <p className="text-text-secondary text-sm">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTab;
