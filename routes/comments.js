const express = require("express");
const db = require('../db/escData');
const bodyParser = require('body-parser');
const router = express.Router();



router.get("/getAllComments/:user_id", async (req, res) => {
    const posts = await db.getAllCommentsOfUser(req.params.user_id);
    res.status(200).json({posts})
});

router.post("/createComment", async (req, res) =>{
    const result = await db.createComment(req.body);
    res.status(200).json({id: result[0]});
});

router.delete("/deleteComment/:comment_id", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deletePost(req.params.comment_id);
    res.status(200).json({success:true})
});

router.put("/updateComment/:comment_id",async(req,res) =>{
    await db.updatePost(req.params.comment_id);
    res.status(200).json({success:true})
});




module.exports = router;
