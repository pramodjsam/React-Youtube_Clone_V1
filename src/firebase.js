import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuT4DePt9aMixelZDJ3crZ4I7mhDysKYo",
  authDomain: "react-notes-firebase-1a680.firebaseapp.com",
  databaseURL: "https://react-notes-firebase-1a680-default-rtdb.firebaseio.com",
  projectId: "react-notes-firebase-1a680",
  storageBucket: "react-notes-firebase-1a680.appspot.com",
  messagingSenderId: "653569506397",
  appId: "1:653569506397:web:96eef019be6c0a65f361b4",
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
