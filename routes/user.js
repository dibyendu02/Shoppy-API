const { verifyTokenandAuthorization } = require("./verifyToken");
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
        res(200).json(updatedUser);
    }catch(err){
        res(500).json(err);
    }
})

module.exports = router


// router.get("/usertest", (req, res) => {
//     res.send("user test is succesfull");
// });

// router.post("/userposttest", (req, res) => {
//     const username = req.body.username;
//     res.send("your username is " + username);
// })