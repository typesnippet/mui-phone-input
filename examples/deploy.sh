#!/bin/bash
cd ~/mui-phone-input/
git restore .
git pull

nvm use 18
npm i -g yarn

cd ~/mui-phone-input/examples/material
yarn && yarn build

sudo rm -r /var/www/playground/mui-phone-input/*
sudo mkdir /var/www/playground/mui-phone-input/material
sudo cp -r ~/mui-phone-input/examples/material/build/* /var/www/playground/mui-phone-input/material

sudo service nginx restart