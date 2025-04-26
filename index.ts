import express, { RequestHandler } from "express";
import { writeFile, existsSync } from "fs";
import http from "http";
import path from "path";

const app = express();
const server = http.createServer(app);
const session = `${Date.now()}.log`;

const staticDir = process.env.WS_FILEPATH ?? "/var/www/html";
const port = parseInt(process.env.WS_PORT ?? "80", 10);
const doLog = (process.env.WS_DO_LOG ?? "false").toLowerCase() === "true";
const writeLog = (process.env.WS_WRITE_LOG ?? "false").toLowerCase() === "true";

// Remove the unholy trash that is known as Path To RegExp
// You know what, I'm not done with you, whoever wrote the abomination that is Path To RegExp, deserves to be stoned.
// If I find you, I will tear your head off, you as a person that though oh, lets make /* into /wildcard(*), because "Regex" is too difficult for me to understand.
// I will make you suffer, I will make you cry, I will make you beg for mercy, and then I will delete your code, and replace it with a simple regex that does the same thing, but is actually readable and understandable.
const getFuckYouPathToRegExp = (
  route: string,
  handler: (req: express.Request, res: express.Response) => void
): void => {
  app.get(new RegExp(route), handler);
};

if (doLog) {
  app.use((req, res, next) => {
    const logEntry = [
      Date.now(),
      req.method,
      req.hostname + req.url,
      req.ip,
      req.protocol,
      req.get("user-agent")
    ].join("|") + "\n";

    console.log(logEntry.trim());

    if (writeLog) {
      writeFile(session, logEntry, { flag: "a" }, (err) => {
        if (err) {
          console.error("Error writing log file:", err);
        }
      });
    }

    next();
  });
}

getFuckYouPathToRegExp("/*", (req, res) => {
  const requestedPath = path.join(staticDir, req.path);
  const indexPath = path.join(requestedPath, "index.html");
  const htmlPath = requestedPath.endsWith("/")
    ? indexPath
    : requestedPath + ".html";

  console.log("Requested path:", requestedPath);

  if (existsSync(indexPath)) return res.sendFile(indexPath);
  if (existsSync(htmlPath)) return res.sendFile(htmlPath);

  const errorPage = path.join(staticDir, `${res.statusCode}.html`);
  if (existsSync(errorPage)) {
    return res.status(res.statusCode).sendFile(errorPage);
  }

  res.status(404).send("404 Not Found");
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Session log file: ${session}`);
});