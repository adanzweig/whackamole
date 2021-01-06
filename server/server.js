var express = require('express');
const { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const firebase = require("firebase-admin");
const authMiddleware = require("./auth-middleware");
var cors = require('cors')


// GraphQL schema
var schema = buildSchema(`
    type Query {
        score(id: Int!): Score
        scores(userId: Int!): [Score]
    },
    type Score {
        id: Int
        userId: Int
        score: Int
        speed: Int
    }
`);
var ScoresData = [
    {
        id: 1,
        userId: 1,
        score: 10,
        speed: 1
    },
    {
        id: 2,
        userId: 1,
        score: 10,
        speed: 2
    },
    {
        id: 3,
        userId: 2,
        score:10,
        speed:1
    }
]
var getScore = function(args) { 
    var id = args.id;
    return ScoresData.filter(score => {
        return score.id == id;
    })[0];
}
var getScores = function(args) {
    if (args.userId) {
        var userId = args.userId;
        return ScoresData.filter(score => score.userId === userId);
    } else {
        return ScoresData;
    }
}
var root = {
    score: getScore,
    scores: getScores
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use(cors());

app.use("/", authMiddleware);


app.use('/graphql',  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));