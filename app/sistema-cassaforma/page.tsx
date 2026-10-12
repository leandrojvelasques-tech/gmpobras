import type { Metadata } from 'next';
import Image from 'next/image';
import './landing.css';
import { CassaformaVideoCover } from '../components/CassaformaVideoCover';
import { SystemBenefits } from '../components/SystemBenefits';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleAlert,
  Layers3,
  Lightbulb,
  Timer,
  House,
  Leaf,
  Ruler,
  ShieldCheck,
  X,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sistema constructivo Cassaforma: cómo funciona | GMP Obras',
  description:
    'Conocé el sistema Cassaforma: videos explicativos, beneficios, comparativa y construcción sustentable con GMP Obras.',
  alternates: { canonical: 'https://www.gmpobras.com.ar/sistema-cassaforma' },
  openGraph: {
    title: 'Sistema Cassaforma | GMP Obras',
    description: 'Videos, beneficios, comparativa y proceso de construcción con Cassaforma.',
    url: 'https://www.gmpobras.com.ar/sistema-cassaforma',
  },
};

const comparisonColumns = [
  { key: 'time', label: 'Rapidez' },
  { key: 'insulation', label: 'Aislación termoacústica' },
  { key: 'economical', label: 'Economía' },
  { key: 'clean', label: 'Limpieza en obra' },
  { key: 'energy', label: 'Ahorro energético' },
  { key: 'loads', label: 'Resistencia a cargas' },
  { key: 'wind', label: 'Resistencia al viento' },
  { key: 'foundations', label: 'Liviandad del sistema' },
  { key: 'durability', label: 'Resistencia y durabilidad' },
] as const;

type ComparisonKey = (typeof comparisonColumns)[number]['key'];

const comparisonRows: Array<{
  name: string;
  note?: string;
  results: Record<ComparisonKey, boolean>;
}> = [
  {
    name: 'Tradicional',
    results: {
      time: false,
      insulation: false,
      economical: false,
      clean: false,
      energy: false,
      loads: true,
      wind: true,
      foundations: false,
      durability: true,
    },
  },
  {
    name: 'Steel Frame',
    results: {
      time: true,
      insulation: false,
      economical: true,
      clean: true,
      energy: false,
      loads: false,
      wind: false,
      foundations: true,
      durability: false,
    },
  },
  {
    name: 'Panel SIP',
    results: {
      time: true,
      insulation: true,
      economical: true,
      clean: true,
      energy: true,
      loads: false,
      wind: false,
      foundations: true,
      durability: false,
    },
  },
  {
    name: 'Modular',
    note: 'Contenedores',
    results: {
      time: true,
      insulation: false,
      economical: false,
      clean: true,
      energy: false,
      loads: true,
      wind: true,
      foundations: true,
      durability: true,
    },
  },
  {
    name: 'Cassaforma',
    note: 'GMP Obras',
    results: {
      time: true,
      insulation: true,
      economical: true,
      clean: true,
      energy: true,
      loads: true,
      wind: true,
      foundations: true,
      durability: true,
    },
  },
];

export default function CassaformaSystemPage() {
  return (
    <main className="system-landing">
      <header className="system-landing-header">
        <a className="brand" href="/#inicio" aria-label="GMP Obras, volver al inicio">
          <span className="official-logo" aria-hidden="true">
            <Image src="/logo-gmp-obras-horizontal.png" alt="" width={1258} height={343} unoptimized />
          </span>
        </a>
        <nav aria-label="Navegación de la landing del sistema">
          <a href="/#sistema">
            <ArrowLeft aria-hidden="true" size={16} />
            Volver al inicio
          </a>
          <a className="system-landing-header-cta" href="/agendar">
            Consultar
            <ArrowRight aria-hidden="true" size={16} />
          </a>
        </nav>
      </header>

      <nav className="system-landing-jump-nav" aria-label="Secciones del sistema Cassaforma">
        <a href="#que-es">Qué es Cassaforma</a>
        <a href="#beneficios">Beneficios</a>
        <a href="#video">Videos explicativos</a>
        <a href="#comparativa">Comparativa</a>
        <a href="#sustentabilidad">Construcción sustentable</a>
      </nav>

      <section className="system-landing-hero" aria-labelledby="system-landing-title">
        <div className="system-landing-hero-copy">
          <p className="eyebrow">Sistema constructivo · GMP Obras</p>
          <h1 id="system-landing-title">
            Sistema constructivo Cassaforma
          </h1>
          <p>
            Conocé el sistema que utiliza GMP Obras: paneles con núcleo de EPS, mallas de
            acero y hormigón proyectado para construir tu proyecto.
          </p>
          <div className="system-landing-actions">
            <a className="button button-primary" href="/agendar">
              Consultar por mi obra
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a className="button button-secondary" href="#comparativa">
              Ver comparativa
              <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
        </div>
        <div className="system-landing-hero-media">
          <Image
            src="/modelos/sagitario-casa.webp"
            alt="Visualización exterior del modelo Sagitario: vivienda de dos plantas con grandes aberturas y detalles de madera"
            fill
            priority
            sizes="(max-width: 780px) 100vw, 43vw"
          />
          <div className="system-landing-hero-label">
            <span>Modelo Sagitario</span>
            <strong>Visualización exterior</strong>
          </div>
        </div>
      </section>

      <section className="system-landing-intro" id="que-es" aria-labelledby="system-intro-title">
        <div className="system-landing-section-heading">
          <p className="section-kicker">El sistema</p>
          <h2 id="system-intro-title">Qué es Cassaforma</h2>
        </div>
        <div className="system-landing-intro-copy">
          <p>
            Cassaforma se presenta como un sistema constructivo integral basado en paneles con
            núcleo de poliestireno expandido (EPS), mallas de acero y hormigón proyectado. El
            conjunto puede resolver estructura y cerramientos, según el proyecto y su cálculo.
          </p>
          <p>
            Para GMP Obras, el sistema se trabaja desde la definición del proyecto y se ejecuta
            por etapas: primero se organizan los paneles y sus encuentros, luego las instalaciones
            y finalmente el hormigón y las terminaciones.
          </p>
        </div>
      </section>

      <section className="system-landing-figures" id="beneficios" aria-labelledby="system-figures-title">
        <div className="system-landing-section-heading">
          <p className="section-kicker">Beneficios del sistema</p>
          <h2 id="system-figures-title">Construir con Cassaforma</h2>
        </div>
        <div className="system-landing-figures-grid">
          <article>
            <span className="system-landing-figure-icon"><Lightbulb aria-hidden="true" size={36} strokeWidth={1.5} /></span>
            <strong>70%</strong>
            <h3>Ahorro energético</h3>
          </article>
          <article>
            <span className="system-landing-figure-icon"><Timer aria-hidden="true" size={36} strokeWidth={1.5} /></span>
            <strong>50%</strong>
            <h3>Ahorro de tiempo</h3>
          </article>
          <article>
            <span className="system-landing-figure-icon"><House aria-hidden="true" size={36} strokeWidth={1.5} /></span>
            <strong>25%</strong>
            <h3>Ahorro de obra gris</h3>
          </article>
        </div>
        <p className="system-landing-figures-source">
          Valores de referencia publicados por <a href="https://cassaforma.com/sistema-constructivo" target="_blank" rel="noreferrer">Cassaforma</a>.
          Los resultados dependen del proyecto y de las condiciones de cada obra.
        </p>
      </section>

      <SystemBenefits />

      <section className="system-section system-landing-specialist" id="video" aria-label="Explicaciones de Gustavo y Marcelo sobre Cassaforma">
        <div className="system-video-feature-list">
          <article className="system-video-feature">
            <div className="system-visual">
              <CassaformaVideoCover
                variant="gustavo"
                videoSrc="/gustavo-sistema-cassaforma.mp4"
                posterSrc="/gustavo-pinto-explica-cassaforma.jpg"
              />
            </div>
            <div className="system-video-feature-copy">
              <p className="section-kicker section-kicker-light">La explicación de Gustavo</p>
              <h2>Cómo se aplica Cassaforma en una obra</h2>
              <p>
                El Maestro Mayor de Obras Gustavo Pinto explica qué elementos componen el sistema, cómo trabajan
                juntos y por qué GMP Obras lo utiliza en sus proyectos.
              </p>
            </div>
          </article>
          <article className="system-video-feature">
            <div className="system-visual">
              <CassaformaVideoCover variant="marcelo" />
            </div>
            <div className="system-video-feature-copy">
              <p className="section-kicker section-kicker-light">La mirada de un especialista</p>
              <h2>Características técnicas de Cassaforma</h2>
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
      </section>

      <section className="system-landing-comparison" id="comparativa" aria-labelledby="comparison-title">
        <div className="system-landing-comparison-heading">
          <div>
            <p className="section-kicker section-kicker-light">Comparación orientativa</p>
            <h2 id="comparison-title">Comparativa de sistemas constructivos.</h2>
          </div>
          <p className="system-landing-comparison-index">GMP / 01</p>
        </div>
        <p className="system-landing-comparison-lead">
          Este cuadro es una comparación visual entre sistemas, basada en la experiencia
          del Maestro Mayor de Obras Gustavo Pinto.
        </p>
        <div className="system-landing-table-wrap" tabIndex={0} role="region" aria-label="Tabla comparativa de sistemas constructivos">
          <table className="system-landing-table">
            <caption>Comparación visual de sistemas y propiedades según la evaluación de GMP Obras</caption>
            <thead>
              <tr>
                <th scope="col">Sistema de construcción</th>
                {comparisonColumns.map((column) => (
                  <th scope="col" key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr className={row.name === 'Cassaforma' ? 'is-highlighted' : ''} key={row.name}>
                  <th scope="row">
                    {row.name}
                    {row.note && <small>{row.note}</small>}
                  </th>
                  {comparisonColumns.map((column) => {
                    const passes = row.results[column.key];
                    return (
                      <td key={column.key}>
                        <span className={`comparison-status ${passes ? 'is-pass' : 'is-fail'}`}>
                          {passes ? (
                            <Check aria-hidden="true" size={25} strokeWidth={3} />
                          ) : (
                            <X aria-hidden="true" size={25} strokeWidth={3} />
                          )}
                          <span className="sr-only">{passes ? 'Cumple' : 'No cumple'}</span>
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="system-landing-comparison-note">
          <CircleAlert aria-hidden="true" size={18} />
          <p>Es una valoración propia de GMP Obras, no un estudio científico.</p>
        </div>
      </section>

      <section className="system-landing-sustainability" id="sustentabilidad" aria-labelledby="sustainability-title">
        <div className="system-landing-section-heading">
          <p className="section-kicker">Aislación térmica</p>
          <h2 id="sustainability-title">Construcción sustentable</h2>
          <span className="system-landing-sustainability-icon" aria-hidden="true"><Leaf size={72} strokeWidth={1.2} /></span>
        </div>
        <div className="system-landing-sustainability-copy">
          <p>
            Los paneles Cassaforma aportan aislación térmica en espesores reducidos.
            Ese desempeño ayuda a disminuir la energía necesaria para climatizar los
            ambientes, tanto en verano como en invierno.
          </p>
          <p>
            La eficiencia de una vivienda también depende de su diseño, las aberturas,
            la orientación y la ejecución. El sistema se integra a esas decisiones
            desde el proyecto.
          </p>
          <a className="system-landing-inline-link" href="https://cassaforma.com/sistema-constructivo" target="_blank" rel="noreferrer">
            Consultar la información oficial de Cassaforma
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>
        </div>
      </section>

      <section className="system-landing-boundaries" aria-labelledby="boundaries-title">
        <div className="system-landing-boundaries-heading">
          <p className="section-kicker section-kicker-light">Qué conviene validar</p>
          <h2 id="boundaries-title">Qué evaluar antes de construir con Cassaforma</h2>
        </div>
        <div className="system-landing-boundaries-content">
          <p>
            La información técnica orienta, pero no define por sí sola si un sistema es adecuado
            para una obra. En la consulta hay que revisar, como mínimo:
          </p>
          <ul>
            <li><ShieldCheck aria-hidden="true" size={18} /> proyecto y cálculo de la solución</li>
            <li><Ruler aria-hidden="true" size={18} /> medidas, encuentros y etapa de obra</li>
            <li><Layers3 aria-hidden="true" size={18} /> instalaciones y terminaciones previstas</li>
            <li><CircleAlert aria-hidden="true" size={18} /> disponibilidad de los materiales</li>
          </ul>
        </div>
      </section>

      <section className="system-landing-cta" aria-labelledby="system-cta-title">
        <div>
          <p className="section-kicker section-kicker-light">¿Tenés un proyecto?</p>
          <h2 id="system-cta-title">Consultá por tu proyecto con Cassaforma</h2>
        </div>
        <a className="button button-light" href="/agendar">
          Agendar una consulta
          <ArrowRight aria-hidden="true" size={18} />
        </a>
      </section>

      <footer className="system-landing-footer">
        <a className="brand" href="/#inicio" aria-label="GMP Obras, inicio">
          <span className="official-logo footer-logo" aria-hidden="true">
            <Image src="/logo-gmp-obras-vertical.png" alt="" width={1834} height={1503} unoptimized />
          </span>
        </a>
        <p>MMO Gustavo Pinto · Comodoro Rivadavia</p>
        <div>
          <a href="https://cassaforma.com/sistema-constructivo" target="_blank" rel="noreferrer">Fuente técnica consultada: Cassaforma</a>
          <a href="/#contacto">Contacto GMP Obras</a>
        </div>
      </footer>
    </main>
  );
}
