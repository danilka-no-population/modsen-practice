import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBLdasVMtdG-kQvlWG7_jTzu8uf1qWxnEA",
    authDomain: "modsen-practice-d7fa9.firebaseapp.com",
    projectId: "modsen-practice-d7fa9",
    storageBucket: "modsen-practice-d7fa9.appspot.com",
    messagingSenderId: "591296294472",
    appId: "1:591296294472:web:f7a37797222120f19af27d",
    measurementId: "G-17Y6P9Y50Q"
};

const app = initializeApp(firebaseConfig);

export const createUser = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(getAuth(app), email, password);
}

export const signInUser = async (email: string, password: string) => {
    return signInWithEmailAndPassword(getAuth(app), email, password);
}