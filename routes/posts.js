const express = require("express");
const db = require('../db/escData');
const bodyParser = require('body-parser');
const router = express.Router();


// note to deal with case where users try to sign up with the same id
router.post("/createPost", async (req, res) =>{
    const result = await db.createPost(req.body);
    res.status(200).json({id: result[0]});
});

// for dev use only
router.get("/searchAllPosts", async (req, res) =>{
    const posts = await db.searchAllPosts();
    res.status(200).json({posts})
})
router.get("/searchPostsBasedOnId", async (req, res) => {
    const posts = await db.searchPostsBasedOnOwner_id(req.query.owner_id);
    res.status(200).json({posts})
});
router.get("/searchPostsBasedOnDate", async (req, res) => {
    const posts = await db.searchPostsBasedOnDateOfCreation(req.query.dateOfCreation);
    res.status(200).json({posts})
});
router.get("/searchPostsBasedOnAddress", async (req, res) => {
    const posts = await db.searchPostsBasedOnPostalCode(req.query.postalCode);
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
    const result = await db.createUserListsOfThePost(req.body);
    res.status(200).json({id: result[0]});
});




router.delete("/deletePost", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deletePost(req.query.post_id);
    res.status(200).json({success:true})
});


// router.put("/updatePost",async(req,res) =>{
//     await db.updatePost(req.query.post_id);
//     res.status(200).json({success:true})
// });





module.exports = router;
