const User = require("../models/user_model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res.status(200).send("Hello World with priyanshu");
    }
    catch (error) {
        console.log(error);
    }
};

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: "email already exists" });
        }
        //const saltRound = 10;
        // const hash_pass = await bcrypt.hash(password,saltRound);
        const userCreated = await User.create({
            username, email, phone, password
        });

        res.status(201).json({
            msg: "Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString()
        });
    }
    catch (error) {
        res.status(400).send({ msg: "page not found" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if email exists
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(201).json({ message: "Invalid Credentials" });
        }

        //compare the password
        const user = await userExists.comparePassword(password);
        if (user) {
            res.status(200).json({
                message: "Login Successful",
                token: await userExists.generateToken(),
                userId: userExists._id.toString()
            });
        }
        else {
            res.status(401).json({ message: "Invalid Email or Password" });
        }
    }
    catch (error) {
        res.status(401).json({ message: "Internal Server Error" });
    }
};

//handling user route and verfying JWT to get data for frontend
const user = async(req, res) => {
    try{
        const userData = req.user;
        // console.log(userData);
        return res.status(201).json({userData});
    }
    catch(error){
        res.status(401).json({msg:"unAuthorized token"})
    }
}


module.exports = { home, register, login, user };
