// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAow3hOCAIXWM7-7RC4Vjmy0W3zspBZb60",
    authDomain: "booking-vehicle-1599a.firebaseapp.com",
    projectId: "booking-vehicle-1599a",
    storageBucket: "booking-vehicle-1599a.appspot.com",
    messagingSenderId: "41014522647",
    appId: "1:41014522647:web:b005d3c7c21cb619b1fd52"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);