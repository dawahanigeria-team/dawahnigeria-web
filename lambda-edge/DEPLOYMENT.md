# Lambda@Edge Deployment Guide for Dynamic OG Tags & SEO

This guide explains how to deploy the Lambda@Edge function for dynamic Open Graph tags and SEO optimization on your CloudFront distribution.

## Features

- 🎯 **Dynamic OG Tags**: Rich social media previews for Facebook, WhatsApp, Twitter, LinkedIn
- 🔍 **SEO Optimization**: Structured data (JSON-LD) for Google, Bing, and other search engines
- 📱 **User-Agent Detection**: Serves different content to bots vs. regular users
- ⚡ **Edge Computing**: Fast response times with CloudFront edge locations
- 🔄 **Dual Environment**: Separate Lambda functions for dev and production testing

## Prerequisites

- AWS Account with permissions for Lambda, CloudFront, and IAM
- AWS CLI configured
- Node.js 18.x or later (Lambda@Edge requirement)
- Your CloudFront distribution ID

## Step 1: Create IAM Role for Lambda@Edge

Lambda@Edge requires a special IAM role with trust relationships for both Lambda and EdgeLambda services.

1. Create a file `trust-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com",
          "edgelambda.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

2. Create the IAM role:

```bash
aws iam create-role \
  --role-name DawahNigeriaLambdaEdgeRole \
  --assume-role-policy-document file://trust-policy.json
```

3. Attach the basic Lambda execution policy:

```bash
aws iam attach-role-policy \
  --role-name DawahNigeriaLambdaEdgeRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

## Step 2: Package the Lambda Function

1. Navigate to the lambda-edge directory:

```bash
cd lambda-edge
```

2. Create a deployment package:

```bash
zip -r og-tags-injector.zip og-tags-injector.js
```

## Step 3: Create Lambda Function in us-east-1

⚠️ **IMPORTANT**: Lambda@Edge functions MUST be created in the us-east-1 region.

```bash
aws lambda create-function \
  --region us-east-1 \
  --function-name DawahNigeria-OG-Tags-Injector \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/DawahNigeriaLambdaEdgeRole \
  --handler og-tags-injector.handler \
  --zip-file fileb://og-tags-injector.zip \
  --timeout 5 \
  --memory-size 128 \
  --description "Dynamic OG tags for social media sharing"
```

Replace `YOUR_ACCOUNT_ID` with your AWS account ID.

## Step 4: Publish a Version

Lambda@Edge requires versioned functions (cannot use $LATEST):

```bash
aws lambda publish-version \
  --region us-east-1 \
  --function-name DawahNigeria-OG-Tags-Injector \
  --description "Initial version"
```

Note the `Version` number from the output (e.g., 1). You'll need the full ARN including the version.

## Step 5: Create User-Agent Cache Policy

**⚠️ CRITICAL**: CloudFront must cache based on User-Agent header to serve different content to bots vs. regular users.

Create a cache policy that includes User-Agent in the cache key:

```bash
cat > cache-policy.json << 'EOF'
{
  "Name": "DawahNigeria-UserAgent-CachePolicy",
  "Comment": "Cache policy that includes User-Agent for bot detection",
  "DefaultTTL": 86400,
  "MaxTTL": 31536000,
  "MinTTL": 0,
  "ParametersInCacheKeyAndForwardedToOrigin": {
    "EnableAcceptEncodingGzip": true,
    "EnableAcceptEncodingBrotli": true,
    "HeadersConfig": {
      "HeaderBehavior": "whitelist",
      "Headers": {
        "Quantity": 1,
        "Items": ["User-Agent"]
      }
    },
    "CookiesConfig": {
      "CookieBehavior": "none"
    },
    "QueryStringsConfig": {
      "QueryStringBehavior": "all"
    }
  }
}
EOF

# Create the cache policy
aws cloudfront create-cache-policy \
  --cache-policy-config file://cache-policy.json \
  --profile YOUR_PROFILE
```

Note the `Id` from the output - you'll need it for CloudFront configuration.

## Step 6: Create Origin Request Policy

Create an origin request policy to forward User-Agent to Lambda:

```bash
cat > origin-request-policy.json << 'EOF'
{
  "Name": "DawahNigeria-OG-Tags-Policy",
  "Comment": "Forward User-Agent and CloudFront headers to Lambda@Edge",
  "HeadersConfig": {
    "HeaderBehavior": "whitelist",
    "Headers": {
      "Quantity": 2,
      "Items": [
        "User-Agent",
        "CloudFront-Forwarded-Proto"
      ]
    }
  },
  "CookiesConfig": {
    "CookieBehavior": "none"
  },
  "QueryStringsConfig": {
    "QueryStringBehavior": "all"
  }
}
EOF

# Create the policy
aws cloudfront create-origin-request-policy \
  --origin-request-policy-config file://origin-request-policy.json \
  --profile YOUR_PROFILE
```

**Note**: Do NOT forward `Host` header to S3 origins - S3 cannot resolve CloudFront distribution hostnames.

## Step 7: Configure CloudFront Distribution

### Option A: Using AWS Console

1. Go to CloudFront Console
2. Select your distribution
3. Go to "Behaviors" tab
4. Edit the default behavior (or create a new one for `/dawahcast/*`)
5. Scroll to "Function Associations"
6. Add the following:
   - **Event Type**: Origin Request
   - **Function Type**: Lambda@Edge
   - **Function ARN**: `arn:aws:lambda:us-east-1:YOUR_ACCOUNT_ID:function:DawahNigeria-OG-Tags-Injector:1`
7. Under "Cache key and origin requests":
   - Choose "Legacy cache settings"
   - Under "Headers", select "Include the following headers"
   - Add: `User-Agent`, `CloudFront-Forwarded-Proto`, `Host`
8. Click "Yes, Edit"
9. Wait for deployment (can take 15-30 minutes)

### Option B: Using AWS CLI

Create a file `cloudfront-config.json`:

```json
{
  "LambdaFunctionAssociations": {
    "Quantity": 1,
    "Items": [
      {
        "LambdaFunctionARN": "arn:aws:lambda:us-east-1:YOUR_ACCOUNT_ID:function:DawahNigeria-OG-Tags-Injector:1",
        "EventType": "origin-request",
        "IncludeBody": false
      }
    ]
  }
}
```

Update your distribution:

```bash
# Get current config
aws cloudfront get-distribution-config \
  --id YOUR_DISTRIBUTION_ID > dist-config.json

# Extract ETag and Config
# Edit the config to add Lambda function association
# Then update:

aws cloudfront update-distribution \
  --id YOUR_DISTRIBUTION_ID \
  --distribution-config file://updated-dist-config.json \
  --if-match ETAG_FROM_GET_COMMAND
```

## Step 8: Set Up Dual Environment (Dev + Prod)

For safe testing, create separate Lambda functions for dev and production:

### Create Dev Lambda

```bash
aws lambda create-function \
  --region us-east-1 \
  --function-name DawahNigeria-OG-Tags-Injector-Dev \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/DawahNigeriaLambdaEdgeRole \
  --handler og-tags-injector.handler \
  --zip-file fileb://og-tags-injector.zip \
  --timeout 5 \
  --memory-size 128 \
  --description "Dynamic OG tags for dev environment" \
  --profile YOUR_PROFILE

# Publish version 1
aws lambda publish-version \
  --region us-east-1 \
  --function-name DawahNigeria-OG-Tags-Injector-Dev \
  --profile YOUR_PROFILE
```

### CloudFront Distribution Setup

**Dev CloudFront** (`dev.dawahnigeria.com`):
- Uses: `DawahNigeria-OG-Tags-Injector-Dev`
- Distribution ID: `E29VO9EPV1GY8C`

**Prod CloudFront** (`dawahnigeria.com`, `www.dawahnigeria.com`):
- Uses: `DawahNigeria-OG-Tags-Injector`
- Distribution ID: `E21J3AHHLXJ561`

## Step 9: Quick Update Scripts

### Update Dev Lambda

```bash
#!/bin/bash
# Update dev Lambda for testing

cd lambda-edge

# Package
zip -r og-tags-injector.zip og-tags-injector.js

# Update dev Lambda
aws lambda update-function-code \
  --function-name DawahNigeria-OG-Tags-Injector-Dev \
  --zip-file fileb://og-tags-injector.zip \
  --region us-east-1 \
  --profile yusufdn

# Publish new version
NEW_VERSION=$(aws lambda publish-version \
  --function-name DawahNigeria-OG-Tags-Injector-Dev \
  --region us-east-1 \
  --profile yusufdn \
  --query 'Version' \
  --output text)

echo "Published dev Lambda version: $NEW_VERSION"

# Update dev CloudFront
ETAG=$(aws cloudfront get-distribution-config \
  --id E29VO9EPV1GY8C \
  --profile yusufdn \
  --query 'ETag' \
  --output text)

aws cloudfront get-distribution-config \
  --id E29VO9EPV1GY8C \
  --profile yusufdn | \
  jq ".DistributionConfig.DefaultCacheBehavior.LambdaFunctionAssociations.Items[0].LambdaFunctionARN = \"arn:aws:lambda:us-east-1:152189947372:function:DawahNigeria-OG-Tags-Injector-Dev:$NEW_VERSION\" | .DistributionConfig" \
  > /tmp/cf-dev-update.json

aws cloudfront update-distribution \
  --id E29VO9EPV1GY8C \
  --distribution-config file:///tmp/cf-dev-update.json \
  --if-match $ETAG \
  --profile yusufdn

# Invalidate cache
aws cloudfront create-invalidation \
  --distribution-id E29VO9EPV1GY8C \
  --paths "/*" \
  --profile yusufdn

echo "Dev deployment complete! Wait 3-5 minutes for CloudFront deployment."
```

### Promote Dev to Production

After testing on dev, promote to production:

```bash
#!/bin/bash
# Deploy tested code to production

cd lambda-edge

# Package (same code as dev)
zip -r og-tags-injector.zip og-tags-injector.js

# Update prod Lambda
aws lambda update-function-code \
  --function-name DawahNigeria-OG-Tags-Injector \
  --zip-file fileb://og-tags-injector.zip \
  --region us-east-1 \
  --profile yusufdn

# Publish new version
NEW_VERSION=$(aws lambda publish-version \
  --function-name DawahNigeria-OG-Tags-Injector \
  --region us-east-1 \
  --profile yusufdn \
  --query 'Version' \
  --output text)

echo "Published prod Lambda version: $NEW_VERSION"

# Update prod CloudFront
ETAG=$(aws cloudfront get-distribution-config \
  --id E21J3AHHLXJ561 \
  --profile yusufdn \
  --query 'ETag' \
  --output text)

aws cloudfront get-distribution-config \
  --id E21J3AHHLXJ561 \
  --profile yusufdn | \
  jq ".DistributionConfig.DefaultCacheBehavior.LambdaFunctionAssociations.Items[0].LambdaFunctionARN = \"arn:aws:lambda:us-east-1:152189947372:function:DawahNigeria-OG-Tags-Injector:$NEW_VERSION\" | .DistributionConfig" \
  > /tmp/cf-prod-update.json

aws cloudfront update-distribution \
  --id E21J3AHHLXJ561 \
  --distribution-config file:///tmp/cf-prod-update.json \
  --if-match $ETAG \
  --profile yusufdn

# Invalidate cache
aws cloudfront create-invalidation \
  --distribution-id E21J3AHHLXJ561 \
  --paths "/*" \
  --profile yusufdn

echo "Production deployment complete! Wait 3-5 minutes for CloudFront deployment."
```

## Step 10: Update Lambda Function (For Future Changes)

When you need to update the function:

```bash
# 1. Update the code
zip -r og-tags-injector.zip og-tags-injector.js

# 2. Update function code
aws lambda update-function-code \
  --region us-east-1 \
  --function-name DawahNigeria-OG-Tags-Injector \
  --zip-file fileb://og-tags-injector.zip

# 3. Wait a few seconds for the update to complete, then publish new version
aws lambda publish-version \
  --region us-east-1 \
  --function-name DawahNigeria-OG-Tags-Injector \
  --description "Updated version"

# 4. Update CloudFront to use the new version (repeat Step 5)
```

## Step 7: Create Metadata API Endpoint

Your backend needs to provide a metadata API endpoint:

**Endpoint**: `https://backend.dawahnigeria.com/api/metaApi.php`

**Parameters**:
- `type`: lecture, album, lecturer, video, playlist, quran
- `id`: The content ID

**Example Request**:
```
GET https://backend.dawahnigeria.com/api/metaApi.php?type=lecture&id=123
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "title": "Khutbah - The Importance of Prayer",
    "description": "A comprehensive lecture about the importance of prayer in Islam by Shaykh Ahmad. This lecture covers the significance, requirements, and spiritual benefits of performing Salah regularly.",
    "image": "https://media.dawahnigeria.com/images/lecture-123.jpg",
    "url": "https://dawahnigeria.com/dawahcast/l/123",
    "type": "article",
    "author": "Shaykh Ahmad",
    "duration": "45:30",
    "language": "en_US"
  }
}
```

### Required Fields

- **title** (string): Title of the content (max 60 chars for best display)
- **description** (string): Description (max 155 chars for best display)
- **image** (string): Full URL to image (1200x630px recommended)
- **url** (string): Canonical URL of the content
- **type** (string): OG type - "article", "video.other", "music.song", etc.
- **author** (string, optional): Content author/speaker
- **duration** (string, optional): Duration for video/audio content
- **language** (string, optional): Locale code (e.g., "en_US", "ar_SA")

## How It Works

### Bot Detection & Content Serving

The Lambda function serves different HTML based on the User-Agent:

1. **Search Engine Crawlers** (Googlebot, Bingbot, etc.):
   - Gets full SEO-optimized HTML with:
     - Structured data (JSON-LD) for rich snippets
     - Semantic HTML (`<article>`, `<h1>`, etc.)
     - Proper meta tags (title, description, canonical, robots)
     - Readable content preview

2. **Social Media Bots** (Facebook, WhatsApp, Twitter, etc.):
   - Gets lightweight HTML with:
     - Open Graph meta tags
     - Twitter Card meta tags
     - Minimal body content

3. **Regular Users** (Browsers):
   - Request passes through to S3
   - Serves React SPA normally

### OG Tags Formatting

The Lambda automatically formats metadata for better social media display:

**Before formatting:**
```
Title: "Good treatment of parents and relatives 02 (Halqah, October 27, 2013) - Ustadh Sulayman Amubieya"
Description: "Language: Yoruba. Size: 37.2 MB [MP3] | 4.64 MB [AMR] Duration: 1:21:07."
```

**After formatting:**
```
Title: "Good treatment of parents and relatives 02 (Halqah, October 27, 2013)"
Description: "Ustadh Sulayman Amubieya | Yoruba | Duration: 1:21:07"
```

The formatting logic:
- Extracts lecture name from title (removes author after " - ")
- Builds description as: `Speaker | Language | Duration: X`
- Maps language codes (`ha_NG` → `Hausa`, `yo` → `Yoruba`, etc.)
- Removes technical details (file sizes, formats)

### Supported Content Types

The Lambda recognizes these URL patterns:

| Pattern | Type | Example |
|---------|------|---------|
| `/dawahcast/l/123` | Lecture | https://dawahnigeria.com/dawahcast/l/253698 |
| `/dawahcast/a/456` | Album | https://dawahnigeria.com/dawahcast/a/123 |
| `/dawahcast/rp/789` | Lecturer | https://dawahnigeria.com/dawahcast/rp/456 |
| `/dawahcast/videos/101` | Video | https://dawahnigeria.com/dawahcast/videos/789 |
| `/dawahcast/playlists/202` | Playlist | https://dawahnigeria.com/dawahcast/playlists/101 |
| `/dawahcast/quran/303` | Quran | https://dawahnigeria.com/dawahcast/quran/5 |

### Detected Bots

**Social Media Bots:**
- facebookexternalhit, Facebot, WhatsApp
- Twitterbot, LinkedInBot
- TelegramBot, Slackbot, Discordbot
- Pinterest, SkypeUriPreview

**Search Engine Crawlers:**
- Googlebot, Bingbot
- Yahoo! Slurp, DuckDuckBot
- Baiduspider, YandexBot
- Sogou, Exabot

## Step 11: Testing

### Test with Different User Agents

```bash
# Test with Googlebot (should see SEO HTML with JSON-LD)
curl -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
     https://dawahnigeria.com/dawahcast/l/123 | grep -E "JSON-LD|article"

# Test with Facebook bot (should see OG tags)
curl -A "facebookexternalhit/1.1" \
     https://dawahnigeria.com/dawahcast/l/123 | grep "og:title"

# Test with regular browser (should see React SPA)
curl -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" \
     https://dawahnigeria.com/dawahcast/l/123 | grep "div id=\"root\""
```

### Test with Facebook Debugger

1. Go to https://developers.facebook.com/tools/debug/
2. Enter your URL: `https://dawahnigeria.com/dawahcast/l/123`
3. Click "Debug"
4. Check if OG tags are detected correctly
5. Click "Scrape Again" to clear cache if needed

### Test with WhatsApp

1. Send a test URL to yourself on WhatsApp
2. Check if the preview shows correct title, description, and image

### Test with Twitter

1. Go to https://cards-dev.twitter.com/validator
2. Enter your URL
3. Check the preview

### Test Locally with cURL

Simulate a bot request:

```bash
curl -H "User-Agent: facebookexternalhit/1.1" \
     https://dawahnigeria.com/dawahcast/l/123
```

You should see HTML with OG meta tags in the response.

## Step 9: Monitoring

### CloudWatch Logs

Lambda@Edge logs are written to CloudWatch Logs in the region where the function executed.

View logs:

```bash
# List log groups (check multiple regions)
aws logs describe-log-groups \
  --region us-east-1 \
  --log-group-name-prefix /aws/lambda/us-east-1.DawahNigeria-OG-Tags-Injector
```

### CloudWatch Metrics

Monitor in CloudWatch Console:
- Invocations
- Errors
- Duration
- Throttles

## Troubleshooting

### Regular users seeing static HTML (OG tags page)

**Symptom**: When clicking shared links, users see static HTML with "Dawah Nigeria" instead of the React app.

**Cause**: CloudFront is caching bot responses and serving them to regular users because User-Agent is not in the cache key.

**Solution**:
1. Verify User-Agent is in cache policy:
```bash
aws cloudfront get-cache-policy --id YOUR_CACHE_POLICY_ID
```

2. Ensure cache policy includes User-Agent in `HeadersConfig`

3. Invalidate CloudFront cache:
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

4. Wait 2-3 minutes and test again with different User-Agents

### Lambda function not executing

- Verify the function is associated with your distribution
- Check that you're using a version number (not $LATEST)
- Ensure the IAM role has correct trust relationships
- Wait 15-30 minutes after CloudFront distribution update

### Metadata not loading

- Test the API endpoint directly in browser
- Check Lambda logs for API errors
- Verify API returns correct JSON structure

### OG tags not showing on social media

- Use social platform debuggers to check
- Clear social platform cache (use "Scrape Again" on Facebook)
- Verify image URL is publicly accessible
- Check image dimensions (1200x630px recommended)

### Function timing out

- Increase timeout (max 5 seconds for origin-request)
- Optimize API response time
- Add error handling and fallbacks

## Cost Estimates

Lambda@Edge pricing (as of 2025):

- **Requests**: $0.60 per 1 million requests
- **Duration**: $0.00005001 per GB-second

Example for 1M bot requests/month:
- Requests: $0.60
- Duration: ~$0.50 (assuming 128MB, 500ms avg)
- **Total: ~$1.10/month**

CloudFront pricing remains the same.

## Best Practices

1. **Cache Aggressively**: Set Cache-Control headers to reduce Lambda invocations
2. **Monitor Costs**: Set up billing alerts in AWS
3. **Version Control**: Keep Lambda function code in git
4. **Test Thoroughly**: Test all content types before deploying
5. **Error Handling**: Always fall back to serving the regular SPA on errors
6. **Image Optimization**: Ensure OG images are optimized and fast to load
7. **API Performance**: Keep metadata API response time under 200ms

## Security Considerations

1. **API Authentication**: Consider adding API key validation
2. **Rate Limiting**: Implement rate limiting on metadata API
3. **Input Validation**: Sanitize all user inputs (already done in escapeHtml)
4. **HTTPS Only**: Ensure all API calls use HTTPS
5. **Error Messages**: Don't expose sensitive information in error messages

## Next Steps

After deployment:

1. ✅ Test all content types (lectures, albums, lecturers, videos)
2. ✅ Verify on Facebook, WhatsApp, Twitter, LinkedIn
3. ✅ Monitor CloudWatch logs for errors
4. ✅ Set up CloudWatch alarms for errors/throttles
5. ✅ Document any custom configurations for your team

## Quick Reference

### Lambda Functions

**Production:**
- Name: `DawahNigeria-OG-Tags-Injector`
- Region: `us-east-1`
- Current Version: `14`
- ARN: `arn:aws:lambda:us-east-1:152189947372:function:DawahNigeria-OG-Tags-Injector:14`

**Development:**
- Name: `DawahNigeria-OG-Tags-Injector-Dev`
- Region: `us-east-1`
- Current Version: `3`
- ARN: `arn:aws:lambda:us-east-1:152189947372:function:DawahNigeria-OG-Tags-Injector-Dev:3`

### CloudFront Distributions

**Production:**
- Distribution ID: `E21J3AHHLXJ561`
- Domains: `dawahnigeria.com`, `www.dawahnigeria.com`
- Lambda: `DawahNigeria-OG-Tags-Injector`

**Development:**
- Distribution ID: `E29VO9EPV1GY8C`
- Domain: `dev.dawahnigeria.com`
- Lambda: `DawahNigeria-OG-Tags-Injector-Dev`

### Cache Policy

- ID: `5b173ecb-3028-4afc-a8a2-c6624e39918f`
- Name: `DawahNigeria-UserAgent-CachePolicy`
- Includes: User-Agent header in cache key

### Common Commands

```bash
# Check Lambda version
aws lambda get-function --function-name DawahNigeria-OG-Tags-Injector --region us-east-1 --profile yusufdn

# Check CloudFront status
aws cloudfront get-distribution --id E21J3AHHLXJ561 --profile yusufdn --query 'Distribution.Status'

# Invalidate cache
aws cloudfront create-invalidation --distribution-id E21J3AHHLXJ561 --paths "/*" --profile yusufdn

# View Lambda logs
aws logs tail /aws/lambda/us-east-1.DawahNigeria-OG-Tags-Injector --follow --region us-east-1 --profile yusufdn

# Test with curl
curl -A "facebookexternalhit/1.1" https://dawahnigeria.com/dawahcast/l/123 | grep "og:title"
```

### Backend API

- Endpoint: `https://backend.dawahbox.com/api/metaApi.php`
- Parameters: `type` (lecture/album/lecturer/video/playlist/quran), `id` (content ID)
- Origin Header: Must include `Origin: https://dawahnigeria.com`

### Important Notes

1. ⚠️ Lambda@Edge functions **MUST** be in `us-east-1` region
2. ⚠️ Lambda@Edge does **NOT** support environment variables
3. ⚠️ Lambda@Edge requires **versioned functions** (cannot use $LATEST)
4. ⚠️ S3 origins cannot have `Host` header forwarded
5. ⚠️ CloudFront cache policy **MUST** include User-Agent header
6. ⚠️ CloudFront deployments take 3-5 minutes to propagate

## Support

If you encounter issues:

1. Check CloudWatch Logs
2. Test API endpoint directly
3. Use social platform debuggers
4. Review AWS Lambda@Edge documentation: https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html

## Resources

- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Documentation**: https://schema.org/Article
- **AWS Lambda@Edge Docs**: https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html
