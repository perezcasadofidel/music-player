import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Welcome } from './pages/Welcome';
import { Library } from './pages/Library';
import { Playlists } from './pages/Playlists';
import { Queue } from './pages/Queue';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Welcome
      },
      {
        path: 'library',
        Component: Library
      },
      {
        path: 'playlists',
        Component: Playlists
      },
      {
        path: 'queue',
        Component: Queue
      }
    ]
  }
]);