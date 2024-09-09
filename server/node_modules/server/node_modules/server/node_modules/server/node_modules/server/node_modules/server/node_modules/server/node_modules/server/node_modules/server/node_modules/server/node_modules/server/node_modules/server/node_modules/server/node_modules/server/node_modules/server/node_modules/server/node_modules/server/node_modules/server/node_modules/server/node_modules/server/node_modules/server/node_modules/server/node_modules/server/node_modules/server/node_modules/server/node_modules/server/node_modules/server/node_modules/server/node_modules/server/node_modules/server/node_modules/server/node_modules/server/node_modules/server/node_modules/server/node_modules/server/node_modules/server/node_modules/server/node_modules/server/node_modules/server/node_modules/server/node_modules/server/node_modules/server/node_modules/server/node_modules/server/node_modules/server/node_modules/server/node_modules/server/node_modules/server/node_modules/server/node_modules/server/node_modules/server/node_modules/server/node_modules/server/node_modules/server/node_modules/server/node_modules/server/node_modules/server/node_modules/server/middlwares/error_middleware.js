const errorMiddleware = async(err,req,res,next) => {
    const status = err.status || 422;
    const message = err.message || "Backend error";
    const extradetails = err.extradetails || "internal backend error";
    res.status(status).json({message,extradetails});
};
module.exports = errorMiddleware;