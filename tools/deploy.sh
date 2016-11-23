#!/usr/bin/env bash

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
  echo "Skipping deploy"
  exit 0
fi

echo -e "Host example.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
openssl aes-256-cbc -K $encrypted_e996805609d1_key -iv $encrypted_e996805609d1_iv -in travis-key.enc -out travis-key -d
chmod 0600 travis-key
mv travis-key ~/.ssh/id_rsa
git remote add deploy $DEPLOY_REMOTE
git push deploy master