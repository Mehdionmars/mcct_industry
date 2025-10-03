import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
//page aboout
const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative industrial-container py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Building" size={24} className="text-white" />
                </div>
                <span className="font-mono text-accent text-sm tracking-wider uppercase">
                  A propos de MCCT Industry
                </span>
              </div>
              
              <h1 className="font-headline text-4xl lg:text-6xl font-bold leading-tight">
                Maître
                <span className="block text-accent">de la Construction Industrielle</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                Nous concevons l'excellence dans la construction industrielle métallique,
                bâtissant l'épine dorsale de l'industrie avec une précision et une fiabilité sans faille.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="default"
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white font-cta font-semibold"
                iconName="Users"
                iconPosition="left"
              >
                Contactez-nous
              </Button>
<Button
  variant="outline"
  size="lg"
  className="border-white text-white hover:bg-white hover:text-slate-900 font-cta font-medium"
  to="/projects"
>
  Nos Réalisations
</Button>
            </div>

            {/* Key Stats */}
            {/* <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-700">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-accent">30+</div>
                <div className="text-sm text-gray-400 font-mono tracking-wide">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-accent">500+</div>
                <div className="text-sm text-gray-400 font-mono tracking-wide">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-accent">99.8%</div>
                <div className="text-sm text-gray-400 font-mono tracking-wide">Safety Record</div>
              </div>
            </div> */}
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden industrial-shadow-lg">
              <Image
                src="/assets/images/atelier.jpg"
                alt="MCCT Industry construction team working on industrial project"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>
            
            {/* Floating Achievement Card */}
            {/* <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-6 rounded-xl industrial-shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-white" />
                </div>
                <div>
                  <div className="font-headline font-bold text-lg">ISO 9001:2015</div>
                  <div className="text-sm text-gray-600">Quality Certified</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;