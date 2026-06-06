import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyDIMz3VZHXqKVS0xFNUE9FpS3qXt5oW72w",
    authDomain: "nwitter-12db7.firebaseapp.com",
    projectId: "nwitter-12db7",
    storageBucket: "nwitter-12db7.firebasestorage.app",
    messagingSenderId: "176843403800",
    appId: "1:176843403800:web:728c3d0800d7587d06496d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);