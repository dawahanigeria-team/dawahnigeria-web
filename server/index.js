// Setup browser globals for SSR compatibility
const setupGlobals = () => {
  if (typeof window === 'undefined') {
    const mockWindow = {
      location: { href: '', origin: '', search: '' },
      localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
      sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
      addEventListener: () => {},
      removeEventListener: () => {},
      navigator: { userAgent: 'SSR' },
      document: { getElementById: () => null, addEventListener: () => {} }
    };

    const mockDocument = {
      getElementById: () => null,
      getElementsByTagName: () => [],
      createElement: () => ({ appendChild: () => {}, setAttribute: () => {} }),
      addEventListener: () => {},
      body: { appendChild: () => {} }
    };

    global.window = mockWindow;
    global.document = mockDocument;
    global.navigator = { userAgent: 'SSR' };
    global.localStorage = mockWindow.localStorage;
    global.sessionStorage = mockWindow.sessionStorage;
  }
};

setupGlobals();

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

const App = require('../src/App.jsx').default;
const rootReducer = require('../src/Redux/Reducer/index.js').default;

const app = express();
const PORT = process.env.PORT || 3001;

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
  res.json({ status: 'OK', message: 'SSR Server is running with React 19' });
});

// Create Redux store for SSR
const createServerStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

// SSR handler with React 19 streaming and graceful fallback
app.get('*', (req, res) => {
  // Read the built HTML template
  const indexPath = path.join(__dirname, '../build/index.html');
  
  if (!fs.existsSync(indexPath)) {
    return res.status(404).send('Build not found. Please run the build process first.');
  }

  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error reading HTML template:', err);
      return res.status(500).send('Internal Server Error');
    }

    try {
      const store = createServerStore();
      const initialState = store.getState();
      
      // Split HTML template at the root div
      const [htmlStart, htmlEnd] = htmlData.split('<div id="root"></div>');
      
      // Add initial state script before closing head
      const htmlWithState = htmlStart.replace(
        '</head>',
        `<script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')}</script></head>`
      );

      // Start streaming response
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(htmlWithState + '<div id="root">');

      let didError = false;

      // Use React 19's streaming API
      const stream = renderToPipeableStream(
        React.createElement(Provider, { store },
          React.createElement(StaticRouter, { location: req.url },
            React.createElement(App)
          )
        ),
        {
          onShellReady() {
            // Stream the app content
            stream.pipe(res, { end: false });
          },
          onShellError(error) {
            console.error('Shell Error:', error);
            didError = true;
            res.statusCode = 500;
            res.write('</div>' + htmlEnd);
            res.end();
          },
          onAllReady() {
            // Close the root div and add the rest of the HTML
            res.write('</div>' + htmlEnd);
            res.end();
          },
          onError(error) {
            console.error('Stream Error:', error);
            didError = true;
          }
        }
      );

      // Handle timeout
      setTimeout(() => {
        if (!didError) {
          stream.abort();
        }
      }, 20000);

    } catch (error) {
      console.error('SSR Error:', error);
      // Fallback to client-side rendering with enhanced HTML template
      const enhancedHtml = htmlData.replace(
        '</head>',
        `<script>window.__INITIAL_STATE__ = {};</script></head>`
      );
      res.send(enhancedHtml);
    }
  });
});

app.listen(PORT, () => {
  console.log(`SSR Server running on port ${PORT}`);
});