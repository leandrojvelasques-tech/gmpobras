'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { VideoTestimonial } from './VideoTestimonial';
import type { Project, ProjectImage } from '../data/projects';

type ProjectPanel = 'summary' | 'stages' | 'gallery';

type ShowcaseStage = {
  id: string;
  label: string;
  status: string;
  images: ProjectImage[];
  preview: ProjectImage;
};

type HomeProjectShowcaseProps = {
  projects: Project[];
};

function getStages(project: Project): ShowcaseStage[] {
  const firstStagePreview = project.heroImage ?? project.images.at(-1) ?? project.images[0];

  if (project.stage2Images?.length) {
    return [
      {
        id: 'etapa-1',
        label: 'Etapa 1',
        status: 'Finalizada',
        images: project.images,
        preview: firstStagePreview,
      },
      {
        id: 'etapa-2',
        label: 'Etapa 2',
        status: 'En curso',
        images: project.stage2Images,
        preview: project.stage2Images.at(-1) ?? project.stage2Images[0],
      },
    ];
  }

  return [
    {
      id: 'etapa-unica',
      label: 'Etapa única',
      status: project.status,
      images: project.images,
      preview: firstStagePreview,
    },
  ];
}

export function HomeProjectShowcase({ projects }: HomeProjectShowcaseProps) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(() => {
    const featuredProjectIndex = projects.findIndex((project) => project.slug === 'volar-sin-escalas');
    return featuredProjectIndex >= 0 ? featuredProjectIndex : 0;
  });
  const [panel, setPanel] = useState<ProjectPanel>('summary');
  const [activeStageId, setActiveStageId] = useState('etapa-1');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const project = projects[activeProjectIndex];
  const stages = getStages(project);
  const activeStage = stages.find((stage) => stage.id === activeStageId) ?? stages[0];
  const currentImage = activeStage.images[activeImageIndex] ?? activeStage.images[0];
  const facts = project.details
    ? [
        { label: 'Tipo de obra', value: project.details.workType },
        { label: 'Superficie', value: project.details.area },
        { label: 'Escala', value: project.details.floors },
        { label: 'Modalidad', value: project.details.delivery },
      ]
    : [];

  function selectProject(index: number) {
    const nextProject = projects[index];
    setActiveProjectIndex(index);
    setPanel('summary');
    setActiveStageId(nextProject.stage2Images?.length ? 'etapa-1' : 'etapa-unica');
    setActiveImageIndex(0);
  }

  function openStage(stageId: string) {
    setActiveStageId(stageId);
    setActiveImageIndex(0);
    setPanel('gallery');
  }

  function moveImage(direction: number) {
    setActiveImageIndex((current) => (
      current + direction + activeStage.images.length
    ) % activeStage.images.length);
  }

  function focusDossier() {
    document.getElementById('home-project-dossier')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  return (
    <section className="home-project-showcase" aria-label="Proyectos reales de GMP Obras">
      <div className="home-project-stage">
        <div className="home-project-stage-head">
          {panel === 'summary' && project.testimonial ? (
            <button className="home-project-testimonial-advance" type="button" onClick={focusDossier}>
              Testimonio de {project.testimonial.person}
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          ) : (
            <span>{panel === 'summary' ? 'Presentación' : panel === 'stages' ? 'Fotos de la obra' : activeStage.label}</span>
          )}
          <span>{String(activeProjectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        </div>

        {panel === 'summary' && (
          <div className="home-project-summary">
            <div className="home-project-media">
              {project.testimonial ? (
                <VideoTestimonial testimonial={project.testimonial} compact />
              ) : (
                <Image
                  src={(project.heroImage ?? project.images[0]).src}
                  alt={(project.heroImage ?? project.images[0]).alt}
                  fill
                  sizes="(max-width: 980px) 100vw, 48vw"
                />
              )}
              {!project.testimonial && <span className="home-project-media-label">Registro de obra</span>}
            </div>

            <div className="home-project-dossier" id="home-project-dossier">
              <div>
                <p className="home-project-status">
                  {stages.length > 1 ? 'Proyecto en dos etapas' : 'Proyecto en una etapa'}
                </p>
                <h3>{project.title}</h3>
                <p className="home-project-subtitle">{project.subtitle}</p>
                <p className="home-project-description">{project.description}</p>
              </div>

              <div className="home-project-dossier-bottom">
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
                <button className="home-project-photos-cta" type="button" onClick={() => setPanel('stages')}>
                  Ver fotos de la obra
                  <ArrowRight aria-hidden="true" size={22} />
                </button>
              </div>
            </div>
          </div>
        )}

        {panel === 'stages' && (
          <div className="home-project-stages-panel">
            <div className="home-project-panel-heading">
              <div>
                <p className="section-kicker section-kicker-light">Fotos de la obra</p>
                <h3>{stages.length > 1 ? 'Dos etapas, un solo recorrido.' : 'La obra, en una sola etapa.'}</h3>
              </div>
              <button className="home-project-back" type="button" onClick={() => setPanel('summary')}>
                <ArrowLeft aria-hidden="true" size={17} />
                Volver a la ficha
              </button>
            </div>

            <div className={`home-project-stage-cards ${stages.length === 1 ? 'is-single' : ''}`}>
              {stages.map((stage) => (
                <article className="home-project-stage-card" key={stage.id}>
                  <Image src={stage.preview.src} alt={stage.preview.alt} fill sizes="(max-width: 760px) 100vw, 36vw" />
                  <div className="home-project-stage-card-shade" />
                  <div className="home-project-stage-card-copy">
                    <span>{stage.label} · {stage.status}</span>
                    <h4>{stage.label === 'Etapa 1' ? 'La obra terminada' : stage.label === 'Etapa 2' ? 'La ampliación' : 'Recorrido de la obra'}</h4>
                    <p>{stage.images.length} fotos disponibles</p>
                    <button type="button" onClick={() => openStage(stage.id)}>
                      Ver fotos
                      <ArrowRight aria-hidden="true" size={18} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {panel === 'gallery' && (
          <div className="home-project-gallery-panel">
            <div className="home-project-panel-heading">
              <div>
                <p className="section-kicker section-kicker-light">{activeStage.label} · {activeStage.status}</p>
                <h3>{project.title}</h3>
              </div>
              <button className="home-project-back" type="button" onClick={() => setPanel(stages.length > 1 ? 'stages' : 'summary')}>
                <ArrowLeft aria-hidden="true" size={17} />
                {stages.length > 1 ? 'Ver etapas' : 'Volver a la ficha'}
              </button>
            </div>

            <div className="home-project-gallery-frame">
              <Image
                key={currentImage.src}
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                sizes="(max-width: 980px) 100vw, 64vw"
              />
              <div className="home-project-gallery-shade" />
              <p className="home-project-gallery-count" aria-live="polite">
                Foto {String(activeImageIndex + 1).padStart(2, '0')} / {String(activeStage.images.length).padStart(2, '0')}
              </p>
              <div className="home-project-gallery-controls">
                <button type="button" onClick={() => moveImage(-1)} aria-label={`Foto anterior de ${project.title}`}>
                  <ChevronLeft aria-hidden="true" size={21} />
                </button>
                <button type="button" onClick={() => moveImage(1)} aria-label={`Foto siguiente de ${project.title}`}>
                  <ChevronRight aria-hidden="true" size={21} />
                </button>
              </div>
            </div>

            <div className="home-project-scrubber">
              <label htmlFor={`home-project-photo-${project.slug}`}>Ir a una foto</label>
              <input
                id={`home-project-photo-${project.slug}`}
                type="range"
                min="0"
                max={activeStage.images.length - 1}
                value={activeImageIndex}
                onChange={(event) => setActiveImageIndex(Number(event.target.value))}
                aria-valuetext={`Foto ${activeImageIndex + 1} de ${activeStage.images.length}`}
              />
              <span>{currentImage.sequence ?? activeImageIndex + 1}</span>
            </div>
          </div>
        )}
      </div>

      <aside className="home-project-rail" aria-label="Elegir otro proyecto">
        <p className="home-project-rail-kicker">Otros proyectos</p>
        <div className="home-project-list">
          {projects.map((item, index) => (
            <button
              type="button"
              className={index === activeProjectIndex ? 'is-active' : ''}
              key={item.slug}
              onClick={() => selectProject(index)}
              aria-pressed={index === activeProjectIndex}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span>{item.title}</span>
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          ))}
        </div>
        <p className="home-project-rail-note">
          Las obras con una sola etapa muestran una galería única. Volar Sin Escalas separa el recorrido entre la obra finalizada y su ampliación en curso.
        </p>
      </aside>
    </section>
  );
}
