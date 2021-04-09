const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);


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
        "userName": "wof41sji8",
        "emailAddress": "prince@gmail.com",
        "password": "asd123"
    });
    // console.log("create already exist user "+response.status)
    expect(response.status).toBe(200)
    done()
})

it('testing to see whether createUser work for repeated input fields', async done => {
    const response = await request.post('/auth/createUser').send({
        "phoneNumber": 1232100008,
        "userName": "wof41sji8",
        "emailAddress": "prince@gmail.com",
        "password": "asd123"
    });
    // console.log("create already exist user "+response.status)
    expect(response.status).toBe(409)
    done()
})


it('testing to see whether deleteUser work', async done => {
    const userId="a24b42c9-2526-4a93-8406-5cc8d33bb0c0";
    const response = await request.delete('/users/deleteUser/?user_id='+userId)
    // console.log("delete non exist user is "+response.status)
    expect(response.status).toBe(200)
    done()
})



/*

it('testing to see whether getPrimaryCodeByPostalCode work', async done => {
    const testPostalCode=990123
    const response = await request.get('/users/getPrimaryCodeByPostalCode?postalCode='+testPostalCode)
    expect(response.status).toBe(200)
    done()
})
*/

