import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEXJS6tfyp3dRZ7kxkWCBrb1-ilurOHaU",
    authDomain: "mercadillo-magic.firebaseapp.com",
    databaseURL: "https://mercadillo-magic-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mercadillo-magic",
    storageBucket: "mercadillo-magic.appspot.com",
    messagingSenderId: "239518387023",
    appId: "1:239518387023:web:eeb2daa92cade0c3ee933a",
    measurementId: "G-JGFG16SFFC"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const realtime_db = getDatabase(app);
export const cloud_db = getFirestore(app);