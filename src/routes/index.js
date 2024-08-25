// Importación del router de Express
import { Router } from "express";
// Importación de las rutas de productos
import productsRoutes from "./products.routes.js";
// Importación de las rutas de carritos
import cartsRoutes from "./carts.routes.js";
// Importación de las rutas de las sessions
import sessionRoutes from "./session.routes.js";
// Importación de las rutas de los emails
import emailsRoutes from "./emails.routes.js";
// Importación de las rutas de logger tests
import loggerTestRoutes from "./loggerTest.routes.js";
// Importación de las rutas de los users
import userRoutes from "./user.routes.js"

// Creación del router
const router = Router();

// Utiliza las rutas de productos bajo el prefijo "/products"
router.use("/products", productsRoutes);
// Utiliza las rutas de carritos bajo el prefijo "/carts"
router.use("/carts", cartsRoutes);
// Utiliza las rutas de las sessions bajo el prefijo "/sessions"
router.use("/session", sessionRoutes);
// Utiliza las rutas de emails bajo el prefijo "/emails"
router.use("/emails", emailsRoutes);
// Utiliza las rutas de los logger tests bajo el prefijo "/loggerTest"
router.use("/loggerTest", loggerTestRoutes);
// Utiliza las rutas de emails bajo el prefijo "/user"
router.use("/user", userRoutes);

// Exporta el router
export default router;