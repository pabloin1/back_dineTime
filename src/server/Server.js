import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import adminRoutes from "../routes/admin.routes.js";
import categoriasRoutes from "../routes/categorias.routes.js";
import productoRoutes from "../routes/producto.routes.js";
import reservacionesRoter from "../routes/reservaciones.routes.js"
import authRouter from '../routes/auth.routes.js'

export class ServerApi {
  constructor() {
    this.app = express();
    this.port = 3000 || 8080;

    //middelewares
    this.middelewares();

    //Rutas
    this.routes();
  }

  middelewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(bodyParser.json());
  }

  routes() {
    this.app.use("/API/admin", adminRoutes);
    this.app.use("/API/categorias",categoriasRoutes);
    this.app.use("/API/producto",productoRoutes);
    this.app.use("/API/reservaciones",reservacionesRoter )
    this.app.use('/API/auth',authRouter)
    
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Escuchando en el puerto ${this.port}`)
    );
  }
}
