import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCd6Xpn_zZJRyPvapVzcVOdcC2jJCCDcns",
  authDomain: "smart-assistance-3fdd0.firebaseapp.com",
  projectId: "smart-assistance-3fdd0",
  storageBucket: "smart-assistance-3fdd0.firebasestorage.app",
  messagingSenderId: "240777125702",
  appId: "1:240777125702:web:cc1ae659f9d947eab10f47",
  measurementId: "G-42M66MZXDC",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
