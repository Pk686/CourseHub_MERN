const Contact = require("../models/contact_model");
const User = require("../models/user_model");

const contactForm = async (req, res) => {
    try {
        const { username, email, message } = req.body;
        const nameExist = await User.findOne({ username });
        const emailExist = await User.findOne({ email });
        if (!nameExist) {
            return res.status(201).json({ msg: "username doesn't exists !" });
        }
        else if(!emailExist){
            return res.status(201).json({ msg: "email doesn't exists !" });
        }
        await Contact.create({ username, email, message });
        res.status(200).json({ msg: "message delievered successfully !" });


    }
    catch (error) {
        res.status(500).json({ msg: "message not delievered" });
    }
};
module.exports = contactForm;