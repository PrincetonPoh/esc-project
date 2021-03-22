const express = require("express");
const app = express();
const db = require('./db/escData');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

require(`./route_paths/routes`)(app);



// set port, listen for requests
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

//https://www.youtube.com/watch?v=cr3pX6fSUpc