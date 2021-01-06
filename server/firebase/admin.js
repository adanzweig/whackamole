const firebase = require("firebase-admin");

const credentials = require("../whackamole-3015f-firebase-adminsdk-xi3jr-97acd0da26.json");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: "https://whackamole-3015f-default-rtdb.firebaseio.com",
});

module.exports = firebase;