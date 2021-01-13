const expect = require('chai').expect;
const url = `http://localhost:4000`;
const request = require('supertest')(url);

describe('GraphQL', () => {
    it('Can save user score', (done) => {
        request.post('/graphql')
        .send({ query: 'mutation($user_id: String, $speed: Int, $score: Int) {  addScore (user_id: $user_id, speed: $speed, score: $score) {user_id}}' ,
                variables:{
                    user_id: 'testGraphQL',
                    speed: 0,
                    score: 0
        }})
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // assume there are a 100 users in the database
            var elem = res.body.data.addScore;
            
            expect(elem).to.have.property('user_id');
            done();
         })
     })
    it('Returns all scores', (done) => {
        request.post('/graphql')
        .send({ query: '{ scores { id user_id score speed } }'})
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            var elem = res.body.data.scores[0];
            expect(elem).to.have.property('id')
            expect(elem).to.have.property('user_id')
            expect(elem).to.have.property('score')
            expect(elem).to.have.property('speed')
            done();
          })
     });
     it('Returns user score', (done) => {
        request.post('/graphql')
        .send({ query: '{ usersScore(user_id:"adanzweig@gmail.com") { id user_id score speed } }' })
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // assume there are a 100 users in the database
            var elem = res.body.data.usersScore;
            
            expect(elem).to.have.lengthOf.above(1);
            done();
         })
     })
});