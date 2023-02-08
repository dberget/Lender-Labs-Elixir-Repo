#!/bin/bash

apt update
apt install -y mysql-server
systemctl start mysql.service
systemctl enable mysql.service

####
# # Start mysql client with `mysql`
# ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by '_AZQ6uiuWNfBg4zuWtVV';
# exit
###

mysql_secure_installation
# remove anonymous user, disallow root login remotely, remote test database, reload privilege tables

###
# # start mysql client with `mysql -u root -p`
# CREATE USER 'lenderlabs'@'localhost' IDENTIFIED WITH mysql_native_password BY 'bLUvENV-6UQomKmJb-*E';
# GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'lenderlabs'@'localhost';
# FLUSH PRIVILEGES;
# exit
####


apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
apt update
apt install -y caddy
