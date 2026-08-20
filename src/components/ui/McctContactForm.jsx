import React, { useMemo, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { getActivities } from '../../data/mcct';
import { EMAIL, WHATSAPP_HREF } from './mcctTheme';

const fieldClass =
  'min-h-[44px] w-full border border-[#2c3136] bg-[#1a1d20] px-4 py-3.5 text-[15px] text-white outline-none transition-colors focus:border-[#2478BE] focus:ring-2 focus:ring-[#2478BE]/40';
const labelClass =
  'flex min-w-0 flex-col gap-2 text-[11.5px] font-extrabold tracking-[0.16em] text-[#9aa2a9]';

/**
 * Formulaire de contact : aucune donnée n'est stockée, la demande part par
 * messagerie (mailto) ou WhatsApp avec le message pré-rempli, dans la langue active.
 */
const McctContactForm = ({ rows = 6, longNote = false }) => {
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
        <button
          type="submit"
          className="relative inline-flex cursor-pointer items-center gap-3 overflow-hidden border-none bg-[#2478BE] px-[30px] py-[18px] text-[12.5px] font-extrabold tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#17191C]"
        >
          {t('contact.form.submit')} <span aria-hidden="true">→</span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 h-full w-[45%] animate-mcct-shine bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.45),transparent)]"
          />
        </button>
        <button
          type="button"
          onClick={sendWhatsApp}
          className="inline-flex cursor-pointer items-center gap-3 border border-[#25D366] bg-transparent px-[30px] py-[17px] text-[12.5px] font-extrabold tracking-[0.16em] text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
        >
          {t('contact.form.whatsapp')}
        </button>
      </div>

      <p className="m-0 text-[12.5px] leading-[1.6] text-[#565e66] [grid-column:1/-1]">
        {longNote ? t('contact.form.noteLong')(EMAIL) : t('contact.form.note')(EMAIL)}
      </p>
    </form>
  );
};

export default McctContactForm;
