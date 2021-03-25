const express = require("express");
const db = require('../db/escData');
const Server=require('../server.js');
const bodyParser = require('body-parser');
const router = express.Router();


// insert date of creation
router.post("/createPost", async (req, res) =>{
    const post_id= generateUuid();

    const result = await db.createPost(post_id, req.body);
    
    res.status(200).json({id: result[0]});
});

// for dev use only
router.get("/searchAllPosts", async (req, res) =>{
    const posts = await db.searchAllPosts();
    res.status(200).json({posts})
})

router.get("/searchPostsBasedOn", async (req, res) => {
    const posts = await db.searchPostsBasedOn(req.query.type, req.query.value);
    res.status(200).json({posts})
});



router.get("/displayPostsDetails", async (req, res) => {
    const posts = await db.displayPostsDetailsBasedOnPost_id(req.query.post_id);
    res.status(200).json({posts})
});
router.get("/displayAttendUserListsOfThePost", async (req, res) => {
    const users = await db.displayAttendUserListsOfThePost(req.query.post_id);
    res.status(200).json({users})
});

router.post("/createUserListsOfThePost", async (req, res) =>{
    const result = await db.createUserListsOfThePost(req.query.post_id,req.query.userName,req.query.phoneNumber);

    res.status(200).json({id: result[0]});
});
router.delete("/deleteAllUserListsOfThePost", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deleteUserListsOfThePost(req.query.post_id);
    res.status(200).json({success:true})
});
router.delete("/deleteUserListsOfThePost", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deleteUserListsOfThePost(req.query.post_id,req.query.userName);
    res.status(200).json({success:true})
});



router.put("/updateUserListsOfThePost",async(req,res) =>{
    await db.updateUserListsOfThePost(req.query.post_id,req.query.userName, req.query.type, req.query.value);
    res.status(200).json({success:true})
});




router.delete("/deletePost", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deletePost(req.query.post_id);
    res.status(200).json({success:true})
});



router.put("/updatePost",async(req,res) =>{
    await db.updatePost(req.query.post_id, req.query.type, req.query.value);
    res.status(200).json({success:true})
});






module.exports = router;
