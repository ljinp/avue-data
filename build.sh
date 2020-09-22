#!/usr/bin/env bash

yarn build
rm -rf ./dist/img/**
scp -P 1802 -r  ./dist/* ssh root@219.159.20.119:/data/avue/avue-data
