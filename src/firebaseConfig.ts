import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

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

let auth: Auth;

if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    auth = getAuth(app);
  }
}

export { auth };
export const db = getFirestore(app);
