// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB32PXUWjs9gZZiehAbvaKsKLtxUVp6Uok",
  authDomain: "learning-app-1acc9.firebaseapp.com",
  projectId: "learning-app-1acc9",
  storageBucket: "learning-app-1acc9.firebasestorage.app",
  messagingSenderId: "790225502835",
  appId: "1:790225502835:web:f52def7389f065ef4b6006",
  measurementId: "G-HT1YRM1MBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics is only available in supported browsers over HTTPS or localhost
let analytics;
try {
  if (typeof window !== "undefined" && window?.location?.protocol?.includes("http")) {
    analytics = getAnalytics(app);
  }
} catch (_) {
  // ignore analytics init errors in development
}

const auth = getAuth(app);

export {app , auth};