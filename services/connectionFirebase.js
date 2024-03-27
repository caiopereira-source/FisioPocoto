import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

let firebaseConfig = {

    apiKey: "AIzaSyBbGg8BFFWr69n-zS_lYZ0kxSxz05Xmiro",
  
    authDomain: "bdboerzo.firebaseapp.com",
  
    projectId: "bdboerzo",
  
    storageBucket: "bdboerzo.appspot.com",
  
    messagingSenderId: "149972768326",
  
    appId: "1:149972768326:web:7df24f53d98497b68f9c47"
  
  };
  

  if (!firebase.apps.length) {
    // Initialize Firebase
     firebase.initializeApp(firebaseConfig);
    }
 
export default firebase;