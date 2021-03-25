const request = require('supertest')
const app = require('../server')

// describe('Get Endpoints', () => {
//   it('should get all users', async () => {
//     const res = await request(app)
//         .get('/users/getAllUsers')
//         .expect(200)
//         // .end( function (err, res){
//         //     if (err) throw err;
//         // });
//     })
// })


// describe('Post Endpoints', () => {
//     it('should create a new user', async () => {
//       const res = await request(app)
//         .post('/users/createUser')
//         .send({
//           user_id: 1,
//           phoneNumber: 'test is cool',
//           userName: 'test is cool',
//           emailAddress: 'test is cool',
//           password: 'test is cool'
//         })
//       expect(res.statusCode).toEqual(200)
//       expect(res.body).toHaveProperty('post')
//       end( function (err, res){
//           if (err) throw err;
//       });
//     })
//   })

app.get('/user', function(req, res) {
    res.status(200).json({ name: 'john' });
});

it('should get all users', async () => {
    request(app)
        .get('/user')
        .expect('Content-Type', /json/)
        .expect('Content-Length', '15')
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
    });
});