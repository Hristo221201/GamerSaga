import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    "apiKey": "AIzaSyDWceN8R5DmPmSd9yHrc8XaClA7rAerMzk",
    "authDomain": "miproyecto-aefbe.firebaseapp.com",
    "projectId": "miproyecto-aefbe",
    "storageBucket": "miproyecto-aefbe.appspot.com",
    "messagingSenderId": "611132529087",
    "appId": "1:611132529087:web:388808e4de4dafa3ee690a"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();
const auth = firebase.auth();
const User = db.collection("Users");
const actualUser = db.collection("usuarioActual");
const Texto = db.collection("Textos");

export { auth, db, User, actualUser, Texto, storage };