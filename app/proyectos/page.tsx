import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import { SubpageHeader } from '../components/SubpageHeader';
import { SiteFooter } from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'Proyectos y obras realizadas | GMP Obras',
  description: 'Conocé los consultorios Volar Sin Escalas y las viviendas de Gabriel Ambrozy y Javier Águila. Fotos, etapas y testimonios de obras de GMP.',
  alternates: { canonical: 'https://www.gmpobras.com.ar/proyectos' },
};

export default function ProjectsPage() {
  return <main className="projects-page">
    <SubpageHeader active="proyectos" />
    <section className="projects-page-intro" aria-labelledby="projects-title">
      <p className="section-kicker">Proyectos reales</p>
      <h1 id="projects-title">Nuestras obras.</h1>
      <p>Conocé los proyectos, sus etapas y el trabajo realizado. En cada obra podés ver las fotos y la experiencia de sus propietarios.</p>
    </section>
    <section className="projects-page-grid" aria-label="Obras de GMP">
      {projects.map(project => {
        const image = project.heroImage ?? project.images.at(-1) ?? project.images[0];
        return <article className="project-index-card" key={project.slug}>
          <a className="project-index-image" href={`/proyectos/${project.slug}`} aria-label={`Ver ${project.title}`}>
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 730px) 100vw, (max-width: 1000px) 50vw, 33vw" />
          </a>
          <div className="project-index-copy">
            <p className="project-index-status">{project.status}</p>
            <h2><a href={`/proyectos/${project.slug}`}>{project.title}</a></h2>
            <p>{project.subtitle}</p>
            <a className="project-index-link" href={`/proyectos/${project.slug}`}>Ver proyecto y fotos <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </article>;
      })}
    </section>
    <section className="consultation">
      <div><p className="section-kicker section-kicker-light">Tu proyecto</p><h2>Conversemos sobre tu proyecto.</h2></div>
      <p>Elegí un día y un horario para contarme tu idea.</p>
      <a className="button button-light" href="/agendar">Agendar cita <ArrowRight size={18} aria-hidden="true" /></a>
    </section>
    <SiteFooter />
  </main>;
}
