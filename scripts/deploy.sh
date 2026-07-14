#!/usr/bin/env bash
# Build the static export and publish it to the gh-pages branch (GitHub Pages).
set -euo pipefail

cd "$(dirname "$0")/.."

REMOTE_URL=$(git remote get-url origin)

npm run build

# Root redirect → default locale. GitHub Pages runs no middleware, so "/" needs
# a static hop to /hr/ (all locales are prefixed).
cat > out/index.html <<'HTML'
<!doctype html>
<html lang="hr">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=./hr/" />
    <link rel="canonical" href="./hr/" />
    <title>Smash Burger Bar — Split</title>
    <script>
      location.replace("./hr/");
    </script>
  </head>
  <body>
    Preusmjeravam… <a href="./hr/">Smash Burger Bar</a>
  </body>
</html>
HTML

touch out/.nojekyll

cd out
rm -rf .git
git init -q
git checkout -q -b gh-pages
git add -A
git commit -q -m "Deploy static export"
git push -f "$REMOTE_URL" gh-pages
rm -rf .git

echo "Deployed: https://artme-nx.github.io/smash-burger-bar/"
