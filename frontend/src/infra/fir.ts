import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyAL2O4wRTYSXGgMeXu2zaHuIV2Iu2Ml5OA",
  authDomain: "todo-app-407716.firebaseapp.com",
  projectId: "todo-app-407716",
  storageBucket: "todo-app-407716.appspot.com",
  messagingSenderId: "980704051911",
  appId: "1:980704051911:web:31d4d23715e1a4232a34e2",
  measurementId: "G-L7QK7KDR4Y",
});

export const auth = getAuth(app);

if (process.env.NODE_ENV != "production") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
}
