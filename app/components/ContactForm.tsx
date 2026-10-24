'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { contactEmail } from '../../lib/contact';

export function ContactForm() {
  const [sendingContact, setSendingContact] = useState(false);
  const [contactFeedback, setContactFeedback] = useState('');
  async function openContactEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingContact) return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get('nombre') || '');
    const lastName = String(formData.get('apellido') || '');
    const email = String(formData.get('email') || '');
    const message = String(formData.get('mensaje') || '');
    const subject = encodeURIComponent(`Consulta desde el sitio · ${firstName} ${lastName}`.trim());
    const body = encodeURIComponent(`Nombre: ${firstName} ${lastName}\nEmail: ${email}\n\nMensaje:\n${message}`);
    setSendingContact(true); setContactFeedback('');
    try {
      const response = await fetch('/api/contacto', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: `${firstName} ${lastName}`.trim(), email, message, website: formData.get('website') }) });
      const result = await response.json() as { fallback?: boolean; error?: string; notification?: string };
      if (result.fallback) { window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`; setContactFeedback('Se preparó el mensaje en tu aplicación de correo.'); return; }
      if (!response.ok) throw new Error(result.error || 'No pudimos recibir tu mensaje.');
      setContactFeedback(result.notification === 'test' ? 'Mensaje de prueba registrado. El envío se dirige al correo de pruebas.' : result.notification === 'pending' ? 'Tu mensaje quedó registrado. El aviso por correo está pendiente de envío.' : 'Recibimos tu mensaje. Gracias por contactarte.');
      form.reset();
    } catch (error) { setContactFeedback(error instanceof Error ? error.message : 'No pudimos recibir tu mensaje. Tus datos siguen en pantalla.'); }
    finally { setSendingContact(false); }
  }

  return (
    <form className="contact-form" onSubmit={openContactEmail}>
      <input name="website" type="text" tabIndex={-1} autoComplete="off" hidden aria-hidden="true" />
      <div className="field-row">
        <label htmlFor="contact-nombre">Nombre<input id="contact-nombre" name="nombre" required autoComplete="given-name" /></label>
        <label htmlFor="contact-apellido">Apellido<input id="contact-apellido" name="apellido" required autoComplete="family-name" /></label>
      </div>
      <label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" required autoComplete="email" /></label>
      <label htmlFor="contact-mensaje">Dejame tu mensaje<textarea id="contact-mensaje" name="mensaje" rows={6} required /></label>
      <button className="button button-primary" type="submit" disabled={sendingContact}>{sendingContact ? 'Enviando…' : 'Enviar mensaje'} <ArrowRight aria-hidden="true" size={19} /></button>
      <small>También podés escribirme directamente a <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</small>
      {contactFeedback && <p role="status">{contactFeedback}</p>}
    </form>
  );
}
