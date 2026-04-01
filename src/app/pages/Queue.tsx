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
      <div className="p-3 md:p-6 pb-32 flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
        <Music size={48} className="md:w-16 md:h-16 text-gray-700 mb-3 md:mb-4" />
        <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">No songs in queue</h2>
        <p className="text-sm md:text-base text-gray-400">Play a song to start building your queue</p>
      </div>
    );
  }
  
  const upNext = queue.slice(currentQueueIndex + 1);
  const history = queue.slice(0, currentQueueIndex);
  
  return (
    <div className="p-3 md:p-6 pb-32 md:pb-32 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">Queue</h1>
          <p className="text-sm md:text-base text-gray-400">{queue.length} songs</p>
        </div>
        <button
          onClick={clearQueue}
          className="px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base bg-red-900/30 hover:bg-red-900/50 rounded-full 
                   text-red-400 transition-colors"
        >
          Clear
        </button>
      </div>
      
      {/* Now Playing */}
      {currentSong && currentQueueIndex >= 0 && (
        <div className="mb-6 md:mb-8">
          <h2 className="text-xs md:text-sm font-semibold text-gray-400 uppercase mb-2 md:mb-3">Now Playing</h2>
          <div className="bg-gradient-to-r from-green-900/30 to-transparent rounded-lg p-3 md:p-4 
                        border-l-4 border-green-500">
            <div className="flex items-center gap-3 md:gap-4">
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="w-12 h-12 md:w-16 md:h-16 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate text-sm md:text-base">{currentSong.title}</h3>
                <p className="text-xs md:text-sm text-gray-400 truncate">{currentSong.artist}</p>
                <p className="text-xs text-gray-500 truncate hidden md:block">{currentSong.album}</p>
              </div>
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <Play size={14} className="md:w-4 md:h-4" fill="white" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Up Next */}
      {upNext.length > 0 && (
        <div className="mb-6 md:mb-8">
          <h2 className="text-xs md:text-sm font-semibold text-gray-400 uppercase mb-2 md:mb-3">
            Up Next ({upNext.length})
          </h2>
          <div className="space-y-1.5 md:space-y-2">
            {upNext.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center gap-2 md:gap-4 p-2 md:p-3 rounded-lg hover:bg-gray-800 
                         transition-colors group"
              >
                <span className="text-xs md:text-sm text-gray-500 w-4 md:w-6">{idx + 1}</span>
                <img
                  src={item.song.coverUrl}
                  alt={item.song.title}
                  className="w-10 h-10 md:w-12 md:h-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate text-sm md:text-base">{item.song.title}</h3>
                  <p className="text-xs md:text-sm text-gray-400 truncate">{item.song.artist}</p>
                </div>
                <button
                  onClick={() => playFromQueue(currentQueueIndex + idx + 1)}
                  className="opacity-100 md:opacity-0 group-hover:opacity-100 p-1.5 md:p-2 hover:bg-gray-700 
                           rounded-full transition-opacity"
                  title="Play now"
                >
                  <Play size={16} className="md:w-[18px] md:h-[18px]" fill="currentColor" />
                </button>
                <button
                  onClick={() => removeFromQueue(item.id)}
                  className="opacity-100 md:opacity-0 group-hover:opacity-100 p-1.5 md:p-2 hover:bg-gray-700 
                           rounded-full transition-opacity text-red-400"
                  title="Remove from queue"
                >
                  <X size={16} className="md:w-[18px] md:h-[18px]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* History */}
      {history.length > 0 && (
        <div>
          <h2 className="text-xs md:text-sm font-semibold text-gray-400 uppercase mb-2 md:mb-3">
            Previously Played ({history.length})
          </h2>
          <div className="space-y-1.5 md:space-y-2 opacity-60">
            {history.reverse().map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center gap-2 md:gap-4 p-2 md:p-3 rounded-lg hover:bg-gray-800 
                         transition-colors group hover:opacity-100"
              >
                <img
                  src={item.song.coverUrl}
                  alt={item.song.title}
                  className="w-10 h-10 md:w-12 md:h-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate text-sm md:text-base">{item.song.title}</h3>
                  <p className="text-xs md:text-sm text-gray-400 truncate">{item.song.artist}</p>
                </div>
                <button
                  onClick={() => playFromQueue(history.length - idx - 1)}
                  className="opacity-100 md:opacity-0 group-hover:opacity-100 p-1.5 md:p-2 hover:bg-gray-700 
                           rounded-full transition-opacity"
                  title="Play again"
                >
                  <Play size={16} className="md:w-[18px] md:h-[18px]" fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};