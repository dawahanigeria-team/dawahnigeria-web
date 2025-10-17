# Lambda@Edge Dynamic OG Tags & SEO Solution

> **Dynamic Open Graph meta tags and SEO optimization for social media sharing and search engines using Lambda@Edge on CloudFront + S3**

## 🎯 What This Does

### For Social Media
When users share links from your site on Facebook, WhatsApp, Twitter, or LinkedIn, this solution ensures they see:
- ✅ **Dynamic titles** specific to each lecture/album/lecturer
- ✅ **Relevant descriptions** pulled from your database
- ✅ **Beautiful images** that represent the content
- ✅ **Rich previews** that increase engagement

Instead of seeing a generic "Dawah Nigeria" preview, users see the actual content details!

### For Search Engines
When Google, Bing, and other search engines crawl your content, they receive:
- ✅ **Structured data (JSON-LD)** for rich search results
- ✅ **Semantic HTML** with proper article markup
- ✅ **SEO-optimized meta tags** (title, description, canonical)
- ✅ **Indexable content** with speaker, language, and duration info

This improves your search rankings and helps users discover content like "Tafseer Surah Qiyamah - Shaykh Jabata"!

## 📋 Quick Overview

### The Problem
React SPAs (Single Page Applications) use JavaScript to render content, including meta tags. Social media bots don't execute JavaScript, so they can't see dynamic meta tags → generic/broken previews.

### The Solution
Lambda@Edge intercepts requests from social media bots and returns HTML with pre-rendered Open Graph tags fetched from your API.

### How It Works

```
User shares link on WhatsApp
         ↓
WhatsApp bot requests URL
         ↓
CloudFront receives request
         ↓
Lambda@Edge detects WhatsApp bot
         ↓
Lambda fetches metadata from your API
         ↓
Lambda generates HTML with OG tags
         ↓
WhatsApp bot reads OG tags
         ↓
User sees rich preview! 🎉
```

## 📦 What's Included

```
lambda-edge/
├── README.md                     # This file - overview and quick start
├── QUICKSTART.md                 # ⭐ Step-by-step deployment guide (START HERE!)
├── QUICK-REFERENCE.md            # 📋 Command cheat sheet
├── DEPLOYMENT.md                 # Detailed deployment instructions
├── API-SPECIFICATION.md          # Metadata API requirements and examples
├── TESTING.md                    # Comprehensive testing guide
├── USAGE-WITH-PROFILES.md        # AWS profile configuration guide
├── og-tags-injector.js          # Lambda@Edge function code
├── deploy.sh                     # Initial deployment script
├── update-lambda.sh              # Update existing Lambda function
├── test-local.sh                 # Test backend API endpoint
└── cloudfront-config-helper.json # CloudFront configuration reference
```

## 🚀 Quick Start

**🎯 Ready to deploy? Follow [`QUICKSTART.md`](./QUICKSTART.md) for a complete step-by-step guide!**

### Automated Deployment (Easiest Way)

```bash
cd lambda-edge

# 1. Test your backend API first
./test-local.sh

# 2. Deploy Lambda@Edge function
./deploy.sh --profile dawah-production  # Or use default profile

# 3. Follow the instructions to configure CloudFront
# 4. Wait 15-30 minutes for propagation
# 5. Test with social media debuggers
```

> **💡 Using AWS Profiles?** See [`USAGE-WITH-PROFILES.md`](./USAGE-WITH-PROFILES.md) for profile configuration.

### Manual Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for detailed manual deployment instructions.

## 🎨 Supported Content Types

| Type | URL Pattern | Example |
|------|-------------|---------|
| **Lecture** | `/dawahcast/l/{id}` | `/dawahcast/l/304761` |
| **Album** | `/dawahcast/a/{id}` | `/dawahcast/a/165389` |
| **Lecturer** | `/dawahcast/rp/{id}` | `/dawahcast/rp/49991` |
| **Video** | `/dawahcast/videos/{id}` | `/dawahcast/videos/101` |
| **Playlist** | `/dawahcast/playlists/{id}` | `/dawahcast/playlists/202` |
| **Quran** | `/dawahcast/quran/{id}` | `/dawahcast/quran/303` |

## 🔍 How It Detects Social Bots

The Lambda function checks the User-Agent header for:
- Facebook (`facebookexternalhit`, `Facebot`)
- WhatsApp (`WhatsApp`)
- Twitter (`Twitterbot`)
- LinkedIn (`LinkedInBot`)
- Telegram (`TelegramBot`)
- Slack (`Slackbot`)
- Discord (`Discordbot`)
- And more...

Regular browsers get the normal React SPA from S3.

## 💡 Key Features

### ✅ Smart Bot Detection
Detects and serves different content to:
- **Search engine crawlers** (Googlebot, Bingbot) → SEO HTML with structured data
- **Social media bots** (Facebook, WhatsApp, Twitter) → OG tags
- **Regular users** → React SPA

Only executes for bots → minimal Lambda costs

### ✅ Intelligent Formatting
Automatically improves metadata display:
- **Before**: "Good treatment of parents 02 - Ustadh Sulayman | Language: Yoruba. Size: 37.2 MB"
- **After**: "Good treatment of parents 02" with description "Ustadh Sulayman | Yoruba | Duration: 1:21:07"

### ✅ Dual Environment Setup
- **Dev Lambda** + **Dev CloudFront** for testing
- **Prod Lambda** + **Prod CloudFront** for live site
- Safe deployment workflow: test on dev, promote to prod

### ✅ Fallback to SPA
If anything fails (API error, timeout, etc.), serves the normal React app

### ✅ User-Agent Based Caching
CloudFront caches bot responses separately from user responses → no conflicts

### ✅ Character Encoding
Properly handles Arabic, Hausa, Yoruba, special characters, quotes, etc.

### ✅ SEO Optimized
Includes JSON-LD structured data for Google rich results and knowledge panels

## 📊 Performance

| Metric | Target | Typical |
|--------|--------|---------|
| Lambda Duration | < 3s | ~500ms |
| API Response | < 200ms | ~100ms |
| Total Response | < 5s | ~1-2s |
| Cold Start | N/A | ~1-2s |

## 💰 Cost Estimate

For 1 million bot requests per month:

| Service | Cost |
|---------|------|
| Lambda@Edge Requests | $0.60 |
| Lambda@Edge Duration | $0.50 |
| CloudFront (unchanged) | Existing costs |
| **Total Additional** | **~$1.10/month** |

Extremely cost-effective compared to alternatives like pre-rendering services ($50-200/month).

## 🔐 Security

- ✅ No authentication needed (read-only operations)
- ✅ Input validation and sanitization
- ✅ HTML entity escaping to prevent XSS
- ✅ Timeout protection (5s max)
- ✅ Error handling with safe fallbacks
- ✅ Rate limiting recommended on API endpoint

## 🛠️ Customization

### Change Bot Detection

Edit the `SOCIAL_BOTS` array in `og-tags-injector.js`:

```javascript
const SOCIAL_BOTS = [
  'facebookexternalhit',
  'WhatsApp',
  'Twitterbot',
  // Add your custom bot
  'YourCustomBot'
];
```

### Change API Endpoint

Update `API_BASE_URL`:

```javascript
const API_BASE_URL = 'https://your-api.com/api';
```

### Customize HTML Template

Edit the `generateHtmlWithOgTags()` function to change the HTML structure, styling, or add more meta tags.

### Add URL Patterns

Add to the `patterns` array in `parseUrl()`:

```javascript
{ regex: /\/custom\/pattern\/(\d+)/, type: 'custom' }
```

## 📈 Monitoring

### CloudWatch Logs

View logs in multiple regions (Lambda@Edge executes at edge locations):

```bash
aws logs tail /aws/lambda/us-east-1.DawahNigeria-OG-Tags-Injector --follow
```

### CloudWatch Metrics

Monitor:
- Invocations (should only be bot requests)
- Errors (should be near zero)
- Duration (should be < 2s p99)
- Throttles (should be zero)

### Set Up Alerts

Create CloudWatch alarms for:
- Error rate > 1%
- Duration > 3s (p99)
- Invocations spike (unusual traffic)

## 🐛 Troubleshooting

### Preview Not Showing

**Issue**: Social media preview doesn't show content

**Solutions**:
1. Wait 15-30 minutes after deployment
2. Check Lambda is associated with CloudFront
3. Verify User-Agent header is forwarded
4. Test with cURL to confirm Lambda executes
5. Check CloudWatch logs for errors

### Wrong Content Displayed

**Issue**: Preview shows wrong title/image

**Solutions**:
1. Clear social platform cache (Facebook: "Scrape Again")
2. Verify API returns correct data
3. Check ID parsing in Lambda logs
4. Test API endpoint directly

### Images Not Loading

**Issue**: Preview shows broken image

**Solutions**:
1. Verify image URL is absolute (not relative)
2. Check image is publicly accessible
3. Ensure image meets size requirements (600x315 min)
4. Test image URL in browser

### Slow Performance

**Issue**: Preview takes too long to load

**Solutions**:
1. Check API response time (should be < 200ms)
2. Optimize images (compress, use CDN)
3. Add caching to metadata API
4. Monitor Lambda duration in CloudWatch

See [`TESTING.md`](./TESTING.md) for detailed troubleshooting.

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Complete deployment instructions |
| [API-SPECIFICATION.md](./API-SPECIFICATION.md) | Metadata API requirements |
| [TESTING.md](./TESTING.md) | Testing procedures and checklist |
| [og-tags-injector.js](./og-tags-injector.js) | Lambda function source code |

## 🎯 Best Practices

### Images

- ✅ Use 1200x630px (optimal for all platforms)
- ✅ Keep file size < 300KB
- ✅ Use JPG for photos, PNG for graphics
- ✅ Ensure publicly accessible (no auth)
- ✅ Use CDN for fast loading

### Titles

- ✅ Keep under 60 characters
- ✅ Front-load important keywords
- ✅ Include speaker/topic
- ✅ Avoid excessive punctuation

### Descriptions

- ✅ Keep under 155 characters
- ✅ Write complete sentences
- ✅ Include key details (language, duration, topic)
- ✅ End with period

### API Performance

- ✅ Cache responses for 5 minutes
- ✅ Use database indexes on ID fields
- ✅ Return responses in < 200ms
- ✅ Handle errors gracefully

### Testing

- ✅ Test on all social platforms
- ✅ Test all content types
- ✅ Test edge cases (missing data, long text, etc.)
- ✅ Monitor CloudWatch logs regularly

## 🚦 Production Checklist

Before going live:

- [ ] Metadata API deployed and tested
- [ ] Lambda function created in us-east-1
- [ ] IAM role configured correctly
- [ ] Lambda published with version number
- [ ] CloudFront distribution updated
- [ ] User-Agent header whitelisted
- [ ] Waited 30 minutes for propagation
- [ ] Tested with cURL
- [ ] Verified on Facebook Debugger
- [ ] Tested on WhatsApp
- [ ] Tested on Twitter
- [ ] All 6 content types working
- [ ] Images loading correctly
- [ ] CloudWatch logs showing success
- [ ] Team trained on OG tag best practices
- [ ] Documentation updated
- [ ] Monitoring and alerts configured

## 🎉 Success Metrics

After deployment, you should see:

- ✅ Rich previews on all social platforms
- ✅ Increased click-through rates on shared links
- ✅ Better engagement on social media posts
- ✅ Professional appearance across platforms
- ✅ Minimal added costs (< $2/month)
- ✅ Fast performance (< 2s response time)

## 🔄 Maintenance

### Monthly

- Review CloudWatch metrics
- Check error rates
- Verify performance targets
- Test new content types

### Quarterly

- Update Lambda function if needed
- Review social platform requirements
- Optimize images and descriptions
- Analyze engagement data

### As Needed

- Add new bot user agents
- Update API endpoint structure
- Enhance HTML template
- Improve error handling

## 📞 Support

### Internal

- Backend API Team: [Your contact]
- DevOps Team: [Your contact]
- Social Media Team: [Your contact]

### External

- AWS Support: [Your support plan]
- Lambda@Edge Docs: https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html
- Open Graph Docs: https://ogp.me/

## 🎓 Additional Resources

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Open Graph Protocol](https://ogp.me/)
- [AWS Lambda@Edge](https://aws.amazon.com/lambda/edge/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)

## 📄 License

Internal use only - Dawah Nigeria

## 🙏 Credits

Built for Dawah Nigeria to enhance social media engagement and provide rich link previews for Islamic educational content.

---

**Questions?** Review the detailed guides:
- New to this? Start with [`DEPLOYMENT.md`](./DEPLOYMENT.md)
- Need to set up the API? See [`API-SPECIFICATION.md`](./API-SPECIFICATION.md)
- Ready to test? Follow [`TESTING.md`](./TESTING.md)

**Let's make Islamic content more shareable! 🚀**
