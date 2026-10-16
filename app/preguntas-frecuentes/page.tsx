import { whatsappDisplay, whatsappUrl } from '../../lib/contact';
import { HeaderLogo } from '../components/HeaderLogo';
import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FaqList } from '../components/FaqList';
import { faqGroups, faqs } from '../data/faqs';

const pageUrl = 'https://www.gmpobras.com.ar/preguntas-frecuentes';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes sobre construcción y Cassaforma | GMP Obras',
  description: 'Respuestas sobre el precio por metro cuadrado, obras, terrenos, plazos y Cassaforma. Prepará tu consulta con GMP Obras en Comodoro Rivadavia y Rada Tilly.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Preguntas frecuentes | GMP Obras',
    description: 'Obras, costos, terrenos y Cassaforma: respuestas para preparar tu consulta con GMP Obras.',
    url: pageUrl,
    type: 'website',
    locale: 'es_AR',
  },
};

export default function FrequentlyAskedQuestionsPage() {
  return (
    <main className="faq-page">
      <header className="faq-page-header">
        <a className="brand" href="/" aria-label="GMP Obras, inicio">
          <HeaderLogo />
        </a>
        <nav aria-label="Navegación principal">
          <a className="faq-back" href="/"><ArrowLeft aria-hidden="true" size={16} />Volver al inicio</a>
          <a className="header-cta" href="/agendar">Agendar cita<ArrowRight aria-hidden="true" size={17} /></a>
        </nav>
      </header>

      <section className="faq-page-hero" aria-labelledby="faq-page-title">
        <div className="faq-page-hero-copy">
          <p className="section-kicker">GMP Obras · Comodoro Rivadavia y Rada Tilly</p>
          <h1 id="faq-page-title">Preguntas<br />frecuentes.</h1>
          <p className="faq-page-hero-intro">Respuestas sobre obras, costos, terrenos y el sistema Cassaforma para preparar tu primera consulta.</p>
        </div>
        <div className="faq-page-hero-image">
          <Image
            src="/gustavo-pinto-explicando-plano-gmp-obras.webp"
            alt="Gustavo Pinto señala un plano junto a otra persona en la oficina de GMP Obras."
            width={1200}
            height={1600}
            priority
            unoptimized
          />
        </div>
      </section>

      <div className="faq-page-content">
        <aside className="faq-page-index">
          <p className="section-kicker" id="faq-index-title">Encontrá tu pregunta</p>
          <nav aria-labelledby="faq-index-title">
            {faqGroups.map((group) => (
              <a key={group.id} href={`#${group.id}`}>{group.title}<ArrowDownIcon /></a>
            ))}
          </nav>
          <div className="faq-index-contact">
            <p>¿Tu consulta es sobre una obra concreta?</p>
            <a href="/agendar">Conversemos sobre tu proyecto<ArrowRight aria-hidden="true" size={16} /></a>
          </div>
        </aside>
        <div className="faq-page-groups">
          {faqGroups.map((group) => (
            <section className="faq-page-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}>
              <h2 id={`${group.id}-title`}>{group.title}</h2>
              <FaqList items={faqs.filter((faq) => faq.group === group.id)} openFirst={group.id !== 'preparar-la-obra'} />
            </section>
          ))}
        </div>
      </div>

      <section className="consultation faq-page-consultation" aria-labelledby="faq-consultation-title">
        <div>
          <p className="section-kicker section-kicker-light">Tu proyecto</p>
          <h2 id="faq-consultation-title">Hablemos de lo que querés construir.</h2>
        </div>
        <p>Cada obra tiene sus medidas, su terreno y sus necesidades. En la primera consulta revisamos tu caso y los próximos pasos.</p>
        <a className="button button-light" href="/agendar">Agendar una consulta<ArrowRight aria-hidden="true" size={19} /></a>
      </section>

      <footer className="faq-page-footer">
        <p>Gustavo Pinto Caetano · Maestro mayor de obras</p>
        <nav aria-label="Enlaces del pie">
          <a href="/">Inicio</a>
          <a href="/#obras">Proyectos</a>
          <a href="/contacto">Contacto</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp · {whatsappDisplay}</a>
        </nav>
      </footer>
    </main>
  );
}

function ArrowDownIcon() {
  return <ArrowRight className="faq-index-arrow" aria-hidden="true" size={16} />;
}
