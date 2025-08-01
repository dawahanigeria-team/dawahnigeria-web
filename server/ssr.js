// Load environment variables first for SSR
require('dotenv').config();

// Set React environment variables for server-side rendering
process.env.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://backend.dawahbox.com/api';
process.env.REACT_APP_API_ADMINISTER_BASE_URL = process.env.REACT_APP_API_ADMINISTER_BASE_URL || 'https://backend.dawahbox.com/administer/api';

// Full SSR Server with React 19
require('@babel/register')({
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: [
    ['@babel/plugin-transform-modules-commonjs']
  ],
  ignore: [/node_modules/]
});

// Setup browser globals for SSR compatibility
global.window = {
  location: { href: '', origin: '', search: '', pathname: '/' },
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  addEventListener: () => {},
  removeEventListener: () => {},
  navigator: { userAgent: 'SSR' },
  document: { getElementById: () => null, addEventListener: () => {} }
};

// Mock fetch for SSR to prevent API calls during server rendering
global.fetch = global.fetch || (() => {
  console.log('🚫 API call intercepted during SSR - using fallback');
  return Promise.resolve({
    ok: false,
    status: 503,
    json: () => Promise.resolve({ data: [] }),
    text: () => Promise.resolve('')
  });
});

global.document = {
  getElementById: () => null,
  getElementsByTagName: () => [],
  createElement: () => ({ 
    appendChild: () => {}, 
    setAttribute: () => {},
    style: {},
    id: '',
    src: '',
    async: false,
    defer: false
  }),
  addEventListener: () => {},
  body: { appendChild: () => {} }
};

global.navigator = { userAgent: 'SSR' };
global.localStorage = global.window.localStorage;
global.sessionStorage = global.window.sessionStorage;

const express = require('express');
const React = require('react');
const { renderToPipeableStream } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const { Provider } = require('react-redux');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression());
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../build')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Full SSR Server with React 19 running' });
});

// Route-specific SEO data
const getSEOData = (pathname) => {
  const routes = {
    '/': {
      title: 'Dawahnigeria - Your Source for Islamic Knowledge',
      description: 'Access a vast library of Islamic lectures, Quran recitations, videos, and playlists from various scholars and genres on Dawahnigeria.',
      keywords: 'Islamic lectures, Quran, Islamic education, dawah, Nigeria'
    },
    '/dawahcast': {
      title: 'Dawahnigeria - Your Source for Islamic Knowledge',
      description: 'Access a vast library of Islamic lectures, Quran recitations, videos, and playlists from various scholars and genres on Dawahnigeria.',
      keywords: 'Islamic lectures, Quran, Islamic education, dawah, Nigeria'
    },
    '/dawahcast/trending': {
      title: 'Trending Islamic Content - Dawahnigeria',
      description: 'Discover the most popular Islamic lectures, videos, and content trending on Dawahnigeria.',
      keywords: 'trending Islamic content, popular lectures, viral Islamic videos'
    },
    '/dawahcast/lecturers': {
      title: 'Islamic Lecturers & Scholars - Dawahnigeria',
      description: 'Browse our collection of renowned Islamic lecturers and scholars from around the world.',
      keywords: 'Islamic scholars, lecturers, Islamic teachers, religious speakers'
    },
    '/dawahcast/genres': {
      title: 'Islamic Content by Genre - Dawahnigeria',
      description: 'Explore Islamic content organized by topics and genres including Quran, Hadith, Fiqh, and more.',
      keywords: 'Islamic genres, Quran, Hadith, Fiqh, Islamic topics'
    },
    '/dawahcast/quran': {
      title: 'Quran Recitations - Dawahnigeria',
      description: 'Listen to beautiful Quran recitations from various reciters and learn from Quranic teachings.',
      keywords: 'Quran recitation, Quranic verses, Islamic recitation, Holy Quran'
    }
  };

  return routes[pathname] || routes['/'];
};

// Create Redux store for SSR
const createServerStore = () => {
  let rootReducer;
  
  try {
    rootReducer = require('../src/Redux/Reducer/index.js').default;
  } catch (error) {
    console.log('Using fallback reducer due to import error:', error.message);
    // Fallback reducer
    rootReducer = (state = {
      user: { currentUser: null, theme: 'light' },
      search: { results: [] }
    }, action) => state;
  }
  
  return createStore(rootReducer, applyMiddleware(thunk));
};

// Full SSR handler with React 19 streaming
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../build/index.html');
  
  if (!fs.existsSync(indexPath)) {
    return res.status(404).send('Build not found. Please run yarn build first.');
  }

  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error reading HTML template:', err);
      return res.status(500).send('Internal Server Error');
    }

    try {
      // Get SEO data for current route
      const seoData = getSEOData(req.path);
      
      // Create store for this request
      const store = createServerStore();
      const initialState = store.getState();
      
      // Update global window location for the current request
      global.window.location.pathname = req.path;
      global.window.location.href = req.protocol + '://' + req.get('host') + req.originalUrl;
      
      // Split HTML template
      const [htmlStart, htmlEnd] = htmlData.split('<div id="root"></div>');
      
      // Enhanced HTML with SEO data and initial state
      const enhancedHtmlStart = htmlStart
        .replace(/<title>.*?<\/title>/, `<title>${seoData.title}</title>`)
        .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${seoData.description}"`)
        .replace(
          '</head>',
          `<meta name="keywords" content="${seoData.keywords}">
          <meta property="og:title" content="${seoData.title}">
          <meta property="og:description" content="${seoData.description}">
          <meta property="og:url" content="${req.protocol}://${req.get('host')}${req.originalUrl}">
          <meta property="og:type" content="website">
          <meta property="og:site_name" content="Dawahnigeria">
          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:title" content="${seoData.title}">
          <meta name="twitter:description" content="${seoData.description}">
          <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')};</script>
          </head>`
        );

      // Set response headers
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write(enhancedHtmlStart + '<div id="root">');

      let didError = false;

      try {
        // Load App component dynamically to avoid import issues
        let App;
        try {
          App = require('../src/App.jsx').default;
        } catch (error) {
          console.error('Could not load App component, using fallback:', error.message);
          // Fallback App component
          App = () => React.createElement('div', { 
            style: { padding: '20px', textAlign: 'center' }
          }, 
            React.createElement('h1', {}, seoData.title),
            React.createElement('p', {}, seoData.description),
            React.createElement('div', { id: 'app-loading' }, 'Loading application...')
          );
        }

        // Use React 19's streaming SSR
        const stream = renderToPipeableStream(
          React.createElement(Provider, { store },
            React.createElement(StaticRouter, { location: req.url },
              React.createElement(App)
            )
          ),
          {
            onShellReady() {
              console.log('Shell ready for:', req.path);
              stream.pipe(res, { end: false });
            },
            onShellError(error) {
              console.error('Shell Error for', req.path, ':', error);
              didError = true;
              res.statusCode = 500;
              // Provide fallback content
              res.write(`
                <div style="padding: 20px; text-align: center;">
                  <h1>${seoData.title}</h1>
                  <p>${seoData.description}</p>
                  <div id="fallback-loading">Loading application...</div>
                </div>
              `);
              res.write('</div>' + htmlEnd);
              res.end();
            },
            onAllReady() {
              console.log('All ready for:', req.path);
              res.write('</div>' + htmlEnd);
              res.end();
            },
            onError(error) {
              console.error('Stream Error for', req.path, ':', error);
              didError = true;
            }
          }
        );

        // Handle timeout
        setTimeout(() => {
          if (!didError) {
            console.log('Stream timeout for:', req.path);
            stream.abort();
          }
        }, 10000);

      } catch (error) {
        console.error('SSR Error for', req.path, ':', error);
        // Fallback with SEO-optimized content
        res.write(`
          <div style="padding: 20px; text-align: center;">
            <h1>${seoData.title}</h1>
            <p>${seoData.description}</p>
            <div id="ssr-fallback">Loading application...</div>
          </div>
        `);
        res.write('</div>' + htmlEnd);
        res.end();
      }

    } catch (error) {
      console.error('Request Error for', req.path, ':', error);
      // Final fallback
      const enhancedHtml = htmlData.replace(
        '</head>',
        `<script>window.__INITIAL_STATE__ = {};</script></head>`
      );
      res.send(enhancedHtml);
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Full SSR Server with React 19 running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 SEO-optimized pages ready for crawling`);
  console.log(`🔧 API Base URL: ${process.env.REACT_APP_API_BASE_URL}`);
  console.log(`🔧 Admin API URL: ${process.env.REACT_APP_API_ADMINISTER_BASE_URL}`);
});