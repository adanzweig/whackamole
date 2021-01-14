require('dotenv').config()
const firebase = require("firebase-admin");

const credentials = JSON.parse(process.env.FIREBASE_JSON);

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: "https://whackamole-3015f-default-rtdb.firebaseio.com",
});

module.exports = firebase;