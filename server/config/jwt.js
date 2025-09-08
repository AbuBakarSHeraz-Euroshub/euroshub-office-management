const jwt = require('jsonwebtoken');

const genToken = (userID) => {
    return jwt.sign({ id:userID},
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        });
}

const verifyToken = (token) =>{
    return jwt.verify(token,process.env.JWT_SECRET);
} 

module.exports = {genToken , verifyToken};
