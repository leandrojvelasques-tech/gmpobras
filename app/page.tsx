'use client';

import { useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BroomSparkles,
  Cable,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Paintbrush,
  Ruler,
  Shapes,
  ShieldCheck,
  Thermometer,
  Wind,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ProfileVideo } from './components/ProfileVideo';
import { VideoTestimonial } from './components/VideoTestimonial';
import { CassaformaVideoCover } from './components/CassaformaVideoCover';
import { projects } from './data/projects';

const homeProjects = [...projects].sort(
  (projectA, projectB) => Number(projectB.slug === 'game-over') - Number(projectA.slug === 'game-over'),
);
const testimonialProjects = projects.filter((project) => project.testimonial);

const services = [
  {
    title: 'Viviendas',
    description: 'Proyectos pensados para vivirlos, con criterio técnico desde el inicio.',
    image: '/javier-629.jpeg',
    imageAlt: 'Vivienda completa construida por GMP Obras en Rada Tilly',
  },
  {
    title: 'Ampliaciones',
    description: 'Más espacio para tu casa o negocio, integrado a lo que ya existe.',
    image: '/cristian-421.jpg',
    imageAlt: 'Vivienda particular construida por GMP Obras',
  },
  {
    title: 'Consultorios',
    description: 'Ambientes funcionales para atender, trabajar y recibir a tus pacientes.',
    image: '/volar-sin-escalas-interior-consultorio.jpg',
    imageAlt: 'Interior de un consultorio de Volar Sin Escalas durante su construcción',
  },
  {
    title: 'Locales comerciales',
    description: 'Obras que acompañan la operación y la identidad de cada comercio.',
    image: '/game-over-fachada.png',
    imageAlt: 'Fachada temática del local comercial Bar Game Over',
  },
];

const systemBenefits = [
  {
    title: 'Velocidad de ejecución',
    description: 'El montaje de paneles permite organizar el avance de la obra por etapas.',
    icon: Zap,
  },
  {
    title: 'Aislamiento térmico',
    description: 'El núcleo de EPS aporta aislamiento dentro de la solución constructiva.',
    icon: Thermometer,
  },
  {
    title: 'Versatilidad',
    description: 'Se adapta a viviendas, ampliaciones, consultorios y locales comerciales.',
    icon: Shapes,
  },
  {
    title: 'Paneles a medida',
    description: 'Las piezas se definen de acuerdo con las necesidades y medidas del proyecto.',
    icon: Ruler,
  },
  {
    title: 'Obra más limpia',
    description: 'El montaje ordenado ayuda a reducir desperdicios y tareas innecesarias en obra.',
    icon: BroomSparkles,
  },
  {
    title: 'Variedad de terminaciones',
    description: 'Admite diferentes acabados interiores y exteriores según el diseño buscado.',
    icon: Paintbrush,
  },
  {
    title: 'Instalaciones integradas',
    description: 'Las instalaciones se prevén dentro del sistema antes del hormigón proyectado.',
    icon: Cable,
  },
  {
    title: 'Resistencia estructural',
    description: 'Paneles, mallas y hormigón trabajan como una solución estructural continua.',
    icon: ShieldCheck,
  },
  {
    title: 'Resistencia ante vientos fuertes',
    description: 'La estructura se define y calcula según el proyecto y las condiciones del lugar.',
    icon: Wind,
  },
];

const faqs = [
  {
    question: '¿Qué tipos de obras realiza GMP Obras?',
    answer: 'Viviendas, ampliaciones, consultorios y locales comerciales. Cada consulta se evalúa según su alcance, ubicación y estado actual.',
  },
  {
    question: '¿En qué zonas trabaja?',
    answer: 'La propuesta actual está orientada a proyectos en Comodoro Rivadavia y Rada Tilly. La ubicación se confirma durante la consulta inicial.',
  },
  {
    question: '¿Qué es el sistema Cassaforma?',
    answer: 'Es un sistema de paneles modulares con núcleo aislante y mallas de acero. En obra, los paneles se montan, reciben las instalaciones previstas y se completan con hormigón proyectado.',
  },
  {
    question: '¿Puedo consultar si todavía no tengo el proyecto definido?',
    answer: 'Sí. La primera conversación sirve para entender qué querés construir, dónde y en qué etapa estás antes de definir los próximos pasos.',
  },
  {
    question: '¿Cuánto demora una obra?',
    answer: 'Depende del tipo de obra, su superficie, el proyecto y las condiciones del lugar. El plazo se analiza para cada caso; no se fija sin revisar esa información.',
  },
];

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeBenefit, setActiveBenefit] = useState(0);
  const benefitTrackRef = useRef<HTMLDivElement>(null);
  const project = homeProjects[activeProject];
  const currentImage = project.images[activeImage % project.images.length];
  const testimonialProject = testimonialProjects[activeTestimonial];
  const testimonialFacts = testimonialProject?.details
    ? [
        { label: 'Tipo de obra', value: testimonialProject.details.workType },
        { label: 'Superficie', value: testimonialProject.details.area },
        { label: 'Escala', value: testimonialProject.details.floors },
        { label: 'Modalidad', value: testimonialProject.details.delivery },
      ]
    : [];

  function selectProject(index: number) {
    setActiveProject(index);
    setActiveImage(0);
  }

  function moveImage(direction: number) {
    setActiveImage((activeImage + direction + project.images.length) % project.images.length);
  }

  function moveTestimonial(direction: number) {
    setActiveTestimonial(
      (activeTestimonial + direction + testimonialProjects.length) % testimonialProjects.length,
    );
  }

  function moveBenefitCarousel(direction: number) {
    const track = benefitTrackRef.current;
    if (!track) return;

    const visibleCards = window.matchMedia('(max-width: 640px)').matches ? 1 : 3;
    const lastStart = Math.max(0, systemBenefits.length - visibleCards);
    let nextIndex = activeBenefit + direction * visibleCards;

    if (nextIndex > lastStart) nextIndex = 0;
    if (nextIndex < 0) nextIndex = lastStart;

    const firstCard = track.firstElementChild as HTMLElement | null;
    if (!firstCard) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || '0');

    setActiveBenefit(nextIndex);
    track.scrollTo({ left: nextIndex * (firstCard.offsetWidth + gap), behavior: 'smooth' });
  }

  function syncBenefitIndex() {
    const track = benefitTrackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap || '0');
    const index = Math.round(track.scrollLeft / (firstCard.offsetWidth + gap));
    setActiveBenefit(Math.min(systemBenefits.length - 1, Math.max(0, index)));
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="GMP Obras, inicio">
          <span className="official-logo" aria-hidden="true">
            <Image src="/logo-gmp-web.png" alt="" width={190} height={58} />
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#obras">Proyectos</a>
          <a href="#sistema">Sistema</a>
          <a href="#preguntas-frecuentes">Preguntas</a>
          <Link href="/agendar">Consulta</Link>
        </nav>

        <Link className="header-cta" href="/agendar">
          Solicitar consulta
          <ArrowRight aria-hidden="true" size={17} strokeWidth={2.2} />
        </Link>
      </header>

      <section className="hero" id="inicio">
        <Image
          className="hero-image"
          src="/obra-paneles-hero.jpg"
          alt="Obra en ejecución con paneles Cassaforma y personas trabajando"
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
            Tu obra,
            <span>en manos</span>
            de un profesional.
          </h1>
          <p className="hero-copy">
            Diseñamos y ejecutamos viviendas, ampliaciones y proyectos con un
            sistema constructivo eficiente y seguimiento directo.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/agendar">
              Solicitar consulta
              <ArrowRight aria-hidden="true" size={19} />
            </Link>
            <a className="button button-secondary" href="#obras">
              Ver proyectos
              <ArrowDownRight aria-hidden="true" size={19} />
            </a>
          </div>
        </div>
      </section>

      <section className="intro" id="quien-esta-detras">
        <p className="section-kicker">Gustavo Pinto</p>

        <div className="intro-main">
          <div className="intro-profile">
            <ProfileVideo />
            <div className="profile-copy">
              <h2>Construimos con criterio técnico y presencia en cada etapa.</h2>
              <p>
                <strong>Gustavo Pinto, maestro mayor de obras,</strong> acompaña tu
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

      {testimonialProject?.testimonial && (
        <section className="home-testimonial" id="testimonios" aria-labelledby="testimonio-activo-title">
          <VideoTestimonial key={testimonialProject.slug} testimonial={testimonialProject.testimonial} compact />
          <div className="home-testimonial-copy">
            <div className="home-testimonial-heading">
              <p className="section-kicker">Testimonio de {testimonialProject.testimonial.person}</p>
              <div className="home-testimonial-controls" aria-label="Cambiar testimonio">
                <button type="button" onClick={() => moveTestimonial(-1)} aria-label="Ver testimonio anterior">
                  <ChevronLeft aria-hidden="true" size={22} />
                </button>
                <span aria-live="polite">
                  {String(activeTestimonial + 1).padStart(2, '0')} / {String(testimonialProjects.length).padStart(2, '0')}
                </span>
                <button type="button" onClick={() => moveTestimonial(1)} aria-label="Ver testimonio siguiente">
                  <ChevronRight aria-hidden="true" size={22} />
                </button>
              </div>
            </div>
            <h2 id="testimonio-activo-title">{testimonialProject.testimonial.title}</h2>
            <p>{testimonialProject.testimonial.description}</p>
            <dl className="home-testimonial-facts" aria-label={`Ficha de la obra ${testimonialProject.title}`}>
              {testimonialFacts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <a className="button button-primary" href={`/proyectos/${testimonialProject.slug}`}>
              Conocer el proyecto
              <ArrowRight aria-hidden="true" size={19} />
            </a>
          </div>
        </section>
      )}

      <section className="works" id="obras">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Proyectos reales</p>
            <h2>Obras que se pueden ver, entender y consultar.</h2>
          </div>
          <Link href="/agendar">
            Conversemos sobre tu proyecto
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>

        <section className="project-carousel" aria-label="Carrusel de proyectos reales">
          <div className="project-gallery">
            <Image
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="(max-width: 760px) 100vw, 62vw"
            />
            <div className="gallery-shade" />
            <div className="gallery-topline">
              <span className={`status-badge ${project.status === 'Proyecto en curso' ? 'is-current' : 'is-finished'}`}>
                {project.status}
              </span>
              <span>{String(activeImage + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}</span>
            </div>
            <div className="gallery-controls">
              <button type="button" onClick={() => moveImage(-1)} aria-label="Foto anterior del proyecto">
                <ChevronLeft aria-hidden="true" size={20} />
              </button>
              <button type="button" onClick={() => moveImage(1)} aria-label="Foto siguiente del proyecto">
                <ChevronRight aria-hidden="true" size={20} />
              </button>
            </div>
          </div>

          <div className="project-info">
            <p className="project-index">{String(activeProject + 1).padStart(2, '0')} / {String(homeProjects.length).padStart(2, '0')}</p>
            <h3>{project.title}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
            <p className="project-description">{project.description}</p>
            {project.provisional && <p className="project-note">Galería provisional: faltan las fotos oficiales de este proyecto.</p>}

            <div className="project-selector">
              {homeProjects.map((item, index) => (
                <div className={`project-selector-row ${index === activeProject ? 'is-active' : ''}`} key={item.slug}>
                  <button
                    type="button"
                    onClick={() => selectProject(index)}
                    aria-label={`Seleccionar proyecto ${item.title}`}
                    aria-pressed={index === activeProject}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span>{item.title}</span>
                  </button>
                  {index === activeProject && (
                    <a className="project-selector-link" href={`/proyectos/${item.slug}`} aria-label={`Ver proyecto ${item.title}`}>
                      Ver proyecto
                      <ArrowRight aria-hidden="true" size={17} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      <section className="system-section" id="sistema" aria-labelledby="system-title">
        <div className="system-content">
          <div className="system-media">
            <div className="system-visual">
              <CassaformaVideoCover />
            </div>
            <p>
              <strong>Miralo en obra.</strong> El video recorre el sistema, sus componentes y
              los puntos que conviene evaluar antes de elegir cómo construir.
            </p>
          </div>

          <div className="system-copy">
            <p className="section-kicker section-kicker-light">Sistema Cassaforma</p>
            <h2 id="system-title">Paneles, acero y hormigón que trabajan como un conjunto.</h2>
            <p className="system-lead">
              GMP Obras utiliza el sistema Cassaforma para resolver estructura y cerramientos
              desde el proyecto, con una ejecución organizada por etapas.
            </p>
            <a href="https://cassaforma.com/sistema-constructivo" target="_blank" rel="noreferrer">
              Ver información técnica del sistema
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </div>
        </div>

        <div className="system-benefits-heading">
          <div>
            <p className="section-kicker section-kicker-light">Beneficios del sistema</p>
            <h3>Ventajas que se traducen en una obra mejor organizada.</h3>
          </div>
          <div className="benefit-carousel-meta">
            <span aria-live="polite">{String(activeBenefit + 1).padStart(2, '0')} / {String(systemBenefits.length).padStart(2, '0')}</span>
            <div className="benefit-carousel-controls">
              <button type="button" onClick={() => moveBenefitCarousel(-1)} aria-label="Ver beneficios anteriores"><ChevronLeft aria-hidden="true" size={21} /></button>
              <button type="button" onClick={() => moveBenefitCarousel(1)} aria-label="Ver beneficios siguientes"><ChevronRight aria-hidden="true" size={21} /></button>
            </div>
          </div>
        </div>
        <div ref={benefitTrackRef} className="benefits-track" onScroll={syncBenefitIndex} aria-label="Beneficios del sistema Cassaforma">
          {systemBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <article key={benefit.title}>
                <div className="benefit-icon"><Icon aria-hidden="true" size={28} strokeWidth={1.7} /></div>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            );
          })}
        </div>
        <div className="system-benefits-cta">
          <p>¿Querés saber si este sistema sirve para tu proyecto?</p>
          <Link href="/agendar">Solicitar una consulta <ArrowRight aria-hidden="true" size={18} /></Link>
        </div>
      </section>

      <section className="faq-section" id="preguntas-frecuentes" aria-labelledby="faq-title">
        <div className="faq-heading">
          <p className="section-kicker">Preguntas frecuentes</p>
          <h2 id="faq-title">Lo que conviene saber antes de consultar.</h2>
          <p>Respuestas iniciales para ordenar la decisión. Los detalles técnicos y el alcance se revisan para cada obra.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>
                <span>{faq.question}</span>
                <span aria-hidden="true">+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
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
        <Link className="button button-light" href="/agendar">
          Solicitar consulta
          <ArrowRight aria-hidden="true" size={19} />
        </Link>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <a className="brand brand-footer" href="#inicio" aria-label="GMP Obras, inicio">
            <span className="official-logo" aria-hidden="true">
              <Image src="/logo-gmp-web.png" alt="" width={190} height={58} />
            </span>
          </a>
          <p>Gustavo Pinto · Maestro mayor de obras</p>
          <p className="footer-registration">Mat. Mun. 159 · Mat. P. 1206 · Cat. 2°</p>
        </div>
        <div className="footer-details">
          <a href="https://www.gmp-obras.com/" target="_blank" rel="noreferrer">www.gmp-obras.com</a>
          <a href="mailto:gpinto@gmpobras.com">gpinto@gmpobras.com</a>
          <span>Ramos Mejía 298 · Comodoro Rivadavia</span>
          <a href="https://www.instagram.com/gmpobras/" target="_blank" rel="noreferrer">Instagram · @gmpobras</a>
        </div>
      </footer>
    </main>
  );
}
