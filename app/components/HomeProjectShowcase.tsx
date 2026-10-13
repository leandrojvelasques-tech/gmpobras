'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { VideoTestimonial } from './VideoTestimonial';
import type { Project } from '../data/projects';

type HomeProjectShowcaseProps = {
  projects: Project[];
};

export function HomeProjectShowcase({ projects }: HomeProjectShowcaseProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(() => Math.max(0, projects.findIndex((project) => project.slug === 'volar-sin-escalas')));
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const moveProject = (offset: number) => setActiveProjectIndex(index => (index + offset + projects.length) % projects.length);
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
          <div className="home-project-pagination">
            <button type="button" aria-label="Proyecto anterior" onClick={() => moveProject(-1)}><ArrowLeft aria-hidden="true" size={18} /></button>
            <span aria-live="polite">{String(activeProjectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            <button type="button" aria-label="Proyecto siguiente" onClick={() => moveProject(1)}><ArrowRight aria-hidden="true" size={18} /></button>
          </div>
        </div>

        <div className="home-project-summary" onTouchStart={event => { const point = event.touches[0]; touchStart.current = { x: point.clientX, y: point.clientY }; }} onTouchEnd={event => { const point = event.changedTouches[0]; const start = touchStart.current; touchStart.current = null; if (!start) return; const dx = point.clientX - start.x; const dy = point.clientY - start.y; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) moveProject(dx < 0 ? 1 : -1); }}>
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
              <h3 aria-live="polite">{project.title}</h3>
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
            <button
              type="button"
              className={`home-project-list-item ${index === activeProjectIndex ? 'is-active' : ''}`}
              key={item.slug}
              onClick={() => setActiveProjectIndex(index)}
              aria-pressed={index === activeProjectIndex}
              aria-label={`Mostrar ${item.title} en el inicio`}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span>{item.title}</span>
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          ))}
        </div>
      </aside>
    </section>
  );
}
