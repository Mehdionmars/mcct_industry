import React from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { WHATSAPP_HREF } from './mcctTheme';

/** Bouton flottant WhatsApp présent sur toutes les pages de la maquette. */
const WhatsAppFab = () => {
  const { t } = useI18n();

  return (
  <a
    href={WHATSAPP_HREF}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={t('common.whatsappAria')}
    className="fixed bottom-6 right-6 z-[150] flex h-[56px] w-[56px] items-center justify-center border border-ink bg-[#25D366] text-white shadow-[4px_4px_0_rgba(14,34,53,0.85)] transition-transform [transition-duration:200ms] hover:-translate-x-0.5 hover:-translate-y-0.5"
  >
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.2-.7-.7-1.2-1.5-1.4-1.7-.1-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.3 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.3 3.9.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3z" />
    </svg>
    </a>
  );
};

export default WhatsAppFab;
