import customErrors from "../errors/customErrors.js"; // Importación de errores
import usersRepository from "../persistences/mongo/repositories/users.repository.js"; // Importación del repositorio de users
import { createHash, isValidPassword } from "../utils/hashPassword.js"; // Importación de funciones para manejar el hash de contraseñas
import { sendMail } from "../utils/sendMails.js"; // Importación de función para enviar correos electrónicos

const sendEmailResetPassword = async (email) => {
  const message =
    "Must reset your password at the following link: https://www.google.com"; // Mensaje que contiene el enlace para restablecer la contraseña
  await sendMail(email, "Reset Password", message); // LLamamos la función para enviar el correo con el asunto "Reset Password" y el mensaje

  return "Email sent"; // Retorna un mensaje indicando que el correo fue enviado
}; // Función para enviar el correo de restablecimiento de contraseña

const resetPassword = async (email, password) => {
  const user = usersRepository.getByEmail(email); // Busca al usuario en la base de datos por su correo electrónico
  if (!user) throw customErrors.notFoundError("User not found"); // Lanza un error si no se encuentra el usuario

  const samePassword = isValidPassword(user, password);
  if (samePassword) throw customErrors.badRequestError("Password already used"); // Lanza un error si la contraseña ya ha sido usada

  return await usersRepository.update(user._id, {
    password: createHash(password),
  }); // Actualiza la contraseña del usuario con la nueva, usando hash
}; // Función para restablecer la contraseña del usuario

const changeUserRole = async (uid) => {
  const user = usersRepository.getById(uid); // Busca al usuario en la base de datos por su ID
  if (!user) throw customErrors.notFoundError("User not found"); // Lanza un error si no se encuentra el usuario

  const userRole = user.role === "premium" ? "user" : "premium"; // Cambia el rol del usuario, si es "premium" lo pasa a "user" y viceversa

  return await usersRepository.update(uid, { role: userRole }); // Actualiza el rol del usuario en la base de datos
}; // Función para cambiar el rol del usuario

export default {
  sendEmailResetPassword,
  resetPassword,
  changeUserRole,
};