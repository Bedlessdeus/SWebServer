# Lightweight Web Server
This is a lightweight, easy-to-configure, and resilient web server built with Node.js and Express. It is designed to serve static files and log incoming requests efficiently.

## Docker
https://hub.docker.com/r/bedlessdeus/swebserver

## Features
- **Static File Serving**: Serves static files from a configurable directory.
- **Request Logging**: Logs all incoming requests with details such as timestamp, method, URL, IP, protocol, and user-agent.
- **Environment Variable Support**: Easily configurable using `.env` files.
- **Resilient Design**: Handles errors gracefully and ensures smooth operation.

## Configuration
The server uses the following environment variables for configuration:

- `WS_FILEPATH`: The directory path to serve static files from. Defaults to `/var/www/html` if not specified.
- `WS_PORT`: The port on which the server listens. Defaults to `80` if not specified.

### Example `.env` File
```env
WS_FILEPATH="/var/www/html"
WS_PORT=8080
```

## Usage
Development
To run the server in development mode:
```sh
npm run dev
```

Production
To build and run the server in production mode
```sh
npm run build
npm run prod
```

## Logging
The server generates a log file for each session, named with the current unix timestamp (e.g., 1617891234567.log). Logs include details such as:

* Timestamp
* HTTP method
* Request URL
* Client IP
* Protocol
* User-Agent

## Dependencies
* [Express](https://expressjs.com/) - Web framework for Node.js
* [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at scale

## Dev Dependencies
* [ts-node](https://github.com/TypeStrong/ts-node) - TypeScript execution engine
* [@types/node](https://www.npmjs.com/package/@types/node) - TypeScript definitions for Node.js
* [@types/express](https://www.npmjs.com/package/@types/express) - TypeScript definitions for Express

## License
This project is licensed under the GPU GPLv3 License.

## Author
Bedlessdeus
