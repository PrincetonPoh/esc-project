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

function searchPostsBasedOn(type, value){
   if(type=="owner_id"){   
        return knex("posts").where("owner_id", value).select("postTitle");
    } else if (type=="postalCode"){
        return knex("posts").where("postalCode",value).select("postTitle");
    } else if (type=="dateOfcreation"){
        return knex("posts").where("dateOfCreation",value).select("postTitle");
    } else if (type=="post_id"){
        return knex("posts").where("post_id",value).select("postTitle");
    }
};


function displayPostsDetailsBasedOnPost_id(post_id){
    return knex("posts").where("post_id",post_id).select("*");
};

function displayAttendUserListsOfThePost(post_id){
    return knex("attendUsers").where("post_id",post_id).select("userName","phoneNumber");
};

function createUserListsOfThePost(post_id, userName, phoneNumber){
    return knex("attendUsers").insert({
        "post_id": post_id,
        "userName": userName,
        "phoneNumber":phoneNumber
    });
};

function deleteUserListsOfThePost(post_id,userName){
    console.log('deleting User list of the post now');
    return knex("attendUsers").where("post_id", post_id).where("userName",userName).del();
};

function deleteAllUserListsOfThePost(post_id,userName){
    console.log('deleting User list of the post now');
    return knex("attendUsers").where("post_id", post_id).del();
};
function updateUserListsOfThePost(post_id, type, value){

    if(type=="userName"){   
        return knex("posts").where("post_id",post_id).where("userName",userName).update({userName: value});
    }
    if(type=="phoneNumber"){
        return knex("posts").where("post_id",post_id).where("userName",userName).update({phoneNumber: value});
    
    }
}


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

function getParentComments(post_id){
    return knex("parentComment").where("post_id",post_id).select("*");
}
function createParentComment(comment){
    return knex("parentComment").insert(comment);
};
function deleteParentComment(comment_id){
    return knex("parentComment").where("parent_comment_id", comment_id).del();
};


function getChildComments(parent_comment_id){
    return knex("childComment").where("parent_comment_id",parent_comment_id).select("*");
}
function createChildComment(comment){
    return knex("childComment").insert(comment);
};
function deleteChildComment(child_comment_id){
    return knex("childComment").where("child_comment_id", child_comment_id).del();
};





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
    deleteUserListsOfThePost,
    deleteAllUserListsOfThePost,
    updateUserListsOfThePost,
    createPost,
    
    deletePost,
    updatePost,

    createParentComment,
    getParentComments,
    deleteParentComment,

    getChildComments,
    createChildComment,
    deleteChildComment
}