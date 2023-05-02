//const fs = require("fs");
import fs from "fs";

class ProductsManager {
  constructor(path) {
    this.products = [];
    this.path = path;
    this.init(path);
  }

  init(path) {
    let file = fs.existsSync(path);
    if (!file) {
      fs.writeFileSync(path, "[]");
      console.log("file created at path: " + this.path);
      return "file created at path: " + this.path;
    } else {
      this.products = JSON.parse(fs.readFileSync(path, "UTF-8"));
      console.log("data recovered");
      return "data recovered";
    }
  }
  async add_products({ title, description, price, thumbnail, Stock }) {
    try {
      let data = { title, description, price, thumbnail, Stock };
      if (this.products.length > 0) {
        let next_id = this.products[this.products.length - 1].id + 1;

        data.id = next_id;
      } else {
        data.id = 1;
      }
      this.products.push(data);
      let data_json = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, data_json);
      console.log("id´ creado del producto: " + data.id);
      return "id´s producto: " + data.id;
    } catch (error) {
      console.log(error);
      return "error: al crear el producto";
    }
  }
  getProducts() {
    try {
      if (this.products.length === 0) {
        console.log("Not found");
      }
      console.log(this.products);
      return this.products;
    } catch (error) {
      console.log(error);
      return "getProduct: Error";
    }
  }
  getProductById(id) {
    try {
      let one = this.products.find((each) => each.id === id);
      if (!one) {
        console.log("Not Found");
        return null;
      } else {
        console.log(one);
        return one;
      }
    } catch (error) {
      console.log(error);
      return "GetProductById : Error";
    }
  }
  // async update_product(id, data) {
  //   try {
  //     let one = this.getProductsById(id);
  //     if (!one) {
  //       console.log("not found editado");
  //       return "Not found editado";
  //     }

  //     for (let prop in data) {
  //       one[prop] = data[prop];
  //     }

  //     let data_json = JSON.stringify(this.products, null, 2);

  //     await fs.promises.writeFile(this.path, data_json);
  //     console.log("updated user: " + id);
  //     return "updated user: " + id;
  //   } catch (error) {
  //     console.log(error);
  //     return "UpdateProduct: Error";
  //   }
  // }

  // async destroy_products(id) {
  //   try {
  //     let one = this.getProductsById(id);
  //     if (!one) {
  //       console.log("not found eliminado");
  //       return "Not found eliminando";
  //     }
  //     this.products = this.products.filter((each) => each.id !== id);
  //     let data_json = JSON.stringify(this.products, null, 2);
  //     await fs.promises.writeFile(this.path, data_json);
  //     console.log("delete user: " + id);
  //     return "delete user: " + id;
  //   } catch (error) {
  //     console.log(error);
  //     return "DeleteProduct: Error ";
  //   }
  // }
}
let newProduct = new ProductsManager("./products.json");
async function manager() {
  await newProduct.add_Cart({
    title: "zapatilla nike",
    description: "zapatilla urbana clasica",
    price: 1245,
    thumbnail: "./foto.js",
    Stock: "10",
  });
  await newProduct.add_Cart({
    title: "zapatilla nike",
    description: "zapatilla urbana clasica",
    price: 1245,
    thumbnail: "./foto1.js",
    Stock: "10",
  });
  await newProduct.add_Cart({
    title: "zapatilla nike",
    description: "zapatilla urbana clasica",
    price: 1245,
    thumbnail: "./foto2.js",
    Stock: "10",
  });

  await newProduct.add_Cart({
    title: "zapatilla nike",
    description: "zapatilla urbana clasica",
    price: 1245,
    thumbnail: "./foto3.js",
    Stock: "10",
  });
  await newProduct.add_Cart({
    title: "zapatilla nike",
    description: "zapatilla deportive static",
    price: 2350,
    thumbnail: "./foto4.js",
    Stock: "10",
  });
  await newProduct.add_Cart({
    title: "zapatilla nike",
    description: "zapatilla vestir poractive",
    price: 998,
    thumbnail: "./foto5.js",
    Stock: "10",
  });
  await newProduct.add_Cart({
    title: "zapatilla nike",
    description: "zapatilla deportive super starr",
    price: 1390,
    thumbnail: "./foto6.js",
    Stock: "10",
  });
  await newProduct.add_Cart({
    title: "zapatilla nike",
    description: "zapatilla urbana blsck",
    price: 1425,
    thumbnail: "./foto7.js",
    Stock: "10",
  });
  await newProduct.add_Cart({
    title: "zapatilla nike",
    description: "zapatilla urbana pro white",
    price: 835,
    thumbnail: "./foto8.js",
    Stock: "10",
  });
  await newProduct.add_Cart({
    title: "zapatilla nike",
    description: "zapatilla deportive react ",
    price: 2530,
    thumbnail: "./foto9.js",
    Stock: "10",
  });
  await newProduct.getCart();
  await newProduct.getCartById(9);
  await newProduct.update_product(9, {
    title: "Zapatilla NIke modificada  ",
    description: "zapatilla nike Editada",
  });
  await newProduct.destroy_products(10);
}
//manager();
export default newProduct;
