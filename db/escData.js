const knex = require("./knex");



function getAllUsers(){
    return knex("Users").select("*");
}

function createUser(user){
    return knex("Users").insert(user);
};

function deleteUser(id){
    return knex("Users").where("id", id).del();
};
 
function updateUser(id, user){
    return knex("Users").where("id", id).update(user);
};


function getAllPostsOfUser(user_id){
    return knex("Posts").where("owner_id",user_id).get();
}

function createPost(post){
    return knex("Posts").insert(post);
};

function deletePost(post_id){
    return knex("Posts").where("post_id", post_id).del();
};

function updatePost(post_id, post){
    return knex("Posts").where("post_id", post_id).update(post);
};

function getAllCommentsOfUser(user_id){
    return knex("Comments").where("use_id",user_id).get();
}

function createComment(comment){
    return knex("Comments").insert(comment);
};

function deleteComment(comment_id){
    return knex("Comments").where("comment_id", comment_id).del();
};

function updateComment(comment_id, comment){
    return knex("Comments").where("comment_id", comment_id).update(comment);
};




module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser,

    createPost,
    getAllPostsOfUser,
    deletePost,
    updatePost,

    createComment,
    getAllCommentsOfUser,
    deleteComment,
    updateComment

}