const { db } = require("../pgAdaptor");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const { ScoreType } = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    scores: {
        type: new GraphQLList(ScoreType),
        args: {},
        resolve(parentValue, args) {
          const query = `SELECT * FROM scores`;
          const values = [];
  
          return db
            .any(query, values)
            .then(res => res)
            .catch(err => err);
        }
      },
    score: {
      type: ScoreType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM scores WHERE id=$1`;
        const values = [args.id];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },
    usersScore: {
        type: new GraphQLList(ScoreType),
        args: { user_id: { type: GraphQLString } },
        resolve(parentValue, args) {
          const query = `SELECT * FROM scores WHERE user_id=$1 group by speed`;
          const values = [args.user_id];
  
          return db
            .any(query, values)
            .then(res =>res)
            .catch(err => err);
        }
    },
    usersScoreSpeed: {
        type: ScoreType,
        args: { user_id: { type: GraphQLString },speed:{ type: GraphQLInt } },
        resolve(parentValue, args) {
          const query = `SELECT * FROM scores WHERE user_id=$1 and speed=$2 order by score desc limit 1`;
          const values = [args.user_id,args.speed];
  
          return db
            .one(query, values)
            .then(res => res)
            .catch(err => err);
        }
    },
    speedScore: {
        type: new GraphQLList(ScoreType),
        args: { speed:{ type: GraphQLInt } },
        resolve(parentValue, args) {
          const query = `SELECT * FROM scores WHERE speed=$1 order by score desc limit 5`;
          const values = [args.speed];
  
          return db
            .any(query, values)
            .then(res => res)
            .catch(err => err);
        }
    }
  }
});

exports.query = RootQuery;