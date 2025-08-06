import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import './index.css';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_SENTRY_ENVIRONMENT ?? 'development',
  release: import.meta.env.VITE_SENTRY_RELEASE,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<p>Что-то пошло не так.</p>}>
      <Router />
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
);
