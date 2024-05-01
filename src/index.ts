import express, { Express, urlencoded } from "express";
import cluster from "node:cluster";
import os from "node:os";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import http from "http";

import { connectDb } from "./service/connectDb";

import userRoute from "./routes/userRoute";

const port: Number = 8000;

const numCPU = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 8; i < numCPU; i++) {
    cluster.fork();
  }
} else {
  const app: Express = express();

  app.use(
    cors({
      credentials: true,
    }),
  );

  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());

  connectDb("mongodb://localhost:27017/testone")
    .then(() => console.log("mongodb connected"))
    .catch((error) => console.log(error));

  app.use("/", userRoute);

  const server = http.createServer(app);

  server.listen(port, () =>
    console.log("server running on http://localhost:8000/"),
  );
}
