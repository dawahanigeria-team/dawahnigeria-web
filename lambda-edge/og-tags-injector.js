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
];

// Search engine crawlers for SEO
const SEARCH_ENGINE_BOTS = [
  'Googlebot',
  'bingbot',
  'Bingbot',
  'Yahoo! Slurp',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'Sogou',
  'Exabot',
  'ia_archiver', // Alexa
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
 * Check if the request is from a search engine crawler
 */
function isSearchEngineCrawler(userAgent) {
  if (!userAgent) return false;
  const lowerUA = userAgent.toLowerCase();
  return SEARCH_ENGINE_BOTS.some(bot => lowerUA.includes(bot.toLowerCase()));
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
 * Format metadata for better social media display
 */
function formatMetadataForSocial(metadata) {
  let { title, description, author, language, duration } = metadata;

  // Extract lecture name from title (remove author if it's at the end after " - ")
  let lectureName = title;
  let speaker = author;

  // Check if title contains " - Author" pattern at the end
  const dashIndex = title.lastIndexOf(' - ');
  if (dashIndex !== -1) {
    lectureName = title.substring(0, dashIndex).trim();
    if (!speaker) {
      speaker = title.substring(dashIndex + 3).trim();
    }
  }

  // Build formatted description: "Speaker | Language | Duration: X"
  let descriptionParts = [];

  if (speaker) {
    descriptionParts.push(speaker);
  }

  if (language) {
    // Clean up language (remove locale codes like ha_NG, keep just the language name)
    const languageName = language.replace(/_.*$/, '').trim();
    const languageMap = {
      'ha': 'Hausa',
      'yo': 'Yoruba',
      'ar': 'Arabic',
      'en': 'English'
    };
    descriptionParts.push(languageMap[languageName] || languageName);
  }

  if (duration) {
    descriptionParts.push(`Duration: ${duration}`);
  }

  const formattedDescription = descriptionParts.join(' | ');

  return {
    ...metadata,
    title: lectureName,
    description: formattedDescription || description
  };
}

/**
 * Generate HTML with OG tags
 */
function generateHtmlWithOgTags(metadata, originalUrl) {
  // Format metadata for better social media display
  const formattedMetadata = formatMetadataForSocial(metadata);

  const {
    title = 'Dawah Nigeria',
    description = 'Islamic lectures, Quran recitations, and educational content',
    image = 'https://dawahnigeria.com/default-og-image.jpg',
    url = originalUrl,
    type = 'website',
    author = '',
    duration = '',
    language = ''
  } = formattedMetadata;

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
 * Generate SEO-optimized HTML with structured data for search engines
 */
function generateSeoHtml(metadata, originalUrl) {
  const {
    title = 'Dawah Nigeria',
    description = 'Islamic lectures, Quran recitations, and educational content',
    image = 'https://dawahnigeria.com/default-og-image.jpg',
    url = originalUrl,
    type = 'website',
    author = '',
    duration = '',
    language = 'en',
    publishedDate = new Date().toISOString(),
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

  // Generate JSON-LD structured data based on content type
  let jsonLd = {};

  if (type === 'article' || type === 'lecture') {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": image,
      "author": {
        "@type": "Person",
        "name": author || "Dawah Nigeria"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Dawah Nigeria",
        "logo": {
          "@type": "ImageObject",
          "url": "https://dawahnigeria.com/logo.png"
        }
      },
      "datePublished": publishedDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      }
    };
  } else if (type === 'video' || duration) {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": title,
      "description": description,
      "thumbnailUrl": image,
      "uploadDate": publishedDate,
      "duration": duration ? `PT${duration}S` : undefined,
      "contentUrl": url,
      "embedUrl": url
    };
  } else {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": url,
      "image": image
    };
  }

  return `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">

  <!-- Primary Meta Tags -->
  <title>${escapeHtml(title)}</title>
  <meta name="title" content="${escapeHtml(title)}">
  <meta name="description" content="${escapeHtml(description)}">
  ${author ? `<meta name="author" content="${escapeHtml(author)}">` : ''}
  <link rel="canonical" href="${escapeHtml(url)}">

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

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>

  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      line-height: 1.6;
      background: #1a1a1a;
      color: #e0e0e0;
    }
    h1 {
      color: #ddff2b;
      margin-bottom: 0.5rem;
      font-size: 2rem;
    }
    .meta {
      color: #999;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
    .content {
      margin-top: 2rem;
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }
    .cta {
      display: inline-block;
      margin-top: 2rem;
      padding: 0.75rem 1.5rem;
      background: #ddff2b;
      color: #1a1a1a;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <article>
    <h1>${escapeHtml(title)}</h1>
    ${author ? `<div class="meta">By ${escapeHtml(author)}</div>` : ''}

    ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(title)}">` : ''}

    <div class="content">
      <p>${escapeHtml(description)}</p>
    </div>

    <a href="${escapeHtml(url)}" class="cta">View Full Content</a>
  </article>
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

  // Check if request is from a bot (social media or search engine)
  const userAgent = headers['user-agent']?.[0]?.value || '';
  const isSocialMediaBot = isSocialBot(userAgent);
  const isSearchBot = isSearchEngineCrawler(userAgent);

  if (!isSocialMediaBot && !isSearchBot) {
    console.log('Not a bot, returning original request');
    return request; // Continue to S3
  }

  const botType = isSocialMediaBot ? 'Social media bot' : 'Search engine crawler';
  console.log(`${botType} detected:`, userAgent);

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

    // Note: Host header is not forwarded for S3 compatibility
    // We use the domain from environment variable instead
    const host = SITE_DOMAIN;
    const protocol = headers['cloudfront-forwarded-proto']?.[0]?.value || 'https';
    const fullUrl = `${protocol}://${host}${uri}`;

    // Generate different HTML based on bot type
    // Search engines get full SEO HTML with structured data
    // Social media bots get minimal HTML with OG tags only
    const html = isSearchBot
      ? generateSeoHtml(metadata, fullUrl)
      : generateHtmlWithOgTags(metadata, fullUrl);

    console.log(`Serving ${isSearchBot ? 'SEO' : 'OG tags'} HTML`);

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
