const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);

it('testing to see if Jest works', async done => {
    const response = await request.get('/users/getAllUsers')

    expect(response.status).toBe(200)
    done()
})