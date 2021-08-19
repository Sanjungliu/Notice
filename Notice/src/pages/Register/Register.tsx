import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import firebase from "firebase/app";
import firestore from "firebase/firestore";

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
  firebase.app(); // kalau udah ada, pakai yang ini
}

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonTitle>Register Page</IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default Register;
