import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

// com.liu.notice
import firebase from "firebase/app";
import { firestore } from "../../firebase";
import "firebase/firestore";
import "firebase/auth";

import { useState } from "react";
import swal from "sweetalert2";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Profile.css";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [gender, setGender] = useState("");
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <section className="dashboard">
          <IonItem lines="none">
            <IonTitle className="dashboard-title">Profile Page</IonTitle>
          </IonItem>

          <IonItem className="ion-margin" lines="none">
            <IonText>Username: {user.username}</IonText>
          </IonItem>
          <IonItem className="ion-margin" lines="none">
            <IonText>Email: {user.email}</IonText>
          </IonItem>
          <IonItem className="ion-margin" lines="none">
            <IonText>Phone Number: {user.phoneNumber}</IonText>
          </IonItem>
          <IonItem className="ion-margin" lines="none">
            <IonText>Admin: {user.isAdmin}</IonText>
          </IonItem>
          <IonItem className="ion-margin" lines="none">
            <IonText>Region: {user.region}</IonText>
          </IonItem>

          <IonItem lines="none">
            <IonButton
              onClick={() => history.push("/update-profile")}
              className="ion-margin"
            >
              Edit Profile
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonButton
              onClick={() => history.push("/dashboard")}
              className="ion-margin"
            >
              Back to Dashboard
            </IonButton>
          </IonItem>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
