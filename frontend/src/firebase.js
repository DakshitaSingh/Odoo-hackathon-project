import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBnpqpm8O6xY8e_NZKAUeSRKoKSZzrAzOY",
  authDomain: "rewear-8a7bb.firebaseapp.com",
  projectId: "rewear-8a7bb",
  storageBucket: "rewear-8a7bb.firebasestorage.app",
  messagingSenderId: "402618368628",
  appId: "1:402618368628:web:29b239d22e487ab8a58721",
  measurementId: "G-RMX57DGYXG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);