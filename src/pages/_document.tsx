import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta tags for device compatibility */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=yes, minimum-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        
        {/* iOS Safari specific */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Rajeev Ranjan Portfolio" />
        
        {/* Android Chrome specific */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Rajeev Ranjan Portfolio" />
        
        {/* Windows Phone specific */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Performance optimizations */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/textures/clouds-earth.png" as="image" />
        <link rel="preload" href="/myphoto.png" as="image" />
        
        {/* Fonts with display=swap for better performance */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicon for all devices */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        
        {/* SEO and Social Media */}
        <meta name="description" content="Rajeev Ranjan - Full Stack Developer & AI Enthusiast. Portfolio showcasing web development, machine learning, and innovative projects." />
        <meta name="keywords" content="Full Stack Developer, AI, Machine Learning, React, Next.js, Python, Portfolio" />
        <meta name="author" content="Rajeev Ranjan" />
        
        {/* Disable zoom on inputs for iOS */}
        <style>{`
          @media screen and (-webkit-min-device-pixel-ratio:0) and (max-width: 768px) {
            select, textarea, input[type="text"], input[type="password"], 
            input[type="datetime"], input[type="datetime-local"], 
            input[type="date"], input[type="month"], input[type="time"], 
            input[type="week"], input[type="number"], input[type="email"], 
            input[type="url"], input[type="search"], input[type="tel"] {
              font-size: 16px !important;
            }
          }
        `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
