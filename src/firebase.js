import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDx4EoVLWX2UgR5OAV2JUZ2HZQh68Hw2hc",
  authDomain: "planti-dev.firebaseapp.com",
  projectId: "planti-dev",
  storageBucket: "planti-dev.firebasestorage.app",
  messagingSenderId: "106950147677",
  appId: "1:106950147677:web:9a5e54c76a4c394d5517b4"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;