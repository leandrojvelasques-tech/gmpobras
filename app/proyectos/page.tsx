import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { ProjectCards } from '../components/ProjectCards';
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
      <ProjectCards />
    </section>
    <section className="consultation">
      <div><p className="section-kicker section-kicker-light">Tu proyecto</p><h2>Conversemos sobre tu proyecto.</h2></div>
      <p>Elegí un día y un horario para contarme tu idea.</p>
      <a className="button button-light" href="/agendar">Agendar cita <ArrowRight size={18} aria-hidden="true" /></a>
    </section>
    <SiteFooter />
  </main>;
}
