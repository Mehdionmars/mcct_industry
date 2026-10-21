import React from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { CtaBand, SiteFooter } from './Corporate';

/**
 * Bandeau d'appel à l'action + pied de page, commun aux pages intérieures
 * (À propos, Activités, 404).
 */
const SiteCTA = ({ titleKey = 'cta.defaultTitle', ctaKey = 'cta.defaultLabel', ctaTo = '/contact' }) => {
  const { lang, t } = useI18n();
  // Espace insécable avant le point d'interrogation en français uniquement.
  const question = lang === 'fr' ? '\u00a0?' : '?';

  return (
    <>
      <CtaBand title={`${t(titleKey)}${question}`} label={t(ctaKey)} to={ctaTo} />
      <SiteFooter />
    </>
  );
};

export default SiteCTA;
