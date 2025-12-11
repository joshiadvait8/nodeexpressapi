const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next)=>{
    //first check req.headers has authorization field
    const authorization = req.headers.authorization;
    if(!authorization){
        return  res.status(401).json({error: 'Authorization header missing'});
    }
    //extract token from "Bearer <token>"
    const token = authorization.split(' ')[1];  
    if(!token){
        return res.status(401).json({error: 'Token missing'});
    }
    try{
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //attach decoded payload to req.user
        next(); //proceed to next middleware/route handler

    }catch(err){
        console.error('JWT verification failed:', err);
        return res.status(401).json({error: 'Invalid token'});
    }

}

//function to generate JWT token
const generateToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
}

module.exports = {
    jwtAuthMiddleware,
    generateToken
};