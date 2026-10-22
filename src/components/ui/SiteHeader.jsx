import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n/LanguageProvider';
import { ACCENT, headingFont, navLinks, EMAIL, EMAIL_HREF, PHONE, PHONE_HREF, container } from './mcctTheme';

/** Sélecteur de langue : deux libellés courts, l'actif est signalé par aria-pressed. */
const LanguageSwitch = ({ onDark, className = '' }) => {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t('langSwitch.label')}
      className={`flex items-center gap-1 text-[11.5px] font-extrabold tracking-[0.14em] ${className}`}
    >
      {['fr', 'en']?.map((code, index) => (
        <React.Fragment key={code}>
          {index === 1 ? (
            <span aria-hidden="true" className={onDark ? 'text-[#565e66]' : 'text-[#c6c6c1]'}>
              /
            </span>
          ) : null}
          <button
            type="button"
            lang={code}
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className="min-h-[32px] cursor-pointer bg-transparent px-1 transition-colors"
            style={{ color: lang === code ? ACCENT : 'inherit', opacity: lang === code ? 1 : 0.65 }}
          >
            {code?.toUpperCase()}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

/**
 * En-tête commun aux pages MCCT.
 * variant :
 *  - 'light' (défaut) : barre claire collée en haut, pages sur fond #F5F5F2
 *  - 'dark'           : barre sombre, pour les pages au fond #111315 (Contact)
 *  - 'hero'           : transparente au-dessus du hero puis claire au défilement (Accueil),
 *                       avec barre de progression de lecture
 */
const SiteHeader = ({ variant = 'light', links = navLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n();

  const isHero = variant === 'hero';
  const isDark = variant === 'dark';
  const closeMenu = () => setIsMenuOpen(false);

  // Déjà sur l'accueil, le lien du logo ne change pas de page : on remonte
  // en haut nous-mêmes (et on retire une éventuelle ancre #contact de l'URL).
  const goHome = (e) => {
    if (location?.pathname !== '/') return;
    e?.preventDefault();
    if (location?.hash) navigate('/', { replace: true });
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

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

  const solid = !isHero || isScrolled;
  const onDarkSurface = isDark || (isHero && !isScrolled);
  const label = (link) => (link?.label ? link?.label : t(`nav.${link?.key}`));

  const headerClass = [
    'z-[100] flex items-center py-2.5 transition-all duration-500',
    isHero ? 'fixed inset-x-0 top-0' : 'sticky top-0',
    isHero ? (isScrolled ? 'min-h-[72px]' : 'min-h-[96px]') : 'min-h-[72px]',
    isDark
      ? 'border-b border-[#23272b] bg-[rgba(17,19,21,0.9)] backdrop-blur-md'
      : solid
        ? 'border-b border-[rgba(23,25,28,0.08)] bg-[rgba(245,245,242,0.9)] backdrop-blur-md'
        : 'border-b border-transparent bg-transparent'
  ]?.join(' ');

  const linkColor = onDarkSurface ? 'text-white' : 'text-[#17191C]';

  return (
    <>
      <header className={headerClass}>
        <div className={`${container} flex items-center justify-between gap-6`}>
          <Link to="/" onClick={goHome} className="flex items-center" aria-label={t('nav.logoHome')}>
            <img
              src="/logo1.png"
              alt="MCCT Industrie"
              className={`block h-[34px] w-auto ${onDarkSurface ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          <div className="flex items-center gap-3 min-[900px]:hidden">
            <LanguageSwitch onDark={onDarkSurface} className={linkColor} />
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label={t('nav.open')}
              aria-expanded={isMenuOpen}
              className={`inline-flex h-[46px] cursor-pointer items-center justify-center border px-[18px] text-[12px] font-extrabold tracking-[0.18em] transition-colors ${
                onDarkSurface
                  ? 'border-[rgba(255,255,255,0.45)] text-white hover:border-white'
                  : 'border-[#c6c6c1] text-[#17191C] hover:border-[#2478BE] hover:text-[#2478BE]'
              }`}
            >
              {t('nav.menu')}
            </button>
          </div>

          <nav
            aria-label={t('nav.main')}
            className={`hidden flex-wrap items-center gap-[22px] text-[12.5px] font-bold tracking-[0.14em] transition-colors duration-500 min-[900px]:flex ${linkColor}`}
          >
            {links
              ?.filter((link) => link?.to !== '/contact')
              ?.map((link) => {
                if (link?.href) {
                  return (
                    <a key={link?.href} href={link?.href} className="transition-colors hover:text-[#2478BE]">
                      {label(link)}
                    </a>
                  );
                }
                const isActive = location?.pathname === link?.to;
                return (
                  <Link
                    key={link?.to}
                    to={link?.to}
                    className="transition-colors hover:text-[#2478BE]"
                    style={isActive ? { color: ACCENT } : undefined}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label(link)}
                  </Link>
                );
              })}
            <LanguageSwitch onDark={onDarkSurface} />
            <Link
              to="/contact"
              className="whitespace-nowrap bg-[#2478BE] px-[22px] py-3 text-white transition-colors hover:bg-[#17191C] hover:text-white"
            >
              {t('nav.contact')}
            </Link>
          </nav>
        </div>
      </header>

      {isHero ? (
        <span
          aria-hidden="true"
          className="fixed left-0 top-0 z-[200] h-[2px] bg-[#2478BE]"
          style={{ width: `${progress}%` }}
        />
      ) : null}

      {isMenuOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.dialog')}
          className="fixed inset-0 z-[250] flex flex-col justify-between overflow-y-auto bg-[#0D0F10] px-5 pb-8 pt-6 text-white"
        >
          <div className="flex items-center justify-between">
            <img src="/logo1.png" alt="MCCT Industrie" className="h-8 w-auto brightness-0 invert" />
            <button
              type="button"
              onClick={closeMenu}
              aria-label={t('nav.close')}
              className="min-h-[48px] cursor-pointer border border-[#2c3136] px-[18px] py-[14px] text-[12px] font-extrabold tracking-[0.16em] text-white transition-colors hover:border-[#2478BE] hover:text-[#2478BE]"
            >
              {t('nav.closeLabel')}
            </button>
          </div>

          <nav aria-label={t('nav.mobile')} className="flex flex-col gap-1 py-8">
            {links?.map((link) => {
              const inner = (
                <>
                  <span className="text-[30px] font-bold tracking-[-0.01em] text-white" style={headingFont}>
                    {label(link)}
                  </span>
                </>
              );
              const className = 'flex min-h-[48px] items-baseline gap-4 border-b border-[#1c1f22] py-3.5';
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

          <div className="text-[14px] leading-[1.9] text-[#9aa2a9]">
            <LanguageSwitch onDark className="mb-4 text-white" />
            <p className="font-extrabold tracking-[0.14em] text-white">{t('common.city')}</p>
            <p className="mt-1.5">
              <a href={PHONE_HREF} className="text-[#c4cad0] hover:text-[#2478BE]">
                {PHONE}
              </a>
            </p>
            <p>
              <a href={EMAIL_HREF} className="text-[#c4cad0] hover:text-[#2478BE]">
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
