'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const OFFICIAL_THUMBNAIL = 'https://i.ytimg.com/vi/vtCQtq4RhqM/maxresdefault.jpg';
const OFFICIAL_THUMBNAIL_FALLBACK = 'https://i.ytimg.com/vi/vtCQtq4RhqM/hqdefault.jpg';

type CassaformaVideoCoverProps = {
  variant?: 'gustavo' | 'marcelo';
  videoSrc?: string;
  posterSrc?: string;
};

export function CassaformaVideoCover({ variant = 'marcelo', videoSrc, posterSrc }: CassaformaVideoCoverProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState(OFFICIAL_THUMBNAIL);

  const isGustavo = variant === 'gustavo';
  const title = isGustavo
    ? 'Qué es el sistema Cassaforma, explicado por Gustavo Pinto Caetano'
    : 'Explicación del sistema constructivo Cassaforma';

  if (isPlaying) {
    if (isGustavo) {
      return (
        <video
          className="cassaforma-video-player"
          controls
          autoPlay
          playsInline
          preload="metadata"
          poster={posterSrc}
          aria-label={title}
        >
          <source src={videoSrc} type="video/mp4" />
          Tu navegador no puede reproducir este video.
        </video>
      );
    }

    return (
      <iframe
        src="https://www.youtube.com/embed/vtCQtq4RhqM?start=867&autoplay=1&rel=0"
        title={title}
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
      aria-label={`Reproducir: ${title}`}
    >
      {isGustavo ? (
        <Image
          src={posterSrc ?? OFFICIAL_THUMBNAIL}
          alt="Qué es el sistema Cassaforma, explicado por Gustavo Pinto Caetano"
          fill
          sizes="(max-width: 760px) 100vw, 45vw"
          priority={false}
        />
      ) : (
        <Image
          src={thumbnail}
          alt="Miniatura oficial del video de Marcelo Seia sobre el sistema Cassaforma"
          fill
          sizes="(max-width: 760px) 100vw, 45vw"
          priority={false}
          onError={() => setThumbnail(OFFICIAL_THUMBNAIL_FALLBACK)}
        />
      )}
      <span className="cassaforma-video-play" aria-hidden="true">
        <Play fill="currentColor" size={30} strokeWidth={1.5} />
      </span>
    </button>
  );
}
