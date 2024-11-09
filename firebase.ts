import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA53auFXF7BO8_e0w8vkXVfcPnh0mt-Ohk",
  authDomain: "social-media-bcb05.firebaseapp.com",
  projectId: "social-media-bcb05",
  storageBucket: "social-media-bcb05.firebasestorage.app",
  messagingSenderId: "144460614382",
  appId: "1:144460614382:web:44cbe74ede5890daefc1ff",
  measurementId: "G-NPJR0PFRYL",
};

const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
