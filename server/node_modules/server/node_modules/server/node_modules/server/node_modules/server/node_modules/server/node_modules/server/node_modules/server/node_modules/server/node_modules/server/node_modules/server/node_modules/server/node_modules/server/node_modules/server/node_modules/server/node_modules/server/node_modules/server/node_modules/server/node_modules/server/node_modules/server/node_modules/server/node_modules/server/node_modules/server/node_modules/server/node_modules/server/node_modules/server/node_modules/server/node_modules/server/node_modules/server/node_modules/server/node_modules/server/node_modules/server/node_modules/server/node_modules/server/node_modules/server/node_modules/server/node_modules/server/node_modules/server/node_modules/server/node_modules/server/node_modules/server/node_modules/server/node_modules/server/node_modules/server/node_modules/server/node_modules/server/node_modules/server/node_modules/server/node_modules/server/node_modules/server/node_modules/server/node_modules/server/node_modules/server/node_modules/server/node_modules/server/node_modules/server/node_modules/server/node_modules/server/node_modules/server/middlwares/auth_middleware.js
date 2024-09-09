const validate = (schema) => async(req,res,next) => {
    try{
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    }
    catch(err){
        const status = 400;
        const message = "validation failed";
        const extradetails = err.errors[0].message;
        next({status,message,extradetails});

        //res.status(400).json({msg:message});
    }
}
module.exports = validate;