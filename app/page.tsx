'use client';

import { type FormEvent } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Mail,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import { ProfileVideo } from './components/ProfileVideo';
import { CassaformaVideoCover } from './components/CassaformaVideoCover';
import { HomeProjectShowcase } from './components/HomeProjectShowcase';
import { HouseModels } from './components/HouseModels';
import { FaqList } from './components/FaqList';
import { homeFaqs } from './data/faqs';
import { projects } from './data/projects';

const featuredProjectOrder = ['volar-sin-escalas', 'vivienda-gabriel-ambrozy'];
const homeProjects = [...projects].sort((projectA, projectB) => {
  const projectAOrder = featuredProjectOrder.indexOf(projectA.slug);
  const projectBOrder = featuredProjectOrder.indexOf(projectB.slug);
  const normalizedAOrder = projectAOrder === -1 ? featuredProjectOrder.length : projectAOrder;
  const normalizedBOrder = projectBOrder === -1 ? featuredProjectOrder.length : projectBOrder;

  return normalizedAOrder - normalizedBOrder;
});
const services = [
  {
    title: 'Viviendas',
    description: 'Proyectos pensados para vivirlos, con criterio técnico desde el inicio.',
    image: '/vivienda-javier-aguila-fachada-rada-tilly.jpeg',
    imageAlt: 'Vivienda completa construida por GMP Obras en Rada Tilly',
  },
  {
    title: 'Ampliaciones',
    description: 'Más espacio para tu casa o negocio, integrado a lo que ya existe.',
    image: '/vivienda-cristian-fachada.jpg',
    imageAlt: 'Vivienda particular construida por GMP Obras',
  },
  {
    title: 'Consultorios',
    description: 'Ambientes funcionales para atender, trabajar y recibir a tus pacientes.',
    image: '/volar-sin-escalas-recepcion.jpg',
    imageAlt: 'Recepción de los consultorios Volar Sin Escalas durante la etapa de terminaciones',
  },
  {
    title: 'Locales comerciales',
    description: 'Obras que acompañan la operación y la identidad de cada comercio.',
    image: '/bar-game-over-fachada.png',
    imageAlt: 'Fachada temática del local comercial Bar Game Over',
  },
];

export default function Home() {
  function openContactEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get('nombre') || '');
    const lastName = String(formData.get('apellido') || '');
    const email = String(formData.get('email') || '');
    const message = String(formData.get('mensaje') || '');
    const subject = encodeURIComponent(`Consulta desde el sitio · ${firstName} ${lastName}`.trim());
    const body = encodeURIComponent(`Nombre: ${firstName} ${lastName}\nEmail: ${email}\n\nMensaje:\n${message}`);
    window.location.href = `mailto:gpinto@gmpobras.com?subject=${subject}&body=${body}`;
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="GMP Obras, inicio">
          <span className="official-logo" aria-hidden="true">
            <Image src="/logo-gmp-obras-horizontal-cuadrado-punteado.png" alt="" width={2580} height={888} unoptimized />
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#obras">Proyectos</a>
          <a href="#modelos">Modelos</a>
          <a href="#sistema">Sistema</a>
          <a href="/preguntas-frecuentes">Preguntas frecuentes</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <a className="header-cta" href="/agendar">
          Agendar cita
          <ArrowRight aria-hidden="true" size={17} strokeWidth={2.2} />
        </a>
      </header>

      <section className="hero" id="inicio">
        <Image
          className="hero-image"
          src="/gustavo-pinto-inspeccion-obra.png"
          alt="Gustavo Pinto Caetano dirige una inspección mientras el equipo trabaja con equipamiento de seguridad en una obra"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-overlay" />
        <div className="hero-grid" aria-hidden="true" />

        <div className="hero-content">
          <p className="eyebrow">
            <MapPin aria-hidden="true" size={15} />
            Comodoro Rivadavia · Rada Tilly
          </p>
          <h1>
            Construcción de viviendas y ampliaciones{' '}
            <span>en Comodoro Rivadavia y Rada Tilly</span>
          </h1>
          <p className="hero-copy">
            Diseñamos y ejecutamos viviendas, ampliaciones y proyectos con un
            sistema constructivo eficiente y seguimiento directo.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/agendar">
              Agendar cita
              <ArrowRight aria-hidden="true" size={19} />
            </a>
            <a className="button button-secondary" href="#obras">
              Ver proyectos
              <ArrowDownRight aria-hidden="true" size={19} />
            </a>
          </div>
        </div>
      </section>

      <section className="intro" id="quien-esta-detras">
        <p className="section-kicker">Gustavo Pinto Caetano</p>

        <div className="intro-main">
          <div className="intro-profile">
            <ProfileVideo />
            <div className="profile-copy">
              <h2>Construimos con criterio técnico y presencia en cada etapa.</h2>
              <p>
                <strong>Gustavo Pinto Caetano, maestro mayor de obras,</strong> acompaña tu
                proyecto desde la primera conversación. La propuesta se adapta a la
                necesidad, al terreno y al momento real de cada cliente.
              </p>
            </div>
          </div>

          <div className="service-cards" id="servicios">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-card-image">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 25vw"
                  />
                </div>
                <div className="service-card-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="works" id="obras">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Proyectos reales</p>
            <h2>Conocé algunas de nuestras obras.</h2>
          </div>
          <a href="/agendar">
            Agendar cita
            <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>

        <HomeProjectShowcase projects={homeProjects} />
      </section>

      <HouseModels />

      <section className="system-section system-home-preview" id="sistema" aria-labelledby="system-title">
        <div className="system-section-heading">
          <p className="section-kicker section-kicker-light">Sistema Cassaforma</p>
          <div>
            <h2 id="system-title">Cómo se aplica Cassaforma en una obra.</h2>
            <p className="system-section-heading-copy">
              Gustavo Pinto Caetano explica qué elementos componen el sistema, cómo trabajan
              juntos y por qué GMP Obras lo utiliza en sus proyectos.
            </p>
          </div>
        </div>
        <div className="system-visual system-home-video">
          <CassaformaVideoCover
            variant="gustavo"
            videoSrc="/gustavo-sistema-cassaforma.mp4"
            posterSrc="/gustavo-pinto-explica-cassaforma.jpg"
          />
        </div>
        <div className="system-home-actions">
          <a className="button button-light" href="/sistema-cassaforma">
            Ver más sobre el sistema Cassaforma <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>
      </section>

      <section className="faq-section" id="preguntas-frecuentes" aria-labelledby="faq-title">
        <div className="faq-heading">
          <p className="section-kicker">Preguntas frecuentes</p>
          <h2 id="faq-title">Lo que conviene saber antes de consultar.</h2>
          <p className="faq-intro">Una primera orientación sobre nuestras obras, los costos, las zonas donde trabajamos y el sistema Cassaforma.</p>
          <a className="button button-primary faq-all-link" href="/preguntas-frecuentes">
            Ver todas las preguntas frecuentes <ArrowRight aria-hidden="true" size={19} />
          </a>
        </div>
        <FaqList items={homeFaqs} openFirst />
      </section>

      <section className="consultation" id="consulta">
        <div>
          <p className="section-kicker section-kicker-light">Tu proyecto</p>
          <h2>Contanos qué querés construir.</h2>
        </div>
        <p>
          Completá el tipo de obra, la ubicación, el estado actual y el
          presupuesto estimado. Con esa información preparamos la primera conversación.
        </p>
        <a className="button button-light" href="/agendar">
          Agendar cita
          <ArrowRight aria-hidden="true" size={19} />
        </a>
      </section>

      <section className="contact-section" id="contacto" aria-labelledby="contact-title">
        <div className="contact-copy">
          <p className="section-kicker">Contacto</p>
          <h2 id="contact-title">Hablemos sobre tu proyecto.</h2>
          <p>
            Podés dejar un mensaje por este formulario o elegir un momento para conversar
            sobre la obra.
          </p>
          <div className="contact-direct" aria-label="Datos de contacto de GMP Obras">
            <a href="mailto:gpinto@gmpobras.com"><Mail aria-hidden="true" size={16} /> gpinto@gmpobras.com</a>
            <a href="https://www.google.com/maps/dir/?api=1&destination=Ramos+Mej%C3%ADa+298%2C+Comodoro+Rivadavia%2C+Chubut" target="_blank" rel="noreferrer">
              <MapPin aria-hidden="true" size={16} /> Ramos Mejía 298 · Comodoro Rivadavia
            </a>
            <a href="https://www.instagram.com/gmpobras/" target="_blank" rel="noreferrer">
              <AtSign aria-hidden="true" size={16} /> Instagram · @gmpobras
            </a>
          </div>
          <a className="button button-primary" href="/agendar">
            Agendar cita <ArrowRight aria-hidden="true" size={19} />
          </a>
        </div>

        <form className="contact-form" onSubmit={openContactEmail}>
          <div className="field-row">
            <label htmlFor="contact-nombre">Nombre<input id="contact-nombre" name="nombre" required autoComplete="given-name" /></label>
            <label htmlFor="contact-apellido">Apellido<input id="contact-apellido" name="apellido" required autoComplete="family-name" /></label>
          </div>
          <label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" required autoComplete="email" /></label>
          <label htmlFor="contact-mensaje">Dejanos tu mensaje<textarea id="contact-mensaje" name="mensaje" rows={6} required /></label>
          <button className="button button-primary" type="submit">Enviar mensaje <ArrowRight aria-hidden="true" size={19} /></button>
          <small>Al enviar, se abrirá tu aplicación de correo con el mensaje preparado.</small>
        </form>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <a className="brand brand-footer" href="#inicio" aria-label="GMP Obras, inicio">
            <span className="official-logo footer-logo" aria-hidden="true">
            <Image src="/logo-gmp-obras-vertical.png" alt="" width={1834} height={1503} unoptimized />
            </span>
          </a>
        </div>
        <div className="footer-details">
          <div className="footer-identity">
            <p>Gustavo Pinto Caetano · Maestro mayor de obras</p>
            <p className="footer-registration">Mat. Mun. 159 · Mat. P. 1206 · Cat. 2°</p>
          </div>
          <a href="https://www.gmpobras.com.ar/" target="_blank" rel="noreferrer">www.gmpobras.com.ar</a>
          <a href="mailto:gpinto@gmpobras.com">gpinto@gmpobras.com</a>
          <span>Ramos Mejía 298 · Comodoro Rivadavia</span>
          <a href="https://www.instagram.com/gmpobras/" target="_blank" rel="noreferrer">Instagram · @gmpobras</a>
          <a href="/preguntas-frecuentes">Preguntas frecuentes</a>
        </div>
      </footer>
    </main>
  );
}
