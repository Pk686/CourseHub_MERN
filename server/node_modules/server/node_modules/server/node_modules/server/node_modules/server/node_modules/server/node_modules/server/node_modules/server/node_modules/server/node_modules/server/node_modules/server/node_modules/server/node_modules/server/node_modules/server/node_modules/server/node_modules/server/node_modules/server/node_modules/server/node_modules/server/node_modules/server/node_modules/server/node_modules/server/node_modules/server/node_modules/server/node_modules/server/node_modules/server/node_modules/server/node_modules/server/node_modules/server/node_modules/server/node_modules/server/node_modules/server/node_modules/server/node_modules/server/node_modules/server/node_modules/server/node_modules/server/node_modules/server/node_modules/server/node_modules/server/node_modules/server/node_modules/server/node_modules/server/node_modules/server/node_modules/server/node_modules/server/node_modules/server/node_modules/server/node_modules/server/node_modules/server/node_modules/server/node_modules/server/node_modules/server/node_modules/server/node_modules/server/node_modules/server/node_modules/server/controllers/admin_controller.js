const User = require("../models/user_model");
const Contact = require("../models/contact_model");

const getUsers = async(req,res) =>{
    try{
        const data = await User.find({},{password:0});
        res.status(201).json({data});
    }
    catch(error){
        res.status(404).json({message:"Cannot get Users data"});
    }
}
const getContacts = async(req,res) => {
    try{
        const data = await Contact.find();
        res.status(201).json({data});
    }
    catch(error){
        res.status(404).json({message:"Cannot get Contacts data"});
    }
}
const getUserByID = async(req,res) =>{
    try{
        const id = req.params.id;
        const data = await User.findOne({_id:id},{password:0});
        return res.status(200).json(data);
    }
    catch(error){
        next(error);
    }
}
const deleteUserByID = async(req,res) =>{
    try{
        const id = req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({message:"User deleted Successfully"});
    }
    catch(error){
        next(error);
    }
}

const deleteContactByID = async(req,res) =>{
    try{
        const id = req.params.id;
        await Contact.deleteOne({_id:id});
        return res.status(200).json({message:"Contacts deleted Successfully"});
    }
    catch(error){
        next(error);
    }
}

const updateUserByID = async(req,res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const finalData = await User.updateOne({_id:id},{$set:updatedData});
        return res.status(200).json(finalData);
    }
    catch(error){
        next(error);
    }
}
module.exports = {getUsers,getContacts,deleteUserByID,deleteContactByID,getUserByID,updateUserByID};