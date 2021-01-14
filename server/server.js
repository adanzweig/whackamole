"use strict";
var express = require('express');
const { graphqlHTTP } = require('express-graphql');
var { buildSchema, GraphQLSchema } = require('graphql');
const firebase = require("firebase-admin");
const authMiddleware = require("./auth-middleware");
var cors = require('cors')
const { query } = require("./schemas/queries");
const { mutation } = require("./schemas/mutations");

const schema = new GraphQLSchema({
    query,
    mutation
});

// Create an express server and a GraphQL endpoint
var app = express();
const port = 4000
app.use(cors());

app.use("/", authMiddleware);


app.use('/graphql',  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }));

app.listen(port, () => console.log('Express GraphQL Server Now Running On localhost:'+port+'/graphql'));