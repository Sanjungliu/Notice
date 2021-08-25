import firebase from "firebase/app";
import "firebase/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyD3ll-9SLplToqEfptf5_dS7vqcryvERO8",
    authDomain: "notice-c949c.firebaseapp.com",
    projectId: "notice-c949c",
    storageBucket: "notice-c949c.appspot.com",
    messagingSenderId: "908773404933",
    appId: "1:908773404933:web:65c7d6fbe80afb4a0b476c",
  });
} else {
  firebase.app();
}

export default firebase;
export const firestore = firebase.firestore();
