import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
    }

    // Add the manifest dynamically
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/pwa-app/manifest.webmanifest';
    document.head.appendChild(manifestLink);

    // Load PWA scripts
    const installScript = document.createElement('script');
    installScript.src = '/pwa-app/install.js';
    document.body.appendChild(installScript);

    const mainScript = document.createElement('script');
    mainScript.src = '/pwa-app/main.js';
    document.body.appendChild(mainScript);

    return () => {
      document.head.removeChild(manifestLink);
      document.body.removeChild(installScript);
      document.body.removeChild(mainScript);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
