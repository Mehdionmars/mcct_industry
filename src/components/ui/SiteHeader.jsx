import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n/LanguageProvider';
import { navLinks, EMAIL, EMAIL_HREF, PHONE, PHONE_HREF, container } from './mcctTheme';
import { btnPrimary } from './Corporate';

/** Sélecteur de langue : bascule FR / EN en pastille, l'actif est signalé par aria-pressed. */
const LanguageSwitch = ({ onDark, className = '' }) => {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t('langSwitch.label')}
      className={`inline-flex items-center rounded-full border p-0.5 text-[12.5px] font-semibold ${
        onDark ? 'border-white/25' : 'border-line'
      } ${className}`}
    >
      {['fr', 'en']?.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`min-h-[30px] min-w-[38px] cursor-pointer rounded-full px-2.5 transition-colors ${
            lang === code
              ? onDark
                ? 'bg-white text-navy'
                : 'bg-navy text-white'
              : onDark
                ? 'text-white/80 hover:text-white'
                : 'text-subtle hover:text-navy'
          }`}
        >
          {code?.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

/**
 * En-tête commun aux pages MCCT.
 * variant :
 *  - 'light' (défaut) : barre blanche collée en haut
 *  - 'dark'           : barre bleu marine
 *  - 'hero'           : transparente au-dessus du haut de l'accueil, blanche au
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
    isHero && !isScrolled ? 'min-h-[84px]' : 'min-h-[72px]',
    isDark
      ? 'border-b border-white/10 bg-navy/95 text-white backdrop-blur-md'
      : isHero && !isScrolled
        ? 'border-b border-transparent bg-transparent text-navy'
        : 'border-b border-line bg-white/95 text-navy shadow-[0_4px_20px_-12px_rgba(15,42,71,0.25)] backdrop-blur-md'
  ]?.join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className={`${container} flex items-center justify-between gap-6`}>
          <Link to="/" className="flex items-center" aria-label={t('nav.logoHome')}>
            <img
              src="/logo1.png"
              alt="MCCT Industrie"
              className={`block h-[36px] w-auto ${isDark ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          <div className="flex items-center gap-3 min-[900px]:hidden">
            <LanguageSwitch onDark={isDark} />
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label={t('nav.open')}
              aria-expanded={isMenuOpen}
              className={`inline-flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full border transition-colors ${
                isDark ? 'border-white/30 text-white' : 'border-line bg-white text-navy hover:border-brand'
              }`}
            >
              <span aria-hidden="true" className="flex flex-col gap-[4px]">
                <span className="block h-[2px] w-[18px] rounded bg-current" />
                <span className="block h-[2px] w-[18px] rounded bg-current" />
                <span className="block h-[2px] w-[18px] rounded bg-current" />
              </span>
            </button>
          </div>

          <nav aria-label={t('nav.main')} className="hidden items-center gap-8 text-[15px] font-medium min-[900px]:flex">
            {links
              ?.filter((link) => link?.to !== '/contact')
              ?.map((link) => {
                const base = `transition-colors ${isDark ? 'hover:text-skytext' : 'hover:text-brand'}`;
                if (link?.href) {
                  return (
                    <a key={link?.href} href={link?.href} className={base}>
                      {label(link)}
                    </a>
                  );
                }
                const isActive = location?.pathname === link?.to;
                return (
                  <Link
                    key={link?.to}
                    to={link?.to}
                    className={`${base} relative ${isActive ? (isDark ? 'text-skytext' : 'text-brand') : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label(link)}
                    {isActive ? (
                      <span aria-hidden="true" className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-current" />
                    ) : null}
                  </Link>
                );
              })}
            <LanguageSwitch onDark={isDark} />
            <Link to="/contact" className={`${btnPrimary} min-h-[44px] px-5 text-[14.5px]`}>
              {t('nav.contact')}
            </Link>
          </nav>
        </div>
      </header>

      {isHero ? (
        <span
          aria-hidden="true"
          className="fixed left-0 top-0 z-[200] h-[3px] rounded-r-full bg-brand"
          style={{ width: `${progress}%` }}
        />
      ) : null}

      {isMenuOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.dialog')}
          className="fixed inset-0 z-[250] flex flex-col justify-between overflow-y-auto bg-white px-5 pb-8 pt-5 text-navy"
        >
          <div className="flex items-center justify-between">
            <img src="/logo1.png" alt="MCCT Industrie" className="h-9 w-auto" />
            <button
              type="button"
              onClick={closeMenu}
              aria-label={t('nav.close')}
              className="min-h-[44px] cursor-pointer rounded-full border border-line px-4 text-[14px] font-semibold text-navy transition-colors hover:border-brand hover:text-brand"
            >
              {t('nav.closeLabel')}
            </button>
          </div>

          <nav aria-label={t('nav.mobile')} className="flex flex-col py-8">
            {links?.map((link) => {
              const inner = (
                <>
                  <span className="font-display text-[28px] font-bold tracking-[-0.01em]">{label(link)}</span>
                  <span aria-hidden="true" className="text-[20px] text-brand">
                    →
                  </span>
                </>
              );
              const className = 'flex min-h-[56px] items-center justify-between border-b border-line py-4';
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

          <div className="rounded-2xl bg-mist p-5 text-[15px] leading-[1.8] text-copy">
            <LanguageSwitch className="mb-4" />
            <p className="font-semibold text-navy">{t('common.city')}</p>
            <p>
              <a href={PHONE_HREF} className="hover:text-brand">
                {PHONE}
              </a>
            </p>
            <p>
              <a href={EMAIL_HREF} className="hover:text-brand">
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
