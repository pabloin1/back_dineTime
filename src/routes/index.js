import adminRoutes from "./admin.routes.js";
import categoriasRoutes from "./categorias.routes.js";
import productoRoutes from "./producto.routes.js";
import reservacionesRoter from "./reservaciones.routes.js";
import authRouter from "./auth.routes.js";
import ventasRouter from "./ventas.routes.js";
import mesasRouter from "./mesas.routes.js";
import meseroRoutes from "./mesero.routes.js";
import cuentaRoutes from "./cuenta.routes.js";
import estadisticaRoutes from "./estadistica.routes.js"

export default [
  { path: "/API/admin", router: adminRoutes },
  { path: "/API/categorias", router: categoriasRoutes },
  { path: "/API/producto", router: productoRoutes },
  { path: "/API/reservaciones", router: reservacionesRoter },
  { path: "/API/auth", router: authRouter },
  { path: "/API/ventas", router: ventasRouter },
  { path: "/API/mesas", router: mesasRouter },
  { path: "/API/mesero", router: meseroRoutes },
  { path: "/API/cuenta", router: cuentaRoutes },
  {path:"/API/estadistica",router:estadisticaRoutes}
];
