const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
            if (err) res(403).json("Token is not valid");
            req.user = user;
            next();
        })
    }else{
        return res.res(401).json("you're not authenticated")
     }
}

const verifyTokenandAuthorization = (req, res, next) => {
    verifyToken(req, res, () =>{
        if(req.user.id === req.params.id || req.user.isAdmin ){
            next();
        }else{
            res(403).json("You're not allowed to do that")
        }
    })
}

module.exports={ verifyToken, verifyTokenandAuthorization }