import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtHeEYDlLxScm3CwFk2V5IR1FPD5vzdkg",
  authDomain: "morals-c0b48.firebaseapp.com",
  projectId: "morals-c0b48",
  storageBucket: "morals-c0b48.appspot.com",
  messagingSenderId: "215686655853",
  appId: "1:215686655853:web:c4969472100599ff437464",
  measurementId: "G-025R1LCT84",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

console.log("app", app);
console.log("analytics", analytics);
console.log("analytics", db);