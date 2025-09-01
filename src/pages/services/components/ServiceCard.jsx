import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, isExpanded, onToggle }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const cardRef = useRef(null);

  // Hook pour gérer le clic en dehors du composant
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target) && isExpanded) {
        onToggle(); // Ferme le card si on clique en dehors et qu'il est ouvert
      }
    };

    // Ajoute l'event listener seulement si le card est ouvert
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Nettoie l'event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, onToggle]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'process', label: 'Process', icon: 'GitBranch' },
    { id: 'specs', label: 'Specifications', icon: 'FileText' },
    { id: 'projects', label: 'Projects', icon: 'Building' },
    { id: 'gallery', label: 'Gallery', icon: 'Image' }
  ];

  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-xl shadow-industrial border border-gray-200 overflow-hidden transition-all duration-500 ${
        isExpanded ? 'col-span-full' : ''
      }`}
    >
      {/* Card Header */}
      <div className="p-6 lg:p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${service?.bgColor}`}>
              <Icon name={service?.icon} size={32} className={service?.iconColor} />
            </div>
            <div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-2">{service?.title}</h3>
              <p className="text-text-secondary font-body">{service?.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-success/10 text-success px-3 py-1 rounded-full">
              <Icon name="Shield" size={16} />
              <span className="text-sm font-cta font-medium">Certified</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {service?.stats?.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-surface rounded-lg">
              <div className="text-2xl font-headline font-bold text-accent mb-1">{stat?.value}</div>
              <div className="text-sm text-text-secondary font-cta">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {service?.features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0" />
              <span className="text-text-primary font-body">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 bg-surface">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-cta font-medium transition-colors ${
                  activeTab === tab?.id
                    ? 'text-accent border-b-2 border-accent bg-white' :'text-text-secondary hover:text-primary'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 lg:p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-headline text-xl font-bold text-primary mb-4">Service Overview</h4>
                  <p className="text-text-primary font-body leading-relaxed mb-6">{service?.description}</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-cta font-semibold text-primary mb-4">Applications</h5>
                    <ul className="space-y-2">
                      {service?.applications?.map((app, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Icon name="ArrowRight" size={16} className="text-accent" />
                          <span className="text-text-primary font-body">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-cta font-semibold text-primary mb-4">Industries Served</h5>
                    <ul className="space-y-2">
                      {service?.industries?.map((industry, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Icon name="Building" size={16} className="text-accent" />
                          <span className="text-text-primary font-body">{industry}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'process' && (
              <div className="space-y-6">
                <h4 className="font-headline text-xl font-bold text-primary mb-6">Step-by-Step Process</h4>
                <div className="space-y-4">
                  {service?.process?.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-surface rounded-lg">
                      <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-cta font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h6 className="font-cta font-semibold text-primary mb-2">{step?.title}</h6>
                        <p className="text-text-secondary font-body">{step?.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-6">
                <h4 className="font-headline text-xl font-bold text-primary mb-6">Technical Specifications</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {service?.specifications?.map((spec, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h6 className="font-cta font-semibold text-primary mb-3">{spec?.category}</h6>
                      <ul className="space-y-2">
                        {spec?.items?.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex justify-between">
                            <span className="text-text-secondary font-body">{item?.name}</span>
                            <span className="text-primary font-cta font-medium">{item?.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                <h4 className="font-headline text-xl font-bold text-primary mb-6">Recent Projects</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {service?.projects?.map((project, index) => (
                    <div key={index} className="bg-surface rounded-lg p-6">
                      <h6 className="font-cta font-semibold text-primary mb-2">{project?.name}</h6>
                      <p className="text-text-secondary font-body mb-4">{project?.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-text-secondary">Duration: {project?.duration}</span>
                          <span className="text-text-secondary">Scale: {project?.scale}</span>
                        </div>
                        <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <h4 className="font-headline text-xl font-bold text-primary mb-6">Gallery</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {service?.gallery?.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Action Footer */}
          <div className="border-t border-gray-200 p-6 bg-surface">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div>
                <h5 className="font-cta font-semibold text-primary mb-1">Ready to get started?</h5>
                <p className="text-text-secondary font-body text-sm">Contact our experts for a customized solution.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" iconName="Phone" iconPosition="left">
                  Call Expert
                </Button>
                <Button variant="default" className="bg-accent hover:bg-accent/90" iconName="MessageSquare" iconPosition="left">
                  Request Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;