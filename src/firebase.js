import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDP__7lqy9aBGjo2HVxgHjWhEX69PhsVQ8",
  authDomain: "temp-project-5779c.firebaseapp.com",
  databaseURL: "https://temp-project-5779c-default-rtdb.firebaseio.com",
  projectId: "temp-project-5779c",
  storageBucket: "temp-project-5779c.appspot.com",
  messagingSenderId: "766017024852",
  appId: "1:766017024852:web:0c8e35d652f53f63f88ec1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const auth = getAuth(app);

