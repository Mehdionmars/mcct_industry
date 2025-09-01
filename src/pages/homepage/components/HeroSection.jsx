import React from 'react';

const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    Lightbulb: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m15 14 5-5-5-5"/>
        <path d="M9 9.5c0 1.5-1.5 3-3 3s-3-1.5-3-3 1.5-3 3-3 3 1.5 3 3"/>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>
      </svg>
    ),
    ArrowRight: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m9 18 6-6-6-6"/>
      </svg>
    ),
    Play: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="5,3 19,12 5,21"/>
      </svg>
    ),
    Zap: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
      </svg>
    ),
    Cpu: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="16" height="16" x="4" y="4" rx="2"/>
        <rect width="6" height="6" x="9" y="9" rx="1"/>
        <path d="M15 2v2"/>
        <path d="M15 20v2"/>
        <path d="M2 15h2"/>
        <path d="M2 9h2"/>
        <path d="M20 15h2"/>
        <path d="M20 9h2"/>
        <path d="M9 2v2"/>
        <path d="M9 20v2"/>
      </svg>
    ),
    ChevronDown: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m6 9 6 6 6-6"/>
      </svg>
    )
  };
  
  return icons[name] || null;
};

const Button = ({ children, variant = "default", size = "md", className = "", iconName, iconPosition = "right", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-blue-500"
  };
  
  const sizes = {
    md: "px-4 py-2 text-sm rounded-md",
    lg: "px-6 py-3 text-base rounded-lg"
  };
  
  const icon = iconName ? <Icon name={iconName} size={size === "lg" ? 20 : 16} /> : null;
  
  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

const InnovationHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-100">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/assets/images/first.jpg')` }}
      />

      {/* Overlay Pattern (optionnel) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white rotate-12"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 border-2 border-orange-500 rotate-45"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-orange-500 rotate-12"></div>
      </div>

      <div className="relative container mx-auto px-4 pt-24 lg:pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side can remain empty if you want the image visible */}
          <div className="hidden lg:block" />

          {/* Right side content with white mirrored background */}
          <div className="bg-white rounded-xl p-12 shadow-2xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Constructeur de
                <span className="block text-orange-500">bâtiment métallique</span>
              </h1>

              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                Entreprise de charpente métallique implantée à Casablanca depuis 2023, MCCT Industry est spécialisée dans la construction de bâtiments industriels pour de nombreux secteurs d'activité.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Faites nous part de votre projet
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-10 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">50+</div>
                <div className="text-sm text-gray-500 font-mono">R&D Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">15</div>
                <div className="text-sm text-gray-500 font-mono">Tech Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">98%</div>
                <div className="text-sm text-gray-500 font-mono">Efficiency Gain</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-gray-900" />
      </div>
    </section>
  );
};

export default InnovationHero;