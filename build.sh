#!/usr/bin/env bash

yarn build
rm -rf ./dist/img/**
scp -r  ./dist/* ssh user01@139.217.218.207:/data/avue/avue-data
