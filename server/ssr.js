// Load environment variables first for SSR
require('dotenv').config();

// Set React environment variables for server-side rendering
process.env.REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://backend.dawahbox.com/api';
process.env.REACT_APP_API_ADMINISTER_BASE_URL = process.env.REACT_APP_API_ADMINISTER_BASE_URL || 'https://backend.dawahbox.com/administer/api';

// Sentry (server) initialization
const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'production',
  release: process.env.SENTRY_RELEASE,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1'),
  profilesSampleRate: parseFloat(process.env.SENTRY_PROFILES_SAMPLE_RATE || '0.0'),
  sendDefaultPii: true,
});
process.on('unhandledRejection', (reason) => {
  try { Sentry.captureException(reason); } catch (e) {}
});
process.on('uncaughtException', (err) => {
  try { Sentry.captureException(err); } catch (e) {}
});

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

// Setup CSS and asset import handling for SSR
require.extensions['.css'] = () => {};
require.extensions['.scss'] = () => {};
require.extensions['.sass'] = () => {};

// Setup asset import handling for SSR - return placeholder paths
const createAssetHandler = (ext) => (module, filename) => {
  const path = require('path');
  const relativePath = path.relative(process.cwd(), filename).replace(/\\/g, '/');
  const publicPath = '/' + relativePath.replace(/^src\//, '');
  module.exports = publicPath;
};

require.extensions['.svg'] = createAssetHandler('.svg');
require.extensions['.png'] = createAssetHandler('.png');
require.extensions['.jpg'] = createAssetHandler('.jpg');
require.extensions['.jpeg'] = createAssetHandler('.jpeg');
require.extensions['.gif'] = createAssetHandler('.gif');
require.extensions['.ico'] = createAssetHandler('.ico');

// Setup browser globals for SSR compatibility
global.window = {
  location: { href: '', origin: '', search: '', pathname: '/' },
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  addEventListener: () => {},
  removeEventListener: () => {},
  navigator: { userAgent: 'SSR' },
  document: { getElementById: () => null, addEventListener: () => {} },
  getComputedStyle: () => ({}),
  matchMedia: () => ({ matches: false, addListener: () => {}, removeListener: () => {} }),
  requestAnimationFrame: (cb) => setTimeout(cb, 0),
  cancelAnimationFrame: () => {},
  performance: { now: () => Date.now() },
  history: { pushState: () => {}, replaceState: () => {}, go: () => {} },
  screen: { width: 1024, height: 768 },
  innerWidth: 1024,
  innerHeight: 768,
  devicePixelRatio: 1
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
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement: () => ({ 
    appendChild: () => {}, 
    setAttribute: () => {},
    getAttribute: () => null,
    removeAttribute: () => {},
    classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} },
    style: {},
    id: '',
    src: '',
    className: '',
    textContent: '',
    innerHTML: '',
    async: false,
    defer: false,
    nodeType: 1,
    childNodes: [],
    parentNode: null
  }),
  createTextNode: (text) => ({ textContent: text, nodeType: 3 }),
  addEventListener: () => {},
  removeEventListener: () => {},
  head: { 
    appendChild: () => {},
    removeChild: () => {},
    insertBefore: () => {},
    childNodes: []
  },
  body: { 
    appendChild: () => {},
    removeChild: () => {},
    insertBefore: () => {},
    childNodes: [],
    style: {}
  },
  documentElement: {
    style: {},
    classList: { add: () => {}, remove: () => {}, contains: () => false }
  },
  defaultView: global.window
};

global.navigator = { userAgent: 'SSR' };
global.localStorage = global.window.localStorage;
global.sessionStorage = global.window.sessionStorage;

// Additional globals for CSS-in-JS libraries like goober
global.getComputedStyle = global.window.getComputedStyle;
global.matchMedia = global.window.matchMedia;
global.requestAnimationFrame = global.window.requestAnimationFrame;
global.cancelAnimationFrame = global.window.cancelAnimationFrame;
global.performance = global.window.performance;
global.history = global.window.history;
global.screen = global.window.screen;

// Ensure Object.assign exists and works properly
if (!Object.assign) {
  Object.assign = function(target, ...sources) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    const to = Object(target);
    for (let source of sources) {
      if (source != null) {
        for (let key in source) {
          if (source.hasOwnProperty && source.hasOwnProperty(key)) {
            to[key] = source[key];
          }
        }
      }
    }
    return to;
  };
}

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
      title: 'dawahnigeria - Your Source for Islamic Knowledge',
      description: 'Access a vast library of Islamic lectures, Quran recitations, videos, and playlists from various scholars and genres on dawahnigeria.',
      keywords: 'Islamic lectures, Quran, Islamic education, dawah, Nigeria'
    },
    '/dawahcast': {
      title: 'dawahnigeria - Your Source for Islamic Knowledge',
      description: 'Access a vast library of Islamic lectures, Quran recitations, videos, and playlists from various scholars and genres on dawahnigeria.',
      keywords: 'Islamic lectures, Quran, Islamic education, dawah, Nigeria'
    },
    '/dawahcast/trending': {
      title: 'Trending Islamic Content - dawahnigeria',
      description: 'Discover the most popular Islamic lectures, videos, and content trending on dawahnigeria.',
      keywords: 'trending Islamic content, popular lectures, viral Islamic videos'
    },
    '/dawahcast/lecturers': {
      title: 'Islamic Lecturers & Scholars - dawahnigeria',
      description: 'Browse our collection of renowned Islamic lecturers and scholars from around the world.',
      keywords: 'Islamic scholars, lecturers, Islamic teachers, religious speakers'
    },
    '/dawahcast/genres': {
      title: 'Islamic Content by Genre - dawahnigeria',
      description: 'Explore Islamic content organized by topics and genres including Quran, Hadith, Fiqh, and more.',
      keywords: 'Islamic genres, Quran, Hadith, Fiqh, Islamic topics'
    },
    '/dawahcast/recitations': {
      title: 'Quran Recitations - dawahnigeria',
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
          `Listen to "${title}" by ${lecturer} on dawahnigeria. Explore Islamic lectures, teachings, and spiritual guidance.`;
        
        return {
          title: `${title} - ${lecturer} | dawahnigeria`,
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
      title: `Islamic Lecture ${lectureId} | dawahnigeria`,
      description: 'Explore Islamic lectures and teachings on dawahnigeria - Your source for Islamic knowledge and spiritual guidance.',
      keywords: 'Islamic lecture, Islamic education, dawah, Nigeria, Islamic teachings',
      ogImage: 'https://pub-09f814adc0704e7db8ea3d3ad843eb7e.r2.dev/dn-banner.jpeg',
      ogType: 'article',
      lectureData: null
    };
  }

  // Handle dynamic album routes (/dawahcast/a/:id)
  const albumMatch = pathname.match(/^\/dawahcast\/a\/(\d+)$/);
  if (albumMatch) {
    const albumId = albumMatch[1];
    try {
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/albumlisting_multi_nid_api.php?id=${albumId}`;
      
      // Fetch album data from API
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
        const album = response.data[0];
        const title = album.title || 'Islamic Album';
        const author = album.rp_name || 'Islamic Scholar';
        const lectureCount = album.lec_no || 0;
        const category = album.categories || 'Islamic Content';
        const description = `Explore "${title}" by ${author}. This Islamic album contains ${lectureCount} lectures in ${category}. Listen to quality Islamic content on dawahnigeria.`;
        
        return {
          title: `${title} - ${author} | dawahnigeria`,
          description: description.substring(0, 160), // SEO optimal length
          keywords: `${title}, ${author}, Islamic album, ${category}, Islamic lectures, dawah, Nigeria, ${album.lang || 'Islamic content'}`,
          ogImage: album.img || 'https://pub-09f814adc0704e7db8ea3d3ad843eb7e.r2.dev/dn-banner.jpeg',
          ogType: 'website',
          albumData: album // Pass album data for additional meta tags
        };
      }
    } catch (error) {
      console.error(`Error fetching album data for ID ${albumId}:`, error.message);
    }
    
    // Fallback SEO data for album pages
    return {
      title: `Islamic Album ${albumId} | dawahnigeria`,
      description: 'Explore Islamic albums and lecture collections on dawahnigeria - Your source for Islamic knowledge and spiritual guidance.',
      keywords: 'Islamic album, Islamic lectures, dawah, Nigeria, Islamic content',
      ogImage: 'https://pub-09f814adc0704e7db8ea3d3ad843eb7e.r2.dev/dn-banner.jpeg',
      ogType: 'website',
      albumData: null
    };
  }

  // Handle dynamic lecturer routes (/dawahcast/rp/:id)
  const lecturerMatch = pathname.match(/^\/dawahcast\/rp\/(\d+)$/);
  if (lecturerMatch) {
    const lecturerId = lecturerMatch[1];
    try {
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/rplisting_multi_nid_api.php?id=${lecturerId}`;
      
      // Fetch lecturer data from API
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
        const lecturer = response.data[0];
        const name = lecturer.name || 'Islamic Scholar';
        const totalAudio = lecturer.total_audio || 0;
        const totalAlbums = lecturer.total_albums || 0;
        const views = lecturer.views || 0;
        const description = `Explore Islamic lectures by ${name}. Listen to ${totalAudio} lectures across ${totalAlbums} albums with over ${views} views. Discover quality Islamic content and spiritual guidance on dawahnigeria.`;
        
        return {
          title: `${name} - Islamic Scholar | dawahnigeria`,
          description: description.substring(0, 160), // SEO optimal length
          keywords: `${name}, Islamic scholar, Islamic lectures, dawah, Nigeria, Islamic education, ${totalAudio > 0 ? 'Islamic audio' : 'Islamic content'}`,
          ogImage: lecturer.img || lecturer.rp_thumbnail || 'https://pub-09f814adc0704e7db8ea3d3ad843eb7e.r2.dev/dn-banner.jpeg',
          ogType: 'profile',
          lecturerData: lecturer // Pass lecturer data for additional meta tags
        };
      }
    } catch (error) {
      console.error(`Error fetching lecturer data for ID ${lecturerId}:`, error.message);
    }
    
    // Fallback SEO data for lecturer pages
    return {
      title: `Islamic Scholar ${lecturerId} | dawahnigeria`,
      description: 'Discover Islamic scholars and their teachings on dawahnigeria - Your source for Islamic knowledge and spiritual guidance.',
      keywords: 'Islamic scholar, Islamic lectures, dawah, Nigeria, Islamic education',
      ogImage: 'https://pub-09f814adc0704e7db8ea3d3ad843eb7e.r2.dev/dn-banner.jpeg',
      ogType: 'profile',
      lecturerData: null
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
      Sentry.captureException(err);
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
          <meta property="og:site_name" content="dawahnigeria">
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
          ${seoData.albumData ? `
          <meta property="article:author" content="${seoData.albumData.rp_name || ''}">
          <meta property="article:section" content="${seoData.albumData.categories || 'Islamic Content'}">
          <meta name="album:lectures" content="${seoData.albumData.lec_no || ''}">
          <meta name="album:language" content="${seoData.albumData.lang || ''}">
          <meta name="album:views" content="${seoData.albumData.views || ''}">
          ` : ''}
          ${seoData.lecturerData ? `
          <meta property="profile:first_name" content="${seoData.lecturerData.name ? seoData.lecturerData.name.split(' ')[0] : ''}">
          <meta property="profile:last_name" content="${seoData.lecturerData.name ? seoData.lecturerData.name.split(' ').slice(1).join(' ') : ''}">
          <meta name="lecturer:total_audio" content="${seoData.lecturerData.total_audio || ''}">
          <meta name="lecturer:total_albums" content="${seoData.lecturerData.total_albums || ''}">
          <meta name="lecturer:views" content="${seoData.lecturerData.views || ''}">
          <meta name="lecturer:favorites" content="${seoData.lecturerData.favorites || ''}">
          ` : ''}
          <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')};</script>
          <script>window.__LECTURE_DATA__ = ${seoData.lectureData ? JSON.stringify(seoData.lectureData).replace(/</g, '\\u003c') : 'null'};</script>
          <script>window.__ALBUM_DATA__ = ${seoData.albumData ? JSON.stringify(seoData.albumData).replace(/</g, '\\u003c') : 'null'};</script>
          <script>window.__LECTURER_DATA__ = ${seoData.lecturerData ? JSON.stringify(seoData.lecturerData).replace(/</g, '\\u003c') : 'null'};</script>
          <style>
            /* Prevent white flash during SSR hydration */
            body { background-color: #000 !important; color: #fff !important; }
            #root { background-color: transparent !important; }
            div[style*="background"] { background-color: transparent !important; }
            .white-bg, [style*="white"] { background-color: transparent !important; }
            #app-loading, #fallback-loading, #ssr-fallback { display: none !important; }
          </style>
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
          // Fallback App component with proper dark theme styling
          App = () => React.createElement('div', { 
            style: { 
              padding: '20px', 
              textAlign: 'center',
              backgroundColor: '#000000',
              color: '#ffffff',
              minHeight: '100vh',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: -1,
              display: 'none' // Hide fallback content
            }
          }, 
            React.createElement('h1', { 
              style: { color: '#ffffff', fontSize: '18px', margin: '10px 0' }
            }, seoData.title),
            React.createElement('p', { 
              style: { color: '#cccccc', fontSize: '14px', margin: '10px 0' }
            }, seoData.description),
            React.createElement('div', { 
              id: 'app-loading',
              style: { color: '#888888', fontSize: '16px', marginTop: '20px' }
            }, 'Loading application...')
          );
        }

        // Create context providers for SSR
        const SearchContext = React.createContext({
          text: "",
          setText: () => {},
          lecturerId: [],
          setLecturerId: () => {},
          albumId: [],
          setAlbumId: () => {},
          languageId: [],
          setLanguageId: () => {},
          categoryId: [],
          setCategoryId: () => {},
          searchType: "general",
          setSearchType: () => {},
        });

        const AudioContext = React.createContext({
          audioRef: { current: null },
          rangeRef: { current: null },
          initial: true,
          setinitial: () => {},
          loading: false,
          setLoading: () => {},
          playing: false,
          setPlaying: () => {},
        });

        const ThemeProvider = React.createContext({ darkQuery: false });

        // Use React 19's streaming SSR with proper context providers
        const stream = renderToPipeableStream(
          React.createElement(Provider, { store },
            React.createElement(StaticRouter, { location: req.url },
              React.createElement(SearchContext.Provider, {
                value: {
                  text: "",
                  setText: () => {},
                  lecturerId: [],
                  setLecturerId: () => {},
                  albumId: [],
                  setAlbumId: () => {},
                  languageId: [],
                  setLanguageId: () => {},
                  categoryId: [],
                  setCategoryId: () => {},
                  searchType: "general",
                  setSearchType: () => {},
                }
              },
                React.createElement(AudioContext.Provider, {
                  value: {
                    audioRef: { current: null },
                    rangeRef: { current: null },
                    initial: true,
                    setinitial: () => {},
                    loading: false,
                    setLoading: () => {},
                    playing: false,
                    setPlaying: () => {},
                  }
                },
                  React.createElement(ThemeProvider.Provider, { value: { darkQuery: false } },
                    React.createElement(App)
                  )
                )
              )
            )
          ),
          {
            onShellReady() {
              console.log('Shell ready for:', req.path);
              stream.pipe(res, { end: false });
            },
            onShellError(error) {
              console.error('Shell Error for', req.path, ':', error);
              Sentry.captureException(error);
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
              Sentry.captureException(error);
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
        Sentry.captureException(error);
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
      Sentry.captureException(error);
      // Final fallback
      const enhancedHtml = htmlData.replace(
        '</head>',
        `<script>window.__INITIAL_STATE__ = {};</script></head>`
      );
      res.send(enhancedHtml);
    }
  });
});

// Sentry: register the Express error handler after routes
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`🚀 Full SSR Server with React 19 running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 SEO-optimized pages ready for crawling`);
  console.log(`🔧 API Base URL: ${process.env.REACT_APP_API_BASE_URL}`);
  console.log(`🔧 Admin API URL: ${process.env.REACT_APP_API_ADMINISTER_BASE_URL}`);
});