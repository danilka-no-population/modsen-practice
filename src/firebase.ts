// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBLdasVMtdG-kQvlWG7_jTzu8uf1qWxnEA",
    authDomain: "modsen-practice-d7fa9.firebaseapp.com",
    projectId: "modsen-practice-d7fa9",
    storageBucket: "modsen-practice-d7fa9.appspot.com",
    messagingSenderId: "591296294472",
    appId: "1:591296294472:web:f7a37797222120f19af27d",
    measurementId: "G-17Y6P9Y50Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);