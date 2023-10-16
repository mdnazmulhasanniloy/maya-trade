// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDl0MiBM6Zp4XfXeBnjzOnBOjYomX4y_Y",
  authDomain: "maya-tradeint.firebaseapp.com",
  projectId: "maya-tradeint",
  storageBucket: "maya-tradeint.appspot.com",
  messagingSenderId: "490741807951",
  appId: "1:490741807951:web:819f2fb565e56d327aa33a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
export const googleAuthProvider = new GoogleAuthProvider();
