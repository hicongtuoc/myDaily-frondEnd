import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getAuth } from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_APP_FIREBASE_KEY,
  authDomain: process.env.NEXT_APP_FIREBASE_DOMAIN,
  projectId: "mydaily-2022",
  storageBucket: "mydaily-2022.appspot.com",
  messagingSenderId: "682459830401",
  appId: "1:682459830401:web:25b6b921347643a8ed9580",
  measurementId: "G-QN5KFHH256",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
