const express = require("express");
const db = require('../db/escData');
const uuid = require('../middleware/uuid');
const checkAuth = require('../middleware/check-auth');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const router = express.Router();

const Fuse = require('fuse.js');
const { Router } = require("express");
const { route } = require("./users");

router.use(fileUpload());

// insert date of creation
router.post("/createPost", checkAuth, async (req, res) => {
   
    if( Number.isInteger(req.body.postalCode) ){
        const post_id = uuid.generateUuid();
        const now = new Date()
        const secondsSinceEpoch = Math.round(now.getTime() / 1000)
        req.body.post_id = post_id;
        req.body.dateOfCreation = secondsSinceEpoch;
        const result = await db.createPost(req.body);
        res.status(200).json({ success_post: req.body });
    }else{
        res.status(409).json({ error: "Invalid input." });
    }
    
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
        posts= fuse.search(req.query.value)
    }

    if(posts.length == 0){
        res.status(409).json({error: "the post id is invalid"})
    }else{
        res.status(200).json({posts})
    }
});

//Search using fuse js with all search result
router.get("/searchPostsText", async (req, res) => {
    var posts = await db.searchAllPosts();
    const postsJson = JSON.parse(JSON.stringify((posts)))
    const fuse = new Fuse(postsJson, { keys: ['postTitle'] })
    posts = fuse.search(req.query.value)
    console.log(posts);
    res.status(200).json({ posts })
});

//Trying to bundle up all the filter as one api call
// router.post("/searchPostsFiltered", async(req, res) => {
//     var posts = await db.searchAllPosts();
//     if(req.body.searchBoolean){
//         const postsJson = JSON.parse(JSON.stringify((posts)))
//         const fuse = new Fuse(postsJson, { keys: ['postTitle'] })
//         posts = fuse.search(req.body.searchText);
//     }
//     const result = posts.map(event => req.body.filter.map(async (tag) => {
//         const tags = await db.getPostTags(req.query.post_id)
//     }))
// })

//Search users all post
router.get("/searchUsersPosts", checkAuth, async(req, res) => {
    var posts = await db.searchUserPosts(req.query.user_id);
    res.status(200).json({posts});
})


router.get("/displayPostsDetails", checkAuth, async (req, res) => {
    const posts = await db.displayPostsDetailsBasedOnPost_id(req.query.post_id);
    if(posts.length == 0){
        res.status(409).json({error: "the post id is invalid"})
    }else{
        res.status(200).json({posts})
    }
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
    const result = await db.displayPostsDetailsBasedOnPost_id(req.query.post_id);
    if(result.length != 0){
        await db.deletePost(req.query.post_id);
        res.status(200).json({ success: true })
    }else{
        res.status(409).json({ message: "The post id doesn't exist!"});
    }
});



router.put("/updatePost", checkAuth, async (req, res) => {
    await db.updatePost(post_id = req.query.post_id,
        type = req.query.type,
        value = req.query.value);
    res.status(200).json({ success: true })
});


///////////////////////////// tags

router.get("/getPostTags", async (req, res) => {
    const tags = await db.getPostTags(req.query.post_id)
    if(tags.length == 0 ){
        res.status(409).json({ error: "Invalid post id" })
    }else{
        res.status(200).json({ tags })
    }

});

router.post("/addPostTags", checkAuth, async (req, res) => {
    const result = await db.addPostTags(req.body)
    res.status(200).json({ "tags added": req.body });
});

///////////////////////////// tags

router.get("/getPostPhoto", async (req, res) => {
    const img = await db.getPostPhoto(req.query.post_id)
    if (img.length != 0){
        res.status(200).json({photo:img})
    } else {
        res.status(400).json({message : "photo not found"})
    }
});


router.post("/postPhoto",checkAuth, async (req, res) =>{
    console.log('posting photos')
    const post_id = req.query.post_id
    // const photoData = null;
    try{
        const {name, data} = req.files.pic
        const photoData = {
            post_id : post_id,
            name : name,
            data : data
        }
        try{
            const img = await db.postPhoto(photoData)
            res.status(200).json({"message": "photo added"});
        } catch (error){
            // console.log(error)
            res.status(409).json({"message": "probably non-unique post_id"})
        }
    } catch {
        res.status(409).json({message: "upload failed"})
    }


});



module.exports = router;
