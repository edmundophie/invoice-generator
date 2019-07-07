#!/bin/bash

tsc & 
sass --watch ./_sass:./assets/css & 
http-server ./ -p 3000 & 