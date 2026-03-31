import { useEffect } from 'react';
import { useMusicContext } from '../contexts/MusicContext';

export const useKeyboardControls = () => {
  const {
    togglePlay,
    playNext,
    playPrevious,
    setVolume,
    volume,
    currentSong,
    seekTo,
    currentTime,
    duration
  } = useMusicContext();
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      
      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          if (currentSong) togglePlay();
          break;
        case 'arrowright':
          if (e.shiftKey) {
            // Skip forward 10 seconds
            seekTo(Math.min(currentTime + 10, duration));
          } else {
            // Next track
            playNext();
          }
          break;
        case 'arrowleft':
          if (e.shiftKey) {
            // Skip backward 10 seconds
            seekTo(Math.max(currentTime - 10, 0));
          } else {
            // Previous track
            playPrevious();
          }
          break;
        case 'arrowup':
          e.preventDefault();
          setVolume(Math.min(volume + 0.1, 1));
          break;
        case 'arrowdown':
          e.preventDefault();
          setVolume(Math.max(volume - 0.1, 0));
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    togglePlay,
    playNext,
    playPrevious,
    setVolume,
    volume,
    currentSong,
    seekTo,
    currentTime,
    duration
  ]);
};
