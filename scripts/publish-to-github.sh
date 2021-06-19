#!/bin/bash
jq '.name = "@dimensiondev/uniswap-sdk"' package.json > package-modified.json
mv package-modified.json package.json

VERSION=$(jq -r '.version' package.json)
npm --no-git-tag-version version "$VERSION-$BUILD_VERSION"
npm publish
