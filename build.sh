#!/bin/bash

eval "rm -rf ./build"
eval "mkdir ./build"

eval "cd ./apis"
directories=(*/)

for API_NAME in "${directories[@]}"
do
  echo "$API_NAME"
  eval "cd ./${API_NAME%\/}"
  eval "rm -rf ./node_modules"
  eval "mkdir ./node_modules"
  eval "cp -R ../../node_modules ."
  eval "zip -r ../../build/${API_NAME%\/}.zip ./*"
  eval "cd ../"
done
