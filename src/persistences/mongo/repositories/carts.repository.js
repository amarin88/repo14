import { cartModel } from "../models/cart.model.js";//Importamos el esquema de carritos

const getCartById = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
};//Función asincrona que recibe un id, busca el carrito que contenga ese id y lo retorna

const createCart = async (data) => {
  const cart = await cartModel.create(data);
  return cart;
};//Función asincrona que recibe la data que contendrá el carrito, y devuelve el carrito creado

const addProductToCart = async (cid, pid) => {
  const productInCart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": 1 } },
    { new: true }
  );//Buscamos el carrito por id en la base de datos, buscamos el producto en el array a traves de mongoose por id. Actualizamos la quantity sumandole 1 a traves del operador de mongoose llamado inc

  if (!productInCart) {
    await cartModel.findOneAndUpdate(
      { _id: cid },
      { $push: { products: { product: pid, quantity: 1 } } },
      { new: true }
    );
  }//Si el producto no se encuentra en el carrito, actualizamos el carrito por id haciendo un push en el array de productos a través del pid sumandole 1 a la quantity

  return productInCart;//Retornamos el carrito con el producto agregado
};
//Función asincrona que recibe el id del carrito y el id de un producto, busca el id del producto, sino lo encuentra arroja error, si lo encuentra busca el carrito por id para agregarlo, en caso de no encontrar el carrito también arroja error. Si la funcion se cumple devuelve el carrito con el producto agregado

const updateQuantityProductInCart = async (cid, pid, quantity) => {
  const cart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $set: { "products.$.quantity": quantity } },
    { new: true }
  );//Buscamos el carrito por id en la base de datos, buscamos el producto en el array a traves de mongoose por id. Actualizamos la quantity con el parametro recibido

  return cart;//Retornamos el carrito actualizado
};

const deleteProductInCart = async (cid, pid) => {
    const cart = await cartModel.findOneAndUpdate(
      { _id: cid, "products.product": pid },
      { $inc: { "products.$.quantity": -1 } },
      { new: true }
    );//Buscamos el carrito por id en la base de datos, buscamos el producto en el array a traves de mongoose por id. Actualizamos la quantity restandole 1 a traves del operador de mongoose llamado inc
  
    return cart;//Retornamos el carrito actualizado
  };//Función asincrona que recibe el id del carrito y el id del producto para eliminarlo del carrito

const deleteAllProductsInCart = async (cid) => {
  const cart = await cartModel.findByIdAndUpdate(
    cid,
    { $set: { products: [] } },
    { new: true }
  );//Busca el carrito por id y setea el array de productos en 0

  return cart;//Retornamos el carrito vacio
};//Función asincrona que recibe el id del carrito y elimina todos los productos del carrito

const updateCart = async (cid,products) =>{

  const cart = await cartModel.findByIdAndUpdate(
    cid,
    {$set: { products }},
    {new: true}

  );
  return cart;
};//Función asincrona que recibe el id del carrito y los productos del carrito y actualiza el carrito con los productos agregados

export default {
  getCartById,
  createCart,
  addProductToCart,
  updateQuantityProductInCart,
  deleteProductInCart,
  deleteAllProductsInCart,
  updateCart
};//Exportamos todas las funciones
