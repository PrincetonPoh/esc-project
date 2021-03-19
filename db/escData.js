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

function SearchPostsBasedOnOwner_id(owner_id){
    return knex("Posts").where("owner_id",owner_id).get("postTitle");
}
function SearchPostsBasedOnDataOfCreation(dataOfCreation){
    return knex("Posts").where("dataOfCreation",dataOfCreation).get("postTitle");
}
function SearchPostsBasedOnPostalCode(postalCode){
    return knex("Posts").where("postalCode",postalCode).get("postTitle");
}
function DisplayPostsDetailsBasedOnPost_id(post_id){
    return knex("Posts").where("post_id",postid).get();
}
function DisplayAttendUserListsOfThePost(post_id){
    return knex("attendUsers").where("post_id",postid).get();
}
function CreateUserListsOfThePost(post_id,user_information){
    return knex("attendUsers").where("post_id",post_id).insert(user_information);
};



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

    SearchPostsBasedOnOwner_id,
    SearchPostsBasedOnDataOfCreation,
    SearchPostsBasedOnPostalCode,
    DisplayPostsDetailsBasedOnPost_id,
    DisplayAttendUserListsOfThePost,
    CreateUserListsOfThePost,
    createPost,
    
    deletePost,
    updatePost,

    createComment,
    getAllCommentsOfUser,
    deleteComment,
    updateComment

}