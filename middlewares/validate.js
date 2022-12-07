// Router level middleware
const validateMiddleware = (req,res,next) =>{
    console.log(`Request password`);
    next();
}


module.exports = validateMiddleware; 