import ticketsRepository from "../persistences/mongo/repositories/tickets.repository.js";

const createTicket = async (userMail, totalCart) =>{
    const newTicket = {
        amount: totalCart,
        purchaser: userMail,
        code: Math.random().toString(36).substr(2, 9),

    }
    const createdTicket = await ticketsRepository.create(newTicket);
    return createdTicket;
};

export default {
    createTicket,
};