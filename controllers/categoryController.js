const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// Create/post category
exports.createCategory = async (req, res) => {
    try {
        const category = await prisma.category.create({ data: req.body })
        if(category) {
            res.status(201).json({ success: true, message: "Category created successfully", data: category})
        }else{
            res.status(400).json({ success: false, message: "Unable to create category" })
        }
    } catch (error) {
        console.log({ message: error.message});
    }
}

// Read/Get all category
exports.getCategory = async(req, res) => {
    try {
        const category = await prisma.category.findMany()
        if(!category) return res.status(400). json({ success:false, message: "No category found"})
        return res.status(200).json({ success: true, data: category})
    } catch (error) {
        console.log({ message: error.message });
    }
}

// Get singlecategory
exports.getsinglecategory = async(req,res) => {
    try {
        const category = await prisma.category.findUnique({ where: { id: parseInt(req.params.id) }})
        if(!category) return res.status(400).json({ success: false, message: "No category found"})
           return res.status(200).json({ success: true, data: category})
    } catch (error) {
        console.log({ message: error.message});
    }
}
// Update/put category
exports.updatecategory = async (req,res) => {
    try {
        const category = await prisma.category.findUnique({ where: {id:parseInt(req.params.id)}})
        if(!category) return res.status(400).json({ success: false, message: "No category found"})
            console.log(category.id);
            
        const updatecat = await prisma.category.update({ where: { id: category.id}, data: req.body })
        if(!updatecat) return res.status(400).json({ success: false, message: "Unable to update category"})
            res.status(200).json({ success: true, message: "Category updated", data: updatecat})
    } catch (error) {
        console.log({ message: error.message});
    }
}

// Delete/delete
exports.deletecategory = async(req, res) => {
    try {
        const category = await prisma.category.findUnique({ where: {id:parseInt(req.params.id)}})
        if(!category) return res.status(400).json({ success: false, message: "No category found"})
            
        const deletecategory = await prisma.category.delete({ where: { id: category.id}})
            res.status(200).json({ success: true, message: "Category deleted successfully", data: deletecategory})
    } catch (error) {
        console.log({ message: error.message});
    }
}