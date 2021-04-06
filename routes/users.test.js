const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);


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
        "phoneNumber": 12320000,
        "userName": "wof41sji",
        "emailAddress": "prince@gmail.com",
        "password": "asd123"
    });
    console.log("create already exist user "+response.status)
    expect(response.status).toBe(409)
    done()
})


it('testing to see whether deleteUser work', async done => {
    const userId="07429e5b-ef7a-451e-845c-b67f10af0635";
    const response = await request.delete('/users/deleteUser/?user_id='+userId)
    console.log("delete non exist user is "+response.status)
    expect(response.status).toBe(409)
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

