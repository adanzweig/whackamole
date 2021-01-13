const { db } = require("../pgAdaptor");
var assert    = require("chai").assert;
var expect = require('chai').expect;

//Test that the Scores DB exists
describe('DB Scores', () => {
    it('seeing the db table', () => {
      return db.any('select * from scores where user_id = ${user_id} ', { user_id: 'test'}).then((data) => {  
        expect(data).to.deep.equal([]);
      })
    });
  
    // we insert data into our database
    it('inserting data into db', () => {
      return db.none('insert into scores (user_id,speed,score) values (${user_id},${speed},${score})', { user_id: 'test',speed:0,score:0 })
    });
  
    // we check db has value
    it('not seeing data in the db', () => {
      return db.any('select * from scores where user_id = ${user_id}',{user_id:'test'}).then((data) => {  
        expect(data).to.have.lengthOf(1);
      })
    });

     // we delete data from our database
     it('deleting data from db', () => {
        return db.none('delete from scores where user_id = ${user_id}', { user_id: 'test'})
      });

  });
   
