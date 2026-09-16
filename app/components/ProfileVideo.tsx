'use client';

import { Play } from 'lucide-react';
import { useRef, useState } from 'react';

export function ProfileVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  function playVideo() {
    setHasStarted(true);
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
        onPlay={() => {
          setHasStarted(true);
          setIsPlaying(true);
        }}
        playsInline
        poster="/gustavo-presentacion-frame-04-clean.png"
        preload="none"
      >
        <source src="/gustavo-presentacion-web.mp4" type="video/mp4" />
        Tu navegador no puede reproducir este video.
      </video>
      {!hasStarted && (
        <img
          className="profile-video-cover"
          src="/gustavo-presentacion-frame-04-clean.png"
          alt="Gustavo Pinto señalando los planos de una obra"
        />
      )}
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
