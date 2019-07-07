#!/bin/bash

tsc
sass ./_sass:./assets/css & 
mkdir -p ./public
cp index.html ./public
cp -r ./assets ./public