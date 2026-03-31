export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string;
  genre: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songs: string[]; // song IDs
  createdAt: string;
}

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Minecraft',
    artist: 'C418',
    album: 'Minecraft - Volume Alpha',
    duration: 254,
    coverUrl: '/images/Minecraft.jpg',
    audioUrl: '/music/Minecraft.mp3',
    genre: 'Electronic'
  },
  {
    id: '2',
    title: 'Cat',
    artist: 'C418',
    album: 'Minecraft - Volume Alpha',
    duration: 186,
    coverUrl: '/images/Minecraft.jpg',
    audioUrl: '/music/Cat.mp3',
    genre: 'Electronic'
  },
  {
    id: '3',
    title: 'Dog',
    artist: 'C418',
    album: 'Minecraft - Volume Alpha',
    duration: 145,
    coverUrl: '/images/Minecraft.jpg',
    audioUrl: '/music/Dog.mp3',
    genre: 'Electronic'
  },
  {
    id: '4',
    title: 'Intro',
    artist: 'C418',
    album: 'Minecraft - Volume Beta',
    duration: 276,
    coverUrl: '/images/Minecraft2.jpg',
    audioUrl: '/music/Intro.mp3',
    genre: 'R&B'
  },
  {
    id: '5',
    title: 'Mutation',
    artist: 'C418',
    album: 'Minecraft - Volume Beta',
    duration: 185,
    coverUrl: '/images/Minecraft2.jpg',
    audioUrl: '/music/Mutation.mp3',
    genre: 'Ambient'
  },
  {
    id: '6',
    title: 'Snakes',
    artist: 'PVRIS & MIYAVI',
    album: 'Arcane',
    duration: 161,
    coverUrl: '/images/Arcane.jpg',
    audioUrl: '/music/Snakes.mp3',
    genre: 'Rock'
  },
  {
    id: '7',
    title: 'Dynasties and Dystopia',
    artist: 'Denzel Curry, GIZZLE, Bren Joy',
    album: 'Arcane',
    duration: 201,
    coverUrl: '/images/Arcane.jpg',
    audioUrl: '/music/Dynasties and Dystopia.mp3',
    genre: 'Indie'
  },
  {
    id: '8',
    title: 'Theme From San Andreas',
    artist: 'Michael Hunter',
    album: 'Grand Theft Auto: San Andrea',
    duration: 88,
    coverUrl: '/images/San Andrea.jpg',
    audioUrl: '/music/Theme From San Andreas.mp3',
    genre: 'Jazz'
  },
  {
    id: '9',
    title: 'Opening Theme',
    artist: 'Brad Breeck',
    album: 'Gravity Falls',
    duration: 40,
    coverUrl: '/images/Gravity Falls.png',
    audioUrl: '/music/Opening Theme.mp3',
    genre: 'Electronic'
  },
  {
    id: '10',
    title: 'Whos Ready for Tomorrow',
    artist: 'Rat Boy',
    album: 'Cyberpunk',
    duration: 117,
    coverUrl: '/images/Cyberpunk.jpg',
    audioUrl: '/music/Whos Ready for Tomorrow.mp3',
    genre: 'Folk'
  },
  {
    id: '11',
    title: 'Health',
    artist: 'Major Crimes',
    album: 'Cyberpunk',
    duration: 214,
    coverUrl: '/images/Cyberpunk.jpg',
    audioUrl: '/music/Health.mp3',
    genre: 'Electronic'
  },
  {
    id: '12',
    title: 'Kevin',
    artist: 'Antigama',
    album: 'Cyberpunk',
    duration: 141,
    coverUrl: '/images/Cyberpunk.jpg',
    audioUrl: '/music/Kevin.mp3',
    genre: 'Ambient'
  }
];

export const defaultPlaylists: Playlist[] = [
  {
    id: 'favorites',
    name: 'Favorites',
    description: 'Your most loved tracks',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    songs: ['1', '2', '3'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'chill',
    name: 'Chill Vibes',
    description: 'Relax and unwind',
    coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
    songs: ['3', '5', '8', '12'],
    createdAt: new Date().toISOString()
  }
];
