
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd1YoGQDNINjgHLcH6lygaIMg7gwX2y7Y",
  authDomain: "yaghi-ai-academy.firebaseapp.com",
  projectId: "yaghi-ai-academy",
  storageBucket: "yaghi-ai-academy.appspot.com",
  messagingSenderId: "868430050989",
  appId: "1:868430050989:web:3be493c98e5f7087463824"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
