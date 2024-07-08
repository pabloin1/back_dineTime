import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import routes from "../routes/index.js";
import { validarApiKey } from "../middlewares/validar-ApiKey.js";

export class ServerApi {
  constructor() {
    this.app = express();
    this.port = 3000 || 8080;

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(validarApiKey);
  }

  routes() {
    routes.forEach(route => {
      this.app.use(route.path, route.router);
    });
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Escuchando en el puerto ${this.port}`)
    );
  }
}
