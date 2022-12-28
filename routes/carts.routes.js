import { Router } from 'express'
import ProductManager from '../utils/ProductManager.js'
import CartManager from '../utils/CartManager.js'


const router = Router()

router.get('/:cid', (req, res) => {
  const cid = parseInt(req.params.cid)
  CartManager.getCart(cid) 
  ? res.status(200).json(CartManager.getCart(cid))
  : res.status(404).json({msg:"no matches found"})
})

 router.post('/', (req,res) => {
  CartManager.createCart()
  res.status(200).send({msg: "The cart has been created"})
}) 

router.post('/:cid/product/:pid', async (req,res) => {
  const {cid, pid} = req.params;
  const {quantity} = req.body; 
  let Exist = ProductManager.getProducts().some(element => element.id === Number(pid))
  if (!Exist) res.status(404).json({msg:"Product not found"})
  else { 
  await CartManager.addToCart(Number(cid),Number(pid),quantity) 
  ? res.status(201).json({msg:`Items added to cart ${Number(cid)}`})
  : res.status(400).json({error:"Please enter valid data"})

  }
})

export default router; 