import fs from 'fs'

class ProductManager {
  constructor(path) {
    this.path = path
    fs.existsSync(this.path) ? this.objs = JSON.parse(fs.readFileSync(this.path, 'utf-8')) : this.objs = [];
  }
  getProducts = () => {
    return this.objs;
  }

  async addProduct(title, description, category, price, thumbnail, code, stock) {
    let product = {
      'title': title,
      'description': description,
      "category": category,
      'price': price,
      'thumbnail': thumbnail,
      'code': code,
      'status': true,
      'stock': stock,
    }

    this.objs.length === 0 ? product["id"] = 1 : product["id"] = this.objs[this.objs.length - 1]["id"] + 1
    let search = this.objs.some(e => e.code === code)

    if (search) return false//
    else {
      this.objs.push(product)
      await fs.promises.writeFile(this.path, JSON.stringify(this.objs, null, '\t'))
      return true;
    }


  }

 

  getProductsById = (id) => {
    let obj = this.objs.find(o => o.id === id);
    if (obj) {
        console.log("----------------------------");
        console.log(obj);
    } else {
        console.log("Product not found");
    }
    return obj;
  }


  async update(id, row, nValue) {

    let i = this.objs.findIndex(e => e.id === id)
    let valid;
    i === -1 ? false : valid = Object.keys(this.objs[i]).some(element => element === row)


    if (!valid || row === 'id' ) {
      return false
    } else {
      this.objs[i][row] = nValue;
      await fs.promises.writeFile(this.path, JSON.stringify(this.objs, null, '\t'))
      return true;
    }


  }




  async deleteProduct(id) {
    try {
      const obj = this.objs.findIndex((elm) => elm.id === id);
      if (obj !== -1) {
          this.objs.splice(obj, 1);
          await fs.promises.writeFile(this.path, JSON.stringify(this.objs, null, '\t'));
          console.log('The product has been removed');
      } else {
          console.log('The product does not exist');
      }
  } catch (error) {
      console.log('Error:', error);
  }
  }

 

}


export default new ProductManager('./products.json')