const { use } = require("../routes/posts");
const knex = require("./knex");



function getAllUsers(){
    return knex("users").select("*");
};

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
};

function searchPostsBasedOn(type, owner_id){
    
   if(type=="owner_id"){   
        return knex("posts").where("owner_id", owner_id).select("postTitle");
    }
    if(type=="postal_code"){
        return knex("posts").where("postalCode",postalCode).select("postTitle");
    }
    if(type=="dateOfcreation"){
        return knex("posts").where("dateOfCreation",dateOfCreation).select("postTitle");
    }
    
};


function displayPostsDetailsBasedOnPost_id(post_id){
    return knex("posts").where("post_id",post_id).select("*");
};

function displayAttendUserListsOfThePost(post_id){
    return knex("attendUsers").where("post_id",post_id).select("userName","phoneNumber");
};

function createUserListsOfThePost(post_id,userName,phoneNumber){
    console.log(user_information);
    return knex("attendUsers").insert({
        "post_id": post_id,
        "userName": userName,
        "phoneNumber":phoneNumber
    });
};



function createPost(post){
    console.log('creating post now');
    return knex("posts").insert(post);
};

function deletePost(post_id){
    console.log('deleting post now');
    return knex("posts").where("post_id", post_id).del();
};


function updatePost(post_id, type, value){

    if(type=="owner_id"){   
        return knex("posts").where("post_id",post_id).update({owner_id: value});
    }
    if(type=="postal_code"){
        return knex("posts").where("post_id",post_id).update({postalCode: value});
    
    }
    if(type=="dateOfcreation"){
        return knex("posts").where("post_id",post_id).update({dateOfCreation: value});
    }
    if(type=="description"){
        return knex("posts").where("post_id",post_id).update({description: value});
    
    }if(type=="postTitle"){
        return knex("posts").where("post_id",post_id).update({postTitle: value});
    }
    

    
}

///////////////////////////////////////////

function getAllCommentsOfPost(user_id){
    return knex("comments").where("use_id",user_id).get();
}

function createComment(comment){
    return knex("comments").insert(comment);
};

function deleteComment(comment_id){
    return knex("comments").where("comment_id", comment_id).del();
};

// function updateComment(comment_id, comment){
//     return knex("comments").where("comment_id", comment_id).update(comment);
// };




module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser,

    searchAllPosts,
    searchPostsBasedOn,

    displayPostsDetailsBasedOnPost_id,
    displayAttendUserListsOfThePost,
    createUserListsOfThePost,
    createPost,
    
    deletePost,

    createComment,
    getAllCommentsOfPost,
    deleteComment,
}