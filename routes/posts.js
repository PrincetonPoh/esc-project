const express = require("express");
const db = require('../db/escData');
const bodyParser = require('body-parser');
const router = express.Router();




router.get("/SearchPostsBasedOn/:owner_id", async (req, res) => {
    const posts = await db.SearchPostsBasedOnOwner_id(req.params.user_id);
    res.status(200).json({posts})
});
router.get("/SearchPostsBasedOn/:dataOfCreation", async (req, res) => {
    const posts = await db.SearchPostsBasedOnDataOfCreation(req.params.dataOfCreation);
    res.status(200).json({posts})
});
router.get("/SearchPostsBasedOn/:postalCode", async (req, res) => {
    const posts = await db.SearchPostsBasedOnPostalCode(req.params.postalCode);
    res.status(200).json({posts})
});
router.get("/DisplayPostsDetails/:post_id", async (req, res) => {
    const posts = await db.DisplayPostsDetailsBasedOnPost_id(req.params.post_id);
    res.status(200).json({posts})
});

router.get("/DisplayAttendUserListsOfThePost/:post_id", async (req, res) => {
    const users = await db.DisplayAttendUserListsOfThePost(req.params.post_id);
    res.status(200).json({users})
});
router.post("/CreateUserListsOfThePost", async (req, res) =>{
    const result = await db.CreateUserListsOfThePost(req.params.post_id,req.body);
    res.status(200).json({id: result[0]});
});





// note to deal with case where users try to sign up with the same id
router.post("/createPost", async (req, res) =>{
    const result = await db.createPost(req.body);
    res.status(200).json({id: result[0]});
});


router.delete("/deletePost/:post_id", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deletePost(req.params.post_id);
    res.status(200).json({success:true})
});


router.put("/updatePost/:post_id",async(req,res) =>{
    await db.updatePost(req.params.post_id);
    res.status(200).json({success:true})
});


router.get("/getAllComments/:user_id", async (req, res) => {
    const posts = await db.getAllCommentsOfUser(req.params.user_id);
    res.status(200).json({posts})
});



module.exports = router;
