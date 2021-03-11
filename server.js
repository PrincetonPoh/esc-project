const express = require("express");
const app = express();
const db = require('./db/escData');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get("/users/getAllUsers", async (req, res) => {
    const users = await db.getAllUsers();
    res.status(200).json({users})
});

// note to deal with case where users try to sign up with the same id
app.post("/users/createUser", async (req, res) =>{
    const result = await db.createUser(req.body);
    res.status(200).json({id: result[0]});
});

app.delete("/users/deleteUser/:id", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deleteUser(req.params.id);
    res.status(200).json({success:true})
});


app.put("/users/updateUser/:id",async(req,res) =>{
    await db.updateUser(req.params.id);
    res.status(200).json({success:true})
});


app.get("/", async (req, res) => {
    res.status(200).json({success:true})
});




app.get("/post/getAllPosts/:user_id", async (req, res) => {
    const posts = await db.getAllPostsOfUser(req.params.user_id);
    res.status(200).json({posts})
});

// note to deal with case where users try to sign up with the same id
app.post("/post/createPost", async (req, res) =>{
    const result = await db.createPost(req.body);
    res.status(200).json({id: result[0]});
});

app.delete("/post/deletePost/:post_id", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deletePost(req.params.post_id);
    res.status(200).json({success:true})
});


app.put("/post/updatePost/:post_id",async(req,res) =>{
    await db.updatePost(req.params.post_id);
    res.status(200).json({success:true})
});



app.get("/post/getAllComments/:user_id", async (req, res) => {
    const posts = await db.getAllCommentsOfUser(req.params.user_id);
    res.status(200).json({posts})
});

app.post("/comment/createComment", async (req, res) =>{
    const result = await db.createComment(req.body);
    res.status(200).json({id: result[0]});
});

app.delete("/comment/deleteComment/:comment_id", async (req, res) => {
    // const result = await db.getAllUsers(req.params.id);
    await db.deletePost(req.params.comment_id);
    res.status(200).json({success:true})
});


app.put("/comment/updateComment/:comment_id",async(req,res) =>{
    await db.updatePost(req.params.comment_id);
    res.status(200).json({success:true})
});



app.listen(1337, ()=> console.log('sever is running on port 1337'));

//https://www.youtube.com/watch?v=cr3pX6fSUpc