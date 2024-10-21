// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAe8bXFWq8JuI7IspaFCk2ubyRFsXU-9Mg",
    authDomain: "ethsf24.firebaseapp.com",
    projectId: "ethsf24",
    storageBucket: "ethsf24.appspot.com",
    messagingSenderId: "44219406606",
    appId: "1:44219406606:web:4601efe41541ce086d9f5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);