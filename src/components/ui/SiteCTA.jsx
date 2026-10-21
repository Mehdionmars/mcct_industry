import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/LanguageProvider';
import { headingFont, container } from './mcctTheme';
import { DimLine, TitleBlock, btnPrimaryDark } from './Blueprint';

/**
 * Bandeau d'appel à l'action + cartouche de pied de page, commun aux pages
 * intérieures (À propos, Activités, 404). `sheet` numérote la page.
 */
const SiteCTA = ({ titleKey = 'cta.defaultTitle', accentSuffix = ' ?', ctaKey = 'cta.defaultLabel', ctaTo = '/contact', sheet = '01' }) => {
  const { t } = useI18n();

  return (
    <section className="bp-grid-dark bg-night text-snow">
      <div className={`${container} pb-16 pt-[96px]`}>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2
            className="text-[clamp(2.2rem,5vw,4.6rem)] font-bold uppercase leading-[1.02] tracking-[-0.01em]"
            style={headingFont}
          >
            {t(titleKey)}
            <span className="text-safety">{accentSuffix}</span>
          </h2>
          <Link to={ctaTo} className={btnPrimaryDark}>
            {t(ctaKey)} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <DimLine tone="dark" label="MCCT INDUSTRIE" className="mt-14" />
      </div>
      <TitleBlock sheet={sheet} />
    </section>
  );
};

export default SiteCTA;
