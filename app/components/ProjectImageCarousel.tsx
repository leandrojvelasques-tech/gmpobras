'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProjectImage, ProjectStage } from '../data/projects';

type ProjectImageCarouselProps = {
  images: ProjectImage[];
  projectTitle: string;
  heading?: string;
  stages?: ProjectStage[];
};

export function ProjectImageCarousel({ images, projectTitle, heading, stages }: ProjectImageCarouselProps) {
  const availableStages = stages?.length ? stages : [{ id: 'default', label: 'Avance de obra', status: '', images }];
  const [activeStageId, setActiveStageId] = useState(availableStages[0].id);
  const [activeImage, setActiveImage] = useState(0);
  const activeStage = availableStages.find((stage) => stage.id === activeStageId) ?? availableStages[0];
  const currentImage = activeStage.images[activeImage] ?? activeStage.images[0];

  function move(direction: number) {
    setActiveImage((current) => (current + direction + activeStage.images.length) % activeStage.images.length);
  }

  function selectStage(stageId: string) {
    setActiveStageId(stageId);
    setActiveImage(0);
  }

  return (
    <section className="detail-carousel" aria-labelledby="avance-de-obra">
      <div className="detail-carousel-heading">
        <div>
          <p className="section-kicker">Avance de obra</p>
          {availableStages.length > 1 && (
            <div className="detail-carousel-stages" role="group" aria-label="Elegir etapa de obra">
              {availableStages.map((stage) => (
                <button
                  key={stage.id}
                  type="button"
                  className={stage.id === activeStage.id ? 'is-active' : ''}
                  onClick={() => selectStage(stage.id)}
                  aria-pressed={stage.id === activeStage.id}
                >
                  <span>{stage.label}</span>
                  <small>{stage.status}</small>
                </button>
              ))}
            </div>
          )}
          <h2 id="avance-de-obra">{heading ?? `${projectTitle}, etapa por etapa.`}</h2>
        </div>
        <p className="detail-carousel-count" aria-live="polite">
          Foto {currentImage.sequence ?? activeImage + 1} · {String(activeImage + 1).padStart(2, '0')} / {String(activeStage.images.length).padStart(2, '0')}
        </p>
      </div>

      <div
        className="detail-carousel-frame"
      >
        <Image
          key={currentImage.src}
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          sizes="(max-width: 760px) 100vw, min(80vw, 960px)"
        />
        <div className="detail-carousel-controls">
          <button type="button" onClick={() => move(-1)} aria-label={`Foto anterior de ${projectTitle}`}>
            <ChevronLeft aria-hidden="true" size={22} />
          </button>
          <button type="button" onClick={() => move(1)} aria-label={`Foto siguiente de ${projectTitle}`}>
            <ChevronRight aria-hidden="true" size={22} />
          </button>
        </div>
      </div>

      <div className="detail-carousel-scrubber">
        <label htmlFor="avance-slider">Recorrer la obra</label>
        <input
          id="avance-slider"
          type="range"
          min="0"
          max={activeStage.images.length - 1}
          value={activeImage}
          onChange={(event) => setActiveImage(Number(event.target.value))}
          aria-valuetext={`Foto ${currentImage.sequence ?? activeImage + 1} de ${activeStage.images.length}`}
        />
        <span>{currentImage.sequence ?? activeImage + 1}</span>
      </div>
    </section>
  );
}
