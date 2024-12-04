import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDma9FfcHBcqH_NgDSzxT_lAMBUf5MT6E8",
    authDomain: "authentication-blog-e7909.firebaseapp.com",
    projectId: "authentication-blog-e7909",
    storageBucket: "authentication-blog-e7909.appspot.com",
    messagingSenderId: "335145661546",
    appId: "1:335145661546:web:f51efda01f5ff9dc9a4613",
    measurementId: "G-6LGK6T68JP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;