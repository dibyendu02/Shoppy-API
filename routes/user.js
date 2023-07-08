const { verifyTokenandAuthorization, verifyTokenandAdmin } = require("./verifyToken");
const User = require("../models/User");

const router = require("express").Router();


//Update
router.put("/:id", verifyTokenandAuthorization, async (req,res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.JWT_SECRET
        ).toString();
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err);
    }
})

//Delete
router.delete("/:id", verifyTokenandAuthorization, async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Account deleted succesfully...");
    }catch(err){
        res.status(500).json(err);
    }
})

//Get User
router.get("/find/:id", verifyTokenandAdmin, async (req,res) => {
    try{
        const user = await User.findById(req.params.id) ;
        const { password, ...others } = user._doc;

        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get All User
router.get("/", verifyTokenandAdmin, async (req,res) => {
    const query = req.query.new;
    try{
        //sorting by the id
    const users = query ? await User.find().sort({_id: - 1}).limit(3) : await User.find() ;
        // const { password, ...others } = user._doc;

        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
})


//Get User stats
router.get("/stat", verifyTokenandAdmin, async (req,res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try{
        const data = await User.aggregate([
            {$match: { createdAt: {$gte: lastYear}}},
            {
                $project: {
                    month: {$month : "$createdAt"},
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum:1}
                }
            }
        ])

        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports = router

