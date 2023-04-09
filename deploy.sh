#!/bin/bash

eval "./build.sh"

eval "cd ./build"
directories=(*)

ONE_API_NAME=$1

echo "-z "$ONE_API_NAME""

if [ -z "$ONE_API_NAME" ]; then
    for API_NAME in "${directories[@]}"
    do
      eval 'result=$(eval "aws lambda update-function-code --function-name ${API_NAME%.zip} --zip-file fileb://${API_NAME%\/}")'
      echo "$result"
      if [ $? -eq 0 ] 
      then
        echo "yarn create-func ${API_NAME%.zip}"
        eval "yarn create-func ${API_NAME%.zip}"
      else
        echo "create fail-$result, $API_NAME"
      fi
    done
else
    eval 'result=$(eval "aws lambda update-function-code --function-name ${ONE_API_NAME%.zip} --zip-file fileb://${ONE_API_NAME%\/}")'
    echo "$result"
    if [ $? -eq 0 ] 
    then
      echo "yarn create-func ${ONE_API_NAME%.zip}"
      eval "yarn create-func ${ONE_API_NAME%.zip}"
    else
      echo "create fail-$result, $ONE_API_NAME"
    fi
fi





