const { PrismaClient } = require("@prisma/client");
const cloudinary = require("../config/cloudinary")
const prisma = new PrismaClient();

// reviewed???


exports.createProduct = async(req, res) => {
    const { categoryId, name, description, price, featured, trending } = req.body;
    try {
        const category = await prisma.category.findUnique({ where: { id: parseInt(categoryId, 10) }})
        if(!category) return res.status(400).json({ success: false, message: "Invalid categoryId"})
        let result;
        // try {
        //     const file = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`)
        //     result= file
        //     console.log(result);
        //     console.log("Image uploaded successfully")
        // } catch (error) {
        //     console.log("Image not uploaded successfully")
        // }
        const product = await prisma.product.create({ data: { 
            categoryId:category.id,
            name, 
            image: "",  
            description, 
            price: parseInt(price), 
            featured: Boolean(featured), 
            trending: Boolean(trending) } })
        if(!product) return res.status(400).json({ success: false, message:" product not added"})
        res.status(201).json({ success: true, message: "Product created successfully", data: product})
    } catch (error) {
        console.log({ error: error.message })
    }
}

// exports.createProduct = async(req, res) => {
//     let { categoryId, name, description, price, featured, trending} = req.body;
//     categoryId = parseInt(categoryId)
//     price = parseInt(price)
//     try {
//         const category = await prisma.category.findUnique({ where: { id: categoryId }})
//         if(!category) return res.status(400).json({ success: false, message: "Invalid categoryId"})

//             let result;
//             try {
//                 const image = await cloudinary.uploader.upload(`data:${req.file.mimeType};base64,${req.file.toString("base64")}`, {
//                     folder: "product_image"
//                 })
//                 console.log(image);
//                 result= image.secure_url
//             } catch (error) {
//                 console.log("Did not upload successfully");
//             }
//             const product = await prisma.product.create({ data: {categoryId, name, image: result, description, price, featured, trending}})
//         if(!product) return res.status(400).json({ success: false, message: "product not added"})
//             res.status(201).json({ success: true, message: "product created successfully", data: product})
//     } catch (error) {
//         console.log({ error: error.message });
//     }
// }

// get all products

exports.getProduct = async(req, res) => {
    try {
        const products = await prisma.product.findMany({ include: { category: true }});
        if(!products) return res.status(400).json({ success: false, message: "No products found"})
        return res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log({ message: error.message }); 
    }
}