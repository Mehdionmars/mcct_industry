import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/LanguageProvider';
import {
  container,
  headingFont,
  navLinks,
  EMAIL,
  EMAIL_HREF,
  PHONE,
  PHONE_HREF,
  WHATSAPP_HREF
} from './mcctTheme';

/*
 * Briques de la charte « plan technique » : repères de section, cotes,
 * visuels encadrés de repères de coupe, boutons et cartouche de pied de page.
 * `tone="dark"` adapte chaque brique aux sections sur fond bleu de plan.
 */

// ----------------------------------------------------------------- boutons

const btnBase =
  'inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-3 whitespace-nowrap border px-6 font-mono text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200';

/** Action principale : aplat jaune sécurité, texte encre. */
export const btnPrimary = `${btnBase} border-ink bg-safety text-ink hover:bg-ink hover:text-safety`;
export const btnPrimaryDark = `${btnBase} border-safety bg-safety text-ink hover:border-snow hover:bg-snow`;
/** Action secondaire : simple contour. */
export const btnGhost = `${btnBase} border-ink bg-transparent text-ink hover:bg-ink hover:text-paper`;
export const btnGhostDark = `${btnBase} border-snow/60 bg-transparent text-snow hover:border-snow hover:bg-snow hover:text-night`;

/** Bouton carré des carrousels (flèches). */
export const squareBtn = (tone = 'light') =>
  tone === 'dark'
    ? 'flex h-11 w-11 cursor-pointer items-center justify-center border border-nightrule bg-transparent font-mono text-[16px] text-snow transition-colors hover:border-safety hover:bg-safety hover:text-ink disabled:cursor-default disabled:opacity-35 disabled:hover:border-nightrule disabled:hover:bg-transparent disabled:hover:text-snow'
    : 'flex h-11 w-11 cursor-pointer items-center justify-center border border-ink bg-transparent font-mono text-[16px] text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-ink';

// -------------------------------------------------------- repère de section

/**
 * Sur-titre de section. « 03 — NOS ACTIVITÉS » devient un repère encadré
 * [03] suivi du libellé ; un texte sans numéro est précédé d'un trait.
 */
export const Eyebrow = ({ children, tone = 'light', className = '', as: Tag = 'p' }) => {
  const text = String(children ?? '');
  const match = text.match(/^(\d{2})\s*[—–-]\s*(.+)$/);
  const color = tone === 'dark' ? 'text-brandlt' : 'text-brand';
  return (
    <Tag
      className={`mb-6 flex items-center gap-3 font-mono text-[12.5px] font-medium uppercase tracking-[0.14em] ${color} ${className}`}
    >
      {match ? (
        <span className="inline-flex h-7 min-w-[2.5rem] items-center justify-center border border-current px-1.5">
          {match[1]}
        </span>
      ) : (
        <span aria-hidden="true" className="h-px w-8 bg-current" />
      )}
      <span>{match ? match[2] : text}</span>
    </Tag>
  );
};

/** Marque de fin de titre : petit carré jaune sécurité (remplace le point bleu). */
export const Mark = () => (
  <span
    aria-hidden="true"
    className="ml-[0.08em] inline-block h-[0.16em] w-[0.16em] bg-safety align-baseline"
  />
);

// ------------------------------------------------------------------- cotes

/** Ligne de cote horizontale : ◄──── libellé ────► */
export const DimLine = ({ label, tone = 'light', className = '' }) => (
  <div
    aria-hidden="true"
    className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] ${
      tone === 'dark' ? 'text-fog' : 'text-steel'
    } ${className}`}
  >
    <span className="h-3 w-px bg-current" />
    <span className="bp-arrow-l -mr-2 shrink-0" />
    <span className="h-px flex-1 bg-current" />
    {label ? <span className="shrink-0 px-2">{label}</span> : null}
    <span className="h-px flex-1 bg-current" />
    <span className="bp-arrow-r -ml-2 shrink-0" />
    <span className="h-3 w-px bg-current" />
  </div>
);

/** Réglet gradué décoratif. */
export const Ruler = ({ tone = 'light', className = '' }) => (
  <div
    aria-hidden="true"
    className={`bp-ruler ${tone === 'dark' ? 'text-nightrule' : 'text-rule'} ${className}`}
  />
);

// ----------------------------------------------------------------- visuels

/**
 * Visuel encadré de repères de coupe, avec légende « FIG. 02 — … ».
 * La légende est décorative (aria-hidden) : le texte alternatif reste porté par l'image.
 */
export const Figure = ({
  src,
  alt,
  fig,
  caption,
  tone = 'light',
  className = '',
  frameClassName = '',
  imgClassName = 'h-full w-full object-cover',
  loading = 'lazy',
  children,
  imgProps = {}
}) => {
  const { t } = useI18n();
  return (
    <figure className={`m-0 min-w-0 ${className}`}>
      <div className="relative">
        <div className={`relative overflow-hidden ${tone === 'dark' ? 'bg-night2' : 'bg-paper2'} ${frameClassName}`}>
          {src ? <img src={src} alt={alt} loading={loading} className={`block ${imgClassName}`} {...imgProps} /> : null}
          {children}
        </div>
        <span aria-hidden="true" className={`bp-corners ${tone === 'dark' ? 'text-brandlt' : 'text-ink'}`} />
      </div>
      {fig || caption ? (
        <figcaption
          aria-hidden="true"
          className={`mt-3.5 flex items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.12em] ${
            tone === 'dark' ? 'text-fog' : 'text-steel'
          }`}
        >
          {fig ? (
            <span className="shrink-0">
              {t('bp.fig')} {fig}
            </span>
          ) : null}
          {caption ? <span className="min-w-0 truncate text-right">{caption}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
};

// -------------------------------------------------------- en-tête de page

/**
 * En-tête des pages intérieures, traité comme une feuille de plan : bandeau de
 * référence, grand titre, et la vue principale cotée et encadrée à droite.
 */
export const PageHero = ({ eyebrow, title = [], text, image, imageAlt, fig = '01', sheet }) => {
  const { t } = useI18n();
  return (
    <section className="bp-grid relative overflow-hidden border-b border-ink/15 bg-paper text-ink">
      <div className={`${container} pb-14 pt-10 min-[900px]:pb-16 min-[900px]:pt-12`}>
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 border-y border-ink/15 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-steel">
          <span>
            {t('bp.ref')} MCCT-IND{sheet ? ` — ${t('bp.sheet')} ${sheet} / 04` : ''}
          </span>
          <span>{t('common.cityLine')}</span>
        </div>
        <div className="grid items-end gap-12 min-[1000px]:grid-cols-12 min-[1000px]:gap-10">
          <div className="min-w-0 min-[1000px]:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1
              className="animate-mcct-rise text-[clamp(2.6rem,5.2vw,5rem)] font-bold uppercase leading-[1.02] tracking-[-0.01em]"
              style={headingFont}
            >
              {title?.map((line, i) => (
                <React.Fragment key={line}>
                  {i > 0 ? <br /> : null}
                  {line}
                </React.Fragment>
              ))}
              <Mark />
            </h1>
            {text ? <p className="mt-7 max-w-[520px] text-[17px] leading-[1.7] text-ink2">{text}</p> : null}
          </div>
          {image ? (
            <div className="min-w-0 min-[1000px]:col-span-5">
              <DimLine label={`${t('bp.view')} ${fig}`} className="mb-4" />
              <Figure
                src={image}
                alt={imageAlt}
                fig={fig}
                caption={imageAlt}
                loading="eager"
                frameClassName="h-[clamp(260px,42vh,440px)]"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

// --------------------------------------------------------------- cartouche

const Cell = ({ label, children, className = '' }) => (
  <div className={`border-b border-r border-nightrule p-5 ${className}`}>
    {label ? (
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-brandlt">{label}</p>
    ) : null}
    {children}
  </div>
);

/**
 * Pied de page en forme de cartouche de plan : identité, plan du site,
 * adresse, contact, puis la ligne PROJET / ÉCHELLE / FEUILLE / DATE.
 * `sheet` numérote la page comme une feuille d'un jeu de plans.
 */
export const TitleBlock = ({ sheet = '01' }) => {
  const { t } = useI18n();
  const year = '2026';

  return (
    <footer aria-label={t('nav.footer')} className={`${container} pb-10 pt-4`}>
      <div className="grid border-l border-t border-nightrule text-[14px] leading-[1.7] text-fog min-[700px]:grid-cols-2 min-[1100px]:grid-cols-12">
        <Cell className="min-[1100px]:col-span-4">
          <img src="/logo1.png" alt="MCCT Industrie" className="mb-4 block h-10 w-auto brightness-0 invert" />
          <p className="max-w-[300px]">{t('home.footerTagline')}</p>
        </Cell>

        <Cell label={t('bp.siteMap')} className="min-[1100px]:col-span-2">
          <nav aria-label={t('nav.footer')} className="flex flex-col gap-1.5 font-mono text-[12.5px] uppercase tracking-[0.1em]">
            <Link to="/" className="text-snow hover:text-safety">
              {t('nav.home')}
            </Link>
            {navLinks?.map((link) => (
              <Link key={link?.to} to={link?.to} className="text-snow hover:text-safety">
                {t(`nav.${link?.key}`)}
              </Link>
            ))}
          </nav>
        </Cell>

        <Cell label={t('bp.address')} className="min-[1100px]:col-span-3">
          <p className="text-snow">MCCT INDUSTRIE</p>
          <p>
            {t('common.addressLine1')}
            <br />
            {t('common.addressLine2')}
            <br />
            {t('common.addressCity')}
          </p>
        </Cell>

        <Cell label={t('bp.contact')} className="min-[1100px]:col-span-3">
          <p>
            <a href={PHONE_HREF} className="text-snow hover:text-safety">
              {PHONE}
            </a>
          </p>
          <p>
            <a href={EMAIL_HREF} className="break-all text-snow hover:text-safety">
              {EMAIL}
            </a>
          </p>
          <p className="mt-1">
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#3BD16F] hover:text-snow">
              {t('common.whatsapp')}
            </a>
          </p>
        </Cell>

        {/* Ligne de cartouche : mentions courtes, en chasse fixe. */}
        <div className="grid grid-cols-2 font-mono text-[11px] uppercase tracking-[0.12em] min-[700px]:col-span-2 min-[900px]:grid-cols-4 min-[1100px]:col-span-12">
          <Cell label={t('bp.project')}>
            <p className="text-snow">MCCT INDUSTRIE</p>
          </Cell>
          <Cell label={t('bp.scale')}>
            <p className="text-snow">1:1</p>
          </Cell>
          <Cell label={t('bp.sheet')}>
            <p className="text-snow">{sheet ? `${sheet} / 04` : '—'}</p>
          </Cell>
          <Cell label={t('bp.date')}>
            <p className="text-snow">{year}</p>
          </Cell>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-fog">
        <span>{t('common.copyrightAll')}</span>
        <span>{t('common.legal')}</span>
      </div>
    </footer>
  );
};
