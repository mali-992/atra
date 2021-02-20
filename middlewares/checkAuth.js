const jwt = require('jsonwebtoken');
const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];     
       const {id}= jwt.verify(token, process.env.JWT_KEY);
        req.userId=id
        next();
    } catch (err) {
        res.status(401).json({
            message: "Auth faild"
        })
    }
}
module.exports = checkAuth;