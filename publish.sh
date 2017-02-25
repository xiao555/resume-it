echo 'publish starting'
cd build
git init
git add .
git commit -m "publish"
git remote add origin https://github.com/xiao555/Resume
git push -f origin master
git checkout -b gh-pages
git push -f origin gh-pages
git checkout master
echo 'published'