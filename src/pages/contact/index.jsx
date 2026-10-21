import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import PageMeta from '../../components/ui/PageMeta';
import SiteHeader from '../../components/ui/SiteHeader';
import WhatsAppFab from '../../components/ui/WhatsAppFab';
import McctContactForm from '../../components/ui/McctContactForm';
import { useI18n } from '../../i18n/LanguageProvider';
import {
  bodyFont,
  container,
  EMAIL,
  EMAIL_HREF,
  PHONE,
  PHONE_HREF,
  WHATSAPP_HREF
} from '../../components/ui/mcctTheme';
import { Eyebrow, SiteFooter, card, joinTitle } from '../../components/ui/Corporate';

/** Ligne de coordonnées : pastille d'icône + intitulé + valeur. */
const InfoRow = ({ icon: Icon, label, children }) => (
  <li className="flex gap-4">
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky text-brand">
      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
    </span>
    <span className="min-w-0 text-[15.5px] leading-[1.6]">
      <span className="block text-[13.5px] font-semibold text-subtle">{label}</span>
      <span className="block text-navy">{children}</span>
    </span>
  </li>
);

const ContactPage = () => {
  const { t } = useI18n();
  const title = t('contact.title');

  return (
    <div className="min-h-screen bg-white text-navy antialiased" style={bodyFont}>
      <PageMeta title={t('meta.contact.title')} description={t('meta.contact.description')} />

      <WhatsAppFab />
      <SiteHeader />

      <section className="relative overflow-hidden bg-mist pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(31,106,174,0.12),transparent_70%)]"
        />
        <div className={`${container} relative pt-14 min-[1000px]:pt-20`}>
          <nav aria-label={t('footer.breadcrumb')} className="mb-6 flex items-center gap-2 text-[14px] text-subtle">
            <Link to="/" className="hover:text-brand">
              {t('nav.home')}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="font-medium text-navy">
              {t('nav.contact')}
            </span>
          </nav>
          <Eyebrow>{t('nav.contact')}</Eyebrow>
          <h1 className="max-w-[900px] animate-mcct-rise font-display text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-navy">
            {joinTitle(title)}
          </h1>

          <div className="mt-14 grid items-start gap-8 min-[1000px]:grid-cols-[1fr_1.25fr]">
            <div className="flex min-w-0 flex-col gap-8">
              <div className={`${card} p-7 min-[600px]:p-8`}>
                <ul className="flex list-none flex-col gap-5">
                  <InfoRow icon={MapPin} label={t('footer.address')}>
                    MCCT Industrie
                    <br />
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
              </div>

              <div className="overflow-hidden rounded-2xl border border-line bg-white">
                <iframe
                  title={t('contact.mapTitle')}
                  src="https://www.google.com/maps?q=Route+310+km+6+Chellalate+Ain+Harrouda&output=embed"
                  loading="lazy"
                  className="block h-[300px] w-full border-0"
                />
              </div>
            </div>

            <div className={`${card} min-w-0 p-6 min-[600px]:p-9`}>
              <McctContactForm />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default ContactPage;
