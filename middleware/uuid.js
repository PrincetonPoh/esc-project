const {v4:uuidv4} = require('uuid');

function generateUuid(){
    const newId=uuidv4();
    // const newId=1234;
    // console.log(newId);
    return newId;
};

module.exports = {generateUuid}
