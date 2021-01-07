const { db } = require("./pgAdaptor");

db.one('select * from scores')
.then(res=>{
    console.log(res);
});