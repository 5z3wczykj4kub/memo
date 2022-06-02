import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
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
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

serviceWorker.unregister();
