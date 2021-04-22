require('dotenv').config()
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require('../db/escData');
const { ref } = require('../db/knex');
const uuid = require('../middleware/uuid');
const nodemailer = require("nodemailer");
const router = express.Router();

const ipAddress = "localhost:1337"

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
    res.status(204)
})

// insert login credentials
router.post('/createUser', async (req, res) => {
    // Authenticate User
    const user_id = uuid.generateUuid();
    req.body.user_id = user_id;
    uuidList.push(user_id)
    try {
        const result = await db.createUser(req.body);
        const accessToken = generateAccessToken(req.body)
        const refreshToken = jwt.sign(req.body, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)
        res.json({ success_user_id: user_id, accessToken: accessToken, refreshToken: refreshToken })
    } catch {
        res.status(409).json({message: "invalid data fills. probably non-unique phone number/username"})
    }
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
    if (refreshToken == null) return res.status(401)
    if (!refreshTokens.includes(refreshToken)) return res.status(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403)
      const accessToken = generateAccessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    })
})


function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '35m'})
}



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'randomran9898@gmail.com',
        pass: 'Randomran98',
    }
});

router.get('/verifyEmail', async (req, res) => {
    const user = {userName: req.query.userName}
    jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '35m'},
        (err, emailToken) => {
            console.log('finished signing jwt and going to send email')
            const url = `http://${ipAddress}/auth/uploadEmailToken/:${emailToken}`;
            
            let mailOptions = {
                from: "randomran9898@gmail.com",
                to: req.query.email,
                subject: 'Confirm Email',
                text: `Please click this email to confirm your email: ${url}`,
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
            });
            // res.status(200).json({message: "verification email sent"})
            res.status(200).json({message: emailToken})
    },
    );    
})

router.get('/uploadEmailToken/:token', async (req, res) => {

    jwt.verify(req.params.token.substr(1), process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        // if (err) return res.status(403).json({message: "email verification failed ><"})
        if (err) {
            console.log("me error is here! :\n\n")
            console.log(err)
            return res.status(403).json({message: "email verification failed ><"})
        }
        
        const userDetails = {userName: user.userName,
                        verificationStatus: 'true'}
        // update db to say this user is email verified
        await db.verifyTheUser(userDetails)
        res.status(200).json({message: "email verification success! Please proceed back to the website"});
    })
});

router.get('/checkVerifiedUser', async (req, res) => {
    try{
        const verificationStatus = await db.checkVerifiedUser(req.query.userName)
        res.status(200).json({message:verificationStatus})
    } catch(error){
        res.status(409).json({message:"problem retrieving from db"})
    }
})


// router.use(authenticateToken)
// /////////////////////////////////////////////////////


// // middleware function
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401)
  
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403)

//         // if (posts.map(a=>a.username).includes(user.name)){
//         if (uuidList.includes(user.user_id)){
//             req.user = user
//             next()
//         }
//         return res.sendStatus(405)
//     })
// }

// // dummy posts api call for testing
// router.get('/posts', authenticateToken, async (req, res) => {
//     res.json({successful : jwt})
// })

// module.exports = {authenticateToken};



module.exports = router;
