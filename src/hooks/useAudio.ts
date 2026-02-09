import { useState, useRef, useCallback } from 'react';

export function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const initAudio = useCallback(() => {
    if (!audioRef.current) {
      // Vite의 base path를 반영하여 경로 생성
      const basePath = import.meta.env.BASE_URL;
      const fullPath = src.startsWith('/') ? `${basePath}${src.slice(1)}` : src;
      const audio = new Audio(fullPath);
      audio.loop = true;
      audio.volume = 0.3;
      audio.preload = 'auto';

      audio.addEventListener('ended', () => {
        // loop이므로 여기 올 일은 없지만 안전장치
        setIsPlaying(false);
      });

      audio.addEventListener('error', (e) => {
        console.error('BGM 로드 실패:', e);
        console.error('시도한 경로:', fullPath);
        setIsPlaying(false);
      });

      audioRef.current = audio;
    }
  }, [src]);

  const play = useCallback(() => {
    initAudio();
    const audio = audioRef.current;
    if (!audio) return;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('BGM 재생 실패:', err);
          setIsPlaying(false);
        });
    }
  }, [initAudio]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return { isPlaying, play, pause, toggle };
}
