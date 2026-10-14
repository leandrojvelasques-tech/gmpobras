import { HeaderLogo } from './components/HeaderLogo';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import { SiteFooter } from './components/SiteFooter';
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


  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="GMP Obras, inicio">
          <HeaderLogo />
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="/proyectos">Proyectos</a>
          <a href="#modelos">Modelos</a>
          <a href="/sistema-cassaforma">Sistema</a>
          <a href="/preguntas-frecuentes">Preguntas frecuentes</a>
          <a href="/contacto">Contacto</a>
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
          <a href="/proyectos">
            Ver todos los proyectos
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
          <h2>Conversemos sobre tu proyecto.</h2>
        </div>
        <p>
          Elegí un día y un horario para contarme tu idea. Los detalles del proyecto
          podés sumarlos después.
        </p>
        <a className="button button-light" href="/agendar">
          Agendar cita
          <ArrowRight aria-hidden="true" size={19} />
        </a>
      </section>



      <SiteFooter />
    </main>
  );
}
