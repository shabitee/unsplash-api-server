
// Application level middleware

const loggerMiddleware = (req,res,next) =>{
    console.log(`Logged @ --- ${new Date()}`);
    next();
}


module.exports =loggerMiddleware; 