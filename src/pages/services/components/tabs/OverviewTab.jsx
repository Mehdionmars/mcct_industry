import React from 'react';
import Icon from '../../../../components/AppIcon';

const OverviewTab = ({ service }) => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-headline text-xl font-bold text-primary mb-4">Vue d’ensemble du service</h4>
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
          <h5 className="font-cta font-semibold text-primary mb-4">Secteurs desservis</h5>
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
  );
};

export default OverviewTab;
