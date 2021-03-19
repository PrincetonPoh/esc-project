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
function searchAllPosts(){
    return knex("posts").select("*");
}
function searchPostsBasedOnOwner_id(owner_id){
    // return knex("posts").select("postTitle").where("owner_id", owner_id);
    return knex("posts").where("owner_id", owner_id).select("postTitle");
}
function searchPostsBasedOnDataOfCreation(dataOfCreation){
    return knex("posts").where("dataOfCreation",dataOfCreation).get("postTitle");
}
function searchPostsBasedOnPostalCode(postalCode){
    return knex("posts").where("postalCode",postalCode).get("postTitle");
}
function displayPostsDetailsBasedOnPost_id(post_id){
    return knex("posts").where("post_id",postid).get();
}
function displayAttendUserListsOfThePost(post_id){
    return knex("attendUsers").where("post_id",postid).get();
}
function createUserListsOfThePost(post_id,user_information){
    return knex("attendUsers").where("post_id",post_id).insert(user_information);
};



function createPost(post){
    console.log(post);
    return knex("posts").insert(post);
};

function deletePost(post_id){
    return knex("posts").where("post_id", post_id).del();
};

function updatePost(post_id, post){
    return knex("posts").where("post_id", post_id).update(post);
};

///////////////////////////////////////////

function getAllCommentsOfUser(user_id){
    return knex("comments").where("use_id",user_id).get();
}

function createComment(comment){
    return knex("comments").insert(comment);
};

function deleteComment(comment_id){
    return knex("comments").where("comment_id", comment_id).del();
};

function updateComment(comment_id, comment){
    return knex("comments").where("comment_id", comment_id).update(comment);
};




module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser,

    searchAllPosts,
    searchPostsBasedOnOwner_id,
    searchPostsBasedOnDataOfCreation,
    searchPostsBasedOnPostalCode,
    displayPostsDetailsBasedOnPost_id,
    displayAttendUserListsOfThePost,
    createUserListsOfThePost,
    createPost,
    
    deletePost,
    updatePost,

    createComment,
    getAllCommentsOfUser,
    deleteComment,
    updateComment

}