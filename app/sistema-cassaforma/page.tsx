import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleAlert,
  Layers3,
  Ruler,
  ShieldCheck,
  X,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sistema Cassaforma | GMP Obras',
  description:
    'Cómo funciona el sistema Cassaforma, qué componentes lo integran y qué conviene revisar antes de elegirlo para una obra.',
};

const comparisonColumns = [
  { key: 'time', label: 'Tiempo de ejecución rápida' },
  { key: 'insulation', label: 'Aislación termoacústica' },
  { key: 'economical', label: 'Económica' },
  { key: 'clean', label: 'Obra limpia' },
  { key: 'energy', label: 'Ahorro energético' },
  { key: 'loads', label: 'Resistente a cargas' },
  { key: 'wind', label: 'Resistente a vientos fuertes' },
  { key: 'foundations', label: 'Sistema liviano / menor costo de fundaciones' },
  { key: 'durability', label: 'Resistencia / durabilidad' },
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

const processSteps = [
  {
    number: '01',
    title: 'Definir el proyecto',
    description:
      'Se estudian el terreno, las necesidades y la documentación para definir medidas, paneles y encuentros.',
  },
  {
    number: '02',
    title: 'Montar paneles y mallas',
    description:
      'Los paneles se colocan según el proyecto y las mallas resuelven uniones en ángulo, empalmes y refuerzos locales.',
  },
  {
    number: '03',
    title: 'Completar y terminar',
    description:
      'Se prevén las instalaciones, se completa el conjunto con hormigón proyectado y luego se aplican las terminaciones.',
  },
];

const components = [
  {
    title: 'Panel simple',
    description: 'Núcleo de EPS y mallas de acero que forman la base del sistema.',
    image: '/cassaforma-panel-simple.png',
    alt: 'Panel simple Cassaforma con núcleo de EPS y mallas de acero',
    source: 'Producto oficial a validar',
  },
  {
    title: 'Panel simple reforzado',
    description: 'Una variante para resolver situaciones particulares definidas por el proyecto.',
    image: '/cassaforma-panel-reforzado.png',
    alt: 'Panel simple reforzado Cassaforma con instalaciones y terminación',
    source: 'Producto oficial a validar',
  },
  {
    title: 'Mallas accesorias',
    description: 'Piezas para uniones, refuerzos y continuidad en encuentros y aberturas.',
    image: '/cassaforma-mallas.png',
    alt: 'Mallas accesorias Cassaforma para uniones y refuerzos',
    source: 'Producto oficial a validar',
  },
];

const videoOptions = [
  {
    title: 'Proceso constructivo',
    description: 'Recorrido visual por las etapas de montaje y proyección.',
    href: 'https://www.youtube.com/watch?v=w2nY_C0wBdo',
    label: 'Cassaforma · video oficial',
  },
  {
    title: 'Sistema Constructivo Cassaforma',
    description: 'Presentación general del sistema y sus posibilidades.',
    href: 'https://www.youtube.com/watch?v=zcGG2Q2swvY',
    label: 'Cassaforma · video oficial',
  },
];

export default function CassaformaSystemPage() {
  return (
    <main className="system-landing">
      <header className="system-landing-header">
        <a className="brand" href="/#inicio" aria-label="GMP Obras, volver al inicio">
          <span className="official-logo" aria-hidden="true">
            <Image src="/logo-gmp-horizontal-3-capas.png" alt="" width={1258} height={343} />
          </span>
        </a>
        <nav aria-label="Navegación de la landing del sistema">
          <a href="/#sistema">
            <ArrowLeft aria-hidden="true" size={16} />
            Volver a la home
          </a>
          <a className="system-landing-header-cta" href="/agendar">
            Consultar
            <ArrowRight aria-hidden="true" size={16} />
          </a>
        </nav>
      </header>

      <section className="system-landing-hero" aria-labelledby="system-landing-title">
        <div className="system-landing-hero-copy">
          <p className="eyebrow">Sistema constructivo · GMP Obras</p>
          <h1 id="system-landing-title">
            Una obra se entiende mejor cuando se mira por capas.
          </h1>
          <p>
            Cassaforma combina paneles, mallas de acero y hormigón proyectado. En esta página
            reunimos la mirada de GMP Obras, una explicación simple y los componentes que conviene
            conocer antes de consultar.
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
          <p className="system-landing-source-note">
            La denominación oficial es Cassaforma. GMP Obras utiliza el sistema en sus proyectos;
            esta página no implica representación oficial de la marca.
          </p>
        </div>
        <div className="system-landing-hero-media">
          <Image
            src="/cassaforma-panel-reforzado.png"
            alt="Detalle de un panel Cassaforma con mallas, instalaciones y terminación"
            fill
            priority
            sizes="(max-width: 780px) 100vw, 47vw"
          />
          <div className="system-landing-hero-label">
            <span>01 / 03</span>
            <strong>Panel + mallas + terminación</strong>
          </div>
        </div>
      </section>

      <section className="system-landing-comparison" id="comparativa" aria-labelledby="comparison-title">
        <div className="system-landing-comparison-heading">
          <div>
            <p className="section-kicker section-kicker-light">Comparativa de trabajo</p>
            <h2 id="comparison-title">La evaluación de Gustavo, puesta en una sola mirada.</h2>
          </div>
          <p className="system-landing-comparison-index">GMP / 01</p>
        </div>
        <p className="system-landing-comparison-lead">
          Este cuadro fue elaborado manualmente por Gustavo como una comparación visual entre
          sistemas. Sirve para ordenar la conversación inicial; no reemplaza el proyecto, el
          cálculo ni el análisis particular de cada obra.
        </p>
        <div className="system-landing-table-wrap">
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
          <p>
            La tabla expresa una opinión comparativa de GMP Obras. Las condiciones reales de una
            obra dependen del terreno, el proyecto, el cálculo, la ejecución y las terminaciones.
          </p>
        </div>
        <div className="system-landing-comparison-summary">
          <article>
            <span>Ventajas que aparecen en el cuadro</span>
            <h3>Cassaforma figura con “Cumple” en los nueve criterios.</h3>
            <p>Es la lectura comparativa que Gustavo quiso dejar registrada en este documento de trabajo.</p>
          </article>
          <article>
            <span>Desventajas y límites a completar</span>
            <h3>El PDF no marca desventajas propias de Cassaforma.</h3>
            <p>Para publicar una evaluación más completa, falta validar con Gustavo qué aspectos quiere presentar como límites o condiciones.</p>
          </article>
        </div>
      </section>

      <section className="system-landing-intro" aria-labelledby="system-intro-title">
        <div className="system-landing-section-heading">
          <p className="section-kicker">Después de la comparativa</p>
          <h2 id="system-intro-title">Qué es y cómo se usa en una obra.</h2>
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

      <section className="system-landing-process" aria-labelledby="process-title">
        <div className="system-landing-section-heading">
          <p className="section-kicker">Cómo funciona</p>
          <h2 id="process-title">Tres momentos para entender el sistema.</h2>
        </div>
        <div className="system-landing-process-grid">
          {processSteps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="system-landing-components" aria-labelledby="components-title">
        <div className="system-landing-components-heading">
          <div className="system-landing-section-heading">
            <p className="section-kicker">Componentes</p>
            <h2 id="components-title">Lo que se ve cuando el sistema queda expuesto.</h2>
          </div>
          <p>
            Los renders de esta maqueta ayudan a reconocer las piezas. Antes de publicar, hay que
            confirmar la selección y el alcance de uso del material oficial.
          </p>
        </div>
        <div className="system-landing-components-grid">
          {components.map((component) => (
            <article className="system-landing-component-card" key={component.title}>
              <div className="system-landing-component-media">
                <Image src={component.image} alt={component.alt} fill sizes="(max-width: 780px) 100vw, 33vw" />
              </div>
              <div className="system-landing-component-copy">
                <span>{component.source}</span>
                <h3>{component.title}</h3>
                <p>{component.description}</p>
              </div>
            </article>
          ))}
        </div>
        <a className="system-landing-inline-link" href="https://cassaforma.com/productos" target="_blank" rel="noreferrer">
          Ver el catálogo de productos de Cassaforma
          <ArrowUpRight aria-hidden="true" size={17} />
        </a>
      </section>

      <section className="system-landing-boundaries" aria-labelledby="boundaries-title">
        <div className="system-landing-boundaries-heading">
          <p className="section-kicker section-kicker-light">Qué conviene validar</p>
          <h2 id="boundaries-title">La decisión se toma con el proyecto arriba de la mesa.</h2>
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
            <li><CircleAlert aria-hidden="true" size={18} /> disponibilidad y autorización de los materiales</li>
          </ul>
        </div>
      </section>

      <section className="system-landing-video-options" aria-labelledby="video-options-title">
        <div className="system-landing-section-heading">
          <p className="section-kicker">Para ampliar después</p>
          <h2 id="video-options-title">Dos videos oficiales que pueden complementar la landing.</h2>
        </div>
        <div className="system-landing-video-grid">
          {videoOptions.map((video, index) => (
            <a className="system-landing-video-card" href={video.href} target="_blank" rel="noreferrer" key={video.href}>
              <span>{String(index + 1).padStart(2, '0')} · {video.label}</span>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          ))}
        </div>
        <p className="system-landing-video-note">
          Quedan como propuestas de incorporación. Antes de sumar otro embed conviene revisar el
          contenido completo, la vigencia y el permiso de uso en el sitio de GMP Obras.
        </p>
      </section>

      <section className="system-landing-cta" aria-labelledby="system-cta-title">
        <div>
          <p className="section-kicker section-kicker-light">¿Tenés un proyecto?</p>
          <h2 id="system-cta-title">Lo vemos con tus medidas, tu terreno y tu etapa.</h2>
        </div>
        <a className="button button-light" href="/agendar">
          Agendar una consulta
          <ArrowRight aria-hidden="true" size={18} />
        </a>
      </section>

      <footer className="system-landing-footer">
        <a className="brand" href="/#inicio" aria-label="GMP Obras, inicio">
          <span className="official-logo footer-logo" aria-hidden="true">
            <Image src="/logo-gmp-completo-vertical.png" alt="" width={1834} height={1503} />
          </span>
        </a>
        <p>Gustavo Pinto Caetano · Maestro mayor de obras · Comodoro Rivadavia</p>
        <div>
          <a href="https://cassaforma.com/sistema-constructivo" target="_blank" rel="noreferrer">Fuente técnica consultada: Cassaforma</a>
          <a href="/#contacto">Contacto GMP Obras</a>
        </div>
      </footer>
    </main>
  );
}
