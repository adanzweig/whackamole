const firebase = require("firebase-admin");

const credentials = require("../firebase.json");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: "https://whackamole-3015f-default-rtdb.firebaseio.com",
});

module.exports = firebase;