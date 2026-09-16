import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ProjectImageCarousel } from '../../components/ProjectImageCarousel';
import { VideoTestimonial } from '../../components/VideoTestimonial';
import { projects } from '../../data/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <main className="project-detail">
      <header className="detail-header">
        <Link href="/" className="detail-back">
          <ArrowLeft aria-hidden="true" size={18} />
          Volver a proyectos
        </Link>
        <span>GMP Obras</span>
      </header>

      <section className="detail-intro">
        <div className="detail-intro-copy">
          <p className="section-kicker">{project.status}</p>
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
        </div>
        {project.heroImage && (
          <div className="detail-intro-media">
            <Image
              src={project.heroImage.src}
              alt={project.heroImage.alt}
              fill
              sizes="(max-width: 980px) 100vw, 42vw"
              priority
            />
          </div>
        )}
      </section>

      <ProjectImageCarousel images={project.images} projectTitle={project.title} />

      {project.details && (
        <section className="detail-facts" aria-labelledby="ficha-de-obra">
          <div className="detail-facts-heading">
            <p className="section-kicker">Ficha de obra</p>
            <h2 id="ficha-de-obra">Qué se hizo en este proyecto.</h2>
          </div>

          <div className="detail-meta">
            <div><span>Tipo de obra</span><strong>{project.details.workType}</strong></div>
            <div><span>Año de construcción</span><strong>{project.details.year}</strong></div>
            <div><span>Tiempo neto de obra</span><strong>{project.details.duration}</strong></div>
            <div><span>Metros cuadrados</span><strong>{project.details.area}</strong></div>
            <div><span>Cantidad de plantas</span><strong>{project.details.floors}</strong></div>
            <div><span>Tipo de entrega</span><strong>{project.details.delivery}</strong></div>
          </div>

          <div className="detail-tasks">
            <p className="section-kicker">{project.details.tasksLabel}</p>
            <ul>
              {project.details.tasks.map((task) => <li key={task}>{task}</li>)}
            </ul>
          </div>
        </section>
      )}

      {project.testimonial && (
        <section className="detail-testimonial-section" aria-labelledby="testimonio-title">
          <VideoTestimonial testimonial={project.testimonial} />
          <div className="detail-testimonial-copy">
            <p className="section-kicker">La experiencia de {project.testimonial.person}</p>
            <h2 id="testimonio-title">{project.testimonial.title}</h2>
            <p>{project.testimonial.description}</p>
          </div>
        </section>
      )}

      <section className="detail-copy">
        <p>{project.description}</p>
        {project.provisional && <small>Las imágenes de este proyecto son provisionales hasta incorporar el material oficial.</small>}
        <Link className="button button-primary" href="/agendar">
          Agendar una cita
          <ArrowRight aria-hidden="true" size={19} />
        </Link>
      </section>
    </main>
  );
}
