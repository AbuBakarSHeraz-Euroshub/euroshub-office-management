const {verifyToken} = require('../config/jwt');

const authMiddleware = (req,res,next) => {
    try{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: 'No token Provided'});
    }
    const token = authHeader.split(' ')[1];
    req.user = verifyToken(token);
    next();
    }catch(error){
        res.status(401).json({message:'Invalid Token', error: error.message});
    }
};

module.exports = authMiddleware;