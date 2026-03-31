import React from 'react';
import { Outlet, NavLink } from 'react-router';
import { Home, Library as LibraryIcon, ListMusic, Music2 } from 'lucide-react';
import { Player } from '../components/music-player/Player';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Toaster } from 'sonner';

export const Layout: React.FC = () => {
  useKeyboardControls();
  
  return (
    <>
      <Toaster position="bottom-center" theme="dark" />
      <div className="h-screen flex flex-col bg-gray-900 text-white">
        {/* Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-64 bg-black border-r border-gray-800 flex flex-col">
            {/* Logo */}
            <div className="p-6">
              <div className="flex items-center gap-2">
                <Music2 size={32} className="text-green-500" />
                <h1 className="text-xl font-bold">MusicPlayer</h1>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 px-3">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                  }`
                }
              >
                <Home size={24} />
                <span className="font-medium">Home</span>
              </NavLink>
              
              <NavLink
                to="/library"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                  }`
                }
              >
                <LibraryIcon size={24} />
                <span className="font-medium">Library</span>
              </NavLink>
              
              <NavLink
                to="/playlists"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                  }`
                }
              >
                <Music2 size={24} />
                <span className="font-medium">Playlists</span>
              </NavLink>
              
              <NavLink
                to="/queue"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                    isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                  }`
                }
              >
                <ListMusic size={24} />
                <span className="font-medium">Queue</span>
              </NavLink>
            </nav>
            
            {/* Footer Info */}
            <div className="p-4 text-xs text-gray-500 border-t border-gray-800">
              <p>Music Player Demo</p>
              <p>Built with React & Web Audio API</p>
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
        
        {/* Player */}
        <Player />
      </div>
    </>
  );
};