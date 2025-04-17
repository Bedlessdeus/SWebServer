import express from "express";
import { writeFile } from "fs";
import http from "http";

const app = express();
const server = http.createServer(app);
const session =  Date.now() + ".log";


app.use((req, res, next) => {
    console.log(`${Date.now()}|${req.method}|${req.host + req.url}|${req.ip}|${req.protocol}|${req.get("user-agent")}`);
    writeFile(session, `${Date.now()}|${req.method}|${req.host + req.url}|${req.ip}|${req.protocol}|${req.get("user-agent")}\n`, { flag: "a" }, (err) => {
        if (err) {
            console.error("Error writing log file", err);
        }
    });
    next();
});

app.use(express.static(process.env.WS_FILEPATH?? "/var/www/html"));

server.listen(process.env.WS_PORT?? 80, () => {
  console.log("Server running at http://localhost:" + (process.env.WS_PORT?? 80));
  console.log("Session log file: " + session);
});