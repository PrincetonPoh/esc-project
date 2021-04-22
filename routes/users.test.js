const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);
const knex = require("../db/knex.js");


beforeAll(() => {
    process.env.NODE_ENV = 'test';
})

it('testing to see whether getAllUsers work', async done => {
    const response = await request.get('/users/getAllUsers')
    expect(response.status).toBe(200)
    done()
})

it('testing to see whether getUserByUserName work', async done => {
    const testUserName="princeton5"
    const response = await request.get('/users/getUserByUserName?userName='+testUserName)
    expect(response.status).toBe(200)
    done()
})

it('testing to see whether updateUser work', async done => {
    const response = await request.put('/users/updateUser').send({
        "user_id": "801093be-8390-4366-9e49-d932a008309e",
        "phoneNumber": 123421321222,
        "userName": "prdwqeton2",
        "emailAddress": "prince2@gmail.com",
        "password": "asd123222"
    });
    expect(response.status).toBe(200)
    done()
})

it('testing to see whether createUser work', async done => {
    const response = await request.post('/auth/createUser').send({
        "phoneNumber": 1232100008,
        "userName": "honghonghuohuo",
        "emailAddress": "prince@gmail.com",
        "password": "asd123"
    });
    expect(response.status).toBe(200)
    done()
})

it('testing to see whether createUser work for repeated input fields', async done => {
    const response = await request.post('/auth/createUser').send({
        "phoneNumber": 1232100008,
        "userName": "honghonghuohuo",
        "emailAddress": "prince@gmail.com",
        "password": "asd123"
    });
    expect(response.status).toBe(409)
    done()
})

it('testing to see whether deleteUser work', async done => {
   const userId= await knex('users').where('userName','honghonghuohuo').select('user_id');
    const response = await request.delete('/users/deleteUser/?user_id='+userId[0].user_id)
    expect(response.status).toBe(200)
    done()
})

it('testing to see deleteUser doesn\'t, work when user doesn\'t exist' , async done => {
    const userId= "invalid_user_id";
    const response = await request.delete('/users/deleteUser/?user_id='+userId)
    expect(response.status).toBe(409)
    done()
})

it('testing to see whether createPostListsOfTheUser work' , async done => {
    const response = await request.post('/users/createPostListsOfTheUser').send({
        "post_id": "3ff05b38-efd2-4c64-bae2-fb2652a0a0e1",
        "user_id": "237d491d-a421-418c-93a6-8da5b197e01c",
    });
    expect(response.status).toBe(200)
    done()
})

it('testing to see whether displayAttendPostListsOfTheUser work' , async done => {
    const user_id="237d491d-a421-418c-93a6-8da5b197e01c"
    const response = await request.get('/users/displayAttendPostListsOfTheUser?user_id='+user_id)
    expect(response.status).toBe(200)
    done()
})

it('testing to see whether displayAttendPostListsOfTheUser doesn\'t work with invalid user id' , async done => {
    const testUser_id="invalid user id"
    const response = await request.get('/users/displayAttendPostListsOfTheUser?user_id='+testUser_id)
    expect(response.status).toBe(409)
    done()
})

afterAll( async() => {
   await knex('users')
  .where({ phoneNumber: 1232100008 })
  .del();

  
  await knex('attendPosts')
  .where({post_id : "3ff05b38-efd2-4c64-bae2-fb2652a0a0e1"})
  .where({user_id: "237d491d-a421-418c-93a6-8da5b197e01c"})
  .del();

})


/*
it('testing to see whether getPrimaryCodeByPostalCode work', async done => {
    const testPostalCode=990123
    const response = await request.get('/users/getPrimaryCodeByPostalCode?postalCode='+testPostalCode)
    expect(response.status).toBe(200)
    done()
})
*/

