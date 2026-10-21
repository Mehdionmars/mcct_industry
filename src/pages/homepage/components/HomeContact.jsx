import React from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Reveal from '../../../components/ui/Reveal';
import McctContactForm from '../../../components/ui/McctContactForm';
import { brochureUrl } from '../../../data/mcct';
import { useI18n } from '../../../i18n/LanguageProvider';
import {
  container,
  EMAIL,
  EMAIL_HREF,
  PHONE,
  PHONE_HREF,
  WHATSAPP_HREF
} from '../../../components/ui/mcctTheme';
import { Eyebrow, SiteFooter, card, joinTitle } from '../../../components/ui/Corporate';

/** Ligne de coordonnées : pastille d'icône + intitulé + valeur. */
const InfoRow = ({ icon: Icon, label, children }) => (
  <li className="flex gap-4">
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
    </span>
    <span className="min-w-0 text-[15.5px] leading-[1.6]">
      <span className="block text-[13.5px] font-semibold text-subtle">{label}</span>
      <span className="block text-navy">{children}</span>
    </span>
  </li>
);

const HomeContact = () => {
  const { lang, t } = useI18n();
  const title = t('home.contactTitle');
  const subtitle = t('home.contactSubtitle');
  const brochure = t('home.brochureCta');

  return (
    <>
      <section id="contact" className="bg-mist py-24">
        <div className={`${container} grid gap-14 min-[1000px]:grid-cols-[1fr_1.15fr]`}>
          <Reveal className="min-w-0">
            <Eyebrow>{t('home.contactEyebrow')}</Eyebrow>
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-navy">
              {joinTitle(title)}
              {lang === 'fr' ? '\u00a0?' : '?'}
            </h2>
            <p className="mt-4 text-[20px] font-semibold text-brand">{joinTitle(subtitle)}.</p>

            <ul className="mt-10 flex list-none flex-col gap-5">
              <InfoRow icon={MapPin} label={t('footer.address')}>
                {t('common.addressLine1')} {t('common.addressLine2')}
                <br />
                {t('common.addressCity')}
              </InfoRow>
              <InfoRow icon={Phone} label={t('contact.form.phone')}>
                <a href={PHONE_HREF} className="hover:text-brand">
                  {PHONE}
                </a>
              </InfoRow>
              <InfoRow icon={Mail} label={t('contact.form.email')}>
                <a href={EMAIL_HREF} className="break-all hover:text-brand">
                  {EMAIL}
                </a>
              </InfoRow>
              <InfoRow icon={MessageCircle} label="WhatsApp">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#15803D] hover:text-navy"
                >
                  {t('common.whatsapp')}
                </a>
              </InfoRow>
            </ul>

            {brochureUrl ? (
              <a
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${card} mt-8 inline-flex items-center gap-4 px-5 py-4 text-[15px] font-semibold text-navy hover:text-brand`}
              >
                <span aria-hidden="true" className="h-10 w-8 shrink-0 rounded-md bg-sky" />
                {joinTitle(brochure)}
              </a>
            ) : null}
          </Reveal>

          <Reveal className={`${card} min-w-0 p-6 min-[600px]:p-9`}>
            <McctContactForm rows={5} />
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
};

export default HomeContact;
