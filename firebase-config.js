// Import Firebase (v10) - استخدم نفس النسخة اللي في app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI1vzdq--ELAVncdphz_iCsfNA8l5lvCU",
  authDomain: "cloud-notes-system.firebaseapp.com",
  projectId: "cloud-notes-system",
  storageBucket: "cloud-notes-system.appspot.com",
  messagingSenderId: "1009164093092",
  appId: "1:1009164093092:web:6e3f9f722a756f19d30831"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
