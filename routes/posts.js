const express = require("express");
const db = require('../db/escData');
const uuid = require('../middleware/uuid');
const checkAuth = require('../middleware/check-auth');
const bodyParser = require('body-parser');
const router = express.Router();

const Fuse = require('fuse.js');




// insert date of creation
router.post("/createPost", checkAuth, async (req, res) => {
    const post_id = uuid.generateUuid();
    const now = new Date()
    const secondsSinceEpoch = Math.round(now.getTime() / 1000)
    req.body.post_id = post_id;
    req.body.dateOfCreation = secondsSinceEpoch;

    const result = await db.createPost(req.body);
    res.status(200).json({ success_post: req.body });
});

// for dev use only
router.get("/searchAllPosts", async (req, res) => {
    const posts = await db.searchAllPosts();

    res.status(200).json({ posts })
})

router.get("/searchPostsBasedOn",checkAuth, async (req, res) => {
    var posts = await db.searchPostsBasedOn(req.query.type, req.query.value);
    if(req.query.type == "title"){
        const postsJson=JSON.parse(JSON.stringify((posts)))
        const fuse = new Fuse(postsJson, {
            keys: [
            'postTitle'],
      });
    posts= fuse.search(req.query.value)}

    res.status(200).json({posts})
});


router.get("/searchPostsText", async (req, res) => {
    var posts = await db.searchAllPosts();
    const postsJson = JSON.parse(JSON.stringify((posts)))
    const fuse = new Fuse(postsJson, { keys: ['postTitle'] })
    posts = fuse.search(req.query.value)
    console.log(posts);
    res.status(200).json({ posts })
});



router.get("/displayPostsDetails", checkAuth, async (req, res) => {
    const posts = await db.displayPostsDetailsBasedOnPost_id(req.query.post_id);
    res.status(200).json({ posts })
});




router.get("/displayAttendUserListsOfThePost", checkAuth, async (req, res) => {
    const users = await db.displayAttendUserListsOfThePost(req.query.post_id);
    res.status(200).json({ users })
});

router.post("/createUserListsOfThePost", checkAuth, async (req, res) => {
    const result = await db.createUserListsOfThePost(req.query.post_id, req.query.userName, req.query.phoneNumber);

    res.status(200).json({ id: result[0] });
});
router.delete("/deleteAllUserListsOfThePost", checkAuth, async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deleteUserListsOfThePost(req.query.post_id);
    res.status(200).json({ success: true })
});
router.delete("/deleteUserListsOfThePost", checkAuth, async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deleteUserListsOfThePost(req.query.post_id, req.query.userName);
    res.status(200).json({ success: true })
});



router.put("/updateUserListsOfThePost", checkAuth, async (req, res) => {
    await db.updateUserListsOfThePost(req.query.post_id, req.query.userName, req.query.type, req.query.value);
    res.status(200).json({ success: true })
});




router.delete("/deletePost", checkAuth, async (req, res) => {
    await db.deletePost(req.query.post_id);
    res.status(200).json({ success: true })
});



router.put("/updatePost", checkAuth, async (req, res) => {
    await db.updatePost(post_id = req.query.post_id,
        type = req.query.type,
        value = req.query.value);
    res.status(200).json({ success: true })
});


router.get("/getPostTags", async (req, res) => {
    const tags = await db.getPostTags(req.query.post_id)
    res.status(200).json({ tags })
});

router.post("/addPostTags", checkAuth, async (req, res) => {
    console.log(req.body)
    const result = await db.addPostTags(req.body)
    res.status(200).json({ "tags added": req.body });
});



module.exports = router;
