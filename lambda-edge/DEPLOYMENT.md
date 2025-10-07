# Lambda@Edge Deployment Guide for Dynamic OG Tags

This guide explains how to deploy the Lambda@Edge function for dynamic Open Graph tags on your CloudFront distribution.

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

## Step 5: Configure CloudFront Distribution

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

## Step 6: Update Lambda Function (For Future Changes)

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

## Step 8: Testing

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

## Support

If you encounter issues:

1. Check CloudWatch Logs
2. Test API endpoint directly
3. Use social platform debuggers
4. Review AWS Lambda@Edge documentation: https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html
