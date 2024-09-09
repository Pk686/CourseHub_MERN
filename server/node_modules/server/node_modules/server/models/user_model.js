require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//create schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});
//hashing password
userSchema.pre('save', async function () {
    //console.log("pre method",this);
    const user = this;
    if (!user.isModified("password")) {
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_pass = await bcrypt.hash(user.password, saltRound);
        user.password = hash_pass;
    }
    catch (error) {
        next(error);
    }
});

//jwt token authentication
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            
            {
                expiresIn:"30d",
            }
        );
    }
    catch (error) {
        console.error(error);

    }
};
//compare password using bcrypt
userSchema.methods.comparePassword = async function(password){
    try{
        return bcrypt.compare(password,this.password);
    }
    catch(error){
        console.error(error);
    }
};

//create model
const User = new mongoose.model("User", userSchema);
module.exports = User;