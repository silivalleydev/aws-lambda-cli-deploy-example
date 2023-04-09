#!/bin/bash

eval "./build.sh"

eval "cd ./build"
directories=(*)

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



