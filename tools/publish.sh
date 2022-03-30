#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

newVersion=$1
echo "publishing new version $newVersion"

echo "cleaning up"
rm -Rf dist
rm -Rf .temp/*

echo "building"
yarn prod

echo "publishing"
npx crx3 dist \
    --zip=.temp/extension.zip \
    --crx=.temp/extension.crx \
    --key extension.pem \
    --appVersion "$newVersion" \
    --browserVersion 90.0.0 \
    --xml .temp/extension.xml \
    --crxURL "https://dobby.mighty-code.com/storage/extension.crx"
scp .temp/extension.crx forge@forge-01.mighty-code.com:dobby.mighty-code.com/storage/app/public
scp .temp/extension.xml forge@forge-01.mighty-code.com:dobby.mighty-code.com/storage/app/public

rm dist.crx