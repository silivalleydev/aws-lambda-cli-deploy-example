#!/bin/bash

ONE_API_NAME=$1

echo "-z "$ONE_API_NAME""

if [ -z "$ONE_API_NAME" ]; then
  echo "else"
  eval "yarn build"
else
  echo "in $ONE_API_NAME"
  eval "yarn build $ONE_API_NAME"
fi
eval "cd ./build"
directories=(*)
echo "${directories[@]}"
if [ -z "$ONE_API_NAME" ]; then
    sleep 1
    for API_NAME in "${directories[@]}"
    do
      echo "aws lambda update-function-code --function-name ${API_NAME%.zip} --zip-file fileb://${API_NAME%\/} --publish --no-cli-pager --architecture arm64"
      eval "aws lambda update-function-code --function-name ${API_NAME%.zip} --zip-file fileb://${API_NAME%\/} --publish --no-cli-pager --architecture arm64"
      if [ $? -eq 0 ] 
      then
        echo "CREATE FUNC SUCCESS $API_NAME"
      else
        echo "yarn create-func ${API_NAME%.zip}"
        eval "yarn create-func ${API_NAME%.zip}"
      fi
    done
else
    sleep 1
    echo "eval aws lambda update-function-code --function-name ${ONE_API_NAME%.zip} --zip-file fileb://${ONE_API_NAME%\/}.zip --publish --no-cli-pager --architecture arm64"
    eval "aws lambda update-function-code --function-name ${ONE_API_NAME%.zip} --zip-file fileb://${ONE_API_NAME%\/}.zip --publish --no-cli-pager --architecture arm64"
    if [ $? -eq 0 ] 
    then
      echo "CREATE FUNC SUCCESS $ONE_API_NAME"
    else
      echo "yarn create-func ${ONE_API_NAME%.zip}"
      eval "yarn create-func ${ONE_API_NAME%.zip}"
      
    fi
fi





