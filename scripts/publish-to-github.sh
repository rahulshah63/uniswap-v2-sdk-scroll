#!/bin/bash
jq '.name = "@rahulshah63/uniswap-v2-sdk-scroll"' package.json > package-modified.json
mv package-modified.json package.json

VERSION=$(jq -r '.version' package.json)
npm --no-git-tag-version version "$VERSION-$BUILD_VERSION"
npm publish
