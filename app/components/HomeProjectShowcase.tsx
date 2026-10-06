'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { VideoTestimonial } from './VideoTestimonial';
import type { Project } from '../data/projects';

type HomeProjectShowcaseProps = {
  projects: Project[];
};

export function HomeProjectShowcase({ projects }: HomeProjectShowcaseProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(() => {
    const featuredProjectIndex = projects.findIndex((project) => project.slug === 'volar-sin-escalas');
    return featuredProjectIndex >= 0 ? featuredProjectIndex : 0;
  });
  const project = projects[activeProjectIndex];
  const preview = project.heroImage ?? project.images.at(-1) ?? project.images[0];
  const facts = project.details
    ? [
        { label: 'Tipo de obra', value: project.details.workType },
        { label: 'Superficie', value: project.details.area },
        { label: 'Escala', value: project.details.floors },
        { label: 'Modalidad', value: project.details.delivery },
      ]
    : [];

  return (
    <section className="home-project-showcase" aria-label="Proyectos reales de GMP Obras">
      <div className="home-project-stage">
        <div className="home-project-stage-head">
          <span>{project.testimonial ? `Testimonio de ${project.testimonial.person}` : 'Presentación'}</span>
          <span>{String(activeProjectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        </div>

        <div className="home-project-summary">
          <div className="home-project-media">
            {project.testimonial ? (
              <VideoTestimonial key={project.slug} testimonial={project.testimonial} compact />
            ) : (
              <Image
                src={preview.src}
                alt={preview.alt}
                fill
                sizes="(max-width: 980px) 100vw, 48vw"
              />
            )}
            {!project.testimonial && <span className="home-project-media-label">Registro de obra</span>}
          </div>

          <div className="home-project-dossier">
            <div>
              <p className="home-project-status">
                {project.stage2Images?.length ? 'Proyecto en dos etapas' : 'Proyecto en una etapa'}
              </p>
              <h3>{project.title}</h3>
              <p className="home-project-subtitle">{project.subtitle}</p>
            </div>

            <div className="home-project-dossier-bottom">
              <a
                className="home-project-photos-cta"
                href={`/proyectos/${project.slug}`}
                aria-label={`Ver proyecto y fotos de ${project.title}`}
              >
                Ver proyecto y fotos
                <ArrowRight aria-hidden="true" size={22} />
              </a>
              {facts.length > 0 && (
                <dl className="home-project-facts" aria-label={`Ficha de obra ${project.title}`}>
                  {facts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>

      <aside className="home-project-rail" aria-label="Elegir otro proyecto">
        <p className="home-project-rail-kicker">Otros proyectos</p>
        <div className="home-project-list">
          {projects.map((item, index) => (
            <div className="home-project-list-item" key={item.slug}>
              <button
                type="button"
                className={index === activeProjectIndex ? 'is-active' : ''}
                onClick={() => setActiveProjectIndex(index)}
                aria-pressed={index === activeProjectIndex}
                aria-label={`Ver presentación de ${item.title}`}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{item.title}</span>
                <ArrowRight aria-hidden="true" size={18} />
              </button>
              <a
                className="home-project-detail-link"
                href={`/proyectos/${item.slug}`}
                aria-label={`Ver proyecto de ${item.title}`}
              >
                Ver proyecto
                <ArrowRight aria-hidden="true" size={16} />
              </a>
            </div>
          ))}
        </div>
        <p className="home-project-rail-note">
          Elegí una obra para ver su presentación. Entrá en “Ver proyecto” para recorrer las fotos y conocer los detalles.
        </p>
      </aside>
    </section>
  );
}
