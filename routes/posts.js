const express = require("express");
const db = require('../db/escData');
const bodyParser = require('body-parser');
const router = express.Router();



router.get("/searchAllPosts", async (req, res) =>{
    const posts = await db.searchAllPosts();
    res.status(200).json({posts})
})
router.get("/SearchPostsBasedOn", async (req, res) => {
    const posts = await db.searchPostsBasedOnOwner_id(req.query.owner_id);
    res.status(200).json({posts})
});
router.get("/SearchPostsBasedOn/:dataOfCreation", async (req, res) => {
    const posts = await db.searchPostsBasedOnDataOfCreation(req.params.dataOfCreation);
    res.status(200).json({posts})
});
router.get("/SearchPostsBasedOn/:postalCode", async (req, res) => {
    const posts = await db.searchPostsBasedOnPostalCode(req.params.postalCode);
    res.status(200).json({posts})
});
router.get("/DisplayPostsDetails/:post_id", async (req, res) => {
    const posts = await db.displayPostsDetailsBasedOnPost_id(req.params.post_id);
    res.status(200).json({posts})
});

router.get("/DisplayAttendUserListsOfThePost/:post_id", async (req, res) => {
    const users = await db.displayAttendUserListsOfThePost(req.params.post_id);
    res.status(200).json({users})
});
router.post("/CreateUserListsOfThePost", async (req, res) =>{
    const result = await db.createUserListsOfThePost(req.params.post_id,req.body);
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





module.exports = router;
