// firebase.js
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAlpQRsDQnya1Wxt4wEHgtloyEMyEsPgNo",
  authDomain: "chatapp-8e8bb.firebaseapp.com",
  projectId: "chatapp-8e8bb",
  storageBucket: "chatapp-8e8bb.appspot.com",
  messagingSenderId: "918355065187",
  appId: "1:918355065187:android:0e652dba106fc3eecafb56",
  measurementId: "G-MEASUREMENT-ID" // Optional, if you are using Analytics
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
