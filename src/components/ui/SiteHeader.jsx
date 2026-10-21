import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n/LanguageProvider';
import { headingFont, navLinks, EMAIL, EMAIL_HREF, PHONE, PHONE_HREF, container } from './mcctTheme';

/** Sélecteur de langue : deux libellés courts, l'actif est signalé par aria-pressed. */
const LanguageSwitch = ({ onDark, className = '' }) => {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t('langSwitch.label')}
      className={`flex items-center gap-1 font-mono text-[12px] font-semibold tracking-[0.1em] ${className}`}
    >
      {['fr', 'en']?.map((code, index) => (
        <React.Fragment key={code}>
          {index === 1 ? (
            <span aria-hidden="true" className={onDark ? 'text-nightrule' : 'text-rule'}>
              /
            </span>
          ) : null}
          <button
            type="button"
            lang={code}
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={`min-h-[32px] cursor-pointer bg-transparent px-1 transition-colors ${
              lang === code ? (onDark ? 'text-brandlt' : 'text-brand') : 'opacity-70 hover:opacity-100'
            }`}
          >
            {code?.toUpperCase()}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

/**
 * En-tête commun aux pages MCCT, façon bandeau de plan.
 * variant :
 *  - 'light' (défaut) : barre papier collée en haut
 *  - 'dark'           : barre bleu de plan, pour les pages sombres (Contact)
 *  - 'hero'           : posée sur le quadrillage de l'accueil, devient pleine au
 *                       défilement, avec barre de progression de lecture
 */
const SiteHeader = ({ variant = 'light', links = navLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const { t } = useI18n();

  const isHero = variant === 'hero';
  const isDark = variant === 'dark';
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isHero) return undefined;
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHero]);

  // Le menu plein écran fige le défilement de la page.
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e?.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  const label = (link) => (link?.label ? link?.label : t(`nav.${link?.key}`));

  const headerClass = [
    'z-[100] flex items-center transition-all duration-300',
    isHero ? 'fixed inset-x-0 top-0' : 'sticky top-0',
    isHero && !isScrolled ? 'min-h-[88px]' : 'min-h-[72px]',
    isDark
      ? 'border-b border-nightrule bg-night/95 text-snow backdrop-blur-md'
      : isHero && !isScrolled
        ? 'border-b border-transparent bg-transparent text-ink'
        : 'border-b border-ink/15 bg-paper/95 text-ink backdrop-blur-md'
  ]?.join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className={`${container} flex items-center justify-between gap-6`}>
          <Link to="/" className="flex items-center gap-4" aria-label={t('nav.logoHome')}>
            <img
              src="/logo1.png"
              alt="MCCT Industrie"
              className={`block h-[34px] w-auto ${isDark ? 'brightness-0 invert' : ''}`}
            />
            <span
              aria-hidden="true"
              className={`hidden border-l pl-4 font-mono text-[10.5px] uppercase leading-[1.4] tracking-[0.14em] min-[1100px]:block ${
                isDark ? 'border-nightrule text-fog' : 'border-rule text-steel'
              }`}
            >
              {t('bp.ref')} MCCT-IND
              <br />
              {t('common.city')}
            </span>
          </Link>

          <div className="flex items-center gap-3 min-[900px]:hidden">
            <LanguageSwitch onDark={isDark} />
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label={t('nav.open')}
              aria-expanded={isMenuOpen}
              className={`inline-flex h-[44px] cursor-pointer items-center justify-center gap-2 border px-4 font-mono text-[12px] font-semibold tracking-[0.12em] transition-colors ${
                isDark
                  ? 'border-snow/60 text-snow hover:border-snow'
                  : 'border-ink text-ink hover:bg-ink hover:text-paper'
              }`}
            >
              <span aria-hidden="true" className="flex flex-col gap-[3px]">
                <span className="block h-px w-3.5 bg-current" />
                <span className="block h-px w-3.5 bg-current" />
                <span className="block h-px w-3.5 bg-current" />
              </span>
              {t('nav.menu')}
            </button>
          </div>

          <nav
            aria-label={t('nav.main')}
            className="hidden items-center gap-7 font-mono text-[12.5px] font-medium uppercase tracking-[0.1em] min-[900px]:flex"
          >
            {links
              ?.filter((link) => link?.to !== '/contact')
              ?.map((link) => {
                const inner = (
                  <>
                    <span className={isDark ? 'text-brandlt' : 'text-brand'}>{link?.num}</span>
                    <span>{label(link)}</span>
                  </>
                );
                const linkClass = 'group relative flex items-baseline gap-2 py-2 transition-colors';
                if (link?.href) {
                  return (
                    <a key={link?.href} href={link?.href} className={linkClass}>
                      {inner}
                      <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-safety transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  );
                }
                const isActive = location?.pathname === link?.to;
                return (
                  <Link key={link?.to} to={link?.to} className={linkClass} aria-current={isActive ? 'page' : undefined}>
                    {inner}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-safety transition-transform duration-300 group-hover:scale-x-100 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </Link>
                );
              })}
            <LanguageSwitch onDark={isDark} />
            <Link
              to="/contact"
              className="inline-flex min-h-[44px] items-center gap-2 border border-ink bg-safety px-5 font-mono text-[12.5px] font-semibold tracking-[0.1em] text-ink transition-colors hover:bg-ink hover:text-safety"
            >
              {t('nav.contact')} <span aria-hidden="true">→</span>
            </Link>
          </nav>
        </div>
      </header>

      {isHero ? (
        <span
          aria-hidden="true"
          className="fixed left-0 top-0 z-[200] h-[3px] bg-safety"
          style={{ width: `${progress}%` }}
        />
      ) : null}

      {isMenuOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.dialog')}
          className="bp-grid-dark fixed inset-0 z-[250] flex flex-col justify-between overflow-y-auto bg-night px-5 pb-8 pt-6 text-snow"
        >
          <div className="flex items-center justify-between">
            <img src="/logo1.png" alt="MCCT Industrie" className="h-8 w-auto brightness-0 invert" />
            <button
              type="button"
              onClick={closeMenu}
              aria-label={t('nav.close')}
              className="min-h-[48px] cursor-pointer border border-nightrule px-[18px] py-[14px] font-mono text-[12px] font-semibold tracking-[0.12em] text-snow transition-colors hover:border-safety hover:text-safety"
            >
              {t('nav.closeLabel')}
            </button>
          </div>

          <nav aria-label={t('nav.mobile')} className="flex flex-col py-8">
            {links?.map((link) => {
              const inner = (
                <>
                  <span className="font-mono text-[12px] tracking-[0.14em] text-brandlt">{link?.num}</span>
                  <span className="text-[32px] font-bold uppercase leading-none text-snow" style={headingFont}>
                    {label(link)}
                  </span>
                  <span aria-hidden="true" className="ml-auto font-mono text-[18px] text-safety">
                    →
                  </span>
                </>
              );
              const className = 'flex min-h-[56px] items-center gap-5 border-b border-nightrule py-4';
              return link?.href ? (
                <a key={link?.href} href={link?.href} onClick={closeMenu} className={className}>
                  {inner}
                </a>
              ) : (
                <Link key={link?.to} to={link?.to} onClick={closeMenu} className={className}>
                  {inner}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-nightrule pt-5 text-[14px] leading-[1.9] text-fog">
            <LanguageSwitch onDark className="mb-4 text-snow" />
            <p className="font-mono text-[12px] tracking-[0.14em] text-snow">{t('common.city')}</p>
            <p className="mt-1.5">
              <a href={PHONE_HREF} className="text-snow hover:text-safety">
                {PHONE}
              </a>
            </p>
            <p>
              <a href={EMAIL_HREF} className="text-snow hover:text-safety">
                {EMAIL}
              </a>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SiteHeader;
