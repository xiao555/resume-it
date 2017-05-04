echo 'publish starting'
cd dist
git init
git add .
git commit -m "publish"
git remote add origin https://github.com/xiao555/Resume
git push -f origin master
git checkout -b gh-pages
git checkout gh-pages
git add .
git commit -m "publish"
git push -f origin gh-pages
git checkout master
echo 'published'