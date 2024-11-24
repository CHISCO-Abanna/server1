const { PrismaClient } = require("@prisma/client")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

const prisma = new PrismaClient();

dotenv.config()
// authenticate a user 

async function auth (req, res, next ) {
    const token = req.header("auth-token")
    // const tokenn = req.header("Authorization").split(" ")[1]
    
    try {
        if(!token){
            return res.status(401).json({ success: false, message: "You are not authorized"})
        }else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            const user = await prisma.user.findUnique({ where: { id: decoded.id}, select: {email: true, id: true, password: true}})
            req.user= user
            next()
        }
    } catch (error) {
        console.log({ message: error.message })
    }
}

// give authorization to a user who is an admin
async function admin(req, res, next) {
    if(req.user.role !== "ADMIN"){
        return res.status(403).json({ succes: false, message: "Forbidden"})
    }
    next();
}


module.exports = { auth, admin };