const git = require('simple-git')
const colors = require('colors')
const path = 'dist'
const repo = 'https://github.com/xiao555/Resume.git'

console.log(`Start public to your git repo[${repo}]\nPlease wait ...`.green)
git(path)
  .init()
  .add('./*')
  .commit("public")
  .addRemote('origin', repo)
  .push(['-f', 'origin', 'master'], () => {
    console.log("Push to master success");
  })
  .checkoutLocalBranch('gh-pages', () => {
    console.log('Checkout to branch gh-pages');
  })
  .push(['-f', 'origin', 'gh-pages'])
  .checkout('master', () => {
    console.log('Finish public, back to branch master.');
  })
