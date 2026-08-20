import React, { useState } from 'react';
import { EMAIL, WHATSAPP_HREF } from './mcctTheme';

const PROJECT_TYPES = [
  'Construction métallique',
  'Chaudronnerie',
  'Tuyauterie industrielle',
  'Installation & montage',
  'Maintenance industrielle',
  'Équipements industriels',
  'Autre'
];

const EMPTY = { nom: '', entreprise: '', email: '', tel: '', type: PROJECT_TYPES?.[0], msg: '' };

const fieldClass =
  'min-h-[44px] w-full border border-[#2c3136] bg-[#1a1d20] px-4 py-3.5 text-[15px] text-white outline-none transition-colors focus:border-[#2478BE] focus:ring-2 focus:ring-[#2478BE]/40';
const labelClass =
  'flex min-w-0 flex-col gap-2 text-[11.5px] font-extrabold tracking-[0.16em] text-[#9aa2a9]';

/**
 * Formulaire de contact de la maquette : aucune donnée n'est stockée, la demande
 * part par messagerie (mailto) ou WhatsApp avec le message pré-rempli.
 */
const McctContactForm = ({ rows = 6, note }) => {
  const [values, setValues] = useState(EMPTY);

  const update = (key) => (e) => setValues((current) => ({ ...current, [key]: e?.target?.value }));

  const asText = () =>
    `Nom : ${values?.nom}\nEntreprise : ${values?.entreprise}\nEmail : ${values?.email}\n` +
    `Téléphone : ${values?.tel}\nType de projet : ${values?.type}\n\nMessage :\n${values?.msg}`;

  const handleSubmit = (e) => {
    e?.preventDefault();
    const subject = `Demande de projet — ${values?.type} — ${values?.nom}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(asText())}`;
  };

  const sendWhatsApp = () => {
    window.open(
      `${WHATSAPP_HREF}?text=${encodeURIComponent(`Bonjour MCCT Industrie,\n\n${asText()}`)}`,
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
        NOM
        <input type="text" required autoComplete="name" value={values?.nom} onChange={update('nom')} className={fieldClass} />
      </label>
      <label className={labelClass}>
        ENTREPRISE
        <input
          type="text"
          autoComplete="organization"
          value={values?.entreprise}
          onChange={update('entreprise')}
          className={fieldClass}
        />
      </label>
      <label className={labelClass}>
        EMAIL
        <input type="email" required autoComplete="email" value={values?.email} onChange={update('email')} className={fieldClass} />
      </label>
      <label className={labelClass}>
        TÉLÉPHONE
        <input type="tel" autoComplete="tel" value={values?.tel} onChange={update('tel')} className={fieldClass} />
      </label>
      <label className={`${labelClass} [grid-column:1/-1]`}>
        TYPE DE PROJET
        <select value={values?.type} onChange={update('type')} className={fieldClass}>
          {PROJECT_TYPES?.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>
      <label className={`${labelClass} [grid-column:1/-1]`}>
        MESSAGE
        <textarea
          required
          rows={rows}
          value={values?.msg}
          onChange={update('msg')}
          className={`${fieldClass} resize-y`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-3.5 [grid-column:1/-1]">
        <button
          type="submit"
          className="relative inline-flex cursor-pointer items-center gap-3 overflow-hidden border-none bg-[#2478BE] px-[30px] py-[18px] text-[12.5px] font-extrabold tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#17191C]"
        >
          ENVOYER LA DEMANDE <span aria-hidden="true">→</span>
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
          ENVOYER PAR WHATSAPP
        </button>
      </div>

      <p className="m-0 text-[12.5px] leading-[1.6] text-[#565e66] [grid-column:1/-1]">
        {note ?? `La demande s’ouvre dans votre messagerie (${EMAIL}) ou sur WhatsApp.`}
      </p>
    </form>
  );
};

export default McctContactForm;
