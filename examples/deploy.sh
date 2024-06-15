#!/bin/bash
cd ~/mui-phone-input/
git restore .
git pull

cd ~/mui-phone-input/examples/material
rm -r node_modules package-lock.json
npm install && npm run build

sudo rm -r /var/www/playground/mui-phone-input/*
sudo mkdir /var/www/playground/mui-phone-input/material
sudo cp -r ~/mui-phone-input/examples/material/build/* /var/www/playground/mui-phone-input/material

sudo service nginx restart
