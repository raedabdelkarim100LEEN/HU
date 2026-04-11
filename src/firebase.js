import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDgIFX6OvyTpBwRNBEimi30Eucq0GsfUAg",
    authDomain: "eva-style.firebaseapp.com",
    projectId: "eva-style",
    storageBucket: "eva-style.firebasestorage.app",
    messagingSenderId: "668901547970",
    appId: "1:668901547970:web:3424603d004b5ed254c05b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;