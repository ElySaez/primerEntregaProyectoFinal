import fs from 'fs'

class CartManager {
  constructor(path) {
    this.path = path
    fs.existsSync(this.path) ? this.cart = JSON.parse(fs.readFileSync(this.path, 'utf-8')) : this.cart = [];
  }

  async createCart() {
    let carrito = {
      "products": []
    }

    this.cart.length === 0 ? carrito["id"] = 1 : carrito["id"] = this.cart[this.cart.length - 1]["id"] + 1
    this.cart.push(carrito)
    await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, '\t'))


  }

  async addToCart(CartId, ProductId, quantity) {
    let i = this.cart.findIndex(carrito => carrito.id === CartId)
    if (i === -1 || this.cart[i]["products"] === undefined) return false;
    let iProduct = this.cart[i]["products"].findIndex(pid => pid.productId === ProductId)
    let Exist = this.cart[i]["products"].some(pid => pid.productId === ProductId)


     if (Exist) {
      this.cart[i]["products"][iProduct]["quantity"] += quantity;
    } else {
      this.cart[i]["products"].push({ "productId": ProductId, "quantity": quantity })
    }
    

    await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, '\t'))
    return true;

  }


  getCart = (id) => {
    let carrito = this.cart.find(element => element.id === id)
    return carrito || false
  }

}


export default new CartManager('./carrito.json')