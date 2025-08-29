import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const EngineeredTrustSection = () => {
  const [animatedStats, setAnimatedStats] = useState({
    safetyDays: 0,
    projectsCompleted: 0,
    steelTonnage: 0,
    clientSatisfaction: 0
  });

  const finalStats = {
    safetyDays: 1247,
    projectsCompleted: 425,
    steelTonnage: 15600,
    clientSatisfaction: 98.7
  };

  const certifications = [
    {
      id: 1,
      name: "ISO 9001:2015",
      description: "Quality Management Systems",
      icon: "Award",
      validUntil: "2025-12-31",
      status: "active"
    },
    {
      id: 2,
      name: "OHSAS 18001",
      description: "Occupational Health & Safety",
      icon: "Shield",
      validUntil: "2025-08-15",
      status: "active"
    },
    {
      id: 3,
      name: "ISO 14001",
      description: "Environmental Management",
      icon: "Leaf",
      validUntil: "2025-10-20",
      status: "active"
    },
    {
      id: 4,
      name: "EN 1090",
      description: "Structural Steel Execution",
      icon: "Building",
      validUntil: "2026-03-10",
      status: "active"
    }
  ];

  const safetyMetrics = [
    {
      metric: "Lost Time Incidents",
      value: "0",
      period: "2024 YTD",
      trend: "stable",
      icon: "TrendingDown"
    },
    {
      metric: "Safety Training Hours",
      value: "2,840",
      period: "This Year",
      trend: "up",
      icon: "TrendingUp"
    },
    {
      metric: "Near Miss Reports",
      value: "47",
      period: "Resolved",
      trend: "up",
      icon: "AlertTriangle"
    },
    {
      metric: "Safety Audits",
      value: "12/12",
      period: "Passed",
      trend: "stable",
      icon: "CheckCircle"
    }
  ];

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        safetyDays: Math.floor(finalStats?.safetyDays * progress),
        projectsCompleted: Math.floor(finalStats?.projectsCompleted * progress),
        steelTonnage: Math.floor(finalStats?.steelTonnage * progress),
        clientSatisfaction: Math.floor(finalStats?.clientSatisfaction * progress * 10) / 10
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(finalStats);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="industrial-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 rounded-full px-4 py-2 mb-6">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="font-cta text-sm font-medium text-success uppercase tracking-wide">
              Engineered Trust
            </span>
          </div>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-primary mb-6">
            Safety, Quality & Reliability
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Our commitment to excellence is measured not just in successful projects, 
            but in the trust we've built through consistent safety performance and quality delivery.
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-success/5 to-success/10 rounded-2xl p-6 text-center border border-success/20">
            <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" size={24} className="text-success" />
            </div>
            <div className="font-headline text-3xl lg:text-4xl font-bold text-success mb-2">
              {animatedStats?.safetyDays?.toLocaleString()}
            </div>
            <div className="font-cta text-sm text-text-secondary uppercase tracking-wide">
              Safety Days
            </div>
            <div className="font-cta text-xs text-success mt-1">
              Without Lost Time Incident
            </div>
          </div>

          <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-6 text-center border border-accent/20">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Building" size={24} className="text-accent" />
            </div>
            <div className="font-headline text-3xl lg:text-4xl font-bold text-accent mb-2">
              {animatedStats?.projectsCompleted?.toLocaleString()}
            </div>
            <div className="font-cta text-sm text-text-secondary uppercase tracking-wide">
              Projects Completed
            </div>
            <div className="font-cta text-xs text-accent mt-1">
              On Time & Budget
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 text-center border border-primary/20">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Zap" size={24} className="text-primary" />
            </div>
            <div className="font-headline text-3xl lg:text-4xl font-bold text-primary mb-2">
              {animatedStats?.steelTonnage?.toLocaleString()}
            </div>
            <div className="font-cta text-sm text-text-secondary uppercase tracking-wide">
              Tons Steel Installed
            </div>
            <div className="font-cta text-xs text-primary mt-1">
              Precision Engineered
            </div>
          </div>

          <div className="bg-gradient-to-br from-warning/5 to-warning/10 rounded-2xl p-6 text-center border border-warning/20">
            <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Star" size={24} className="text-warning" />
            </div>
            <div className="font-headline text-3xl lg:text-4xl font-bold text-warning mb-2">
              {animatedStats?.clientSatisfaction}%
            </div>
            <div className="font-cta text-sm text-text-secondary uppercase tracking-wide">
              Client Satisfaction
            </div>
            <div className="font-cta text-xs text-warning mt-1">
              Verified Reviews
            </div>
          </div>
        </div>

        {/* Certifications & Safety Metrics */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div className="bg-surface rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <Icon name="Award" size={20} className="text-accent" />
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary">
                Industry Certifications
              </h3>
            </div>

            <div className="space-y-4">
              {certifications?.map((cert) => (
                <div key={cert?.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-accent/30 transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={cert?.icon} size={20} className="text-success" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-headline text-lg font-bold text-primary">
                          {cert?.name}
                        </h4>
                        <span className="px-2 py-1 bg-success/10 text-success rounded-full text-xs font-cta font-medium">
                          Active
                        </span>
                      </div>
                      <p className="text-text-secondary text-sm mb-2">
                        {cert?.description}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-text-secondary">
                        <Icon name="Calendar" size={12} />
                        <span>Valid until: {new Date(cert.validUntil)?.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Metrics */}
          <div className="bg-surface rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-success" />
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary">
                Safety Performance
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {safetyMetrics?.map((metric, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <Icon 
                      name={metric?.icon} 
                      size={20} 
                      className={`${
                        metric?.trend === 'up' ? 'text-success' : 
                        metric?.trend === 'down' ? 'text-error' : 'text-primary'
                      }`} 
                    />
                    <span className={`text-xs px-2 py-1 rounded-full font-cta font-medium ${
                      metric?.trend === 'up' ? 'bg-success/10 text-success' : 
                      metric?.trend === 'down' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
                    }`}>
                      {metric?.trend === 'up' ? '↗' : metric?.trend === 'down' ? '↘' : '→'}
                    </span>
                  </div>
                  <div className="font-headline text-xl font-bold text-primary mb-1">
                    {metric?.value}
                  </div>
                  <div className="font-cta text-xs text-text-secondary uppercase tracking-wide mb-1">
                    {metric?.metric}
                  </div>
                  <div className="font-cta text-xs text-accent">
                    {metric?.period}
                  </div>
                </div>
              ))}
            </div>

            {/* Safety Commitment */}
            <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-success flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-headline text-sm font-bold text-success mb-1">
                    Zero Harm Commitment
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Every team member returns home safely every day. This is our unwavering commitment 
                    and the foundation of everything we do at MCCT Industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Statement */}
        <div className="text-center mt-16">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-xl lg:text-2xl font-headline font-medium text-primary italic mb-6">
              "Trust is built through consistent performance, transparent communication, 
              and an unwavering commitment to safety and quality in every project we undertake."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <Icon name="Quote" size={20} className="text-accent" />
              </div>
              <div className="text-left">
                <div className="font-cta font-semibold text-primary">
                  Jean-Pierre Dubois
                </div>
                <div className="font-cta text-sm text-text-secondary">
                  CEO & Founder, MCCT Industry
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeredTrustSection;