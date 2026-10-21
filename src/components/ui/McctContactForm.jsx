import React, { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { getActivities } from '../../data/mcct';
import { EMAIL, WHATSAPP_HREF } from './mcctTheme';
import { btnPrimary } from './Corporate';

// Champs clairs aux coins arrondis, anneau bleu au focus.
const fieldClass =
  'min-h-[48px] w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] font-normal text-navy outline-none transition-shadow placeholder:text-subtle focus:border-brand focus:ring-4 focus:ring-brand/15';
const labelClass = 'flex min-w-0 flex-col gap-2 text-[14px] font-semibold text-navy';

/**
 * Formulaire de contact : la demande part par messagerie (mailto) ou WhatsApp
 * avec le message pré-rempli, dans la langue active. Rien n'est stocké côté page.
 */
const McctContactForm = ({ rows = 6 }) => {
  const { lang, t } = useI18n();
  // Les types de projet reprennent les activités, traduites elles aussi.
  const projectTypes = useMemo(
    () => [...getActivities(lang)?.map((activity) => activity?.title), t('contact.form.other')],
    [lang, t]
  );

  const [values, setValues] = useState({ nom: '', entreprise: '', email: '', tel: '', type: '', msg: '' });
  const type = values?.type || projectTypes?.[0];

  const update = (key) => (e) => setValues((current) => ({ ...current, [key]: e?.target?.value }));

  const asText = () => {
    const f = t('contact.form.fields');
    return (
      `${f?.name} : ${values?.nom}\n${f?.company} : ${values?.entreprise}\n${f?.email} : ${values?.email}\n` +
      `${f?.phone} : ${values?.tel}\n${f?.type} : ${type}\n\n${f?.message} :\n${values?.msg}`
    );
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const subject = `${t('contact.form.mailSubject')} — ${type} — ${values?.nom}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(asText())}`;
  };

  const sendWhatsApp = () => {
    window.open(
      `${WHATSAPP_HREF}?text=${encodeURIComponent(`${t('contact.form.greeting')}\n\n${asText()}`)}`,
      '_blank',
      'noopener'
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid min-w-0 gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]"
    >
      <label className={labelClass}>
        {t('contact.form.name')}
        <input type="text" required autoComplete="name" value={values?.nom} onChange={update('nom')} className={fieldClass} />
      </label>
      <label className={labelClass}>
        {t('contact.form.company')}
        <input
          type="text"
          autoComplete="organization"
          value={values?.entreprise}
          onChange={update('entreprise')}
          className={fieldClass}
        />
      </label>
      <label className={labelClass}>
        {t('contact.form.email')}
        <input type="email" required autoComplete="email" value={values?.email} onChange={update('email')} className={fieldClass} />
      </label>
      <label className={labelClass}>
        {t('contact.form.phone')}
        <input type="tel" autoComplete="tel" value={values?.tel} onChange={update('tel')} className={fieldClass} />
      </label>
      <label className={`${labelClass} [grid-column:1/-1]`}>
        {t('contact.form.type')}
        <select value={type} onChange={update('type')} className={fieldClass}>
          {projectTypes?.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className={`${labelClass} [grid-column:1/-1]`}>
        {t('contact.form.message')}
        <textarea required rows={rows} value={values?.msg} onChange={update('msg')} className={`${fieldClass} resize-y`} />
      </label>

      <div className="flex flex-wrap items-center gap-3.5 [grid-column:1/-1]">
        <button type="submit" className={btnPrimary}>
          {t('contact.form.submit')} <span aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          onClick={sendWhatsApp}
          className="inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full border border-[#1F9D55] bg-white px-6 text-[15px] font-semibold text-[#15803D] transition-colors hover:bg-[#1F9D55] hover:text-white"
        >
          {t('contact.form.whatsapp')}
        </button>
      </div>

    </form>
  );
};

export default McctContactForm;
