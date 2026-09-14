'use client';

import { Play } from 'lucide-react';
import { useRef, useState } from 'react';
import type { ProjectTestimonial } from '../data/projects';

type VideoTestimonialProps = {
  testimonial: ProjectTestimonial;
  compact?: boolean;
};

export function VideoTestimonial({ testimonial, compact = false }: VideoTestimonialProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  function playVideo() {
    setHasStarted(true);
    void videoRef.current?.play();
  }

  return (
    <div className={`video-testimonial ${compact ? 'is-compact' : ''}`}>
      {/* oxlint-disable-next-line jsx-a11y/media-has-caption -- Los subtítulos requieren una transcripción revisada antes de publicar. */}
      <video
        ref={videoRef}
        aria-label={`Testimonio en video de ${testimonial.person}`}
        controls
        onPlay={() => setHasStarted(true)}
        playsInline
        poster={testimonial.posterSrc}
        preload="metadata"
      >
        <source src={testimonial.videoSrc} type="video/mp4" />
        Tu navegador no puede reproducir este video.
      </video>
      {!hasStarted && (
        <button
          className="video-testimonial-play"
          type="button"
          onClick={playVideo}
          aria-label={`Reproducir testimonio de ${testimonial.person}`}
        >
          <Play fill="currentColor" size={28} strokeWidth={1.5} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
