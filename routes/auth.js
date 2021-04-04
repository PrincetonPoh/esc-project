require('dotenv').config()
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require('../db/escData');
const { ref } = require('../db/knex');
const uuid = require('../middleware/uuid');
const router = express.Router();

// for testing. 
let refreshTokens = []

const posts = [
    {
      username: 'Kyle',
      title: 'Post 1'
    },
    {
      username: 'Jim',
      title: 'Post 2'
    }
]

/////////////////////////////////////////////////////

router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

// insert login credentials
router.post('/login', (req, res) => {
    // Authenticate User
    const username = req.query.username
    const user = { name: username }
    
  
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})


router.post('/token', (req, res) => {
    const refreshToken = req.query.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    })
})


router.get('/posts', authenticateToken, (req, res) => {
    res.json(posts)
})

/////////////////////////////////////////////////////

// middleware function
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        if (posts.map(a=>a.username).includes(user.name)){
            req.user = user
            next()
        }
        return res.sendStatus(403)
    })
}

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '20m'})
}
module.exports = router;
