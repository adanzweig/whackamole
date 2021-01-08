const graphql = require("graphql");
const db = require("../pgAdaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;
const { ScoreType } = require("./types");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    addScore: {
      type: ScoreType,
      args: {
        user_id: { type: GraphQLString },
        speed: { type: GraphQLString },
        score: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO scores(user_id, speed, score,created_at) VALUES ($1, $2, $3, $4) RETURNING user_id`;
        const values = [
          args.user_id,
          args.speed,
          args.score,
          new Date()
        ];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },
  }
});

exports.mutation = RootMutation;