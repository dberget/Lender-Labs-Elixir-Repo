#!/bin/bash
# To exist on web server in /home/lenderlabs directory
# Will be invoked from the deploy.sh script

set -ex

cd /home/lenderlabs/lenderlabs

sudo -u lenderlabs aws s3 cp s3://lenderlabs-releases/lenderlabs-release.tar.gz .
sudo -u lenderlabs tar xzf lenderlabs-release.tar.gz
rm lenderlabs-release.tar.gz

<<<<<<< HEAD
bin/lenderlabs eval "LenderLabs.Release.migrate"
=======
bin/shark_attack eval "SharkAttack.Release.migrate"
>>>>>>> 7243e3b574e3d9d10d1054ac9695d4113a74639d

# bin/snowflakes daemon

systemctl restart lenderlabs.service