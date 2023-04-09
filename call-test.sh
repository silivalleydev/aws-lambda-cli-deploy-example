#!/bin/bash

API_NAME=$1

eval "aws lambda invoke --function-name $API_NAME out --log-type Tail"