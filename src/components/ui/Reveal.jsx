import React, { useEffect, useRef, useState } from 'react';

/**
 * Apparition au défilement (équivalent des [data-reveal] de la maquette).
 * Respecte prefers-reduced-motion : le contenu est alors affiché immédiatement.
 */
const Reveal = ({ children, className = '', as: Tag = 'div', delay = 0, style, ...props }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;
    if (reduced || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }
    const node = ref?.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries?.forEach((entry) => {
          if (entry?.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry?.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)',
        transitionDelay: delay ? `${delay}ms` : undefined,
        ...style
      }}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
