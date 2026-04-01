import React, { useEffect } from 'react';
import { useMusicContext } from '../contexts/MusicContext';
import { Play, Music, ListMusic, Music2 } from 'lucide-react';

export const Welcome: React.FC = () => {
  const { songs, playSong } = useMusicContext();
  
  // Featured songs (first 3)
  const featuredSongs = songs.slice(0, 3);
  
  const handlePlayFeatured = (songId: string) => {
    const song = songs.find(s => s.id === songId);
    if (song) {
      playSong(song, songs);
    }
  };
  
  return (
    <div className="p-3 md:p-6 pb-32 md:pb-32 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-8 md:mb-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 md:mb-6">
          <Music2 size={32} className="md:w-10 md:h-10 text-white" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">Welcome to MusicPlayer</h1>
        <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
          Your personal music streaming experience with powerful playlist management and queue control
        </p>
      </div>
      
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Play size={20} className="md:w-6 md:h-6 text-green-500" />
          </div>
          <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Full Playback Control</h3>
          <p className="text-xs md:text-sm text-gray-400">
            Play, pause, skip, shuffle, and repeat with seamless audio playback
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Music size={20} className="md:w-6 md:h-6 text-blue-500" />
          </div>
          <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Smart Playlists</h3>
          <p className="text-xs md:text-sm text-gray-400">
            Create, edit, and manage custom playlists with your favorite tracks
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <ListMusic size={20} className="md:w-6 md:h-6 text-purple-500" />
          </div>
          <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Dynamic Queue</h3>
          <p className="text-xs md:text-sm text-gray-400">
            Build your queue with "Play Next" and enjoy uninterrupted music
          </p>
        </div>
      </div>
      
      {/* Featured Tracks */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Featured Tracks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {featuredSongs.map(song => (
            <div
              key={song.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 md:p-6 hover:scale-105 transition-transform group cursor-pointer"
              onClick={() => handlePlayFeatured(song.id)}
            >
              <img
                src={song.coverUrl}
                alt={song.title}
                className="w-full aspect-square object-cover rounded-lg mb-3 md:mb-4 shadow-lg"
              />
              <h3 className="font-semibold mb-0.5 md:mb-1 text-sm md:text-base">{song.title}</h3>
              <p className="text-xs md:text-sm text-gray-400 mb-2 md:mb-3">{song.artist}</p>
              <button className="w-full py-2 text-sm md:text-base bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center gap-2 transition-colors">
                <Play size={16} className="md:w-[18px] md:h-[18px]" fill="white" />
                <span>Play Now</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 bg-gray-800 rounded-lg p-4 md:p-6 mb-6 md:mb-12">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-green-500">{songs.length}</div>
          <div className="text-xs md:text-sm text-gray-400">Total Songs</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-blue-500">2</div>
          <div className="text-xs md:text-sm text-gray-400">Playlists</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-purple-500">8</div>
          <div className="text-xs md:text-sm text-gray-400">Genres</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-orange-500">50+</div>
          <div className="text-xs md:text-sm text-gray-400">Minutes</div>
        </div>
      </div>
      
      {/* Keyboard Shortcuts */}
      <div className="mt-8 md:mt-12">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Keyboard Shortcuts</h2>
        <div className="bg-gray-800 rounded-lg p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <kbd className="px-2 md:px-3 py-1 bg-gray-700 rounded text-xs md:text-sm font-mono">Space</kbd>
              <span className="text-xs md:text-base text-gray-400">Play / Pause</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <kbd className="px-2 md:px-3 py-1 bg-gray-700 rounded text-xs md:text-sm font-mono">→</kbd>
              <span className="text-xs md:text-base text-gray-400">Next Track</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <kbd className="px-2 md:px-3 py-1 bg-gray-700 rounded text-xs md:text-sm font-mono">←</kbd>
              <span className="text-xs md:text-base text-gray-400">Previous Track</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <kbd className="px-2 md:px-3 py-1 bg-gray-700 rounded text-xs md:text-sm font-mono whitespace-nowrap">Shift + →</kbd>
              <span className="text-xs md:text-base text-gray-400">Seek Forward 10s</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <kbd className="px-2 md:px-3 py-1 bg-gray-700 rounded text-xs md:text-sm font-mono whitespace-nowrap">Shift + ←</kbd>
              <span className="text-xs md:text-base text-gray-400">Seek Backward 10s</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <kbd className="px-2 md:px-3 py-1 bg-gray-700 rounded text-xs md:text-sm font-mono">↑ / ↓</kbd>
              <span className="text-xs md:text-base text-gray-400">Volume Up / Down</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};