import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import ThemeProvider from './providers/ThemeProvider';
import { store } from './rtk/store';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('app') as Element;

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

serviceWorker.unregister();
