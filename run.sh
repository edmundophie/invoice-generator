#!/bin/bash

tsc -p tsconfig.prod.json
sass --watch ./_sass:./assets/css & 
http-server ./ -p 3000 & 