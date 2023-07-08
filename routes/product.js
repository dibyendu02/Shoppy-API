const Product = require("../models/Product");
const { verifyTokenandAdmin } = require("./verifyToken");
const router = require("express").Router();

//Create
router.post("/", verifyTokenandAdmin, async (req,res) => {
    const newProduct = new Product(req.body);
    try{
        const savedProduct = await newProduct.save();

        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})


//Update
router.put("/:id", verifyTokenandAdmin, async (req,res) => {
    
    try{
        const updatedProduct = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})

//Delete
router.delete("/:id", verifyTokenandAdmin, async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Product deleted succesfully...");
    }catch(err){
        res.status(500).json(err);
    }
})

//Get Product
router.get("/find/:id",  async (req,res) => {
    try{
        const product = await User.findById(req.params.id) ;

        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get All Product
router.get("/", async (req,res) => {
    const newQuery = req.query.new;
    const catQuery = req.query.category;
    try{
        let products;
        if(newQuery){
            products = await Product.find().sort({createdAt: -1}).limit(3);
        }else if(catQuery){
            products = await Product.find({
                categories:{
                    $in : [catQuery],
                },
            });
        }else{
            products = await Product.find();
        }

        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports = router;