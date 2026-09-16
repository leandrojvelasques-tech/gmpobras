'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProjectImage } from '../data/projects';

type ProjectImageCarouselProps = {
  images: ProjectImage[];
  projectTitle: string;
};

export function ProjectImageCarousel({ images, projectTitle }: ProjectImageCarouselProps) {
  const [activeImage, setActiveImage] = useState(0);
  const currentImage = images[activeImage];

  function move(direction: number) {
    setActiveImage((current) => (current + direction + images.length) % images.length);
  }

  return (
    <section className="detail-carousel" aria-labelledby="avance-de-obra">
      <div className="detail-carousel-heading">
        <div>
          <p className="section-kicker">Avance de obra</p>
          <h2 id="avance-de-obra">{projectTitle}, etapa por etapa.</h2>
        </div>
        <p className="detail-carousel-count" aria-live="polite">
          Foto {currentImage.sequence ?? activeImage + 1} · {String(activeImage + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
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
          max={images.length - 1}
          value={activeImage}
          onChange={(event) => setActiveImage(Number(event.target.value))}
          aria-valuetext={`Foto ${currentImage.sequence ?? activeImage + 1} de ${images.length}`}
        />
        <span>{currentImage.sequence ?? activeImage + 1}</span>
      </div>
    </section>
  );
}
