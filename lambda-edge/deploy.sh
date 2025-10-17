#!/bin/bash

# Lambda@Edge Deployment Script for Dynamic OG Tags
# This script automates the deployment process
#
# Usage:
#   ./deploy.sh                    # Uses default AWS profile
#   ./deploy.sh --profile myprofile # Uses specific AWS profile
#   AWS_PROFILE=myprofile ./deploy.sh  # Alternative way to specify profile

set -e  # Exit on error

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
FUNCTION_NAME="DawahNigeria-OG-Tags-Injector"
REGION="us-east-1"  # Lambda@Edge MUST be in us-east-1
ROLE_NAME="DawahNigeriaLambdaEdgeRole"
RUNTIME="nodejs18.x"
HANDLER="og-tags-injector.handler"
TIMEOUT=5
MEMORY=128

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
      echo "Options:"
      echo "  --profile PROFILE_NAME    Use specific AWS profile"
      echo "  --help, -h                Show this help message"
      echo ""
      echo "Examples:"
      echo "  $0                        # Use default profile"
      echo "  $0 --profile production   # Use 'production' profile"
      echo "  AWS_PROFILE=prod $0       # Alternative way"
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Lambda@Edge Deployment for OG Tags${NC}"
echo -e "${GREEN}========================================${NC}"

if [ -n "$AWS_PROFILE" ]; then
  echo -e "${YELLOW}Using AWS Profile: ${AWS_PROFILE}${NC}"
fi

# Step 1: Check if AWS CLI is installed
echo -e "\n${YELLOW}Step 1: Checking AWS CLI...${NC}"
if ! command -v aws &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not installed${NC}"
    echo "Install it from: https://aws.amazon.com/cli/"
    exit 1
fi
echo -e "${GREEN}✓ AWS CLI found${NC}"

# Step 2: Get AWS Account ID
echo -e "\n${YELLOW}Step 2: Getting AWS Account ID...${NC}"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text $AWS_PROFILE_ARG)
if [ -z "$ACCOUNT_ID" ]; then
    echo -e "${RED}Error: Could not get AWS Account ID${NC}"
    echo "Make sure you're logged in with 'aws configure'"
    exit 1
fi
echo -e "${GREEN}✓ Account ID: ${ACCOUNT_ID}${NC}"

# Step 3: Check if IAM role exists, create if not
echo -e "\n${YELLOW}Step 3: Checking IAM role...${NC}"
if aws iam get-role --role-name "$ROLE_NAME" $AWS_PROFILE_ARG 2>/dev/null; then
    echo -e "${GREEN}✓ IAM role already exists${NC}"
else
    echo -e "${YELLOW}Creating IAM role...${NC}"

    # Create trust policy file
    cat > /tmp/trust-policy.json <<EOF
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
EOF

    aws iam create-role \
      --role-name "$ROLE_NAME" \
      --assume-role-policy-document file:///tmp/trust-policy.json \
      $AWS_PROFILE_ARG

    # Attach basic execution policy
    aws iam attach-role-policy \
      --role-name "$ROLE_NAME" \
      --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole \
      $AWS_PROFILE_ARG

    echo -e "${GREEN}✓ IAM role created${NC}"
    echo -e "${YELLOW}Waiting 10 seconds for role to propagate...${NC}"
    sleep 10
fi

ROLE_ARN="arn:aws:iam::${ACCOUNT_ID}:role/${ROLE_NAME}"

# Step 4: Package Lambda function
echo -e "\n${YELLOW}Step 4: Packaging Lambda function...${NC}"
cd "$(dirname "$0")"
if [ -f og-tags-injector.zip ]; then
    rm og-tags-injector.zip
fi
zip -q og-tags-injector.zip og-tags-injector.js
echo -e "${GREEN}✓ Package created: og-tags-injector.zip${NC}"

# Step 5: Check if Lambda function exists
echo -e "\n${YELLOW}Step 5: Deploying Lambda function...${NC}"
if aws lambda get-function --function-name "$FUNCTION_NAME" --region "$REGION" $AWS_PROFILE_ARG 2>/dev/null; then
    echo -e "${YELLOW}Function exists, updating code and environment...${NC}"

    aws lambda update-function-code \
      --region "$REGION" \
      --function-name "$FUNCTION_NAME" \
      --zip-file fileb://og-tags-injector.zip \
      $AWS_PROFILE_ARG > /dev/null

    echo -e "${YELLOW}Waiting for code update to complete...${NC}"
    sleep 3

    aws lambda update-function-configuration \
      --region "$REGION" \
      --function-name "$FUNCTION_NAME" \
      --environment "Variables={API_BASE_URL=${API_BASE_URL},SITE_DOMAIN=${SITE_DOMAIN}}" \
      $AWS_PROFILE_ARG > /dev/null

    echo -e "${YELLOW}Waiting for configuration update to complete...${NC}"
    sleep 3

else
    echo -e "${YELLOW}Creating new function...${NC}"

    aws lambda create-function \
      --region "$REGION" \
      --function-name "$FUNCTION_NAME" \
      --runtime "$RUNTIME" \
      --role "$ROLE_ARN" \
      --handler "$HANDLER" \
      --zip-file fileb://og-tags-injector.zip \
      --timeout "$TIMEOUT" \
      --memory-size "$MEMORY" \
      --description "Dynamic OG tags for social media sharing" \
      --environment "Variables={API_BASE_URL=${API_BASE_URL},SITE_DOMAIN=${SITE_DOMAIN}}" \
      $AWS_PROFILE_ARG

    echo -e "${YELLOW}Waiting for function to be active...${NC}"
    sleep 5
fi

echo -e "${GREEN}✓ Lambda function deployed${NC}"

# Step 6: Publish a version
echo -e "\n${YELLOW}Step 6: Publishing version...${NC}"
VERSION_OUTPUT=$(aws lambda publish-version \
  --region "$REGION" \
  --function-name "$FUNCTION_NAME" \
  --description "Deployed on $(date)" \
  $AWS_PROFILE_ARG)

VERSION=$(echo "$VERSION_OUTPUT" | grep -oP '"Version":\s*"\K[^"]+' | head -1)
if [ -z "$VERSION" ]; then
    VERSION=$(echo "$VERSION_OUTPUT" | jq -r '.Version')
fi

LAMBDA_ARN="arn:aws:lambda:${REGION}:${ACCOUNT_ID}:function:${FUNCTION_NAME}:${VERSION}"
echo -e "${GREEN}✓ Version published: ${VERSION}${NC}"

# Step 7: Display next steps
echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"

echo -e "\n${YELLOW}Lambda Function Details:${NC}"
echo -e "Function Name: ${FUNCTION_NAME}"
echo -e "Version: ${VERSION}"
echo -e "ARN: ${LAMBDA_ARN}"

echo -e "\n${YELLOW}Next Steps:${NC}"
echo -e "1. Associate this Lambda with your CloudFront distribution"
echo -e "2. Event Type: ${GREEN}Origin Request${NC}"
echo -e "3. Function ARN: ${GREEN}${LAMBDA_ARN}${NC}"
echo -e "\n4. Ensure CloudFront forwards these headers:"
echo -e "   - User-Agent"
echo -e "   - Host"
echo -e "   - CloudFront-Forwarded-Proto"
echo -e "\n5. Wait 15-30 minutes for CloudFront propagation"
echo -e "\n6. Test with:"
echo -e '   curl -H "User-Agent: facebookexternalhit/1.1" https://dawahnigeria.com/dawahcast/l/304761'

echo -e "\n${YELLOW}CloudFront Configuration Command:${NC}"
echo -e "You'll need to update your CloudFront distribution manually via console or CLI"
echo -e "See DEPLOYMENT.md for detailed instructions"

echo -e "\n${GREEN}Done! 🚀${NC}\n"
