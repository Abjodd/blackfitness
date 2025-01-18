// Import the necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsaaV7tXMxwoAftTRgyQan9IpUq-j4AcY",
    authDomain: "gym-managemet.firebaseapp.com",
    projectId: "gym-managemet",
    storageBucket: "gym-managemet.firebasestorage.app",
    messagingSenderId: "554226629236",
    appId: "1:554226629236:web:5c92a206f747c834742f21",
    measurementId: "G-LJQ5X84K3E"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;
