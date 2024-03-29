const express = require("express");
const app = express();
const db = require('./db/escData');
const bodyParser = require('body-parser');
const cors = require("cors");

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
if (process.env.NODE_ENV === "test") {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
} else {
    const PORT = process.env.PORT || 1337;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}



module.exports = app;
