import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_FIREBASE_API_KEY_HERE",
  authDomain: "loginonecart-8472f.firebaseapp.com",
  projectId: "loginonecart-8472f",
  storageBucket: "loginonecart-8472f.firebasestorage.app",
  messagingSenderId: "787810162289",
  appId: "1:787810162289:web:66f62288e646f582cc6dd0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
