import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_APIKEY),
  authDomain: String(import.meta.env.VITE_AUTHDOMAIN),
  projectId: String(import.meta.env.VITE_PROJECTID),
  storageBucket: String(import.meta.env.VITE_STORAGEBUCKET),
  messagingSenderId: String(import.meta.env.VITE_MESSAGINGSENDERID),
  appId: String(import.meta.env.VITE_APPID),
  measurementId: String(import.meta.env.VITE_MESUREMENTID)
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth,db}