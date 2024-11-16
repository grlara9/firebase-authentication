import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDma9FfcHBcqH_NgDSzxT_lAMBUf5MT6E8",
    authDomain: "authentication-blog-e7909.firebaseapp.com",
    projectId: "authentication-blog-e7909",
    storageBucket: "authentication-blog-e7909.firebasestorage.app",
    messagingSenderId: "335145661546",
    appId: "1:335145661546:web:f51efda01f5ff9dc9a4613",
    measurementId: "G-6LGK6T68JP"
};
firebase.initializeApp(config)
export default firebase;