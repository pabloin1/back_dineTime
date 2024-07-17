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

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();
  }

  middlewares() {
    this.app.use(
      cors({
        origin: "*", // Permite todas las solicitudes de cualquier origen
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos permitidos
        preflightContinue: false,
        optionsSuccessStatus: 204,
      })
    );
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
    // Iniciar servidor HTTP
    // this.app.listen(this.port, () => {
    //   console.log(`Escuchando en el puerto ${this.port}`);
    // });

    const httpsOptions = {
      key: fs.readFileSync(
        path.join(__dirname, "../../../../etc/nginx/ssl/nginx-selfsigned.key")
      ),
      cert: fs.readFileSync(
        path.join(__dirname, "../../../../etc/nginx/ssl/nginx-selfsigned.crt")
      ),
    };

    https.createServer(httpsOptions, this.app).listen(this.httpsPort, () => {
      console.log(
        `Server is running on https://your-ec2-public-dns:${this.httpsPort}`
      );
    });
  }
}
