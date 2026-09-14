'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export function CassaformaVideoCover() {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        src="https://www.youtube.com/embed/vtCQtq4RhqM?start=867&autoplay=1&rel=0"
        title="Explicación del sistema constructivo Cassaforma"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      className="cassaforma-video-cover"
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label="Reproducir explicación del sistema Cassaforma"
    >
      <Image
        src="/cassaforma-video-cover-gustavo-clean.png"
        alt="Gustavo Pinto presentando cómo funciona el sistema Cassaforma"
        fill
        sizes="(max-width: 760px) 100vw, 45vw"
        priority={false}
      />
      <span className="cassaforma-video-play" aria-hidden="true">
        <Play fill="currentColor" size={30} strokeWidth={1.5} />
      </span>
    </button>
  );
}
