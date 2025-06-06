// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAbht14kCbTdu6nBJhOFIw6Yz3_lIkgNZg",
  authDomain: "yt-clone-78d7b.firebaseapp.com",
  projectId: "yt-clone-78d7b",
  storageBucket: "yt-clone-78d7b.appspot.com",
  messagingSenderId: "445102765738",
  appId: "1:445102765738:web:6b6e18a5b63262789502d3",
  measurementId: "G-37CHG9JLV9",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
