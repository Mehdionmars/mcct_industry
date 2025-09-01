import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Marie-Claire Rousseau",
      position: "Plant Operations Director",
      company: "Renault Manufacturing",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5,
      videoThumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      hasVideo: true,
      testimonial: `MCCT Industry transformed our manufacturing facility expansion project. Their technical expertise in structural steel installation was exceptional, completing the 2,800-ton framework ahead of schedule.\n\nWhat impressed us most was their collaborative approach - they worked seamlessly with our engineering team and maintained zero safety incidents throughout the 8-month project.`,
      projectDetails: {
        type: "Manufacturing Facility Expansion",
        duration: "8 months",
        tonnage: "2,800 tons",
        value: "€3.2M"
      },
      highlights: [
        "Completed 2 weeks ahead of schedule",
        "Zero safety incidents",
        "Exceeded quality specifications",
        "Seamless team collaboration"
      ]
    },
    {
      id: 2,
      name: "Thomas Müller",
      position: "Project Engineering Manager",
      company: "Siemens Energy Solutions",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      videoThumbnail: "https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg?w=400&h=300&fit=crop",
      hasVideo: true,
      testimonial: `Working with MCCT Industry on our renewable energy facility was a game-changer. Their precision in metallic construction and understanding of complex engineering requirements made them the perfect partner.\n\nTheir advanced welding technologies and corrosion protection systems exceeded our technical specifications. The project quality was outstanding.`,
      projectDetails: {
        type: "Renewable Energy Infrastructure",
        duration: "12 months",
        tonnage: "4,200 tons",
        value: "€5.8M"
      },
      highlights: [
        "Advanced welding technologies",
        "Superior corrosion protection",
        "Complex engineering solutions",
        "Outstanding project quality"
      ]
    },
    {
      id: 3,
      name: "Sophie Dubois",
      position: "Facility Development Director",
      company: "Total Petrochemicals",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      videoThumbnail: "https://images.pixabay.com/photo/2016/11/29/06/15/adult-1867743_1280.jpg?w=400&h=300&fit=crop",
      hasVideo: false,
      testimonial: `MCCT Industry's expertise in industrial plant construction is unmatched. They handled our complex petrochemical facility project with exceptional professionalism and technical precision.\n\nTheir commitment to environmental compliance and safety standards aligned perfectly with our corporate values. The turnkey delivery exceeded all expectations.`,
      projectDetails: {
        type: "Petrochemical Processing Plant",
        duration: "15 months",
        tonnage: "3,600 tons",
        value: "€7.1M"
      },
      highlights: [
        "Turnkey project delivery",
        "Environmental compliance",
        "Complex facility systems",
        "Exceeded all expectations"
      ]
    },
    {
      id: 4,
      name: "Alessandro Rossi",
      position: "Operations Manager",
      company: "Fiat Industrial Systems",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      rating: 5,
      videoThumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      hasVideo: true,
      testimonial: `The maintenance services provided by MCCT Industry have been exceptional. Their 24/7 emergency response and predictive maintenance programs have significantly improved our facility uptime.\n\nTheir structural health monitoring systems and retrofit capabilities have extended the lifecycle of our industrial infrastructure beyond our expectations.`,
      projectDetails: {
        type: "Comprehensive Maintenance Contract",
        duration: "Ongoing - 3 years",
        coverage: "Multiple facilities",
        value: "€2.4M annually"
      },
      highlights: [
        "24/7 emergency response",
        "Predictive maintenance",
        "Improved facility uptime",
        "Extended infrastructure lifecycle"
      ]
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const activeTestimonial = testimonials?.[currentTestimonial];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="industrial-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-warning/10 rounded-full px-4 py-2 mb-6">
            <Icon name="MessageSquare" size={16} className="text-warning" />
            <span className="font-cta text-sm font-medium text-warning uppercase tracking-wide">
              Client Voices
            </span>
          </div>
          <h2 className="font-headline text-4xl lg:text-5xl font-bold text-primary mb-6">
            Partnership Success Stories
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Hear directly from facility managers and project directors about their experience 
            working with MCCT Industry on complex industrial construction projects.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-industrial-lg overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left Side - Video/Image */}
              <div className="relative">
                <div className="aspect-video lg:aspect-square">
                  <Image
                    src={activeTestimonial?.videoThumbnail}
                    alt={`${activeTestimonial?.name} testimonial`}
                    className="w-full h-full object-cover"
                  />
                  {activeTestimonial?.hasVideo && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-industrial hover:scale-110 transition-transform duration-200">
                        <Icon name="Play" size={24} className="text-primary ml-1" />
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Project Badge */}
                <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                  <span className="font-cta text-sm font-medium">
                    {activeTestimonial?.projectDetails?.type}
                  </span>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="p-8 lg:p-12">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={20}
                      className={`${
                        i < activeTestimonial?.rating ? 'text-warning fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-cta text-sm text-text-secondary">
                    {activeTestimonial?.rating}.0/5.0
                  </span>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg text-text-primary leading-relaxed mb-8">
                  "{activeTestimonial?.testimonial}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center space-x-4 mb-8">
                  <Image
                    src={activeTestimonial?.avatar}
                    alt={activeTestimonial?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-headline text-lg font-bold text-primary">
                      {activeTestimonial?.name}
                    </h4>
                    <p className="font-cta text-sm text-text-secondary">
                      {activeTestimonial?.position}
                    </p>
                    <p className="font-cta text-sm text-accent font-medium">
                      {activeTestimonial?.company}
                    </p>
                  </div>
                </div>

                {/* Project Highlights */}
                <div className="space-y-3">
                  <h5 className="font-headline text-sm font-bold text-primary uppercase tracking-wide">
                    Project Highlights
                  </h5>
                  <div className="space-y-2">
                    {activeTestimonial?.highlights?.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                        <span className="text-sm text-text-secondary">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-white rounded-xl p-4 shadow-industrial text-center">
              <Icon name="Clock" size={20} className="text-accent mx-auto mb-2" />
              <div className="font-headline text-lg font-bold text-primary">
                {activeTestimonial?.projectDetails?.duration}
              </div>
              <div className="font-cta text-xs text-text-secondary uppercase tracking-wide">
                Duration
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-industrial text-center">
              <Icon name="Zap" size={20} className="text-accent mx-auto mb-2" />
              <div className="font-headline text-lg font-bold text-primary">
                {activeTestimonial?.projectDetails?.tonnage || activeTestimonial?.projectDetails?.coverage}
              </div>
              <div className="font-cta text-xs text-text-secondary uppercase tracking-wide">
                {activeTestimonial?.projectDetails?.tonnage ? 'Steel Tonnage' : 'Coverage'}
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-industrial text-center">
              <Icon name="MADo" size={20} className="text-accent mx-auto mb-2" />
              <div className="font-headline text-lg font-bold text-primary">
                {activeTestimonial?.projectDetails?.value}
              </div>
              <div className="font-cta text-xs text-text-secondary uppercase tracking-wide">
                Project Value
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-industrial text-center">
              <Icon name="Award" size={20} className="text-success mx-auto mb-2" />
              <div className="font-headline text-lg font-bold text-success">
                100%
              </div>
              <div className="font-cta text-xs text-text-secondary uppercase tracking-wide">
                Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center space-x-6 mt-12">
          {/* Previous Button */}
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 bg-white shadow-industrial rounded-full flex items-center justify-center text-primary hover:text-accent hover:shadow-industrial-lg transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>

          {/* Testimonial Indicators */}
          <div className="flex space-x-2">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-accent scale-125' :'bg-gray-300 hover:bg-accent/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextTestimonial}
            className="w-12 h-12 bg-white shadow-industrial rounded-full flex items-center justify-center text-primary hover:text-accent hover:shadow-industrial-lg transition-all duration-200"
            aria-label="Next testimonial"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-industrial p-8 max-w-4xl mx-auto">
            <h3 className="font-headline text-2xl font-bold text-primary mb-4">
              Ready to Start Your Success Story?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Join the growing list of satisfied clients who trust MCCT Industry 
              for their most critical industrial construction projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
                <Icon name="MessageSquare" size={16} />
                <span>Share Your Project Vision</span>
              </button>
              <button className="border-2 border-accent text-accent hover:bg-accent hover:text-white font-cta font-semibold py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
                <Icon name="Users" size={16} />
                <span>View All Testimonials</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;