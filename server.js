import env from "./src/utils/env.util.js";
import express from "express";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import IndexRouter from "./src/routers/index.router.js";

import socketUtils from "./src/utils/socket.utils.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";

import dbconection from "./src/utils/db.js";

const server = express();
const Port = env.PORT || 8080;
const ready = () => {
  console.log(`Servidor escuchando en el puerto ${Port}`);
  dbconection();
};
const httpServer = createServer(server);
const socketServer = new Server(httpServer);

httpServer.listen(Port, ready);
socketServer.on("connection", socketUtils);

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(morgan("dev"));

server.use(cookieParser());

const router = new IndexRouter()
server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);

export { socketServer };
