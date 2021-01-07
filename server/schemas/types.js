const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const ScoreType = new GraphQLObjectType({
  name: "Score",
  type: "Query",
  fields: {
    id: { type: graphql.GraphQLInt },
    user_id: { type: GraphQLString },
    speed: { type: graphql.GraphQLInt },
    score: { type: graphql.GraphQLInt },
    created_at: { type: GraphQLString }
  }
});



exports.ScoreType = ScoreType;
