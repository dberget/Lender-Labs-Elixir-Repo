#!/bin/bash

set -ex

mix local.hex --force 
mix local.rebar --force

export MIX_ENV=prod

mix deps.get --only prod
mix deps.compile
mix assets.deploy
mix phx.digest
# mix sentry_recompile
mix compile
mix webapp
mix phx.gen.release
mix release

pushd _build/prod/rel/shark_attack
tar czf ../../../../lenderlabs-release.tar.gz .
popd

aws s3 cp lenderlabs-release.tar.gz s3://lenderlabs-releases/