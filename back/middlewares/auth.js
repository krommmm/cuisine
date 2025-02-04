require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    try{
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,`${process.env.SECRET_KEY}`);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;

    req.auth = {
        userId: userId,
        isAdmin: isAdmin
    }
    next();
}
catch(err){
    res.status(401).json({err});
}
};