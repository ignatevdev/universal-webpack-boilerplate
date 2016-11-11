#!/bin/bash

echo; echo; echo "######## git pull ########"

git pull

echo; echo; echo "######## npm install ########"

npm install

echo; echo; echo "######## building bundles ########"

npm run production-build-client


echo; echo; echo "######## All done! ########"
