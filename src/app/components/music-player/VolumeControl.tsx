import React from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import { useMusicContext } from '../../contexts/MusicContext';

export const VolumeControl: React.FC = () => {
  const { volume, setVolume } = useMusicContext();
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };
  
  const toggleMute = () => {
    setVolume(volume > 0 ? 0 : 0.7);
  };
  
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };
  
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleMute}
        className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        title={volume > 0 ? 'Mute' : 'Unmute'}
      >
        {getVolumeIcon()}
      </button>
      
      <div className="w-24 relative group">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-3
                     [&::-webkit-slider-thumb]:h-3
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-white
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:opacity-0
                     group-hover:[&::-webkit-slider-thumb]:opacity-100
                     [&::-webkit-slider-thumb]:transition-opacity
                     [&::-moz-range-thumb]:w-3
                     [&::-moz-range-thumb]:h-3
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:bg-white
                     [&::-moz-range-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:border-0
                     [&::-moz-range-thumb]:opacity-0
                     group-hover:[&::-moz-range-thumb]:opacity-100"
        />
        <div 
          className="absolute top-0 left-0 h-1 bg-white rounded-lg pointer-events-none"
          style={{ width: `${volume * 100}%` }}
        />
      </div>
    </div>
  );
};
