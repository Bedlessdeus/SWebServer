import express, { RequestHandler } from "express";
import { writeFile, existsSync, statSync } from "fs";
import http from "http";
import path from "path";

const app = express();
const sR = http.createServer(app);
const sN = `${Date.now()}.log`;

const sD = process.env.WS_FILEPATH ?? "/var/www/html";
const p = parseInt(process.env.WS_PORT ?? "80", 10);
const dL = (process.env.WS_DO_LOG ?? "false").toLowerCase() === "true";
const wL = (process.env.WS_WRITE_LOG ?? "false").toLowerCase() === "true";
const aE = (process.env.WS_ALLOWED_EXTENSIONS ?? ".html,.css").split(
  ","
) as Array<string>;

if (dL) {
  app.use((req, res, next) => {
    const logEntry =
      [
        Date.now(),
        req.method,
        req.hostname + req.url,
        req.ip,
        req.protocol,
        req.get("user-agent"),
      ].join("|") + "\n";

    console.log(logEntry.trim());

    if (wL) {
      writeFile(sN, logEntry, { flag: "a" }, (err) => {
        if (err) {
          console.error("Error writing log file:", err);
        }
      });
    }

    next();
  });
}

app.use((req, res, next) => {
  const requestedPath = path.join(sD, req.path);
  const indexPath = path.join(requestedPath, "index.html");
  const htmlPath = requestedPath.endsWith("/")
    ? indexPath
    : requestedPath + ".html";

  const candidates = [requestedPath, indexPath, htmlPath].filter(Boolean);
  console.log(candidates);
  const found = candidates.find((p) => {
    console.log(`Checking ${p}`);
    return existsSync(p) && statSync(p).isFile();
  });

  if (!found) {
    res.locals.errorCode = 404;
    return next();
  }

  const isAllowed = aE.some((ext) => found.endsWith(ext));
  if (!isAllowed) {
    console.log(`Forbidden access to ${found}`);
    res.locals.errorCode = 403;
    return next();
  }

  res.locals.filePath = found;
  next();
});

app.use(((req, res, next) => {
  const filePath = res.locals.filePath;
  const errorCode = res.locals.errorCode;

  if (filePath) {
    return res.sendFile(filePath);
  }

  const errorPagePath = path.join(sD, `${errorCode}.html`);
  if (existsSync(errorPagePath)) {
    return res.status(errorCode).sendFile(errorPagePath);
  }

  res.status(errorCode || 500).send(`${errorCode || 500} Error`);
}) as express.RequestHandler);
sR.listen(p, () => {
  console.log(`Server running at http://localhost:${p}`);
  console.log(`Session log file: ${sN}`);
});
