// Load environment variables first for SSR
require('dotenv').config();

// Set React environment variables for server-side rendering
process.env.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://backend.dawahbox.com/api';
process.env.REACT_APP_API_ADMINISTER_BASE_URL = process.env.REACT_APP_API_ADMINISTER_BASE_URL || 'https://backend.dawahbox.com/administer/api';

// Full SSR Server with React 19
require('@babel/register')({
  presets: [
    ['@babel/preset-env', { 
      targets: { node: 'current' },
      modules: 'commonjs',
      loose: true
    }],
    ['@babel/preset-react', { 
      runtime: 'automatic',
      development: false
    }]
  ],
  ignore: [/node_modules/],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  cache: false
});

// Setup CSS import handling for SSR
require.extensions['.css'] = () => {};
require.extensions['.scss'] = () => {};
require.extensions['.sass'] = () => {};

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
  head: { appendChild: () => {} },
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
// Add axios for server-side API calls
const axios = require('axios');

// Enhanced getSEOData function to handle dynamic routes
const getSEOData = async (pathname) => {
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
    '/dawahcast/recitations': {
      title: 'Quran Recitations - Dawahnigeria',
      description: 'Listen to beautiful Quran recitations from various reciters and learn from Quranic teachings.',
      keywords: 'Quran recitation, Quranic verses, Islamic recitation, Holy Quran'
    }
  };

  // Handle dynamic lecture routes (/dawahcast/l/:id)
  const lectureMatch = pathname.match(/^\/dawahcast\/l\/(\d+)$/);
  if (lectureMatch) {
    const lectureId = lectureMatch[1];
    try {
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/leclistingapi.php?lecid=${lectureId}`;
      
      // Fetch lecture data from API
      const response = await axios.get(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-project': '206cf92c-8a46-45ef-bf3f-a6ef92fc6f25',
          'Origin': 'https://dawahnigeria.com',
          'Referer': 'https://dawahnigeria.com/',
          'User-Agent': 'DawahNigeria-SSR/1.0'
        },
        timeout: 8000
      });
      
      if (response.data && response.data[0]) {
        const lecture = response.data[0];
        const title = lecture.title || lecture.Title || 'Islamic Lecture';
        const lecturer = lecture.rpname || 'Islamic Scholar';
        const description = lecture.description || 
          `Listen to "${title}" by ${lecturer} on Dawahnigeria. Explore Islamic lectures, teachings, and spiritual guidance.`;
        
        return {
          title: `${title} - ${lecturer} | Dawahnigeria`,
          description: description.substring(0, 160), // SEO optimal length
          keywords: `${title}, ${lecturer}, Islamic lecture, Islamic education, dawah, Nigeria, ${lecture.cats || 'Islamic teachings'}`,
          ogImage: lecture.img || 'https://pub-09f814adc0704e7db8ea3d3ad843eb7e.r2.dev/dn-banner.jpeg',
          ogType: 'article',
          lectureData: lecture // Pass lecture data for additional meta tags
        };
      }
    } catch (error) {
      console.error(`Error fetching lecture data for ID ${lectureId}:`, error.message);
    }
    
    // Fallback SEO data for lecture pages
    return {
      title: `Islamic Lecture ${lectureId} | Dawahnigeria`,
      description: 'Explore Islamic lectures and teachings on Dawahnigeria - Your source for Islamic knowledge and spiritual guidance.',
      keywords: 'Islamic lecture, Islamic education, dawah, Nigeria, Islamic teachings',
      ogImage: 'https://pub-09f814adc0704e7db8ea3d3ad843eb7e.r2.dev/dn-banner.jpeg',
      ogType: 'article',
      lectureData: null
    };
  }

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
app.get('*', async (req, res) => {
  const indexPath = path.join(__dirname, '../build/index.html');
  
  if (!fs.existsSync(indexPath)) {
    return res.status(404).send('Build not found. Please run yarn build first.');
  }

  fs.readFile(indexPath, 'utf8', async (err, htmlData) => {
    if (err) {
      console.error('Error reading HTML template:', err);
      return res.status(500).send('Internal Server Error');
    }

    try {
      // Get SEO data for current route (now async)
      const seoData = await getSEOData(req.path);
      
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
          <meta property="og:type" content="${seoData.ogType || 'website'}">
          <meta property="og:site_name" content="Dawahnigeria">
          <meta property="og:image" content="${seoData.ogImage || 'https://pub-09f814adc0704e7db8ea3d3ad843eb7e.r2.dev/dn-banner.jpeg'}">
          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:title" content="${seoData.title}">
          <meta name="twitter:description" content="${seoData.description}">
          <meta name="twitter:image" content="${seoData.ogImage || 'https://pub-09f814adc0704e7db8ea3d3ad843eb7e.r2.dev/dn-banner.jpeg'}">
          ${seoData.lectureData ? `
          <meta property="article:author" content="${seoData.lectureData.rpname || ''}">
          <meta property="article:section" content="${seoData.lectureData.cats || 'Islamic Education'}">
          <meta name="audio" content="${seoData.lectureData.audio || ''}">
          ` : ''}
          <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')};</script>
          <script>window.__LECTURE_DATA__ = ${seoData.lectureData ? JSON.stringify(seoData.lectureData).replace(/</g, '\\u003c') : 'null'};</script>
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
          console.error('Full error:', error.stack);
          if (error.loc) {
            console.error('Error location:', error.loc);
          }
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