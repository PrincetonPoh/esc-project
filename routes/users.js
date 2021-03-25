const express = require("express");
const db = require('../db/escData');
const uuid = require('../middleware/uuid');
const bodyParser = require('body-parser');
const router = express.Router();





router.get("/getAllUsers", async (req, res) => {
    const users = await db.getAllUsers();
    res.status(200).json({users})
});
router.get("/getUserById", async (req, res) => {
    const user = await db.getUserById(req.query.user_id);
    res.status(200).json({user})
});
// note to deal with case where users try to sign up with the same id
router.get("/getUserByUserName", async (req, res) => {
    const user = await db.getUserByUserName(req.query.userName);
    res.status(200).json({user})
});

router.post("/createUser", async (req, res) =>{
    const user_id = uuid.generateUuid();
    req.body.user_id = user_id;

    const result = await db.createUser(req.body);
    res.status(200).json({success_user_id: user_id});
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



router.get("/getPrimaryCodeByPostalCode", async (req, res) => {
    const primaryCode = await db.getPrimaryCodeByPostalCode(req.query.postalCode);
    res.status(200).json({primaryCode})
});
// note to deal with case where users try to sign up with the same id
router.post("/createPrimaryCode", async (req, res) =>{
    const result = await db.createPrimaryCode(req.body);
    res.status(200).json({id: result[0]});
});
router.put("/updatePrimaryCodeByPostalCode",async(req,res) =>{
    await db.updatePrimaryCodeByPostalCode(req.query.postalCode,req.query.primaryCode);
    res.status(200).json({success:true})
});




router.get("/displayAttendPostListsOfTheUser", async (req, res) => {
    const users = await db.displayAttendPostListsOfTheUser(req.query.user_id);
    res.status(200).json({users})
});

router.post("/createPostListsOfTheUser", async (req, res) =>{
    const result = await db.createPostListsOfTheUser(req.body);
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
