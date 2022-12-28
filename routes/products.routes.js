import { Router } from 'express'
import { uploader } from '../utils/multer.js'
import ProductManager from '../utils/ProductManager.js'


const router = Router()


router.get('/', (req, res) => {
    let limit = parseInt(req.query.limit)
    try {
        if (!limit || limit === null) {
            res.status(200).json(ProductManager.getProducts())
        } else {
            const arr = ProductManager.getProducts()
            let arr2 = arr.slice(null, limit)
            res.status(202).json(arr2)
        }
    } catch (error) {
        res.status(400).json({ msg: 'error' })
    }
});

router.get('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid);
    let response = await ProductManager.getProductsById(pid)
    res.json(response || { info: "Product not found" })
});

router.post('/', uploader.single('thumbnail'), async (req, res) => {
    const { title, description, category, price, thumbnail, code, stock} = req.body;

    !req.file && res.status(400).send({ status: "error" })

    await ProductManager.addProduct(title, description, category, price, req.file.path, code, stock)
        ? res.status(201).json({ msg: "Product successfully added" })
        : res.status(409).json({ msg: "The product exists" })
});

router.put('/:pid', async (req, res) => {
    const { id, row, nValue } = req.body;
    await ProductManager.update(id, row, nValue)
        ? res.status(200).json({ msg: "The product has been updated" })
        : res.status(409).json({ info: "Action not allowed" })

})


router.delete('/:pid', async (req, res) => {
    let pid = parseInt(req.params.pid)
    await ProductManager.deleteProduct(pid)
        ? res.status(200).json({ msg: "The product has been successfully removed!"})
        : res.status(400).json({ msg: "The product does not exist" })
})

export default router;
