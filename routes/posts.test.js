const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);

const knex = require("../db/knex.js");

beforeAll(() => {
    process.env.NODE_ENV = 'test';
})

it('testing to see whether create post work', async done => {
 const response = await request.post('/posts/createPost').send({
     "owner_id": "311143",
     "postTitle": "3treeg1dwed2d",
     "postalCode": 612333,
     "description": "dwdwedwdees"
 });
 expect(response.status).toBe(200)
 done()
});

it('testing to see whether create post doesn\'t work with invalid input', async done => {
 const response = await request.post('/posts/createPost').send({
     "owner_id": "311143",
     "postTitle": "3treeg1dwed2d",
     "postalCode": "6fwsf133",
     "description": "dwdwedwdees"
 });
 expect(response.status).toBe(409)
 done()
});

it('testing to see whether delete post work', async done => {
 const testPostId= await knex('posts').where('postTitle','3treeg1dwed2d').select('post_id');
 const response = await request.delete('/posts/deletePost/?post_id='+testPostId[0].post_id)
 expect(response.status).toBe(200)
 done()
});

it('testing to see whether searchPostsByPostTitle work', async done => {
    const testTitle="good"
    const response = await request.get('/posts/SearchPostsBasedOn?value='+testTitle+'e&type=title')
    expect(response.status).toBe(200)
    done()
});

it('testing to see whether getPostsDetailsByPostId work', async done => {
    const testPostId= await knex('posts').where('postTitle','3treeg1dwed2d').select('post_id');
    const response = await request.get('/posts/DisplayPostsDetails?post_id='+testPostId[0].post_id)
    expect(response.status).toBe(200)
    done()
});

it('testing to see whether createUserListsOfThePost work', async done => {
    const testPostId = "50bdb0bc-f404-4499-a940-50590d243554"
    const testUserName= "yoyoman"
    const testPhoneNumber="121232131212"
    const response = await request.post('/posts/createUserListsOfThePost?post_id='+testPostId+"&userName="+testUserName+"&phoneNumber="+testPhoneNumber)
    expect(response.status).toBe(200)
    done()
});

it('testing to see whether DisplayAttendUserListsOfThePost work', async done => {
    const testPostId = "50bdb0bc-f404-4499-a940-50590d243554"
    const response = await request.get('/posts/DisplayAttendUserListsOfThePost?post_id='+testPostId)
    expect(response.status).toBe(200)
    done()
});

it('testing to see whether DisplayPostsDetails doesn\'t work with invalid postid', async done => {
    const testPostId = "invalid_post"
    const response = await request.get('/posts/DisplayPostsDetails?post_id='+testPostId)
    expect(response.status).toBe(409)
    done()
});

it('testing to see whether add post tags work', async done => {
    const response = await request.post('/posts/addPostTags').send({
        "post_id": "d20ad2ce-34ee-4a42-8cf0-45cf65bba749",
        "tags" : "string of tags insert here pls"
    });
    expect(response.status).toBe(200)
    done()
});


it('testing to see whether get post tags work', async done => {
    const testPostId = "311143"
    const response = await request.get('/posts/getPostTags?post_id='+testPostId)
    expect(response.status).toBe(200)
    done()
});

it('testing to see get post tags doesn\'t work with invalid post id', async done => {
    const testPostId = "invalid post id"
    const response = await request.get('/posts/getPostTags?post_id='+testPostId)
    expect(response.status).toBe(409)
    done()
});



it('testing to see whether get photo work', async done => {
    const testPostId = "129"
    const response = await request.get('/posts/getPostPhoto?post_id='+testPostId)
    expect(response.status).toBe(200)
    done()
});

it('testing to see whether get photo doesn\'t work with invalid post id', async done => {
    const testPostId = "invalid post id"
    const response = await request.get('/posts/getPostPhoto?post_id='+testPostId)
    expect(response.status).toBe(400)
    done()
});

it('testing to see whether delete post work', async done => {
    const testPostId = "invalid"
    const response = await request.delete('/posts/deletePost/?post_id='+testPostId)
    expect(response.status).toBe(409)
    done()
});

it('testing to see whether deleteUserListsOfThePost work', async done => {
    const testPostId = "50bdb0bc-f404-4499-a940-50590d243554"
    const testUserName= "yoyoman"
    const testPhoneNumber="121232131212"
    const response = await request.delete('/posts/deleteUserListsOfThePost?post_id='+testPostId+"&userName="+testUserName+"&phoneNumber="+testPhoneNumber)
    expect(response.status).toBe(200)
    done()
});






