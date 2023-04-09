#!/bin/bash

export $(cat .env | xargs)

API_NAME=$1

eval "aws lambda create-function --function-name $API_NAME --zip-file fileb://build/$API_NAME.zip --handler index.handler --runtime nodejs18.x --role arn:aws:iam::$IAM_ID:role/lambda-ex"

# HTTP_METHOD=$2

# RESOURCE_ID=$(aws apigateway get-resources --rest-api-id $API_GATEWAY_ID --query "items[0].id" --output text)

# echo "resource-$RESOURCE_ID"

# eval "aws apigateway put-method --rest-api-id $API_GATEWAY_ID --resource-id $RESOURCE_ID --http-method $HTTP_METHOD --authorization-type "NONE" --output text"



# eval "aws apigateway put-integration --rest-api-id $API_GATEWAY_ID --resource-id $RESOURCE_ID --http-method $HTTP_METHOD --type AWS_PROXY --integration-http-method POST --uri arn:aws:apigateway:$AWS_REGION:lambda:path/2015-03-31/functions/$API_NAME/invocations --credentials lambda-ex"

# eval "aws apigateway put-method-response --rest-api-id $API_GATEWAY_ID --resource-id $RESOURCE_ID --http-method $HTTP_METHOD --status-code 200 --response-models '{"application/json": "Empty"}'"

# eval "aws apigateway put-integration-response --rest-api-id $API_GATEWAY_ID --resource-id $RESOURCE_ID --http-method $HTTP_METHOD --status-code 200 --response-templates '{"application/json": ""}'"

# eval "aws apigateway create-deployment --rest-api-id $API_GATEWAY_ID --stage-name $STAGE_NAME --output text"