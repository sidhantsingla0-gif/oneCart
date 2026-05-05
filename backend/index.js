import express from "express"
import dotenv from 'dotenv'
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoute.js"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import orderRoutes from "./routes/orderRoutes.js"
dotenv.config()

let port = process.env.PORT || 8000;

let app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["https://onecart-frontend3.onrender.com", "https://onecart-admin1-175t.onrender.com"],
    credentials: true
}))
app.use(express.static('public'))
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoutes)
connectDb()

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

