#!/bin/bash

# Update Lambda@Edge Function Script
# This script updates the Lambda function code and automatically updates CloudFront
#
# Usage:
#   ./update-lambda.sh                    # Uses default AWS profile
#   ./update-lambda.sh --profile myprofile # Uses specific AWS profile

set -e

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
FUNCTION_NAME="DawahNigeria-OG-Tags-Injector"
REGION="us-east-1"
DISTRIBUTION_ID="E29VO9EPV1GY8C"

# Environment variables (can be overridden)
API_BASE_URL="${API_BASE_URL:-https://backend.dawahnigeria.com/api}"
SITE_DOMAIN="${SITE_DOMAIN:-dawahnigeria.com}"

# Parse command line arguments
AWS_PROFILE_ARG=""
while [[ $# -gt 0 ]]; do
  case $1 in
    --profile)
      AWS_PROFILE_ARG="--profile $2"
      export AWS_PROFILE="$2"
      shift 2
      ;;
    --help|-h)
      echo "Usage: $0 [--profile PROFILE_NAME]"
      echo ""
      echo "This script:"
      echo "  1. Packages the Lambda function"
      echo "  2. Updates the function code"
      echo "  3. Publishes a new version"
      echo "  4. Updates CloudFront to use the new version"
      echo ""
      echo "Options:"
      echo "  --profile PROFILE_NAME    Use specific AWS profile"
      echo "  --help, -h                Show this help message"
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      exit 1
      ;;
  esac
done

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Lambda@Edge Update Script${NC}"
echo -e "${GREEN}========================================${NC}"

if [ -n "$AWS_PROFILE" ]; then
  echo -e "${YELLOW}Using AWS Profile: ${AWS_PROFILE}${NC}"
fi

# Step 1: Package function
echo -e "\n${YELLOW}Step 1: Packaging Lambda function...${NC}"
if [ -f og-tags-injector.zip ]; then
    rm og-tags-injector.zip
fi
zip -q og-tags-injector.zip og-tags-injector.js
echo -e "${GREEN}✓ Package created${NC}"

# Step 2: Update function code
echo -e "\n${YELLOW}Step 2: Updating Lambda function code...${NC}"
aws lambda update-function-code \
  --region "$REGION" \
  --function-name "$FUNCTION_NAME" \
  --zip-file fileb://og-tags-injector.zip \
  $AWS_PROFILE_ARG > /dev/null

echo -e "${GREEN}✓ Code updated${NC}"
echo -e "${YELLOW}Waiting 3 seconds for code update to complete...${NC}"
sleep 3

echo -e "\n${YELLOW}Step 2b: Updating Lambda environment variables...${NC}"
aws lambda update-function-configuration \
  --region "$REGION" \
  --function-name "$FUNCTION_NAME" \
  --environment "Variables={API_BASE_URL=${API_BASE_URL},SITE_DOMAIN=${SITE_DOMAIN}}" \
  $AWS_PROFILE_ARG > /dev/null

echo -e "${GREEN}✓ Environment updated${NC}"
echo -e "${YELLOW}Waiting 3 seconds for configuration update to complete...${NC}"
sleep 3

# Step 3: Publish new version
echo -e "\n${YELLOW}Step 3: Publishing new version...${NC}"
VERSION_OUTPUT=$(aws lambda publish-version \
  --region "$REGION" \
  --function-name "$FUNCTION_NAME" \
  --description "Updated on $(date)" \
  $AWS_PROFILE_ARG)

VERSION=$(echo "$VERSION_OUTPUT" | jq -r '.Version')
LAMBDA_ARN=$(echo "$VERSION_OUTPUT" | jq -r '.FunctionArn')

echo -e "${GREEN}✓ Published version: ${VERSION}${NC}"
echo -e "${GREEN}✓ ARN: ${LAMBDA_ARN}${NC}"

# Step 4: Get current CloudFront config
echo -e "\n${YELLOW}Step 4: Updating CloudFront distribution...${NC}"
aws cloudfront get-distribution-config \
  --id "$DISTRIBUTION_ID" \
  $AWS_PROFILE_ARG > /tmp/cf-config-update.json

ETAG=$(cat /tmp/cf-config-update.json | jq -r '.ETag')

# Update Lambda ARN in config
cat /tmp/cf-config-update.json | jq --arg arn "$LAMBDA_ARN" \
  '.DistributionConfig.DefaultCacheBehavior.LambdaFunctionAssociations.Items[0].LambdaFunctionARN = $arn' \
  | jq '.DistributionConfig' > /tmp/cf-updated-dist-config.json

# Step 5: Update CloudFront
aws cloudfront update-distribution \
  --id "$DISTRIBUTION_ID" \
  --distribution-config file:///tmp/cf-updated-dist-config.json \
  --if-match "$ETAG" \
  $AWS_PROFILE_ARG > /tmp/cf-update-result.json

STATUS=$(cat /tmp/cf-update-result.json | jq -r '.Distribution.Status')

echo -e "${GREEN}✓ CloudFront distribution updated${NC}"
echo -e "${YELLOW}Status: ${STATUS}${NC}"

# Cleanup
rm -f /tmp/cf-config-update.json /tmp/cf-updated-dist-config.json /tmp/cf-update-result.json

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}Update Complete!${NC}"
echo -e "${GREEN}========================================${NC}"

echo -e "\n${YELLOW}Summary:${NC}"
echo -e "Lambda Version: ${VERSION}"
echo -e "Lambda ARN: ${LAMBDA_ARN}"
echo -e "CloudFront Status: ${STATUS}"
echo -e "Distribution ID: ${DISTRIBUTION_ID}"

echo -e "\n${YELLOW}Next Steps:${NC}"
echo -e "1. Wait 15-30 minutes for CloudFront propagation"
echo -e "2. Test with: curl -H \"User-Agent: facebookexternalhit/1.1\" https://dawahnigeria.com/dawahcast/l/304761"
echo -e "3. Monitor logs: aws logs tail /aws/lambda/us-east-1.${FUNCTION_NAME} $AWS_PROFILE_ARG --follow"

echo -e "\n${GREEN}Done! 🚀${NC}\n"
