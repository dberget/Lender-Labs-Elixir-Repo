#!/bin/bash

rsync -az --progress --delete --exclude=.DS_Store --exclude=_build --exclude=.elixir_ls --exclude=.git . snowflakes-dev:/root/lenderlabs/.

ssh snowflakes-dev -t 'bash -i -c "cd /root/lenderlabs; ./build_release.sh"'

# scp lenderlabs.service lenderlabs:/home/lenderlabs/

# ssh lenderlabs "cp /home/lenderlabs/lenderlabs.service /etc/systemd/system/lenderlabs.service && systemctl daemon-reload && systemctl enable lenderlabs.service"

# ssh lenderlabs -t 'bash -l -i -c "cd /home/lenderlabs; ./release.sh"'