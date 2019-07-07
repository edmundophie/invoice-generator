#!/bin/bash

git add .
timestamp="$(date +%s)"
git commit -m "auto commit #$timestamp"
git push