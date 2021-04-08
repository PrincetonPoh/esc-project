const express = require("express");
const db = require('../db/escData');
const uuid = require('../middleware/uuid');
const checkAuth = require('../middleware/check-auth');
const bodyParser = require('body-parser');
const { route } = require("./users");
const router = express.Router();

router.get("/getAllLocations", async(req, res) => {
    const result = await db.getAllLocations();
    res.status(200).json({result});
});

router.get("/getPostLocation", async(req, res) => {
    const result = await db.getPostLocation(req.query.post_id);
    res.status(200).json(result);
})

router.post("/createPostLocation", checkAuth, async(req,res) => {
    const result = await db.createPostLocation(req.body);
    res.status(200).json({success: req.body});
})

module.exports = router;