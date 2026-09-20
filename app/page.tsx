'use client';

import { useRef, useState, type FormEvent } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BroomSparkles,
  Cable,
  Check,
  ChevronLeft,
  ChevronRight,
  AtSign,
  Mail,
  MapPin,
  Paintbrush,
  Ruler,
  Shapes,
  ShieldCheck,
  Thermometer,
  Wind,
  X,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import { ProfileVideo } from './components/ProfileVideo';
import { CassaformaVideoCover } from './components/CassaformaVideoCover';
import { HomeProjectShowcase } from './components/HomeProjectShowcase';
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
    image: '/volar-sin-escalas-recepcion-sin-personas.jpg',
    imageAlt: 'Recepción de los consultorios Volar Sin Escalas durante la etapa de terminaciones',
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

const comparisonCriteria = [
  'Rapidez',
  'Aislación termoacústica',
  'Economía',
  'Limpieza en obra',
  'Ahorro energético',
  'Resistencia a cargas',
  'Resistencia al viento',
  'Liviandad del sistema',
  'Resistencia y durabilidad',
] as const;

const constructionSystems = [
  { name: 'Tradicional', values: [false, false, false, false, false, true, true, false, true], featured: false },
  { name: 'Steel frame', values: [true, false, true, true, false, false, false, true, false], featured: false },
  { name: 'Panel SIP', values: [true, true, true, true, true, false, false, true, false], featured: false },
  { name: 'Modular (contenedores)', values: [true, false, false, true, false, true, true, true, true], featured: false },
  { name: 'Cassaforma', values: [true, true, true, true, true, true, true, true, true], featured: true },
] as const;

type Faq = {
  question: string;
  answer: string;
  cta?: {
    href: string;
    label: string;
  };
};

const faqs: Faq[] = [
  {
    question: '¿Qué tipos de obras realiza GMP Obras?',
    answer: 'Viviendas, ampliaciones, consultorios y locales comerciales. Cada consulta se evalúa según su alcance, ubicación y estado actual.',
  },
  {
    question: '¿En qué zonas trabaja?',
    answer: 'Comodoro Rivadavia y Rada Tilly.',
  },
  {
    question: '¿Qué es el sistema Cassaforma?',
    answer: 'Es un sistema de paneles modulares con núcleo aislante y mallas de acero que se completan con hormigón proyectado. Su combinación aporta rapidez de ejecución, aislación, resistencia, limpieza en obra y un uso eficiente de los materiales frente a otros métodos constructivos.',
  },
  {
    question: '¿Puedo consultar si todavía no tengo el proyecto definido?',
    answer: 'Sí. De hecho, recomendamos hacer la consulta antes de definir el proyecto. La primera reunión es gratuita y sirve para analizar qué querés construir, conocer el terreno y ordenar los próximos pasos con criterio técnico.',
    cta: {
      href: '/agendar',
      label: 'Agendar una consulta gratuita',
    },
  },
  {
    question: '¿Cuánto demora una obra?',
    answer: 'El plazo depende del tipo de obra, la superficie, el proyecto y las condiciones del terreno. Antes de darte una fecha, revisamos esa información y armamos un plazo de trabajo realista para tu caso.',
  },
  {
    question: '¿Se puede construir en cualquier terreno?',
    answer: 'Sí, siempre que las condiciones del terreno lo permitan. Para tu tranquilidad, antes de proyectar la obra realizamos un estudio de suelo que permite definir la solución adecuada y prevenir inconvenientes durante la construcción.',
  },
  {
    question: '¿Entregan con los planos municipales aprobados?',
    answer: 'Sí. Una de las ventajas de trabajar con GMP Obras es el acompañamiento para que la obra cumpla con la normativa local y quede en regla. No iniciamos la construcción sin la aprobación del municipio correspondiente. En obras llave en mano, al finalizar se presenta el conforme de obra y se actualizan las modificaciones realizadas, si las hubiera.',
  },
];

export default function Home() {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const benefitTrackRef = useRef<HTMLDivElement>(null);

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
            <Image src="/logo-gmp-web.png" alt="" width={190} height={58} />
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#obras">Proyectos</a>
          <a href="#sistema">Sistema</a>
          <a href="#preguntas-frecuentes">Preguntas</a>
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
          src="/hero-gustavo-obra-segura-v2.png"
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
            Tu obra,
            <span>en manos</span>
            de un profesional
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
            <h2>Obras que se pueden ver, entender y consultar.</h2>
          </div>
          <a href="/agendar">
            Agendar cita
            <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>

        <HomeProjectShowcase projects={homeProjects} />
      </section>

      <section className="system-section" id="sistema" aria-labelledby="system-title">
        <div className="system-section-heading">
          <p className="section-kicker section-kicker-light">Sistema Cassaforma</p>
          <div>
            <h2 id="system-title">Dos miradas para entender cómo funciona.</h2>
            <p className="system-section-heading-copy">
              Gustavo lo explica desde la experiencia de GMP Obras. Marcelo Seia amplía la mirada
              técnica sobre un sistema que combina paneles, acero y hormigón.
            </p>
          </div>
        </div>

        <div className="system-video-feature-list">
          <article className="system-video-feature">
            <div className="system-visual">
              <CassaformaVideoCover
                variant="gustavo"
                videoSrc="/gustavo-sistema-cassaforma.mp4"
                posterSrc="/cassaforma-video-cover-gustavo-relajado.jpg"
              />
            </div>
            <div className="system-video-feature-copy">
              <p className="section-kicker section-kicker-light">La opinión de Gustavo</p>
              <h3>Cómo se aplica Cassaforma en una obra.</h3>
              <p>
                Gustavo Pinto Caetano presenta el sistema con una explicación directa: qué elementos lo
                componen, cómo trabajan juntos y por qué GMP Obras lo utiliza en sus proyectos.
              </p>
            </div>
          </article>

          <article className="system-video-feature">
            <div className="system-visual">
              <CassaformaVideoCover variant="marcelo" />
            </div>
            <div className="system-video-feature-copy">
              <p className="section-kicker section-kicker-light">La mirada de un especialista</p>
              <h3>Una explicación técnica, con ejemplos concretos.</h3>
              <p>
                El arquitecto Marcelo Seia profundiza en las características del sistema, sus
                posibilidades y los aspectos que conviene evaluar antes de incorporarlo a un proyecto.
              </p>
              <a href="https://www.youtube.com/@arquitectomarceloseia8716" target="_blank" rel="noreferrer">
                Conocer al arquitecto Marcelo Seia
                <ArrowUpRight aria-hidden="true" size={17} />
              </a>
            </div>
          </article>
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
                <div className="benefit-card-head">
                  <div className="benefit-icon"><Icon aria-hidden="true" size={26} strokeWidth={1.7} /></div>
                  <div className="benefit-card-title">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{benefit.title}</h3>
                  </div>
                </div>
                <p>{benefit.description}</p>
              </article>
            );
          })}
        </div>
        <div className="system-benefits-cta">
          <p>¿Querés saber si este sistema sirve para tu proyecto?</p>
          <a href="/agendar">Agendar cita <ArrowRight aria-hidden="true" size={18} /></a>
        </div>

        <section className="system-comparison" aria-labelledby="comparison-title">
          <div className="system-comparison-heading">
            <p className="section-kicker section-kicker-light">Comparación orientativa</p>
            <h3 id="comparison-title">Cómo se posicionan los principales sistemas constructivos.</h3>
            <p>Una lectura rápida de propiedades habituales para ordenar la consulta técnica.</p>
          </div>
          <div className="comparison-table-wrap" tabIndex={0} aria-label="Tabla comparativa de sistemas constructivos">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Sistema</th>
                  {comparisonCriteria.map((criterion) => <th scope="col" key={criterion}>{criterion}</th>)}
                </tr>
              </thead>
              <tbody>
                {constructionSystems.map((system) => (
                  <tr className={system.featured ? 'is-featured' : undefined} key={system.name}>
                    <th scope="row">{system.name}</th>
                    {system.values.map((meetsCriterion, index) => (
                      <td key={comparisonCriteria[index]}>
                        <span className={meetsCriterion ? 'comparison-yes' : 'comparison-no'} aria-label={meetsCriterion ? 'Cumple' : 'No cumple'}>
                          {meetsCriterion ? <Check aria-hidden="true" size={22} strokeWidth={3} /> : <X aria-hidden="true" size={22} strokeWidth={3} />}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="comparison-note">Comparación visual orientativa provista por GMP Obras. El desempeño final depende del proyecto, el cálculo estructural, el terreno, los materiales y la ejecución.</p>
        </section>
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
              <div className="faq-answer">
                <p>{faq.answer}</p>
                {faq.cta && <a href={faq.cta.href}>{faq.cta.label}<ArrowRight aria-hidden="true" size={16} /></a>}
              </div>
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
            <span className="official-logo" aria-hidden="true">
              <Image src="/logo-gmp-web.png" alt="" width={190} height={58} />
            </span>
          </a>
          <p>Gustavo Pinto Caetano · Maestro mayor de obras</p>
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
