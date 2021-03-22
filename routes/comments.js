const express = require("express");
const db = require('../db/escData');
const bodyParser = require('body-parser');
const router = express.Router();


// for dev use only
router.get("/getAllCommentsOfPost", async (req, res) => {
    const posts = await db.getAllCommentsOfPost(req.query.post_id);
    res.status(200).json({posts})
});

router.post("/createComment", async (req, res) =>{
    const result = await db.createComment(req.body);
    res.status(200).json({id: result[0]});
});

router.delete("/deleteComment", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deletePost(req.query.comment_id);
    res.status(200).json({success:true})
});

// DisplayParentCommentsOfThePost

//DisplayChildCommentsOfTheParentComment
// get + create + delete

module.exports = router;
