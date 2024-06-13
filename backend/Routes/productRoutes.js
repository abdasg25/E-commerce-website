import express from 'express'
import productController from '../Controllers/productController.js'
import userAuth from '../Middlewares/authMiddleware.js'
const productRoutes = express.Router()

productRoutes.get('/', userAuth, productController.allProducts)
productRoutes.get('/category/:category', userAuth, productController.category)
productRoutes.get('/size/:size', userAuth, productController.filterBySize)
productRoutes.get('/filterByPrice', userAuth, productController.filterByPrice)
productRoutes.post('/add', userAuth, productController.add)

export default productRoutes
