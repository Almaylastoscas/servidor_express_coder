import fs from "fs";

class CartManager {
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
  async add_Cart({ quantity }) {
    try {
      let data = { quantity };
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
  getCart() {
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
  getCartById(id) {
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
let newCarts = new CartManager("./carts.json");

async function manager() {
  await newCarts.add_Cart({
    quantity: 5,
  });
  await newCarts.add_Cart({
    quantity: 3,
  });
  await newCarts.add_Cart({
    quantity: 2,
  });

  await newCarts.add_Cart({
    quantity: 1,
  });
  await newCarts.add_Cart({
    quantity: 7,
  });

  // await newCarts.getCart();
  // await newCarts.getCartById(9);
  //  await newCarts.update_product(9, {
  //     title: "Zapatilla NIke modificada  ",
  //     description: "zapatilla nike Editada",
  //   });
  //   await newProduct.destroy_products(10);
}
//manager();
export default newCarts;
