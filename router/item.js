import express from 'express'
import { addCarties, addCatagories, getBank, getCatagories, getItems, getItemsById, getMyCarts, getRate, postPayment, postRate, shopItem } from '../controller/item.js'
import { varifyToken } from '../middleware/auth.js'
const router = express.Router()
router.get('/get',getItems)
router.get('/get/:id',getItemsById)
router.get('/getCatagory',getCatagories)
router.post('/addCatagory',addCatagories)
router.post('/addCart',addCarties)
router.get('/getMyCart/:id',getMyCarts)
router.post('/shop',shopItem)
router.post('/review',postRate)
router.get('/review/:id',getRate)
router.get('/bank',getBank)
router.post('/bank',postPayment)


export default router