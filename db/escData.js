const knex = require("./knex");
const Fuse = require('fuse.js');


/////////////////////////////////////////// users

function getAllUsers(){
    return knex("users").select("*");
};
function getUserById(user_id){
    return knex("users").where("user_id",user_id).select("*");
};
function getUserByUserName(userName){
    return knex("users").where("userName", userName).select("*");
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

function getAllPostalCode(){
    return knex("primaryCode").select("*");
}

function getPrimaryCodeByPostalCode(postalCode){
    return knex("primaryCode").where("postalCode",postalCode).select("primaryCode");
};

function createPrimaryCode(primaryPostalCode){
    return knex("primaryCode").insert(primaryPostalCode);
};
 
function updatePrimaryCodeByPostalCode(postalCode,primaryCode){
    return knex("primaryCode")
            .where("postalCode", postalCode)
                .update({
                    "primaryCode": primaryCode
                });
};


function displayAttendPostListsOfTheUser(user_id){
    return knex("attendPosts").where("user_id",user_id).join("posts","attendPosts.post_id","=","posts.post_id").select("posts.*");
};

function createPostListsOfTheUser(postList){
    return knex("attendPosts").insert(postList);
};

function deleteAllPostListsOfTheUser(user_id){
    console.log('deleting post list of the user now');
    return knex("attendPosts").where("user_id", user_id).del();
};

function deletePostListsOfTheUser(user_id,post_id){
    console.log('deleting post list of the user now');
    return knex("attendUsers").where("user_id", user_id).where("post_id",post_id).del();
};


/////////////////////////////////////////// posts


function searchAllPosts(){
    return knex("posts").select("*");
};


function simpleStringify (object){
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
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
    } else if(type == "title"){
/*
        var cache = [];
		const posts = JSON.stringify( knex("posts").select("*") , function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    return;
                }
                cache.push(value);
            }
            return value;
        });
        cache = null;
*/



     /*  
       const posts={
        "posts": [
            {
                "post_id": "2",
                "owner_id": "321",
                "postTitle": "gooood",
                "dateOfCreation": 888888,
                "postalCode": 670222,
                "description": "pns is great today!"
            },
            {
                "post_id": "4",
                "owner_id": "333",
                "postTitle": "3treegooood",
                "dateOfCreation": 33333,
                "postalCode": 670333,
                "description": "lies"
            },
            {
                "post_id": "100",
                "owner_id": "80",
                "postTitle": "gooo13eq3od",
                "dateOfCreation": 88128998,
                "postalCode": 671322,
                "description": "check uuid!"
            },
            {
                "post_id": "456",
                "owner_id": "80",
                "postTitle": "gooo13eq3od",
                "dateOfCreation": 88128998,
                "postalCode": 671322,
                "description": "check uuid!"
            },
            {
                "post_id": "1234",
                "owner_id": "80123",
                "postTitle": "gooo13eq3od",
                "dateOfCreation": 88128998,
                "postalCode": 671322,
                "description": "check uuid131!"
            },
            {
                "post_id": "9c012ab3-5685-471e-b9e2-862baf7096f8",
                "owner_id": "333",
                "postTitle": "3treegooood",
                "dateOfCreation": 1616713269,
                "postalCode": 670333,
                "description": "lies"
            }
        ]
    }*/

   /*     const fuse = new Fuse(posts, {
            keys: [
              'postTitle'
            ],
            includeScore: true
          });

        const results = fuse.search(value);*/

      //  const posts=JSON.stringify(postsObject);//undefined type

       
        return knex("posts").select("*");;
    }
};

function searchUserPosts(owner_id){
    return knex("posts").where("owner_id", owner_id).select("*");
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

// tags
function getPostTags(post_id){
    return knex("postTagging").where("post_id", post_id).select("*");
}

function addPostTags(postTags){
    return knex("postTagging").insert(postTags);
}

// photo
function getPostPhoto(post_id){
    return knex("photos").where("post_id", post_id).select("*");
}

function postPhoto(postTags){
    return knex("photos").insert(postTags);
}

/////////////////////////////////////////// comments

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


/////////////////////////////////////////// auth

function addRefreshToken(token){
    return knex("refreshToken").insert({"refreshToken" : token});
};

function getRefreshTokenList(){
    return knex("refreshToken").select("*");
}


function verifyTheUser(user){
    return knex("emailVerification").insert(user);
};

function checkVerifiedUser(userName){
    return knex("emailVerification").where('userName', userName).select("*");
}

/////////////////////////////////////////// Locations
function getAllLocations(){
    return knex("locations").select("*");
}

function getPostLocation(post_id){
    return knex("postLocation").where("post_id", post_id).select("locationArea")
}

function createPostLocation(data){
    return knex("postLocation").insert(data);
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUserName,
    deleteUser,
    updateUser,
    getAllPostalCode,
    getPrimaryCodeByPostalCode,
    createPrimaryCode,
    updatePrimaryCodeByPostalCode,
    displayAttendPostListsOfTheUser,
    deletePostListsOfTheUser,
    deleteAllPostListsOfTheUser,
    createPostListsOfTheUser,

    searchAllPosts,
    searchPostsBasedOn,
    searchUserPosts,

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
    deleteChildComment,
    addRefreshToken,
    getRefreshTokenList,

    getPostTags,
    addPostTags,

    getPostPhoto,
    postPhoto,

    verifyTheUser,
    checkVerifiedUser,

    getAllLocations,
    getPostLocation,
    createPostLocation
}
