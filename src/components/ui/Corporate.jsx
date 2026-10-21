import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/LanguageProvider';
import {
  container,
  navLinks,
  EMAIL,
  EMAIL_HREF,
  PHONE,
  PHONE_HREF,
  WHATSAPP_HREF
} from './mcctTheme';

/*
 * Briques de la charte « corporate clair » : boutons arrondis, cartes à ombre
 * douce, pastille de section, titres en casse normale, en-tête de page et pied
 * de page. `tone="dark"` adapte une brique aux sections bleu marine.
 */

// ----------------------------------------------------------------- boutons

const btnBase =
  'inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

export const btnPrimary = `${btnBase} bg-brand text-white shadow-sm hover:bg-navy focus-visible:outline-brand`;
export const btnSecondary = `${btnBase} border border-line bg-white text-navy hover:border-brand hover:text-brand focus-visible:outline-brand`;
export const btnOnDark = `${btnBase} bg-white text-navy hover:bg-sky focus-visible:outline-white`;
export const btnOutlineOnDark = `${btnBase} border border-white/40 text-white hover:border-white hover:bg-white/10 focus-visible:outline-white`;

/** Bouton rond des carrousels (flèches). */
export const roundBtn = (tone = 'light') =>
  tone === 'dark'
    ? 'flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-transparent text-[17px] text-white transition-colors hover:border-white hover:bg-white hover:text-navy disabled:cursor-default disabled:opacity-35'
    : 'flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-[17px] text-navy shadow-sm transition-colors hover:border-brand hover:bg-brand hover:text-white disabled:cursor-default disabled:opacity-40 disabled:hover:border-line disabled:hover:bg-white disabled:hover:text-navy';

/** Carte blanche, coins arrondis et ombre douce. */
export const card =
  'rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(15,42,71,0.04),0_10px_30px_-12px_rgba(15,42,71,0.12)]';

// ------------------------------------------------------------ typographie

/** Pastille de section. Le numéro « 03 — » des libellés est retiré. */
export const Eyebrow = ({ children, tone = 'light', className = '' }) => {
  const text = String(children ?? '').replace(/^\d{2}\s*[—–-]\s*/, '');
  return (
    <p
      className={`mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${
        tone === 'dark' ? 'bg-white/10 text-skytext' : 'bg-sky text-brand'
      } ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {text}
    </p>
  );
};

/**
 * Assemble un titre découpé en lignes (tableaux des traductions) en une seule
 * phrase. Si le titre contient déjà une phrase complète (« … précision. Livrer… »),
 * il reçoit un point final pour rester cohérent.
 */
export const joinTitle = (title) => {
  const text = (Array.isArray(title) ? title.join(' ') : String(title ?? '')).replace(/\s*\n\s*/g, ' ').trim();
  return /\.\s/.test(text) && !/[.!?]$/.test(text) ? `${text}.` : text;
};

/** Titre de section ; `accentLast` colore la dernière ligne en bleu MCCT. */
export const SectionTitle = ({ as: Tag = 'h2', title, accentLast = false, tone = 'light', className = '', id }) => {
  const lines = Array.isArray(title) ? title : [title];
  const accent = tone === 'dark' ? 'text-skytext' : 'text-brand';
  return (
    <Tag
      id={id}
      className={`font-display text-[clamp(2rem,3.6vw,3.2rem)] font-bold leading-[1.12] tracking-[-0.02em] ${
        tone === 'dark' ? 'text-white' : 'text-navy'
      } ${className}`}
    >
      {accentLast && lines.length > 1 ? (
        <>
          {joinTitle(lines.slice(0, -1))} <span className={accent}>{lines[lines.length - 1]}</span>
        </>
      ) : (
        joinTitle(lines)
      )}
    </Tag>
  );
};

// -------------------------------------------------------- en-tête de page

/** En-tête des pages intérieures : fil d'Ariane, titre, texte et visuel arrondi. */
export const PageHero = ({ eyebrow, title, text, image, imageAlt, crumb }) => {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden bg-mist">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(31,106,174,0.12),transparent_70%)]"
      />
      <div className={`${container} relative grid items-center gap-12 py-14 min-[1000px]:grid-cols-2 min-[1000px]:py-20`}>
        <div className="min-w-0">
          <nav aria-label={t('footer.breadcrumb')} className="mb-6 flex items-center gap-2 text-[14px] text-subtle">
            <Link to="/" className="hover:text-brand">
              {t('nav.home')}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-navy">
              {crumb}
            </span>
          </nav>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="animate-mcct-rise font-display text-[clamp(2.4rem,4.6vw,3.9rem)] font-bold leading-[1.08] tracking-[-0.025em] text-navy">
            {joinTitle(title)}
          </h1>
          {text ? <p className="mt-5 max-w-[540px] text-[18px] leading-[1.7] text-copy">{text}</p> : null}
        </div>
        {image ? (
          <div className="min-w-0 overflow-hidden rounded-3xl shadow-[0_24px_60px_-24px_rgba(15,42,71,0.35)]">
            <img src={image} alt={imageAlt} className="block h-[clamp(260px,42vh,440px)] w-full object-cover" />
          </div>
        ) : null}
      </div>
    </section>
  );
};

// ----------------------------------------------------- appel à l'action

/** Bandeau d'appel à l'action : grande carte bleu marine arrondie. */
export const CtaBand = ({ title, text, label, to, href }) => {
  const action = to ? (
    <Link to={to} className={btnOnDark}>
      {label} <span aria-hidden="true">→</span>
    </Link>
  ) : (
    <a href={href} className={btnOnDark}>
      {label} <span aria-hidden="true">→</span>
    </a>
  );
  return (
    <section className="bg-white py-20">
      <div className={container}>
        <div className="relative flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-3xl bg-navy px-8 py-12 min-[900px]:px-14 min-[900px]:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(125,184,236,0.28),transparent_70%)]"
          />
          <div className="relative max-w-[640px]">
            <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
              {title}
            </h2>
            {text ? <p className="mt-3 text-[17px] leading-[1.65] text-onnavy">{text}</p> : null}
          </div>
          <div className="relative">{action}</div>
        </div>
      </div>
    </section>
  );
};

// ------------------------------------------------------------ pied de page

export const SiteFooter = () => {
  const { t } = useI18n();
  const heading = 'mb-4 text-[14px] font-semibold text-white';
  return (
    <footer aria-label={t('nav.footer')} className="bg-navy text-onnavy">
      <div className={`${container} grid gap-10 py-16 text-[15px] leading-[1.7] min-[700px]:grid-cols-2 min-[1100px]:grid-cols-[1.5fr_1fr_1fr_1.2fr]`}>
        <div>
          <img src="/logo1.png" alt="MCCT Industrie" className="mb-5 block h-10 w-auto brightness-0 invert" />
          <p className="max-w-[300px]">{t('home.footerTagline')}</p>
        </div>

        <div>
          <p className={heading}>{t('footer.nav')}</p>
          <ul className="flex list-none flex-col gap-2">
            <li>
              <Link to="/" className="hover:text-white">
                {t('nav.home')}
              </Link>
            </li>
            {navLinks?.map((link) => (
              <li key={link?.to}>
                <Link to={link?.to} className="hover:text-white">
                  {t(`nav.${link?.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={heading}>{t('footer.address')}</p>
          <p>
            MCCT Industrie
            <br />
            {t('common.addressLine1')}
            <br />
            {t('common.addressLine2')}
            <br />
            {t('common.addressCity')}
          </p>
        </div>

        <div>
          <p className={heading}>{t('footer.contact')}</p>
          <p>
            <a href={PHONE_HREF} className="hover:text-white">
              {PHONE}
            </a>
          </p>
          <p>
            <a href={EMAIL_HREF} className="break-all hover:text-white">
              {EMAIL}
            </a>
          </p>
          <p className="mt-2">
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#4ADE80] hover:text-white">
              {t('common.whatsapp')}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className={`${container} flex flex-wrap justify-between gap-3 py-6 text-[13.5px]`}>
          <span>{t('common.copyrightAll')}</span>
          <span>{t('common.legal')}</span>
        </div>
      </div>
    </footer>
  );
};
