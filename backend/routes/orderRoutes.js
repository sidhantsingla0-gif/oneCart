import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { allOrders, placeOrder, updateStatus, userOrders,placeOrderRazorpay,  verifyRazorpay } from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
const orderRoutes = express.Router()
// for user
orderRoutes.post('/placeorder', isAuth, placeOrder)
orderRoutes.post('/razorpay', isAuth, placeOrderRazorpay)
orderRoutes.post('/verifyrazorpay', isAuth, verifyRazorpay)
orderRoutes.post('/userorders', isAuth, userOrders)

//for admin
orderRoutes.post("/list",adminAuth,allOrders)
orderRoutes.post("/status",adminAuth,updateStatus)

export default orderRoutes