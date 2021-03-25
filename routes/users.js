const express = require("express");
const db = require('../db/escData');
const bodyParser = require('body-parser');
const router = express.Router();





router.get("/getAllUsers", async (req, res) => {
    const users = await db.getAllUsers();
    res.status(200).json({users})
});


// note to deal with case where users try to sign up with the same id
router.post("/createUser", async (req, res) =>{
    // const user_id=Server.generateUuid();
    // const result = await db.createUser(user_id,req.body);
    const result = await db.createUser(req.body);
    res.status(200).json({id: result[0]});
});


router.delete("/deleteUser", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deleteUser(req.query.user_id);
    res.status(200).json({success:true})
});


router.put("/updateUser",async(req,res) =>{
    await db.updateUser(req.body);
    res.status(200).json({success:true})
});


router.get("/displayAttendPostListsOfTheUser", async (req, res) => {
    const users = await db.displayAttendPostListsOfTheUser(req.query.user_id);
    res.status(200).json({users})
});

router.post("/createPostListsOfTheUser", async (req, res) =>{
    const result = await db.createPostListsOfTheUser(req.query.user_id,req.query.post_id);

    res.status(200).json({id: result[0]});
});
router.delete("/deleteAllPostListsOfTheUser", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deleteAllPostListsOfTheUser(req.query.user_id);
    res.status(200).json({success:true})
});
router.delete("/deletePostListsOfTheUser", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deletePostListsOfTheUser(req.query.user_id,req.query.post_id);
    res.status(200).json({success:true})
});





module.exports = router;
