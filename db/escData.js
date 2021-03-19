const knex = require("./knex");



function getAllUsers(){
    return knex("users").select("*");
}

function createUser(user){
    return knex("users").insert(user);
};

function deleteUser(user_id){
    return knex("users").where("user_id", user_id).del();
};
 
function updateUser(user){
    console.log(user);
    const ids = user.user_id;
    return knex("users")
            .where("user_id", ids)
                .update({
                    "user_id": user.user_id,
                    "phoneNumber": user.phoneNumber,
                    "userName": user.userName,
                    "emailAddress": user.emailAddress,
                    "password": user.password
                });
};



///////////////////////////////////////////

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

///////////////////////////////////////////

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