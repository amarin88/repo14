import customErrors from "../errors/customErrors.js";//Import config de errors
import userServices from "../services/users.services.js";// Importa los services relacionados con users

const sendEmailResetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;// Obtiene el email del body

    res.cookie("resetPassword", email, { httpOnly: true, maxAge: 10000 });//Establece una cookie llamada "resetPassword" que almacena el correo electrónico del usuario. La cookie está protegida contra accesos desde JavaScript y tiene una duración de 10 segundos antes de expirar
    const response = await userServices.sendEmailResetPassword(email);// Llama al servicio para enviar el correo de restablecimiento de contraseña
    res.status(200).json({ status: "success", response });// Responde con un mensaje de éxito si el correo fue enviado correctamente
  } catch (error) {
    error.path = "[POST] /api/user/email/reset-password";
    next(error);
  }
};// Controlador para enviar el correo de restablecimiento de contraseña

const resetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;// Obtiene el email y la nueva contraseña del body
    const emailCookie = req.cookies.resetPassword;// Obtiene la cookie almacenada en el cliente
    if (!emailCookie) throw customErrors.badRequestError("Email link expired");// Verifica si la cookie ha expirado o no existe

    await userServices.sendEmailResetPassword(email, password);// Llama al servicio para restablecer la contraseña del usuario

    res
      .status(200)
      .json({ status: "success", response: "Password successfully updated" });// Responde con un mensaje de éxito si la contraseña fue actualizada correctamente
  } catch (error) {
    error.path = "[POST] /api/user/reset-password";
    next(error);
  }
};// Controlador para restablecer la contraseña

const changeUserRole = async (res, req, next) => {
  try {
    const { uid, role } = req.params;// Obtiene el ID del usuario desde los parámetros de la URL
    const response = await userServices.changeUserRole(uid, role);// Llama al servicio para cambiar el rol del usuario
    res.status(200).json({ status: "success", response });// Responde con un mensaje de éxito si el rol fue actualizado correctamente
  } catch (error) {
    next(error);
  }
};// Controlador para cambiar el rol del usuario

export default {
  sendEmailResetPassword,
  resetPassword,
  changeUserRole,
};