import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyRCd27NO53V9_hBmoOl0P4vE2mjG_HCk",
  authDomain: "upliance-project-a3cfb.firebaseapp.com",
  projectId: "upliance-project-a3cfb",
  storageBucket: "upliance-project-a3cfb.firebasestorage.app",
  messagingSenderId: "273772744666",
  appId: "1:273772744666:web:d8fe9454a9699de741bae3",
  measurementId: "G-GRPH7SVS8Y",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

