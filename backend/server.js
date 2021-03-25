const express = require("express");
const app = express();
const db = require('./db/escData');
const bodyParser = require('body-parser');
//const {v4:uuidv4} = require('uuid');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
// 	next();
// });

require(`./route_paths/routes`)(app);


// set port, listen for requests
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


generateUuid = function () { 
    // const newId=uuidv4();
    // const newId=1234;
    const newId = Math.floor(Math.random()*10000)
    return newId;
};

module.exports = generateUuid;

//https://www.youtube.com/watch?v=cr3pX6fSUpc
