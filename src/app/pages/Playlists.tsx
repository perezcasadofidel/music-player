import React, { useState } from 'react';
import { useMusicContext } from '../contexts/MusicContext';
import { Plus, Play, MoreVertical, Trash2, Edit2, Music } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const Playlists: React.FC = () => {
  const {
    playlists,
    songs,
    createPlaylist,
    deletePlaylist,
    playSong,
    removeSongFromPlaylist,
    updatePlaylist
  } = useMusicContext();
  
  const navigate = useNavigate();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDesc, setNewPlaylistDesc] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [editingPlaylist, setEditingPlaylist] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  
  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName, newPlaylistDesc);
      setNewPlaylistName('');
      setNewPlaylistDesc('');
      setShowCreateDialog(false);
      toast.success(`Playlist "${newPlaylistName}" created`);
    }
  };
  
  const handlePlayPlaylist = (playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist && playlist.songs.length > 0) {
      const playlistSongs = playlist.songs
        .map(songId => songs.find(s => s.id === songId))
        .filter(Boolean);
      
      if (playlistSongs.length > 0 && playlistSongs[0]) {
        playSong(playlistSongs[0], playlistSongs as any);
        toast.success(`Playing "${playlist.name}"`);
      }
    }
  };
  
  const startEditPlaylist = (playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist) {
      setEditingPlaylist(playlistId);
      setEditName(playlist.name);
      setEditDesc(playlist.description);
    }
  };
  
  const saveEditPlaylist = () => {
    if (editingPlaylist && editName.trim()) {
      updatePlaylist(editingPlaylist, {
        name: editName,
        description: editDesc
      });
      setEditingPlaylist(null);
      toast.success('Playlist updated');
    }
  };
  
  const handleDeletePlaylist = (playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId);
    deletePlaylist(playlistId);
    toast.success(`Deleted "${playlist?.name}"`);
  };
  
  const handleRemoveSong = (playlistId: string, songId: string) => {
    const song = songs.find(s => s.id === songId);
    removeSongFromPlaylist(playlistId, songId);
    toast.success(`Removed "${song?.title}" from playlist`);
  };
  
  const getPlaylistSongs = (playlistId: string) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return [];
    return playlist.songs
      .map(songId => songs.find(s => s.id === songId))
      .filter(Boolean);
  };
  
  return (
    <div className="p-6 pb-32">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Playlists</h1>
          <p className="text-gray-400">{playlists.length} playlists</p>
        </div>
        <button
          onClick={() => setShowCreateDialog(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full 
                   hover:scale-105 transition-transform"
        >
          <Plus size={20} />
          Create Playlist
        </button>
      </div>
      
      {/* Create Playlist Dialog */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
             onClick={() => setShowCreateDialog(false)}>
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md"
               onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Create New Playlist</h2>
            <input
              type="text"
              placeholder="Playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-white"
              autoFocus
            />
            <textarea
              placeholder="Description (optional)"
              value={newPlaylistDesc}
              onChange={(e) => setNewPlaylistDesc(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-white resize-none"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateDialog(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePlaylist}
                className="flex-1 px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-lg transition-colors"
                disabled={!newPlaylistName.trim()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Playlist Dialog */}
      {editingPlaylist && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
             onClick={() => setEditingPlaylist(null)}>
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md"
               onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">Edit Playlist</h2>
            <input
              type="text"
              placeholder="Playlist name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <textarea
              placeholder="Description (optional)"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-white resize-none"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setEditingPlaylist(null)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEditPlaylist}
                className="flex-1 px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-lg transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Playlists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {playlists.map(playlist => {
          const playlistSongs = getPlaylistSongs(playlist.id);
          
          return (
            <div
              key={playlist.id}
              className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors group"
            >
              <div
                className="relative mb-4 cursor-pointer"
                onClick={() => setSelectedPlaylist(selectedPlaylist === playlist.id ? null : playlist.id)}
              >
                {playlistSongs.length > 0 ? (
                  <div className="grid grid-cols-2 grid-rows-2 gap-1 aspect-square rounded-md overflow-hidden">
                    {playlistSongs.slice(0, 4).map((song, idx) => (
                      <img
                        key={idx}
                        src={song!.coverUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ))}
                    {playlistSongs.length < 4 && Array.from({ length: 4 - playlistSongs.length }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="w-full h-full bg-gray-900 flex items-center justify-center">
                        <Music size={24} className="text-gray-700" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-900 rounded-md flex items-center justify-center">
                    <Music size={48} className="text-gray-700" />
                  </div>
                )}
                
                {playlistSongs.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPlaylist(playlist.id);
                    }}
                    className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full 
                             flex items-center justify-center opacity-0 group-hover:opacity-100 
                             transform translate-y-2 group-hover:translate-y-0 transition-all
                             hover:scale-105 shadow-lg"
                  >
                    <Play size={24} fill="white" className="text-white ml-0.5" />
                  </button>
                )}
              </div>
              
              <h3 className="font-semibold truncate mb-1">{playlist.name}</h3>
              <p className="text-sm text-gray-400 truncate mb-2">{playlist.description}</p>
              <p className="text-xs text-gray-500">{playlistSongs.length} songs</p>
              
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => startEditPlaylist(playlist.id)}
                  className="flex-1 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 rounded-md 
                           flex items-center justify-center gap-2 text-sm transition-colors"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePlaylist(playlist.id)}
                  className="flex-1 px-3 py-1.5 bg-red-900/30 hover:bg-red-900/50 rounded-md 
                           flex items-center justify-center gap-2 text-sm transition-colors text-red-400"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
              
              {/* Expanded Song List */}
              {selectedPlaylist === playlist.id && playlistSongs.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h4 className="text-sm font-semibold mb-2">Songs</h4>
                  <div className="space-y-1">
                    {playlistSongs.map((song, idx) => (
                      <div
                        key={song!.id}
                        className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded group/song"
                      >
                        <span className="text-xs text-gray-500 w-4">{idx + 1}</span>
                        <img
                          src={song!.coverUrl}
                          alt={song!.title}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{song!.title}</p>
                          <p className="text-xs text-gray-400 truncate">{song!.artist}</p>
                        </div>
                        <button
                          onClick={() => playSong(song!, playlistSongs as any)}
                          className="opacity-0 group-hover/song:opacity-100 p-1 hover:bg-gray-700 rounded"
                        >
                          <Play size={14} fill="currentColor" />
                        </button>
                        <button
                          onClick={() => handleRemoveSong(playlist.id, song!.id)}
                          className="opacity-0 group-hover/song:opacity-100 p-1 hover:bg-gray-700 rounded text-red-400"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};