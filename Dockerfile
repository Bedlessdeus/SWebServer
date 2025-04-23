FROM node:20

ENV WS_PORT=80
WORKDIR /www/server

RUN apt-get update && \
    apt-get install -y curl unzip jq && \
    rm -rf /var/lib/apt/lists/*

RUN LATEST_URL=$(curl -s https://api.github.com/repos/Bedlessdeus/SWebServer/releases | jq -r '.[0] | .assets[] | select(.name | test("\\.zip$")) | .browser_download_url') && \
    curl -L "$LATEST_URL" -o /tmp/release.zip && \
    unzip /tmp/release.zip -d /www/server && \
    rm /tmp/release.zip

RUN npm install --omit=dev

CMD ["npm", "run", "prod"]