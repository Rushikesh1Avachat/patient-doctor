// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvxxj-1IfEQADm9HPK2Br_K4C_-8TgygQ",
  authDomain: "jsm-patient-doctor.firebaseapp.com",
  projectId: "jsm-patient-doctor",
  storageBucket: "jsm-patient-doctor.firebasestorage.app",
  messagingSenderId: "441140823709",
  appId: "1:441140823709:web:5f6b36eecdb80b40c2b674",
  measurementId: "G-W5KESTMX3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);