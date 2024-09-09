//create schema
const {Schema,model} = require("mongoose");
const serviceSchema = new Schema({
    images:{
        type: String,
        require: true
    },
    service: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price:{
        type:String,
        require:true
    },
    provider:{
        type:String,
        require:true
    }
});
//create a model
const Service = new model('Service',serviceSchema);

module.exports = Service;
