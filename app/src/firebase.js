/**
 * src/firebase.js
 */
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDNytp3gTG4EesFj2AUzsXT3Uoaeu1GEcA",
    authDomain: "whackamole-3015f.firebaseapp.com",
    databaseURL: "https://whackamole-3015f-default-rtdb.firebaseio.com",
    projectId: "whackamole-3015f",
    storageBucket: "whackamole-3015f.appspot.com",
    messagingSenderId: "928709725785",
    appId: "1:928709725785:web:9a42d7932b9f8a0e642b48",
    measurementId: "G-XHP2HCX6F7"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth, firebase };