import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router';
import { Home, Library as LibraryIcon, ListMusic, Music2, Menu, X } from 'lucide-react';
import { Player } from '../components/music-player/Player';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Toaster } from 'sonner';

export const Layout: React.FC = () => {
  useKeyboardControls();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <>
      <Toaster position="bottom-center" theme="dark" />
      <div className="h-screen flex flex-col bg-gray-900 text-white">
        {/* Mobile Header */}
        <div className="md:hidden bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music2 size={24} className="text-green-500" />
            <h1 className="text-lg font-bold">MusicPlayer</h1>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/70 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <aside 
              className="w-64 h-full bg-black border-r border-gray-800 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
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
                  onClick={() => setIsMobileMenuOpen(false)}
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
                  onClick={() => setIsMobileMenuOpen(false)}
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
                  onClick={() => setIsMobileMenuOpen(false)}
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
                  onClick={() => setIsMobileMenuOpen(false)}
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
          </div>
        )}

        {/* Main Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar */}
          <aside className="hidden md:flex w-64 bg-black border-r border-gray-800 flex-col">
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

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden bg-black border-t border-gray-800 px-2 py-2 flex items-center justify-around">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isActive ? 'text-white' : 'text-gray-400'
              }`
            }
          >
            <Home size={20} />
            <span className="text-xs">Home</span>
          </NavLink>
          
          <NavLink
            to="/library"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isActive ? 'text-white' : 'text-gray-400'
              }`
            }
          >
            <LibraryIcon size={20} />
            <span className="text-xs">Library</span>
          </NavLink>
          
          <NavLink
            to="/playlists"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isActive ? 'text-white' : 'text-gray-400'
              }`
            }
          >
            <Music2 size={20} />
            <span className="text-xs">Playlists</span>
          </NavLink>
          
          <NavLink
            to="/queue"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isActive ? 'text-white' : 'text-gray-400'
              }`
            }
          >
            <ListMusic size={20} />
            <span className="text-xs">Queue</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};