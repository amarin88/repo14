import { userModel } from "../models/user.model.js";//Importamos el esquema de users

const getAll = async (query , options) =>{
    const users = await userModel.paginate(query, options);
    return users;
};//Función asincrona para traer todos los users, retorna todos los useros encontrados recibiendo las querys y las opciones configuradas de paginación

const getById = async ( id ) =>{
    const user = await userModel.findById(id);
    return user;
};//Función asincrona que recibe un id, busca el user que contenga ese id y lo retorna

const getByEmail = async (email ) => {
    const user = await userModel.findOne( { email });
    return user;
};//Función asincrona que recibe un email, busca el user que contenga ese email y lo retorna

const create = async (data) =>{
    const user = await userModel.create(data);
    return user;
};//Función asincrona que recibe la data que contendrá el usero y devuelve el user creado

const update = async (id, data) =>{
    const user = await userModel.findByIdAndUpdate(id, data, {new: true});
    return user;
};//Función asincrona que recibe el id del user y la data con la cual se actualizará el user, una vez actualizado busca el user por id y lo retorna

const deleteOne = async ( id ) =>{
    const user = await userModel.deleteOne({ _id: id }); //EL id tiene que coincidir con el de la base de datos de mongo
    if (user.deletedCount === 0) return false;
    return true;
};//Función asincrona que elimina el user por id

export default { getAll, getById, getByEmail, create, update, deleteOne };//Exportamos todas las funciones