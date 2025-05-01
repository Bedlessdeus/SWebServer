FROM node:20

ENV WS_PORT=80

RUN mkdir -p /www/server

WORKDIR /www/server

RUN apt-get update && \
    apt-get install -y curl unzip jq && \
    rm -rf /var/lib/apt/lists/*

RUN LATEST_URL=$(curl -s https://api.github.com/repos/Bedlessdeus/SWebServer/releases | jq -r '.[0] | .assets[] | select(.name | test("\\.zip$")) | .browser_download_url') && \
    curl -L "$LATEST_URL" -o /tmp/release.zip && \
    unzip /tmp/release.zip -d /www/server

RUN npm install --omit=dev


CMD if [ "$WS_GEN_DEF" = "true" ]; then \
      mkdir -p /var/www/html/css; \
      cp -n /www/server/404.html /var/www/html/404.html; \
      cp -n /www/server/403.html /var/www/html/403.html; \
      cp -n /www/server/index.html /var/www/html/index.html; \
      cp -n /www/server/css/style.css /var/www/html/css/style.css; \
    fi && npm run prod