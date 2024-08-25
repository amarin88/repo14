import { ticketModel } from "../models/ticket.model.js";

const create = async (data) =>{
    return await ticketModel.create(data);
};//Función asincrona que recibe la data que contendrá el ticket, y devuelve el ticket creado

export default { create };

