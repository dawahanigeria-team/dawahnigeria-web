const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, '../build')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'React 19 Server running' });
});

// Serve React app
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../build/index.html');
  
  if (!fs.existsSync(indexPath)) {
    return res.status(404).send('Build not found. Please run yarn build first.');
  }

  // Enhanced HTML with SSR preparation
  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error reading HTML template:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Add initial state for hydration compatibility
    const enhancedHtml = htmlData.replace(
      '</head>',
      `<script>window.__INITIAL_STATE__ = {};</script></head>`
    );

    res.send(enhancedHtml);
  });
});

app.listen(PORT, () => {
  console.log(`React 19 Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});