const adminMiddleware = async(req,res,next) =>{
    try{
        const checkAdmin = req.user.isAdmin;
        if(!checkAdmin){
            return res.status(401).json({message:"Access is denied. User is not an admin"})
        }
        //The user is admin in this case
       // res.status(201).json({message:checkAdmin});
       next();
    }
    catch(error){
        next(error);
    }
}
module.exports = adminMiddleware;