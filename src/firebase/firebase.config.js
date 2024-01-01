import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyp0JniViqc1qPm5HgrYlkix1dG9RJ77A",
  authDomain: "mrc-attendance.firebaseapp.com",
  projectId: "mrc-attendance",
  storageBucket: "mrc-attendance.appspot.com",
  messagingSenderId: "819184352409",
  appId: "1:819184352409:web:23bf7403911b7635588c08",
  measurementId: "G-GVH1J6VY72"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth,db}