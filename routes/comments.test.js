const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);

beforeAll(() => {
    process.env.NODE_ENV = 'test';
})

it('testing to see whether createParentComment work', async done => {
    const response = await request.post('/comments/createParentComment').send({
        "post_id": 4,
        "text": "this is my very 2nd p.commmnett!",
        "ownerName":"princeton6"
    })
    expect(response.status).toBe(200)
    done()
});

it('testing failed createParentComment', async done => {
    const response = await request.post('/comments/createParentComment').send({
        "text": "this is my very 2nd p.commmnett!",
        "ownerName":"princeton6"
    })
    expect(response.status).toBe(400)
    done()
});

it('testing to see whether getParentComments work', async done => {
    const response = await request.get('/comments/getParentComments?post_id=4')
    expect(response.status).toBe(200)
    done()
});


it('testing to see whether deleteParentComment work', async done => {
    const response = await request.delete('/comments/deleteParentComment/?parent_comment_id=219601f2-9460-4a4e-ab2f-d06ed2a07e6a')
    expect(response.status).toBe(200)
    done()
});

//
it('testing to see whether createChildComment work', async done => {
    const response = await request.post('/comments/createChildComment').send({
        "parent_comment_id": 4,
        "text": "this is my very 2nd p.commmnett!",
        "ownerName":"princeton6"
    })
    expect(response.status).toBe(200)
    done()
});


it('testing to see whether getChildComments work', async done => {
    const response = await request.get('/comments/getChildComments?parent_comment_id=4')
    expect(response.status).toBe(200)
    done()
});


it('testing to see whether deleteChildComment work', async done => {
    const response = await request.delete('/comments/deleteChildComment/?child_comment_id=219601f2-9460-4a4e-ab2f-d06ed2a07e6a')
    expect(response.status).toBe(200)
    done()
});


