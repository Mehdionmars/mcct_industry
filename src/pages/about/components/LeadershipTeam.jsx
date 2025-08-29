import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LeadershipTeam = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const leaders = [
    {
      id: 1,
      name: "Jean-Pierre Dubois",
      position: "Chief Executive Officer & Founder",
      experience: "32 years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Jean-Pierre founded MCCT Industry with a vision to revolutionize industrial construction through precision engineering. His leadership has guided the company through three decades of growth and innovation.",
      expertise: ["Strategic Leadership", "Industrial Engineering", "Business Development", "Client Relations"],
      certifications: ["Professional Engineer (PE)", "Project Management Professional (PMP)", "LEED AP"],
      contact: {
        email: "jp.dubois@mcct-industry.com",
        phone: "+33 1 42 86 83 00"
      }
    },
    {
      id: 2,
      name: "Marie-Claire Rousseau",
      position: "Chief Technical Officer",
      experience: "28 years",
      image: "https://images.unsplash.com/photo-1494790108755-2616c9c0e5b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Marie-Claire leads our technical innovation initiatives and oversees all engineering operations. Her expertise in advanced welding technologies has positioned MCCT as an industry pioneer.",
      expertise: ["Advanced Welding Technologies", "Structural Engineering", "Quality Assurance", "Technical Innovation"],
      certifications: ["Certified Welding Inspector (CWI)", "Structural Engineering License", "ISO 9001 Lead Auditor"],
      contact: {
        email: "mc.rousseau@mcct-industry.com",
        phone: "+33 1 42 86 83 01"
      }
    },
    {
      id: 3,
      name: "Antoine Moreau",
      position: "Director of Operations",
      experience: "25 years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Antoine ensures seamless project execution across all MCCT operations. His operational excellence has resulted in a 99.8% on-time delivery record and industry-leading safety standards.",
      expertise: ["Project Management", "Operations Optimization", "Safety Management", "Team Leadership"],
      certifications: ["OSHA 30-Hour Construction", "Six Sigma Black Belt", "Construction Safety Manager"],
      contact: {
        email: "a.moreau@mcct-industry.com",
        phone: "+33 1 42 86 83 02"
      }
    },
    {
      id: 4,
      name: "Sophie Laurent",
      position: "Head of Sustainability & Innovation",
      experience: "18 years",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Sophie drives MCCT's sustainability initiatives and innovation programs. Under her leadership, the company achieved carbon-neutral operations and pioneered green construction practices.",
      expertise: ["Sustainable Construction", "Environmental Engineering", "Green Building Design", "Innovation Management"],
      certifications: ["LEED AP BD+C", "BREEAM Assessor", "Environmental Management Systems"],
      contact: {
        email: "s.laurent@mcct-industry.com",
        phone: "+33 1 42 86 83 03"
      }
    }
  ];

  return (
    <section className="bg-surface py-20 lg:py-32">
      <div className="industrial-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Users" size={24} className="text-white" />
            </div>
            <span className="font-mono text-accent text-sm tracking-wider uppercase">
              Leadership Team
            </span>
          </div>
          
          <h2 className="font-headline text-3xl lg:text-5xl font-bold text-primary mb-6">
            Meet the Visionaries Behind
            <span className="block text-accent">MCCT's Success</span>
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            Our leadership team combines decades of industry experience with innovative thinking, 
            driving MCCT Industry toward a future of engineering excellence and sustainable construction.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {leaders?.map((leader) => (
            <div
              key={leader?.id}
              className="bg-white rounded-2xl p-6 industrial-shadow hover:shadow-industrial-lg industrial-transition cursor-pointer group"
              onClick={() => setSelectedMember(leader)}
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden">
                  <Image
                    src={leader?.image}
                    alt={`${leader?.name} - ${leader?.position}`}
                    className="w-full h-full object-cover group-hover:scale-110 industrial-transition"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="User" size={16} className="text-white" />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-headline text-lg font-bold text-primary mb-1">
                  {leader?.name}
                </h3>
                <p className="text-sm text-accent font-medium mb-2">
                  {leader?.position}
                </p>
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <Icon name="Clock" size={12} />
                  <span>{leader?.experience} experience</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  className="text-accent hover:bg-accent/10 font-cta font-medium"
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={14}
                >
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Profile Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden">
                      <Image
                        src={selectedMember?.image}
                        alt={`${selectedMember?.name} - ${selectedMember?.position}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-headline text-2xl font-bold text-primary mb-1">
                        {selectedMember?.name}
                      </h3>
                      <p className="text-accent font-medium mb-2">
                        {selectedMember?.position}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Icon name="Clock" size={14} />
                        <span>{selectedMember?.experience} experience</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedMember(null)}
                    iconName="X"
                    iconSize={20}
                  />
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Bio */}
                  <div>
                    <h4 className="font-headline text-lg font-bold text-primary mb-4">Biography</h4>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {selectedMember?.bio}
                    </p>
                    
                    {/* Contact */}
                    <div className="bg-surface p-4 rounded-lg">
                      <h5 className="font-cta font-semibold text-primary mb-3">Contact Information</h5>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Icon name="Mail" size={16} className="text-accent" />
                          <span className="text-sm text-gray-600">{selectedMember?.contact?.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Icon name="Phone" size={16} className="text-accent" />
                          <span className="text-sm text-gray-600">{selectedMember?.contact?.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expertise & Certifications */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-headline text-lg font-bold text-primary mb-4">Core Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember?.expertise?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-lg"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-headline text-lg font-bold text-primary mb-4">Certifications</h4>
                      <div className="space-y-2">
                        {selectedMember?.certifications?.map((cert, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <Icon name="Award" size={16} className="text-success" />
                            <span className="text-sm text-gray-600">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Stats */}
        <div className="bg-white rounded-2xl p-8 industrial-shadow">
          <h3 className="font-headline text-2xl font-bold text-primary text-center mb-8">
            Our Team by the Numbers
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "85+", label: "Team Members", icon: "Users" },
              { number: "150+", label: "Combined Years", icon: "Clock" },
              { number: "45+", label: "Certifications", icon: "Award" },
              { number: "12", label: "Specializations", icon: "Settings" }
            ]?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name={stat?.icon} size={20} className="text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
                  {stat?.number}
                </div>
                <div className="text-sm text-gray-600 font-mono tracking-wide">
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

export default LeadershipTeam;