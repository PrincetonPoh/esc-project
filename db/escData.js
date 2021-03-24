const knex = require("./knex");



function getAllUsers(){
    return knex("users").select("*");
};

function createUser(user_id,user){
    user.user_id=user_id;
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


function displayAttendPostListsOfTheUser(user_id){
    return knex("attendPosts").where("user_id",user_id).join("posts","attendPosts.post_id","=","posts.post_id").select("posts.*");
};

function createPostListsOfTheUser(user_id,post_id){
    return knex("attendPosts").insert({
        "user_id":user_id,
        "post_id": post_id
    });
};

function deleteAllPostListsOfTheUser(user_id){
    console.log('deleting post list of the user now');
    return knex("attendPosts").where("user_id", user_id).del();
};

function deletePostListsOfTheUser(user_id,post_id){
    console.log('deleting post list of the user now');
    return knex("attendUsers").where("user_id", user_id).where("post_id",post_id).del();
};


///////////////////////////////////////////


function searchAllPosts(){
    return knex("posts").select("*");
};

function searchPostsBasedOn(type, value){
    
   if(type=="owner_id"){   
        return knex("posts").where("owner_id", value).select("postTitle");
    }else if(type=="postalCode"){
        return knex("posts").where("postalCode",value).select("postTitle");
    }else if(type=="dateOfcreation"){
        return knex("posts").where("dateOfCreation",value).select("postTitle");
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


function createPost(post_id,post){
    console.log('creating post now');
     
    post.post_id=post_id;
    console.log(post)
    
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
    return knex("childComment").where("post_id",post_id).select("*");
}

function createParentComment(comment_id,comment){
    comment.comment_id=comment_id;
    return knex("childComment").insert(comment);
};

function deleteParentComment(comment_id){
    return knex("childComment").where("parent_comment_id", comment_id).del();
};

function getChildComments(parent_comment_id){
    return knex("childComment").where("parent_comment_id",parent_comment_id).select("*");
}

function createChildComment(comment_id,comment){
    comment.comment_id=comment_id;
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
    displayAttendPostListsOfTheUser,
    deletePostListsOfTheUser,
    deleteAllPostListsOfTheUser,
    createPostListsOfTheUser,

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