require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

const authMiddlware = async (req, res,next) => {
    const token = req.header('Authorization');
    //console.log(token);
    if (!token) {
        res.status(401).json({ msg: "unAuthorized, invalid token" });
    }
    const jwtToken = token.replace("Bearer ", "").trim();
    try {
        const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
        const userData = await User.findOne({email:isVerified.email}).select({password:0});
        //console.log(userData);
        req.user = userData;
        req.token = token;
        req.userID = userData._id;
        next();
    }
    catch (error) {
        res.status(401).json({ msg: "unAuthorized, invalid token" });
    }
}
module.exports = authMiddlware;