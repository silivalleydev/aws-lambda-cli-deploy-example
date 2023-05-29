#!/bin/bash

export $(cat .env | xargs)

API_NAME=$1
eval "aws lambda create-function --function-name $API_NAME --zip-file fileb://build/$API_NAME.zip --handler index.handler --runtime nodejs18.x --role arn:aws:iam::$IAM_ID:role/$IAM_ROLE --vpc-config SubnetIds=$SUBNET_IDS,SecurityGroupIds=$SG_GRPS --no-cli-pager --architecture arm64 --memory-size 256 --timeout 8"

# # Lambda function ARN
# FUNCTION_ARN="arn:aws:lambda:$AWS_REGION:$IAM_ID:function:$API_NAME"

# API_NAME="$1"

# # 리전
# REGION=$AWS_REGION

# # REST API 생성
# REST_API_ID=$GATEWAY_ID

# # API Gateway configuration
# echo "REST API ID: ${REST_API_ID}"

# echo "aws apigateway get-resources --rest-api-id $REST_API_ID --query "items[?path=='/parent/resource'].id" --output text"

# PARENT_ID=$(aws apigateway get-resources \
#   --rest-api-id $REST_API_ID \
#   --query "items[?path=='/'].id" \
#   --output text)
# echo "PARENT_ID: ${PARENT_ID}"

# PARENT_RESOURCE_ID=$PARENT_ID
# PATH_PART=$API_NAME
# HTTP_METHOD="ANY"

# # IAM role ARN
# ROLE_ARN="arn:aws:iam::$IAM_ID:role/$LAMBDA_ROLE"

# echo "aws apigateway create-resource --rest-api-id $REST_API_ID --parent-id $PARENT_RESOURCE_ID --path-part $PATH_PART"
# # Create API Gateway resource and method
# RESOURCE_RESPONSE=$(aws apigateway create-resource \
#     --rest-api-id $REST_API_ID \
#     --parent-id $PARENT_RESOURCE_ID \
#     --path-part $PATH_PART \
#     --no-cli-pager)


# RESOURCE_ID=$(echo $RESOURCE_RESPONSE | jq -r '.id')

# aws apigateway put-method \
#     --rest-api-id $REST_API_ID \
#     --resource-id $RESOURCE_ID \
#     --http-method $HTTP_METHOD \
#     --authorization-type "NONE" \
#     --no-cli-pager

# # Connect API Gateway and Lambda function
# aws apigateway put-integration \
#     --rest-api-id $REST_API_ID \
#     --resource-id $RESOURCE_ID \
#     --http-method $HTTP_METHOD \
#     --type AWS \
#     --integration-http-method POST \
#     --uri arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/$FUNCTION_ARN/invocations \
#     --passthrough-behavior WHEN_NO_MATCH \
#     --content-handling CONVERT_TO_TEXT \
#     --credentials $ROLE_ARN \
#     --no-cli-pager

# # Deploy API Gateway changes
# aws apigateway create-deployment \
#     --rest-api-id $REST_API_ID \
#     --stage-name \$default \
#     --no-cli-pager

# echo "API Gateway and Lambda function connected successfully!"
