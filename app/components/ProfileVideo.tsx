'use client';

import { Play } from 'lucide-react';
import { useRef, useState } from 'react';

export function ProfileVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function playVideo() {
    void videoRef.current?.play();
  }

  return (
    <div className="profile-video-wrap">
      {/* oxlint-disable-next-line jsx-a11y/media-has-caption -- Los subtítulos requieren una transcripción revisada antes de publicar. */}
      <video
        ref={videoRef}
        aria-label="Presentación en video de Gustavo Pinto"
        controls
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        playsInline
        poster="/gustavo-presentacion-poster.png"
        preload="metadata"
      >
        <source src="/gustavo-presentacion-web.mp4" type="video/mp4" />
        Tu navegador no puede reproducir este video.
      </video>
      {!isPlaying && (
        <button
          className="profile-video-play"
          type="button"
          aria-label="Reproducir presentación de Gustavo Pinto"
          onClick={playVideo}
        >
          <Play aria-hidden="true" size={34} fill="currentColor" />
        </button>
      )}
    </div>
  );
}
