import express from "express";
import newCarts from "./carts.js";
import newProduct from "./products.js";

let server = express();

let PORT = 8080;
let ready = () => console.log("server ready on port: " + PORT);

server.listen(PORT, ready);
server.use(express.urlencoded({ extended: true }));
// getCarts
let index_route = "/api/carts";
let index_function = (req, res) => {
  let quantity = newCarts.getCart().length;
  if (quantity) {
    return res.send({ success: true, response: `there are ${quantity} carts` });
  } else {
    return res.send({ success: false, response: `not found` });
  }
};
server.get(index_route, index_function);
// getProducts
let index_route1 = "/api/products";
let index_function1 = (req, res) => {
  let quantity = newProduct.getProducts().length;
  if (quantity) {
    return res.send({
      success: true,
      response: `there are ${quantity} products`,
    });
  } else {
    return res.send({ success: false, response: `not found` });
  }
};
server.get(index_route1, index_function1);
//getCartsById
let one_route = "/api/carts/:id";
let one_function = (req, res) => {
  let parametros = req.params;
  let id = Number(parametros.id);
  //console.log(id)
  //console.log(typeof id)
  let one = newCarts.getCartById(id);
  console.log(one);
  if (one) {
    return res.send({
      success: true,
      Product: one,
    });
  } else {
    return res.send({
      success: false,
      product: "not found",
    });
  }
};
server.get(one_route, one_function);
//getProductsById
let one_route1 = "/api/products/:id";
let one_function1 = (req, res) => {
  let parametros = req.params;
  let id = Number(parametros.id);
  //console.log(id)
  //console.log(typeof id)
  let one = newProduct.getProductById(id);
  console.log(one);
  if (one) {
    return res.send({
      success: true,
      Product: one,
    });
  } else {
    return res.send({
      success: false,
      product: "not found",
    });
  }
};
server.get(one_route1, one_function1);
// limitCarts carts
let query_route = "/api/products";
let query_function = (req, res) => {
  console.log(req.query);
  let limit = req.query.limit ?? 5;
  /*     if (req.query.quantity) {
    } */
  let products = newCarts.getCart().slice(0, limit); //array de usuarios que tengo que REBANAR para que se pagine según la query que envía el cliente
  if (products.length > 0) {
    return res.send({
      success: true,
      products,
    });
  } else {
    return res.send({
      success: false,
      products: "not found",
    });
  }
};
server.get(query_route, query_function);
//limitProducts
let query_route1 = "/api/productsZ";
let query_function1 = (req, res) => {
  console.log(req.query);
  let quantity = req.query.quantity ?? 5;
  /*     if (req.query.quantity) {
    } */
  let products = newProduct.getProducts().slice(0, quantity); //array de usuarios que tengo que REBANAR para que se pagine según la query que envía el cliente
  if (products.length > 0) {
    return res.send({
      success: true,
      products,
    });
  } else {
    return res.send({
      success: false,
      products: "not found",
    });
  }
};
server.get(query_route1, query_function1);
