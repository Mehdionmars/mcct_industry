import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CertificationsWall = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Certifications', icon: 'Award' },
    { id: 'quality', name: 'Quality Standards', icon: 'CheckCircle' },
    { id: 'safety', name: 'Safety & Health', icon: 'Shield' },
    { id: 'environmental', name: 'Environmental', icon: 'Leaf' },
    { id: 'technical', name: 'Technical Skills', icon: 'Settings' }
  ];

  const certifications = [
    {
      id: 1,
      category: 'quality',
      name: "ISO 9001:2015",
      fullName: "Quality Management Systems",
      issuer: "International Organization for Standardization",
      validUntil: "December 2025",
      description: "Demonstrates our commitment to consistent quality management and continuous improvement in all operations.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      level: "Gold",
      icon: "Award"
    },
    {
      id: 2,
      category: 'safety',
      name: "OHSAS 18001",
      fullName: "Occupational Health and Safety Assessment Series",
      issuer: "British Standards Institution",
      validUntil: "March 2026",
      description: "Certifies our comprehensive approach to workplace safety and health management systems.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      level: "Platinum",
      icon: "Shield"
    },
    {
      id: 3,
      category: 'environmental',
      name: "ISO 14001:2015",
      fullName: "Environmental Management Systems",
      issuer: "International Organization for Standardization",
      validUntil: "August 2025",
      description: "Validates our environmental management practices and commitment to sustainable construction.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      level: "Gold",
      icon: "Leaf"
    },
    {
      id: 4,
      category: 'technical',
      name: "AWS D1.1",
      fullName: "Structural Welding Code - Steel",
      issuer: "American Welding Society",
      validUntil: "June 2026",
      description: "Certifies our welding procedures and welder qualifications for structural steel construction.",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      level: "Platinum",
      icon: "Zap"
    },
    {
      id: 5,
      category: 'quality',
      name: "EN 1090",
      fullName: "Execution of Steel Structures and Aluminium Structures",
      issuer: "MADopean Committee for Standardization",
      validUntil: "November 2025",
      description: "MADopean standard for the execution of steel and aluminium structures, ensuring quality and safety.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      level: "Gold",
      icon: "Building"
    },
    {
      id: 6,
      category: 'safety',
      name: "NEBOSH IGC",
      fullName: "International General Certificate in Occupational Health and Safety",
      issuer: "National Examination Board in Occupational Safety and Health",
      validUntil: "Lifetime",
      description: "International qualification in health and safety management for construction professionals.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      level: "Platinum",
      icon: "UserCheck"
    },
    {
      id: 7,
      category: 'environmental',
      name: "LEED AP BD+C",
      fullName: "Leadership in Energy and Environmental Design",
      issuer: "U.S. Green Building Council",
      validUntil: "July 2026",
      description: "Accredited professional certification for green building design and construction practices.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      level: "Gold",
      icon: "Home"
    },
    {
      id: 8,
      category: 'technical',
      name: "CWI Certification",
      fullName: "Certified Welding Inspector",
      issuer: "American Welding Society",
      validUntil: "September 2025",
      description: "Professional certification for welding inspection and quality assurance in construction projects.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      level: "Platinum",
      icon: "Eye"
    }
  ];

  const filteredCertifications = selectedCategory === 'all' 
    ? certifications 
    : certifications?.filter(cert => cert?.category === selectedCategory);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Platinum': return 'bg-gradient-to-r from-gray-400 to-gray-600';
      case 'Gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      default: return 'bg-gradient-to-r from-blue-400 to-blue-600';
    }
  };

  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="industrial-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Award" size={24} className="text-white" />
            </div>
            <span className="font-mono text-accent text-sm tracking-wider uppercase">
              Certifications & Recognition
            </span>
          </div>
          
          <h2 className="font-headline text-3xl lg:text-5xl font-bold text-primary mb-6">
            Industry Recognition &
            <span className="block text-accent">Professional Excellence</span>
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            Our comprehensive certifications and industry recognition demonstrate our unwavering commitment 
            to quality, safety, and environmental responsibility in every project we undertake.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-cta font-medium transition-all duration-200 industrial-transition ${
                selectedCategory === category?.id
                  ? 'bg-accent text-white shadow-industrial'
                  : 'bg-surface text-gray-600 hover:bg-accent/10 hover:text-accent'
              }`}
            >
              <Icon name={category?.icon} size={18} />
              <span>{category?.name}</span>
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCertifications?.map((cert) => (
            <div
              key={cert?.id}
              className="bg-surface rounded-2xl overflow-hidden industrial-shadow hover:shadow-industrial-lg industrial-transition group"
            >
              {/* Certificate Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={cert?.image}
                  alt={`${cert?.name} certification`}
                  className="w-full h-full object-cover group-hover:scale-110 industrial-transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Level Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-white text-xs font-bold ${getLevelColor(cert?.level)}`}>
                  {cert?.level}
                </div>
                
                {/* Icon */}
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center">
                  <Icon name={cert?.icon} size={20} className="text-accent" />
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-headline text-lg font-bold text-primary mb-1">
                    {cert?.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {cert?.fullName}
                  </p>
                  <p className="text-xs text-accent font-medium">
                    Issued by: {cert?.issuer}
                  </p>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {cert?.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-500">
                      Valid until: {cert?.validUntil}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-accent">
                    <span className="text-xs font-medium">Verified</span>
                    <Icon name="CheckCircle" size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Summary */}
        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="font-headline text-2xl lg:text-3xl font-bold mb-4">
              Recognition That Speaks Volumes
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Our certifications represent more than compliance—they demonstrate our leadership 
              in setting industry standards for excellence, safety, and sustainability.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "25+", label: "Active Certifications", icon: "Award" },
              { number: "100%", label: "Compliance Rate", icon: "CheckCircle" },
              { number: "15", label: "Industry Awards", icon: "Trophy" },
              { number: "0", label: "Safety Violations", icon: "Shield" }
            ]?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name={stat?.icon} size={20} className="text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold mb-1">
                  {stat?.number}
                </div>
                <div className="text-sm opacity-80 font-mono tracking-wide">
                  {stat?.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsWall;