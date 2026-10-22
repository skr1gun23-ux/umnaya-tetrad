#!/bin/sh
set -e
cd "$(dirname "$0")"
JS=$(ls src/*.js | sort)
{ cat src/head.html; cat src/body.html; echo '<script>'; for f in $JS; do cat "$f"; echo; done; echo '</script>'; } > umnaya-tetrad.html
{ printf '<!doctype html>\n<html lang="ru">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n';
  grep -v 'claude:viewport' src/head.html; printf '</head>\n<body>\n'; cat src/body.html; echo '<script>'; for f in $JS; do cat "$f"; echo; done; printf '</script>\n</body>\n</html>\n'; } > out/index.html
for f in $JS; do cat "$f"; echo; done > t.js
node --check t.js && wc -c umnaya-tetrad.html out/index.html
