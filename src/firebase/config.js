import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA0lymkuNNjUHLRlB9ato_3-dhbyCWE8vY",
  authDomain: "evento-5943a.firebaseapp.com",
  projectId: "evento-5943a",
  storageBucket: "evento-5943a.appspot.com",
  messagingSenderId: "216219259076",
  appId: "1:216219259076:web:9e96cb079dbe6df8a8f991"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

