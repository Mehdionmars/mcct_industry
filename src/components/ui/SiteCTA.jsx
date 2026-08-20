import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/LanguageProvider';
import { ACCENT, headingFont, container, EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from './mcctTheme';

/**
 * Bandeau d'appel à l'action + bas de page, commun aux pages intérieures
 * (À propos, Activités, Projets, Galerie).
 */
const SiteCTA = ({ titleKey = 'cta.defaultTitle', accentSuffix = ' ?', ctaKey = 'cta.defaultLabel', ctaTo = '/contact' }) => {
  const { t } = useI18n();

  return (
  <section className="bg-[#111315] py-[100px] text-white">
    <div className={`${container} flex flex-wrap items-center justify-between gap-8`}>
      <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-bold leading-none tracking-[-0.02em]" style={headingFont}>
        {t(titleKey)}
        <span style={{ color: ACCENT }}>{accentSuffix}</span>
      </h2>
      <Link
        to={ctaTo}
        className="group relative inline-flex items-center gap-3.5 overflow-hidden bg-[#2478BE] px-[34px] py-5 text-[13px] font-extrabold tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#17191C]"
      >
        {t(ctaKey)} <span aria-hidden="true">→</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 h-full w-[45%] animate-mcct-shine bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.45),transparent)]"
        />
      </Link>
    </div>

    <div
      className={`${container} mt-16 flex flex-wrap justify-between gap-4 border-t border-[#23272b] pt-6 text-[12px] tracking-[0.08em] text-[#565e66]`}
    >
      <span>{t('common.copyright')}</span>
      <span>
        <a href={PHONE_HREF} className="text-[#9aa2a9] hover:text-[#2478BE]">
          {PHONE}
        </a>{' '}
        ·{' '}
        <a href={EMAIL_HREF} className="text-[#9aa2a9] hover:text-[#2478BE]">
          {EMAIL}
        </a>
      </span>
    </div>
    </section>
  );
};

export default SiteCTA;
