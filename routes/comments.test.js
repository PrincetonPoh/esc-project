const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);


it('testing to see whether getParentComments work', async done => {
    const response = await request.get('/comments/getParentComments?post_id=4')
    expect(response.status).toBe(200)
    done()
});
it('testing to see whether createParentComment work', async done => {
    const response = await request.get('/comments/createParentComment').send({
        "post_id": 4,
        "text": "this is my very 2nd p.commmnett!",
        "ownerName":"princeton6"
    })
    expect(response.status).toBe(200)
    done()
});

it('testing to see whether deleteParentComment work', async done => {
    const response = await request.delete('/comments/deleteParentComment/?parent_comment_id=219601f2-9460-4a4e-ab2f-d06ed2a07e6a')
    expect(response.status).toBe(200)
    done()
});


