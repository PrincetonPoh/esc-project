const express = require("express");
const db = require('../db/escData');
const uuid = require('../middleware/uuid');
const bodyParser = require('body-parser');
const router = express.Router();



router.get("/getParentComments", async (req, res) => {
    const posts = await db.getParentComments(req.query.post_id);
    res.status(200).json({posts})
});

// insert date of creation
router.post("/createParentComment", async (req, res) =>{
    const parent_comment_id= uuid.generateUuid();
    req.body.parent_comment_id = parent_comment_id;
    const result = await db.createParentComment(req.body);
    res.status(200).json({success_parent_comment_id: parent_comment_id});
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
    const child_comment_id= uuid.generateUuid();
    req.body.child_comment_id = child_comment_id;
    const result = await db.createChildComment(req.body);
    res.status(200).json({success_child_comment_id: child_comment_id});
});

router.delete("/deleteChildComment", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deleteChildComment(req.query.child_comment_id);
    res.status(200).json({delete_status:true})
});


module.exports = router;
