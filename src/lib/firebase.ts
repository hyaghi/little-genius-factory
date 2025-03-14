
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7FjjQjuIu7a_PLli6YLO7rwjEVkXbWyg",
  authDomain: "yaghi-ai-academy.firebaseapp.com",
  projectId: "yaghi-ai-academy",
  storageBucket: "yaghi-ai-academy.firebasestorage.app",
  messagingSenderId: "868430050989",
  appId: "1:868430050989:web:ccc491b90b7a90ce463824",
  measurementId: "G-D532D2090V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics conditionally (it might not be supported in all environments)
export const initializeAnalytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
