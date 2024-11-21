import React from 'react';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config = {
    apiKey: "AIzaSyDma9FfcHBcqH_NgDSzxT_lAMBUf5MT6E8",
    authDomain: "authentication-blog-e7909.firebaseapp.com",
    projectId: "authentication-blog-e7909",
    storageBucket: "authentication-blog-e7909.firebasestorage.app",
    messagingSenderId: "335145661546",
    appId: "1:335145661546:web:f51efda01f5ff9dc9a4613",
    measurementId: "G-6LGK6T68JP"
};

// Initialize Firebase
const app = initializeApp(config);

// Initialize Firebase Auth
export const auth = getAuth(app);