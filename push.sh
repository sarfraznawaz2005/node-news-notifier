#!/bin/sh
git pull
git status
read commitMessage
git add .
git commit -am "$commitMessage"
git push
echo Press Enter...
read