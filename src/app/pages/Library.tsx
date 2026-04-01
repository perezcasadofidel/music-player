import React, { useState } from 'react';
import { useMusicContext } from '../contexts/MusicContext';
import { Play, Plus, MoreVertical } from 'lucide-react';
import { Song } from '../data/mockSongs';
import { toast } from 'sonner';

export const Library: React.FC = () => {
  const { songs, playSong, addToQueue, addToPlayNext, playlists, addSongToPlaylist } = useMusicContext();
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [showAddToPlaylist, setShowAddToPlaylist] = useState<string | null>(null);
  
  const genres = ['All', ...Array.from(new Set(songs.map(s => s.genre)))];
  
  const filteredSongs = selectedGenre === 'All' 
    ? songs 
    : songs.filter(s => s.genre === selectedGenre);
  
  const handlePlaySong = (song: Song) => {
    playSong(song, filteredSongs);
  };
  
  const handleAddToPlaylist = (songId: string, playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId);
    const song = songs.find(s => s.id === songId);
    addSongToPlaylist(playlistId, songId);
    setShowAddToPlaylist(null);
    toast.success(`Added "${song?.title}" to "${playlist?.name}"`);
  };
  
  const handleAddToQueue = (song: Song) => {
    addToQueue(song);
    setShowAddToPlaylist(null);
    toast.success(`Added "${song.title}" to queue`);
  };
  
  const handleAddToPlayNext = (song: Song) => {
    addToPlayNext(song);
    setShowAddToPlaylist(null);
    toast.success(`"${song.title}" will play next`);
  };
  
  return (
    <div className="p-3 md:p-6 pb-32 md:pb-32">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">Your Library</h1>
        <p className="text-sm md:text-base text-gray-400">{songs.length} songs available</p>
      </div>
      
      {/* Genre Filter */}
      <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-full whitespace-nowrap transition-colors ${
              selectedGenre === genre
                ? 'bg-white text-black'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
      
      {/* Songs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {filteredSongs.map(song => (
          <div
            key={song.id}
            className="bg-gray-800 rounded-lg p-3 md:p-4 hover:bg-gray-700 transition-colors group relative"
          >
            <div className="relative mb-3 md:mb-4">
              <img
                src={song.coverUrl}
                alt={song.title}
                className="w-full aspect-square object-cover rounded-md"
              />
              <button
                onClick={() => handlePlaySong(song)}
                className="absolute bottom-2 right-2 w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-full 
                         flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 
                         transform translate-y-0 md:translate-y-2 group-hover:translate-y-0 transition-all
                         hover:scale-105 shadow-lg"
              >
                <Play size={20} className="md:w-6 md:h-6" fill="white" />
              </button>
            </div>
            
            <h3 className="font-semibold truncate mb-0.5 md:mb-1 text-sm md:text-base">{song.title}</h3>
            <p className="text-xs md:text-sm text-gray-400 truncate mb-0.5 md:mb-1">{song.artist}</p>
            <p className="text-xs text-gray-500 truncate hidden md:block">{song.album}</p>
            
            {/* Context Menu */}
            <div className="absolute top-2 right-2">
              <button
                onClick={() => setShowAddToPlaylist(showAddToPlaylist === song.id ? null : song.id)}
                className="p-1.5 md:p-2 rounded-full bg-gray-900/80 opacity-100 md:opacity-0 group-hover:opacity-100 
                         hover:bg-gray-900 transition-all"
              >
                <MoreVertical size={14} className="md:w-4 md:h-4" />
              </button>
              
              {showAddToPlaylist === song.id && (
                <div className="absolute top-full right-0 mt-2 bg-gray-900 rounded-lg 
                              shadow-xl border border-gray-700 py-2 min-w-[180px] md:min-w-[200px] z-10">
                  <button
                    onClick={() => handleAddToQueue(song)}
                    className="w-full px-3 md:px-4 py-2 text-left text-sm hover:bg-gray-800 flex items-center gap-2"
                  >
                    <Plus size={14} className="md:w-4 md:h-4" />
                    Add to Queue
                  </button>
                  <button
                    onClick={() => handleAddToPlayNext(song)}
                    className="w-full px-3 md:px-4 py-2 text-left text-sm hover:bg-gray-800 flex items-center gap-2"
                  >
                    <Plus size={14} className="md:w-4 md:h-4" />
                    Add to Play Next
                  </button>
                  <div className="border-t border-gray-700 my-2" />
                  <div className="px-3 md:px-4 py-1 text-xs text-gray-400">Add to Playlist</div>
                  {playlists.map(playlist => (
                    <button
                      key={playlist.id}
                      onClick={() => handleAddToPlaylist(song.id, playlist.id)}
                      className="w-full px-3 md:px-4 py-2 text-left hover:bg-gray-800 text-sm"
                    >
                      {playlist.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};