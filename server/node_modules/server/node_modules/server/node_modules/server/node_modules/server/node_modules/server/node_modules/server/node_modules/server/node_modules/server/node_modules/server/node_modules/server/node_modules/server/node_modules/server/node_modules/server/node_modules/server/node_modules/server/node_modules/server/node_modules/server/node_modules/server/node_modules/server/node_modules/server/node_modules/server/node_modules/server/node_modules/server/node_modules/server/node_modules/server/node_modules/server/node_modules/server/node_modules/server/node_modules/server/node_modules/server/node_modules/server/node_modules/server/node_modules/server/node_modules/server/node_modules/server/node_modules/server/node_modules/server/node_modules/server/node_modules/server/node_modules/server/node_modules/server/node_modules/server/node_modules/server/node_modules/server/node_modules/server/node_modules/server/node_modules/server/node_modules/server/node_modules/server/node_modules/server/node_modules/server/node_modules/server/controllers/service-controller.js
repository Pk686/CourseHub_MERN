const Service = require("../models/service_model");

const service = async(req,res) =>{
    try{
        const data = await Service.find();
        res.status(201).json({msg:data});
    }
    catch(error){
        res.status(401).json({msg:"Cannot Fetch services data"})
    }
}
module.exports = service;