import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";

// custom packages 
import connectDB from "./database/connect";
import ProductRouter from "./routers/product";
import categoryRouter from "./routers/category";
import authRouter from "./routers/auth";


class Server {
  app: Application;
  server: http.Server;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    dotenv.config();
    connectDB();
  }

  middlewareSetUp() {
    // Setting middlewares
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "UPDATE"],
      })
    );
    this.app.use(cookieParser());
    this.app.use(compression());
    this.app.use(bodyParser.json());


    // defining the routes
    this.app.use("/api/products", ProductRouter);
    this.app.use("/api/categories", categoryRouter);
    this.app.use("/api/auth", authRouter);

    return this.server;
  }
}

const server = new Server().middlewareSetUp();
const PORT  =  process.env.SERVER_PORT || 5050
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
