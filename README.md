# SWebServer

**Effortlessly deploy static websites with a simple and lightweight web server.**

## Overview

`SWebServer` is a straightforward and lightweight web server designed to simplify the deployment of static websites. It's suitable for developers needing a quick way to serve frontend applications or anyone looking to host static content easily, whether using Docker or running directly via Node.js.

For the Docker image, check out the [Docker Hub page](https://hub.docker.com/r/bedlessdeus/swebserver).

## Key Features

* **Simplicity:** Easy to set up and run with minimal configuration.
* **Environment-Based Configuration:** Configure the server using environment variables for flexibility.
* **Docker-Friendly:** Seamless integration with Docker for containerized deployments.
* **Basic Logging:** Option to enable logging of server activity.
* **File Extension Control:** Specify allowed file extensions for serving content.
* **Default Page Generation (Docker):** Automatically generates a default homepage and error pages in Docker environments to confirm server functionality.
* **Custom Error Pages:** Easily customize 403, 404, and 500 error pages by placing `403.html`, `404.html`, or `500.html` files in the root directory.
* **Coming Soon:** Feature to set custom headers for all responses via environment variables.

## Demo Page
> https://swebserver.shardp001.bedless.dev/

## Configuration

`SWebServer` is configured using the following environment variables:

* `WS_FILEPATH`: Specifies the directory where the web server should look for the static files. Defaults to `/var/www/html`.
* `WS_PORT`: Sets the port the web server will listen on. Defaults to `8080`.
* `WS_DO_LOG`: Enables or disables server logging. Set to `"true"` to enable. Defaults to `"false"`.
* `WS_WRITE_LOG`: If `WS_DO_LOG` is `"true"`, this option determines if logs should be written to a file. Defaults to `"false"`.
* `WS_ALLOWED_EXTENSIONS`: A comma-separated list of file extensions the server is allowed to serve (e.g., `.css,.html,.js`).
* `WS_GEN_DEF`: When running in Docker, setting this to `"true"` will generate default `index.html`, `403.html`, `404.html`, and `500.html` files in the `WS_FILEPATH` if they don't exist. Defaults to `"true"`.

## Getting Started

### Prerequisites

* **Node.js** (if running directly without Docker)
* **npm** (Node Package Manager, comes with Node.js)
* **Docker** (if using the Docker image)

### Running Directly

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Bedlessdeus/SWebServer.git](https://github.com/Bedlessdeus/SWebServer.git)
    cd SWebServer
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set environment variables:** You can set the environment variables directly in your terminal or using a `.env` file. For example:
    ```bash
    export WS_FILEPATH="./public"
    export WS_PORT=3000
    export WS_DO_LOG="true"
    ```
4.  **Run the server:**
    ```bash
    npm run prod
    ```
    This will start the `SWebServer`. You can then access your static website by navigating to `http://localhost:3000` (or the port you specified). Make sure you have a directory named `public` (or the path you set in `WS_FILEPATH`) containing your HTML files.

### Running with Docker

1.  **Pull the Docker image:**
    ```bash
    docker pull bedlessdeus/swebserver
    ```
    **Alternatively, using `docker-compose.yml`:**
    ```yaml
    version: '3.8'
    services:
      swebserver:
        image: 'bedlessdeus/swebserver'
        ports:
          - "8080:8080"
        environment:
          - WS_FILEPATH=/usr/share/nginx/html # Example path inside the container
          - WS_PORT=8080
          - WS_DO_LOG=true
          - WS_GEN_DEF=true
        volumes:
          - ./public:/usr/share/nginx/html # Mount your static files
    ```
    Then run:
    ```bash
    docker-compose up -d
    ```
2.  **Run the Docker container:**
    ```bash
    docker run -p 8080:8080 -v /path/to/your/static/files:/var/www/html -e WS_FILEPATH=/var/www/html bedlessdeus/swebserver
    ```
    Replace `/path/to/your/static/files` with the actual path to your static website content on your host machine. You can also set other environment variables using the `-e` flag.

Once the container is running, you can access your website at `http://localhost:8080`.

## Custom Error Pages

To provide custom error pages, simply create HTML files named `403.html`, `404.html`, or `500.html` and place them in the root directory specified by `WS_FILEPATH`. `SWebServer` will automatically serve these pages when the corresponding HTTP error occurs.

## Contributing

Contributions are welcome! If you have any improvements or bug fixes, please submit a pull request to the [GitHub repository](https://github.com/Bedlessdeus/SWebServer).

## License

This project is open source and available for modification and distribution. (Consider adding a specific license like MIT or Apache 2.0 for clarity).

## Coming Soon

* Ability to set custom HTTP headers for all responses via environment variables.
