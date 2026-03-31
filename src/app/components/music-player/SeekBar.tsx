import React from 'react';
import { useMusicContext } from '../../contexts/MusicContext';

export const SeekBar: React.FC = () => {
  const { currentTime, duration, seekTo } = useMusicContext();
  
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seekTo(newTime);
  };
  
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  
  return (
    <div className="flex items-center gap-3 w-full">
      <span className="text-xs text-gray-400 min-w-[40px] text-right">
        {formatTime(currentTime)}
      </span>
      
      <div className="flex-1 relative group">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          step="0.1"
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
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <span className="text-xs text-gray-400 min-w-[40px]">
        {formatTime(duration)}
      </span>
    </div>
  );
};
