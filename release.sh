#!/bin/bash
# To exist on web server in /home/lenderlabs directory
# Will be invoked from the deploy.sh script

set -ex

cd /home/lenderlabs/lenderlabs

sudo -u lenderlabs aws s3 cp s3://lenderlabs-releases/lenderlabs-release.tar.gz .
sudo -u lenderlabs tar xzf lenderlabs-release.tar.gz
rm lenderlabs-release.tar.gz

bin/lenderlabs eval "LenderLabs.Release.migrate"

# bin/snowflakes daemon

systemctl restart lenderlabs.service