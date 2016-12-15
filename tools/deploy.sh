#!/usr/bin/env bash
# Portions from:
# https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
# http://scurker.com/automated-deploys-with-travis/

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "master" ]; then
  echo "Skipping deploy"
  exit 0
fi

ls -l
git config --global user.email "travis@travis.com"
git config --global user.name "Travis-CI"
git add dist/*.js -f
git commit -m "Travis deployment"

echo "Deploying"
{
  SHA=`git rev-parse --verify HEAD`
  echo -e "Host ${DEPLOY_HOST}\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
  openssl aes-256-cbc -K $encrypted_e996805609d1_key -iv $encrypted_e996805609d1_iv -in travis-key.enc -out travis-key -d
  chmod 0600 travis-key
  mv travis-key ~/.ssh/id_rsa
  git remote add deploy $DEPLOY_REMOTE
  git push -f deploy HEAD:master
} &> /dev/null
