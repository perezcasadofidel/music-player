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
    <div className="p-6 pb-32 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6">
          <Music2 size={40} className="text-white" />
        </div>
        <h1 className="text-5xl font-bold mb-4">Welcome to MusicPlayer</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Your personal music streaming experience with powerful playlist management and queue control
        </p>
      </div>
      
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play size={24} className="text-green-500" />
          </div>
          <h3 className="font-semibold mb-2">Full Playback Control</h3>
          <p className="text-sm text-gray-400">
            Play, pause, skip, shuffle, and repeat with seamless audio playback
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Music size={24} className="text-blue-500" />
          </div>
          <h3 className="font-semibold mb-2">Smart Playlists</h3>
          <p className="text-sm text-gray-400">
            Create, edit, and manage custom playlists with your favorite tracks
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ListMusic size={24} className="text-purple-500" />
          </div>
          <h3 className="font-semibold mb-2">Dynamic Queue</h3>
          <p className="text-sm text-gray-400">
            Build your queue with "Play Next" and enjoy uninterrupted music
          </p>
        </div>
      </div>
      
      {/* Featured Tracks */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Featured Tracks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSongs.map(song => (
            <div
              key={song.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 hover:scale-105 transition-transform group cursor-pointer"
              onClick={() => handlePlayFeatured(song.id)}
            >
              <img
                src={song.coverUrl}
                alt={song.title}
                className="w-full aspect-square object-cover rounded-lg mb-4 shadow-lg"
              />
              <h3 className="font-semibold mb-1">{song.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{song.artist}</p>
              <button className="w-full py-2 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center gap-2 transition-colors">
                <Play size={18} fill="white" />
                <span>Play Now</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-800 rounded-lg p-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-500">{songs.length}</div>
          <div className="text-sm text-gray-400">Total Songs</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-500">2</div>
          <div className="text-sm text-gray-400">Playlists</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-500">8</div>
          <div className="text-sm text-gray-400">Genres</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-500">50+</div>
          <div className="text-sm text-gray-400">Minutes</div>
        </div>
      </div>
      
      {/* Keyboard Shortcuts */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Keyboard Shortcuts</h2>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4">
              <kbd className="px-3 py-1 bg-gray-700 rounded text-sm font-mono">Space</kbd>
              <span className="text-gray-400">Play / Pause</span>
            </div>
            <div className="flex items-center gap-4">
              <kbd className="px-3 py-1 bg-gray-700 rounded text-sm font-mono">→</kbd>
              <span className="text-gray-400">Next Track</span>
            </div>
            <div className="flex items-center gap-4">
              <kbd className="px-3 py-1 bg-gray-700 rounded text-sm font-mono">←</kbd>
              <span className="text-gray-400">Previous Track</span>
            </div>
            <div className="flex items-center gap-4">
              <kbd className="px-3 py-1 bg-gray-700 rounded text-sm font-mono">Shift + →</kbd>
              <span className="text-gray-400">Seek Forward 10s</span>
            </div>
            <div className="flex items-center gap-4">
              <kbd className="px-3 py-1 bg-gray-700 rounded text-sm font-mono">Shift + ←</kbd>
              <span className="text-gray-400">Seek Backward 10s</span>
            </div>
            <div className="flex items-center gap-4">
              <kbd className="px-3 py-1 bg-gray-700 rounded text-sm font-mono">↑ / ↓</kbd>
              <span className="text-gray-400">Volume Up / Down</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};