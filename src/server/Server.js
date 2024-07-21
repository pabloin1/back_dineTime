import https from "https";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import routes from "../routes/index.js";
import { fileURLToPath } from "url";
import { validarApiKey } from "../middlewares/validar-ApiKey.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ServerApi {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.httpsPort = 443;

    // Opciones HTTPS
    this.httpsOptions = {
      key: fs.readFileSync(
        "/etc/letsencrypt/live/dine-time-api-negocio.integrador.xyz/privkey.pem"
      ),
      cert: fs.readFileSync(
        "/etc/letsencrypt/live/dine-time-api-negocio.integrador.xyz/fullchain.pem"
      ),
    };

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
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }

  listen() {
    // // // Iniciar servidor HTTP
    // this.app.listen(this.port, () => {
    //   console.log(`Escuchando en el puerto ${this.port}`);
    // });

    //Iniciar servidor HTTPS
    https.createServer(this.httpsOptions, this.app).listen(this.port, () => {
      console.log(
        `Server is running on https://dine-time-api-negocio.integrador.xyz`
      );
    });
  }
}