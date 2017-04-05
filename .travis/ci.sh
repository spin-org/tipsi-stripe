#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    cd example_tmp
    npm run configure
    set -o pipefail && npm run build:ios | xcpretty -c -f `xcpretty-travis-formatter`
    npm run test:ios -- --platform-version 8.4
    npm run test:ios -- --platform-version 10.0
  ;;
  linux)
    cd example_tmp
    npm run configure
    npm run build:android
    npm run test:android
  ;;
esac
