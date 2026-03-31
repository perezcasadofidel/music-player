import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { Song, Playlist, mockSongs, defaultPlaylists } from '../data/mockSongs';

type RepeatMode = 'off' | 'all' | 'one';

interface QueueItem {
  song: Song;
  id: string; // unique ID for queue item
}

interface MusicContextType {
  // Audio State
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  
  // Library
  songs: Song[];
  playlists: Playlist[];
  
  // Queue
  queue: QueueItem[];
  currentQueueIndex: number;
  
  // Player Controls
  playSong: (song: Song, queueSource?: Song[]) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  
  // Queue Management
  addToQueue: (song: Song) => void;
  addToPlayNext: (song: Song) => void;
  removeFromQueue: (queueItemId: string) => void;
  clearQueue: () => void;
  playFromQueue: (queueIndex: number) => void;
  
  // Playlist Management
  createPlaylist: (name: string, description: string) => void;
  deletePlaylist: (playlistId: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  updatePlaylist: (playlistId: string, updates: Partial<Playlist>) => void;
  
  // Audio Element Reference
  audioRef: React.RefObject<HTMLAudioElement>;
}

const MusicContext = createContext<MusicContextType | null>(null);

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within MusicProvider');
  }
  return context;
};

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Load state from localStorage
  const [songs] = useState<Song[]>(mockSongs);
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    const saved = localStorage.getItem('playlists');
    return saved ? JSON.parse(saved) : defaultPlaylists;
  });
  
  const [currentSong, setCurrentSong] = useState<Song | null>(() => {
    const saved = localStorage.getItem('currentSong');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [queue, setQueue] = useState<QueueItem[]>(() => {
    const saved = localStorage.getItem('queue');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentQueueIndex, setCurrentQueueIndex] = useState<number>(() => {
    const saved = localStorage.getItem('currentQueueIndex');
    return saved ? JSON.parse(saved) : -1;
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem('volume');
    return saved ? JSON.parse(saved) : 0.7;
  });
  const [isShuffle, setIsShuffle] = useState<boolean>(() => {
    const saved = localStorage.getItem('shuffle');
    return saved ? JSON.parse(saved) : false;
  });
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(() => {
    const saved = localStorage.getItem('repeatMode');
    return saved ? JSON.parse(saved) : 'off';
  });
  
  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);
  
  useEffect(() => {
    if (currentSong) {
      localStorage.setItem('currentSong', JSON.stringify(currentSong));
    }
  }, [currentSong]);
  
  useEffect(() => {
    localStorage.setItem('queue', JSON.stringify(queue));
  }, [queue]);
  
  useEffect(() => {
    localStorage.setItem('currentQueueIndex', JSON.stringify(currentQueueIndex));
  }, [currentQueueIndex]);
  
  useEffect(() => {
    localStorage.setItem('volume', JSON.stringify(volume));
  }, [volume]);
  
  useEffect(() => {
    localStorage.setItem('shuffle', JSON.stringify(isShuffle));
  }, [isShuffle]);
  
  useEffect(() => {
    localStorage.setItem('repeatMode', JSON.stringify(repeatMode));
  }, [repeatMode]);
  
  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => handleSongEnd();
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [repeatMode, currentQueueIndex, queue]);
  
  // Set volume on audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  // Generate unique ID for queue items
  const generateQueueId = () => `queue-${Date.now()}-${Math.random()}`;
  
  // Play song and optionally set queue
  const playSong = useCallback((song: Song, queueSource?: Song[]) => {
    setCurrentSong(song);
    
    if (queueSource) {
      // Create new queue from source
      const newQueue: QueueItem[] = queueSource.map(s => ({
        song: s,
        id: generateQueueId()
      }));
      setQueue(newQueue);
      
      // Find index of current song
      const index = newQueue.findIndex(item => item.song.id === song.id);
      setCurrentQueueIndex(index);
    } else if (queue.length === 0) {
      // If no queue exists, create one with just this song
      const newQueue: QueueItem[] = [{ song, id: generateQueueId() }];
      setQueue(newQueue);
      setCurrentQueueIndex(0);
    } else {
      // Find song in existing queue or add it
      const existingIndex = queue.findIndex(item => item.song.id === song.id);
      if (existingIndex >= 0) {
        setCurrentQueueIndex(existingIndex);
      } else {
        const newQueue = [...queue, { song, id: generateQueueId() }];
        setQueue(newQueue);
        setCurrentQueueIndex(newQueue.length - 1);
      }
    }
    
    // Play audio
    if (audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.load();
      audioRef.current.play().catch(err => console.error('Play error:', err));
    }
  }, [queue]);
  
  const togglePlay = useCallback(() => {
    if (!audioRef.current || !currentSong) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error('Play error:', err));
    }
  }, [isPlaying, currentSong]);
  
  const handleSongEnd = useCallback(() => {
    if (repeatMode === 'one') {
      // Replay current song
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else if (repeatMode === 'all' || currentQueueIndex < queue.length - 1) {
      // Play next song
      playNextTrack();
    } else {
      // Stop playback
      setIsPlaying(false);
    }
  }, [repeatMode, currentQueueIndex, queue]);
  
  const playNextTrack = useCallback(() => {
    if (queue.length === 0) return;
    
    let nextIndex: number;
    
    if (isShuffle) {
      // Random song (but not the current one)
      const availableIndices = queue
        .map((_, i) => i)
        .filter(i => i !== currentQueueIndex);
      nextIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else {
      nextIndex = (currentQueueIndex + 1) % queue.length;
    }
    
    const nextSong = queue[nextIndex].song;
    setCurrentSong(nextSong);
    setCurrentQueueIndex(nextIndex);
    
    if (audioRef.current) {
      audioRef.current.src = nextSong.audioUrl;
      audioRef.current.load();
      audioRef.current.play().catch(err => console.error('Play error:', err));
    }
  }, [queue, currentQueueIndex, isShuffle]);
  
  const playPreviousTrack = useCallback(() => {
    if (queue.length === 0) return;
    
    // If more than 3 seconds have passed, restart current song
    if (currentTime > 3) {
      seekTo(0);
      return;
    }
    
    let prevIndex: number;
    
    if (isShuffle) {
      // Random song (but not the current one)
      const availableIndices = queue
        .map((_, i) => i)
        .filter(i => i !== currentQueueIndex);
      prevIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else {
      prevIndex = currentQueueIndex - 1;
      if (prevIndex < 0) prevIndex = queue.length - 1;
    }
    
    const prevSong = queue[prevIndex].song;
    setCurrentSong(prevSong);
    setCurrentQueueIndex(prevIndex);
    
    if (audioRef.current) {
      audioRef.current.src = prevSong.audioUrl;
      audioRef.current.load();
      audioRef.current.play().catch(err => console.error('Play error:', err));
    }
  }, [queue, currentQueueIndex, currentTime, isShuffle]);
  
  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);
  
  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
  }, []);
  
  const toggleShuffle = useCallback(() => {
    setIsShuffle(prev => !prev);
  }, []);
  
  const toggleRepeat = useCallback(() => {
    setRepeatMode(prev => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  }, []);
  
  // Queue management
  const addToQueue = useCallback((song: Song) => {
    const newItem: QueueItem = { song, id: generateQueueId() };
    setQueue(prev => [...prev, newItem]);
  }, []);
  
  const addToPlayNext = useCallback((song: Song) => {
    const newItem: QueueItem = { song, id: generateQueueId() };
    setQueue(prev => {
      const newQueue = [...prev];
      newQueue.splice(currentQueueIndex + 1, 0, newItem);
      return newQueue;
    });
  }, [currentQueueIndex]);
  
  const removeFromQueue = useCallback((queueItemId: string) => {
    setQueue(prev => {
      const newQueue = prev.filter(item => item.id !== queueItemId);
      const removedIndex = prev.findIndex(item => item.id === queueItemId);
      
      // Adjust current index if needed
      if (removedIndex < currentQueueIndex) {
        setCurrentQueueIndex(currentQueueIndex - 1);
      } else if (removedIndex === currentQueueIndex && newQueue.length > 0) {
        // If removing current song, play next one
        const nextSong = newQueue[Math.min(currentQueueIndex, newQueue.length - 1)].song;
        setCurrentSong(nextSong);
        setCurrentQueueIndex(Math.min(currentQueueIndex, newQueue.length - 1));
        
        if (audioRef.current && isPlaying) {
          audioRef.current.src = nextSong.audioUrl;
          audioRef.current.load();
          audioRef.current.play();
        }
      }
      
      return newQueue;
    });
  }, [currentQueueIndex, isPlaying]);
  
  const clearQueue = useCallback(() => {
    setQueue([]);
    setCurrentQueueIndex(-1);
  }, []);
  
  const playFromQueue = useCallback((queueIndex: number) => {
    if (queueIndex < 0 || queueIndex >= queue.length) return;
    
    const song = queue[queueIndex].song;
    setCurrentSong(song);
    setCurrentQueueIndex(queueIndex);
    
    if (audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.load();
      audioRef.current.play().catch(err => console.error('Play error:', err));
    }
  }, [queue]);
  
  // Playlist management
  const createPlaylist = useCallback((name: string, description: string) => {
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name,
      description,
      coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      songs: [],
      createdAt: new Date().toISOString()
    };
    setPlaylists(prev => [...prev, newPlaylist]);
  }, []);
  
  const deletePlaylist = useCallback((playlistId: string) => {
    setPlaylists(prev => prev.filter(p => p.id !== playlistId));
  }, []);
  
  const addSongToPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists(prev => prev.map(p => {
      if (p.id === playlistId && !p.songs.includes(songId)) {
        return { ...p, songs: [...p.songs, songId] };
      }
      return p;
    }));
  }, []);
  
  const removeSongFromPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists(prev => prev.map(p => {
      if (p.id === playlistId) {
        return { ...p, songs: p.songs.filter(id => id !== songId) };
      }
      return p;
    }));
  }, []);
  
  const updatePlaylist = useCallback((playlistId: string, updates: Partial<Playlist>) => {
    setPlaylists(prev => prev.map(p => {
      if (p.id === playlistId) {
        return { ...p, ...updates };
      }
      return p;
    }));
  }, []);
  
  const value: MusicContextType = {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isShuffle,
    repeatMode,
    songs,
    playlists,
    queue,
    currentQueueIndex,
    playSong,
    togglePlay,
    playNext: playNextTrack,
    playPrevious: playPreviousTrack,
    seekTo,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    addToQueue,
    addToPlayNext,
    removeFromQueue,
    clearQueue,
    playFromQueue,
    createPlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    updatePlaylist,
    audioRef
  };
  
  return (
    <MusicContext.Provider value={value}>
      {children}
      <audio ref={audioRef} />
    </MusicContext.Provider>
  );
};