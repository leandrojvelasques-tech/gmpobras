import { whatsappDisplay, whatsappUrl } from '../../lib/contact';
import type { Metadata } from 'next';
import { AtSign, Mail, MapPin, MessageCircle } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { SiteFooter } from '../components/SiteFooter';
import { SubpageHeader } from '../components/SubpageHeader';

export const metadata: Metadata = { title: 'Contacto con Gustavo Pinto | GMP Obras', description: 'Contactate con Gustavo Pinto por WhatsApp, correo o dejá un mensaje. Oficina en Ramos Mejía 298, Comodoro Rivadavia.', alternates: { canonical: 'https://www.gmpobras.com.ar/contacto' } };

export default function ContactPage() {
  return (
    <main className="contact-page">
      <SubpageHeader active="contacto" />
      <section className="contact-section" id="contacto" aria-labelledby="contact-title">
        <div className="contact-copy">
          <p className="section-kicker">Contacto</p>
          <h1 id="contact-title">¿Querés contactarme?</h1>
          <p>
            Si tenés alguna duda, dejame un mensaje o escribime directamente por correo o WhatsApp.
          </p>
          <div className="contact-direct" aria-label="Datos de contacto de GMP Obras">
            <a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" size={18} /> WhatsApp · {whatsappDisplay}</a>
            <a href="mailto:gpinto@gmpobras.com"><Mail aria-hidden="true" size={16} /> gpinto@gmpobras.com</a>
            <a href="https://www.google.com/maps/dir/?api=1&destination=Ramos+Mej%C3%ADa+298%2C+Comodoro+Rivadavia%2C+Chubut" target="_blank" rel="noreferrer">
              <MapPin aria-hidden="true" size={16} /> Ramos Mejía 298 · Comodoro Rivadavia
            </a>
            <a href="https://www.instagram.com/gmpobras/" target="_blank" rel="noreferrer">
              <AtSign aria-hidden="true" size={16} /> Instagram · @gmpobras
            </a>
          </div>
        </div>

        <ContactForm />
      </section>
      <SiteFooter />
    </main>
  );
}
