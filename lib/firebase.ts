// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
  appId: "1:441140823709:web:a8ddba9536081a6ec2b674",
  measurementId: "G-7S2CKMMXBZ"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);