import firebase from ".firebase";

const firebaseConfig = {
    "apiKey": "AIzaSyDWceN8R5DmPmSd9yHrc8XaClA7rAerMzk",
    "authDomain": "miproyecto-aefbe.firebaseapp.com",
    "projectId": "miproyecto-aefbe",
    "storageBucket": "miproyecto-aefbe.appspot.com",
    "messagingSenderId": "611132529087",
    "appId": "1:611132529087:web:388808e4de4dafa3ee690a"
};

firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
const User=db.collection("Users");
module.exports=User;