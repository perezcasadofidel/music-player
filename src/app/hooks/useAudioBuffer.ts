import { useEffect, useState } from 'react';

export interface BufferProgress {
  bufferedPercentage: number;
  isReadyToPlay: boolean;
  totalDuration: number;
  isSeekable: boolean;
  currentBufferedPercentage: number;
}

export const useAudioBuffer = (audioRef: React.RefObject<HTMLAudioElement>) => {
  const [bufferProgress, setBufferProgress] = useState<BufferProgress>({
    bufferedPercentage: 0,
    isReadyToPlay: false,
    totalDuration: 0,
    isSeekable: false,
    currentBufferedPercentage: 0,
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleProgress = () => {
      if (audio.duration === 0) return;

      const buffered = audio.buffered;
      let totalBufferedLength = 0;

      // Calcula bytes descargados totales
      for (let i = 0; i < buffered.length; i++) {
        totalBufferedLength += buffered.end(i) - buffered.start(i);
      }

      // Calcula si la posición actual está descargada
      let currentIsBuffered = false;
      for (let i = 0; i < buffered.length; i++) {
        if (audio.currentTime >= buffered.start(i) && audio.currentTime < buffered.end(i)) {
          currentIsBuffered = true;
          break;
        }
      }

      const bufferedPercentage = (totalBufferedLength / audio.duration) * 100;
      const isReadyToPlay = bufferedPercentage > 10 || audio.readyState >= 2;
      const currentBufferedPercentage = (audio.currentTime / audio.duration) * 100;

      setBufferProgress({
        bufferedPercentage: Math.min(bufferedPercentage, 100),
        isReadyToPlay,
        totalDuration: audio.duration,
        isSeekable: currentIsBuffered,
        currentBufferedPercentage,
      });
    };

    const handleCanPlay = () => {
      setBufferProgress(prev => ({ ...prev, isReadyToPlay: true }));
    };

    const handleSeeking = () => {
      // Fuerza recarga de buffer info cuando se hace seek
      handleProgress();
    };

    audio.addEventListener('progress', handleProgress);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('durationchange', handleProgress);
    audio.addEventListener('seeking', handleSeeking);
    audio.addEventListener('timeupdate', handleProgress);

    return () => {
      audio.removeEventListener('progress', handleProgress);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('durationchange', handleProgress);
      audio.removeEventListener('seeking', handleSeeking);
      audio.removeEventListener('timeupdate', handleProgress);
    };
  }, [audioRef]);

  return bufferProgress;
};
