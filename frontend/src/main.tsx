import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HomeScreen from './screens/HomeScreens.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
    </Route>
  )
);

// The '!' tells TypeScript that we know this element exists.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);