import React from 'react';
import { useMusicContext } from '../../contexts/MusicContext';
import { PlaybackControls } from './PlaybackControls';
import { SeekBar } from './SeekBar';
import { VolumeControl } from './VolumeControl';
import { ListMusic } from 'lucide-react';
import { useNavigate } from 'react-router';

export const Player: React.FC = () => {
  const { currentSong } = useMusicContext();
  const navigate = useNavigate();
  
  if (!currentSong) {
    return (
      <div className="h-24 bg-black border-t border-gray-800 flex items-center justify-center text-gray-500">
        Select a song to start playing
      </div>
    );
  }
  
  return (
    <div className="h-24 bg-black border-t border-gray-800 px-4 flex items-center justify-between gap-4">
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
  );
};
