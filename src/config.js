import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8QDlMjJ9Fl9VuSU7AdTj3LKQ14LwJYPA",
  authDomain: "mercor-2ac45.firebaseapp.com",
  projectId: "mercor-2ac45",
  storageBucket: "mercor-2ac45.appspot.com",
  messagingSenderId: "367371263930",
  appId: "1:367371263930:web:d2d535345a92efce968783",
  measurementId: "G-1GQ8RB3B1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});
export {auth,provider};