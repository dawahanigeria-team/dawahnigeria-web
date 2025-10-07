/**
 * Lambda@Edge Function for Dynamic OG Tags
 * Trigger: Origin Request
 *
 * This function intercepts requests from social media bots and returns
 * HTML with dynamically generated Open Graph meta tags for rich previews.
 */

const https = require('https');

// Configuration (Lambda@Edge does NOT support environment variables)
// Update these values directly for different environments
const API_BASE_URL = 'https://backend.dawahbox.com/api';
const SITE_DOMAIN = 'dawahnigeria.com';

// Social media bot user agents to detect
const SOCIAL_BOTS = [
  'facebookexternalhit',
  'facebookcatalog',
  'Facebot',
  'WhatsApp', // WhatsApp crawler
  'Twitterbot',
  'LinkedInBot',
  'TelegramBot',
  'Slackbot',
  'Discordbot',
  'SkypeUriPreview',
  'Pinterest',
  'Googlebot',
  'bingbot',
];

/**
 * Check if the request is from a social media bot
 */
function isSocialBot(userAgent) {
  if (!userAgent) return false;
  const lowerUA = userAgent.toLowerCase();
  return SOCIAL_BOTS.some(bot => lowerUA.includes(bot.toLowerCase()));
}

/**
 * Parse the URL to determine content type and ID
 */
function parseUrl(uri) {
  // Match patterns like:
  // /dawahcast/l/123 (lecture)
  // /dawahcast/a/456 (album)
  // /dawahcast/rp/789 (lecturer/resource person)
  // /dawahcast/videos/101 (video)
  // /dawahcast/playlists/202 (playlist)

  const patterns = [
    { regex: /\/dawahcast\/l\/(\d+)/, type: 'lecture' },
    { regex: /\/dawahcast\/a\/(\d+)/, type: 'album' },
    { regex: /\/dawahcast\/rp\/(\d+)/, type: 'lecturer' },
    { regex: /\/dawahcast\/videos\/(\d+)/, type: 'video' },
    { regex: /\/dawahcast\/playlists\/(\d+)/, type: 'playlist' },
    { regex: /\/dawahcast\/quran\/(\d+)/, type: 'quran' },
  ];

  for (const pattern of patterns) {
    const match = uri.match(pattern.regex);
    if (match) {
      return {
        type: pattern.type,
        id: match[1]
      };
    }
  }

  return null;
}

/**
 * Fetch metadata from API
 */
function fetchMetadata(type, id) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${API_BASE_URL}/metaApi.php?type=${type}&id=${id}`);

    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'Origin': `https://${SITE_DOMAIN}`
      }
    };

    https.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.success && parsed.data) {
            resolve(parsed.data);
          } else {
            reject(new Error('API returned unsuccessful response'));
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Generate HTML with OG tags
 */
function generateHtmlWithOgTags(metadata, originalUrl) {
  const {
    title = 'Dawah Nigeria',
    description = 'Islamic lectures, Quran recitations, and educational content',
    image = 'https://dawahnigeria.com/default-og-image.jpg',
    url = originalUrl,
    type = 'website',
    author = '',
    duration = '',
    language = ''
  } = metadata;

  // Escape HTML entities
  const escapeHtml = (str) => {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>${escapeHtml(title)}</title>
  <meta name="title" content="${escapeHtml(title)}">
  <meta name="description" content="${escapeHtml(description)}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="${escapeHtml(type)}">
  <meta property="og:url" content="${escapeHtml(url)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:site_name" content="Dawah Nigeria">
  ${language ? `<meta property="og:locale" content="${escapeHtml(language)}">` : ''}

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${escapeHtml(url)}">
  <meta property="twitter:title" content="${escapeHtml(title)}">
  <meta property="twitter:description" content="${escapeHtml(description)}">
  <meta property="twitter:image" content="${escapeHtml(image)}">

  <!-- WhatsApp -->
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">

  ${author ? `<meta name="author" content="${escapeHtml(author)}">` : ''}
  ${duration ? `<meta property="video:duration" content="${escapeHtml(duration)}">` : ''}

  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #1a1a1a;
      color: #fff;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    h1 {
      color: #ddff2b;
      margin-bottom: 1rem;
    }
    p {
      color: #ccc;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Dawah Nigeria</h1>
    <p>Islamic lectures, Quran recitations, and educational content</p>
  </div>
</body>
</html>`;
}

/**
 * Main Lambda handler
 */
exports.handler = async (event, context) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;
  const uri = request.uri;

  console.log('Request URI:', uri);
  console.log('User-Agent:', headers['user-agent']?.[0]?.value);

  // Check if request is from a social bot
  const userAgent = headers['user-agent']?.[0]?.value || '';

  if (!isSocialBot(userAgent)) {
    console.log('Not a social bot, returning original request');
    return request; // Continue to S3
  }

  console.log('Social bot detected:', userAgent);

  // Parse URL to get content type and ID
  const parsed = parseUrl(uri);

  if (!parsed) {
    console.log('URL pattern not recognized, returning original request');
    return request; // Continue to S3
  }

  console.log('Parsed content:', parsed);

  try {
    // Fetch metadata from API
    const metadata = await fetchMetadata(parsed.type, parsed.id);
    console.log('Metadata fetched:', metadata);

    // Generate HTML with OG tags
    // Note: Host header is not forwarded for S3 compatibility
    // We use the domain from environment variable instead
    const host = SITE_DOMAIN;
    const protocol = headers['cloudfront-forwarded-proto']?.[0]?.value || 'https';
    const fullUrl = `${protocol}://${host}${uri}`;

    const html = generateHtmlWithOgTags(metadata, fullUrl);

    // Return custom response with generated HTML
    return {
      status: '200',
      statusDescription: 'OK',
      headers: {
        'content-type': [{
          key: 'Content-Type',
          value: 'text/html; charset=UTF-8'
        }],
        'cache-control': [{
          key: 'Cache-Control',
          value: 'public, max-age=86400' // Cache for 24 hours
        }],
        'x-dawah-og': [{
          key: 'X-Dawah-OG',
          value: 'generated'
        }]
      },
      body: html
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    // On error, continue to S3
    return request;
  }
};
