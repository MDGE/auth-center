rm -rf dist dist.tar
webpack --mode production --config ./conf/webpack.prod.js
cd dist
tar czvf source.tar *
scp source.tar blood-cloud:/usr/local/nginx-1.21.1/html
tar xzvf /usr/local/nginx-1.21.1/html/assets.tar 


# rm -rf /usr/local/nginx-1.21.1/html/assets.tar
# ssh blood-cloud
# ls
# echo 123
# if [  ] ;then
# echo '123'
# fi



