import React from 'react';
import { useMusicContext } from '../contexts/MusicContext';
import { X, Play, Music } from 'lucide-react';

export const Queue: React.FC = () => {
  const {
    queue,
    currentQueueIndex,
    removeFromQueue,
    clearQueue,
    playFromQueue,
    currentSong
  } = useMusicContext();
  
  if (queue.length === 0) {
    return (
      <div className="p-6 pb-32 flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
        <Music size={64} className="text-gray-700 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No songs in queue</h2>
        <p className="text-gray-400">Play a song to start building your queue</p>
      </div>
    );
  }
  
  const upNext = queue.slice(currentQueueIndex + 1);
  const history = queue.slice(0, currentQueueIndex);
  
  return (
    <div className="p-6 pb-32 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Queue</h1>
          <p className="text-gray-400">{queue.length} songs</p>
        </div>
        <button
          onClick={clearQueue}
          className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 rounded-full 
                   text-red-400 transition-colors"
        >
          Clear Queue
        </button>
      </div>
      
      {/* Now Playing */}
      {currentSong && currentQueueIndex >= 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase mb-3">Now Playing</h2>
          <div className="bg-gradient-to-r from-green-900/30 to-transparent rounded-lg p-4 
                        border-l-4 border-green-500">
            <div className="flex items-center gap-4">
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{currentSong.title}</h3>
                <p className="text-sm text-gray-400 truncate">{currentSong.artist}</p>
                <p className="text-xs text-gray-500 truncate">{currentSong.album}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <Play size={16} fill="white" className="text-white ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Up Next */}
      {upNext.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase mb-3">
            Up Next ({upNext.length})
          </h2>
          <div className="space-y-2">
            {upNext.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 
                         transition-colors group"
              >
                <span className="text-sm text-gray-500 w-6">{idx + 1}</span>
                <img
                  src={item.song.coverUrl}
                  alt={item.song.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{item.song.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{item.song.artist}</p>
                </div>
                <button
                  onClick={() => playFromQueue(currentQueueIndex + idx + 1)}
                  className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-700 
                           rounded-full transition-opacity"
                  title="Play now"
                >
                  <Play size={18} fill="currentColor" />
                </button>
                <button
                  onClick={() => removeFromQueue(item.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-700 
                           rounded-full transition-opacity text-red-400"
                  title="Remove from queue"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* History */}
      {history.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase mb-3">
            Previously Played ({history.length})
          </h2>
          <div className="space-y-2 opacity-60">
            {history.reverse().map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 
                         transition-colors group hover:opacity-100"
              >
                <img
                  src={item.song.coverUrl}
                  alt={item.song.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{item.song.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{item.song.artist}</p>
                </div>
                <button
                  onClick={() => playFromQueue(history.length - idx - 1)}
                  className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-700 
                           rounded-full transition-opacity"
                  title="Play again"
                >
                  <Play size={18} fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
