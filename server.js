const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes")
const app = express();
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "auth-token"],
        methods: ["GET", "POST", "PUT", "DELETE"]
    })
)
app.use("/",categoryRoutes)
app.use("/",productRoutes)
app.use("/",authRoutes)
app.use("/",cartRoutes)


const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}!`) )