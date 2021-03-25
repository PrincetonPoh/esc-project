const express = require("express");
const db = require('../db/escData');
const bodyParser = require('body-parser');
const router = express.Router();



router.get("/getParentComments", async (req, res) => {
    const posts = await db.getParentComments(req.query.post_id);
    res.status(200).json({posts})
});

// insert date of creation
router.post("/createParentComment", async (req, res) =>{
    const comment_id= generateUuid();
    const result = await db.createParentComment(comment_id, req.body);
    res.status(200).json({id: result[0]});
});

router.delete("/deleteParentComment", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deleteParentComment(req.query.parent_comment_id);
    res.status(200).json({delete_status:true})
});



router.get("/getChildComments", async (req, res) => {
    const posts = await db.getChildComments(req.query.parent_comment_id);
    res.status(200).json({posts})
});

// insert date of creation
router.post("/createChildComment", async (req, res) =>{
    const comment_id= generateUuid();
    const result = await db.createChildComment(comment_id,req.body);
    res.status(200).json({id: result[0]});
});

router.delete("/deleteChildComment", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deleteChildComment(req.query.child_comment_id);
    res.status(200).json({delete_status:true})
});


module.exports = router;
