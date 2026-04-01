import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1 } from 'lucide-react';
import { useMusicContext } from '../../contexts/MusicContext';

export const PlaybackControls: React.FC = () => {
  const {
    isPlaying,
    isShuffle,
    repeatMode,
    togglePlay,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat,
    currentSong
  } = useMusicContext();
  
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {/* Shuffle */}
      <button
        onClick={toggleShuffle}
        className={`p-1.5 md:p-2 rounded-full transition-colors hover:bg-gray-700 ${
          isShuffle ? 'text-green-500' : 'text-gray-400'
        }`}
        title="Shuffle"
      >
        <Shuffle size={16} className="md:w-[18px] md:h-[18px]" />
      </button>
      
      {/* Previous */}
      <button
        onClick={playPrevious}
        disabled={!currentSong}
        className="p-1.5 md:p-2 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Previous"
      >
        <SkipBack size={18} className="md:w-5 md:h-5" fill="currentColor" />
      </button>
      
      {/* Play/Pause */}
      <button
        onClick={togglePlay}
        disabled={!currentSong}
        className="p-2 md:p-3 rounded-full bg-white text-black hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause size={20} className="md:w-6 md:h-6" fill="currentColor" /> : <Play size={20} className="md:w-6 md:h-6" fill="currentColor" />}
      </button>
      
      {/* Next */}
      <button
        onClick={playNext}
        disabled={!currentSong}
        className="p-1.5 md:p-2 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Next"
      >
        <SkipForward size={18} className="md:w-5 md:h-5" fill="currentColor" />
      </button>
      
      {/* Repeat */}
      <button
        onClick={toggleRepeat}
        className={`p-1.5 md:p-2 rounded-full transition-colors hover:bg-gray-700 ${
          repeatMode !== 'off' ? 'text-green-500' : 'text-gray-400'
        }`}
        title={`Repeat: ${repeatMode}`}
      >
        {repeatMode === 'one' ? <Repeat1 size={16} className="md:w-[18px] md:h-[18px]" /> : <Repeat size={16} className="md:w-[18px] md:h-[18px]" />}
      </button>
    </div>
  );
};