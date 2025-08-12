#!/bin/bash

apt update
apt install -y mysql-server
systemctl start mysql.service
systemctl enable mysql.service

####
# # Start mysql client with `mysql`
# ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by '<password>';
# exit
###

mysql_secure_installation
# remove anonymous user, disallow root login remotely, remote test database, reload privilege tables

###
# # start mysql client with `mysql -u root -p`
# CREATE USER 'lenderlabs'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>';
# GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'lenderlabs'@'localhost';
# FLUSH PRIVILEGES;
# exit
####


apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
apt update
apt install -y caddy

useradd lenderlabs --create-home --shell /bin/bash
cd /home/lenderlabs
mkdir lenderlabs
chown lenderlabs.lenderlabs lenderlabs

apt install -y awscli

# su lenderlabs
# aws configure
# exit


systemctl edit lenderlabs.service
# put in config env vars
vi /etc/profile.d/lenderlabs.sh
# put in same ones

vi /etc/caddy/Caddyfile
######
# # lenderlabs.xyz reverse proxy
# new.lenderlabs.xyz {
#     reverse_proxy localhost:4000
#     encode zstd gzip
# }
####
systemctl restart caddy