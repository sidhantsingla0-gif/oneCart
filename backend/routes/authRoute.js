import express from "express"
import { login, logout, registration,googleLogin,adminLogin } from "../controller/authController.js"

const authRoutes = express.Router()

authRoutes.post('/registration',registration)
authRoutes.post('/login',login)
authRoutes.get('/logout',logout)
authRoutes.post('/googleLogin',googleLogin)
authRoutes.post('/adminLogin', adminLogin)


export default authRoutes