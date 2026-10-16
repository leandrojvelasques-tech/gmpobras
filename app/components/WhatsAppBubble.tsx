import { whatsappUrl } from '../../lib/contact';

export function WhatsAppBubble() {
  return (
    <a className="whatsapp-bubble" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Escribir a Gustavo por WhatsApp" title="Escribir a Gustavo por WhatsApp">
      <svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
        <path d="M16 .8a15 15 0 0 0-13 22.5L.9 31.1l8-2.1A15 15 0 1 0 16 .8Zm0 27.3a12.2 12.2 0 0 1-6.2-1.7l-.5-.3-4.7 1.2 1.3-4.5-.3-.5A12.3 12.3 0 1 1 16 28.1Zm6.8-9.2c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2l-1.2 1.4c-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2 0-.5 0-.7l-1.2-2.8c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.4 3.6 1.6 3.9c.2.2 2.7 4.1 6.5 5.7.9.4 1.6.6 2.2.8.9.3 1.7.3 2.3.2.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5Z" />
      </svg>
    </a>
  );
}
