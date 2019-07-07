#!/bin/bash

rm -R public
tsc --project tsconfig.prod.json
sass ./_sass:./assets/css
mkdir -p ./public
cp index.html ./public
cp -r ./assets ./public