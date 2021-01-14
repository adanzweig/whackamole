require('dotenv').config()
const firebase = require("firebase-admin");

const credentials = {"type": "service_account",
"project_id": "whackamole-3015f",
"private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
"private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
"client_email": "firebase-adminsdk-xi3jr@whackamole-3015f.iam.gserviceaccount.com",
"client_id": process.env.FIREBASE_CLIENT_ID,
"auth_uri": "https://accounts.google.com/o/oauth2/auth",
"token_uri": "https://oauth2.googleapis.com/token",
"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xi3jr%40whackamole-3015f.iam.gserviceaccount.com"};

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: "https://whackamole-3015f-default-rtdb.firebaseio.com",
});

module.exports = firebase;