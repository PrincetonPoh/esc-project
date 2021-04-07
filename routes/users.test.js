const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);

it('testing to see whether getAllUsers work', async done => {
    const response = await request.get('/users/getAllUsers')
    expect(response.status).toBe(200)
    done()
})

it('testing to see whether getUserById work', async done => {
    const testUserId="a947efa7-3ceb-4c74-8447-14de9dcc3b6b"
    const response = await request.get('/users/getUserById?user_id='+testUserId)
    expect(response.status).toBe(200)
    done()
})

it('testing to see whether getPrimaryCodeByPostalCode work', async done => {
    const testPostalCode=990123
    const response = await request.get('/users/getPrimaryCodeByPostalCode?postalCode='+testPostalCode)
    expect(response.status).toBe(200)
    done()
})
