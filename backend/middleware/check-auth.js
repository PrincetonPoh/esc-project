const jwt = require('jsonwebtoken');

module.exports = (req, res ,next) => {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    // if (token == null) return res.sendStatus(401)
    
    // try {
    //     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    //     req.userData = decoded;
    //     next()
    // } catch (err) {
    //     return res.status(401).json({
    //         message: 'Auth failed'
    //     })
    // }
    next()
}