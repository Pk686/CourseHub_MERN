const {z} = require("zod");

const signupSchema = z.object({
    username:z.string(
        {required_error:"Name is required"})
        .trim()
        .min(3,{message:"names should be of 3 chars atleast"})
        .max(255,{message:"names should not exceed 255 chars"})
    ,
    email:z.string(
        {required_error:"Email is required"})
        .trim()
        .email({message:"Invalid email"})
        .min(11,{message:"email should be of 11 chars atleast"})
        .max(255,{message:"email should not exceed 255 chars"})
    ,
    phone:z.string(
        {required_error:"phone no is required"})
        .trim()
        .min(10,{message:"phone should be of 10 chars atleast"})
        .max(20,{message:"phone should not exceed 20 chars"})
    ,
    password:z.string(
        {required_error:"password is required"})
        .trim()
        .min(7,{message:"password should be of 7 chars atleast"})
        .max(1024,{message:"password should not exceed 1024 chars"})
    ,
});

const loginSchema = z.object({
    email:z.string(
        {required_error:"Email is required"})
        .trim()
        .email({message:"Invalid email"})
        .min(11,{message:"email should be of 11 chars atleast"})
        .max(255,{message:"email should not exceed 255 chars"})
    ,
    password:z.string(
        {required_error:"password is required"})
        .trim()
        .min(7,{message:"password should be of 7 chars atleast"})
        .max(1024,{message:"password should not exceed 1024 chars"})
    ,
});



module.exports = {signupSchema,loginSchema};