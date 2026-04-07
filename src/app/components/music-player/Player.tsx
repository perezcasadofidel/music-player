import React from 'react';
import { useMusicContext } from '../../contexts/MusicContext';
import { PlaybackControls } from './PlaybackControls';
import { SeekBar } from './SeekBar';
import { VolumeControl } from './VolumeControl';
import { ListMusic, Loader } from 'lucide-react';
import { useNavigate } from 'react-router';

export const Player: React.FC = () => {
  const { currentSong } = useMusicContext();
  const navigate = useNavigate();
  
  if (!currentSong) {
    return (
      <div className="h-16 md:h-24 bg-black border-t border-gray-800 flex items-center justify-center text-gray-500 text-sm md:text-base">
        Select a song to start playing
      </div>
    );
  }
  
  return (
    <div className="bg-black border-t border-gray-800">
      {/* Mobile Player - Compact Design */}
      <div className="md:hidden px-3 py-2">
        {/* Current Song Info & Main Controls */}
        <div className="flex items-center gap-3 mb-2">
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className="w-12 h-12 rounded object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate text-sm">{currentSong.title}</h4>
            <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
          </div>
          <button
            onClick={() => navigate('/queue')}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            title="View Queue"
          >
            <ListMusic size={18} />
          </button>
        </div>
        
        {/* Controls */}
        <div className="space-y-2">
          <PlaybackControls />
          <SeekBar />
        </div>
      </div>

      {/* Desktop Player - Full Design */}
      <div className="hidden md:flex h-24 px-4 items-center justify-between gap-4">
        {/* Current Song Info */}
        <div className="flex items-center gap-4 min-w-[200px] w-[30%]">
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className="w-14 h-14 rounded object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate">{currentSong.title}</h4>
            <p className="text-sm text-gray-400 truncate">{currentSong.artist}</p>
          </div>
        </div>
        
        {/* Player Controls */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 max-w-2xl">
          <PlaybackControls />
          <SeekBar />
        </div>
        
        {/* Right Controls */}
        <div className="flex items-center gap-2 min-w-[200px] w-[30%] justify-end">
          <button
            onClick={() => navigate('/queue')}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            title="View Queue"
          >
            <ListMusic size={20} />
          </button>
          <VolumeControl />
        </div>
      </div>
    </div>
  );
};