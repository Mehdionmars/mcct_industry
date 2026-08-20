import React, { useEffect, useState } from 'react';

const SCRIPT_SRC = '/industrial-experience.js';

/**
 * Monte l'élément personnalisé <industrial-experience> (expérience 3D pilotée au
 * scroll, Three.js chargé à la demande par le script). Le script est injecté une
 * seule fois pour toute l'application.
 */
const IndustrialExperience = ({ model = '' }) => {
  const [isReady, setIsReady] = useState(
    () => typeof window !== 'undefined' && !!window.customElements?.get('industrial-experience')
  );

  useEffect(() => {
    if (isReady) return undefined;
    let script = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    const onLoad = () => setIsReady(true);
    if (!script) {
      script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener('load', onLoad);
    return () => script.removeEventListener('load', onLoad);
  }, [isReady]);

  return (
    <section aria-label="Expérience 3D — hangar industriel" className="bg-[#dfe3e6]">
      {isReady ? <industrial-experience model={model || undefined} /> : <div className="h-[60vh]" />}
    </section>
  );
};

export default IndustrialExperience;
