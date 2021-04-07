const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);


it('testing to see whether searchPostsByPostTitle work', async done => {
    const testTitle="good"
    const response = await request.get('/posts/SearchPostsBasedOn?value='+testTitle+'e&type=title')
    expect(response.status).toBe(200)
    done()
});


it('testing to see whether getPostsDetailsByPostId work', async done => {
    const testPostId = "4"
    const response = await request.get('/posts/DisplayPostsDetails?post_id='+testPostId)
    expect(response.status).toBe(200)
    done()
});


it('testing to see whether DisplayAttendUserListsOfThePost work', async done => {
    const testPostId = "50bdb0bc-f404-4499-a940-50590d243554"
    const response = await request.get('/posts/DisplayAttendUserListsOfThePost?post_id='+testPostId)
    expect(response.status).toBe(200)
    done()
});

it('testing to see whether get post tags work', async done => {
    const testPostId = "4yu213iu12o3iu12oi3u12o33"
    const response = await request.get('/posts/getPostTags?post_id='+testPostId)
    expect(response.status).toBe(200)
    done()
});

it('testing to see whether get photo work', async done => {
    const testPostId = "d20ad2ce-34ee-4a42-8cf0-45cf65bba749"
    const response = await request.get('/posts/getPostPhoto?post_id='+testPostId)
    expect(response.status).toBe(200)
    done()
});

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

it('testing to see whether delete post work', async done => {
    const testPostId = "d20ad2ce-34ee-4a42-8cf0-45cf65bba749"
    const response = await request.delete('/posts/deletePost/?post_id='+testPostId)
    expect(response.status).toBe(200)
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

it('testing to see whether createUserListsOfThePost work', async done => {
    const testPostId = "50bdb0bc-f404-4499-a940-50590d243554"
    const testUserName= "yoyoman"
    const testPhoneNumber="121232131212"
    const response = await request.post('/posts/createUserListsOfThePost?post_id='+testPostId+"&userName="+testUserName+"&phoneNumber="+testPhoneNumber)
    expect(response.status).toBe(200)
    done()
});

//need have one more add tag to post
/*
it('testing to see whether add post tags work', async done => {
    const response = await request.post('/posts/addPostTags').send({
        "post_id": "d20ad2ce-34ee-4a42-8cf0-45cf65bba749",
        "tags" : "string of tags insert here pls"
    });
    expect(response.status).toBe(200)
    done()
});
*/


/*
it('testing to see whether add photo work', async done => {
    const testPostId = "d20ad2ce-34ee-4a42-8cf0-45cf65bba749"
    const response = await (await request.post('/posts/postPhoto?post_id?post_id=='+testPostId)).send({
        "pic": 1.png
    })
    expect(response.status).toBe(200)
    done()
});
*/

