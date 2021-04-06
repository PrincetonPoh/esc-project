require('dotenv').config()
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require('../db/escData');
const { ref } = require('../db/knex');
const uuid = require('../middleware/uuid');
const router = express.Router();

// for testing. 
let refreshTokens = []
let uuidList = []

// const posts = [
//     {
//       user_id: 'Kyle',
//       title: 'Post 1'
//     },
//     {
//       username: 'Jim',
//       title: 'Post 2'
//     }
// ]

/////////////////////////////////////////////////////

router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.query.token)
    res.sendStatus(204)
})

// insert login credentials
router.post('/createUser', async (req, res) => {
    // Authenticate User
    const user_id = uuid.generateUuid();
    req.body.user_id = user_id;
    uuidList.push(user_id)

    try {
        const result = await db.createUser(req.body);
    } catch {
        res.status(409).json({message: "invalid data fills. probably non-unique phonenumber/username"})
    }
    
    const accessToken = generateAccessToken(req.body)
    const refreshToken = jwt.sign(req.body, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    
    res.json({ success_user_id: user_id, accessToken: accessToken, refreshToken: refreshToken })
})


router.get('/login', async (req, res) => {
    const userName = req.query.userName
    const password = req.query.password
    const userData = await db.getUserByUserName(userName)
    try{
        if (userData[0].password != password) return res.status(409).json({message:"Incorrect password"})
    } catch(error){
        console.log(error);
        return res.status(409).json({message:'User not available'});
    }

    const accessToken = generateAccessToken(req.body)
    const refreshToken = jwt.sign(req.body, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    console.log(refreshTokens)
    
    res.json({ userName: userName, accessToken: accessToken, refreshToken: refreshToken })
})

router.post('/token', async (req, res) => {
    const refreshToken = req.query.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    })
})



router.use(authenticateToken)



/////////////////////////////////////////////////////


function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '35m'})
}


// middleware function
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        // if (posts.map(a=>a.username).includes(user.name)){
        if (uuidList.includes(user.user_id)){
            req.user = user
            next()
        }
        return res.sendStatus(405)
    })
}

// dummy posts api call for testing
router.get('/posts', authenticateToken, async (req, res) => {
    res.json({successful : jwt})
})




module.exports = {authenticateToken};
module.exports = router;
