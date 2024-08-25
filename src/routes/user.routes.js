import { Router } from "express"; //Import router de express
import usersControllers from "../controllers/users.controllers.js"; // Importa los controladores de users

const router = Router(); //Inicializador del router de express

router.post("/email/reset-password", usersControllers.sendEmailResetPassword);// Ruta para enviar un correo de restablecimiento de contraseña
router.post("/reset-password", usersControllers.resetPassword);// Ruta para restablecer la contraseña
router.get("/premium/:uid", usersControllers.changeUserRole);// Ruta para cambiar el rol de un usuario a premium



export default router;

