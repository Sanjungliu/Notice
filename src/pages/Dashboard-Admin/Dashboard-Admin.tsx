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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Dashboard-Admin.css";
import { setUser } from "../../store/action";

const DashboardAdmin: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(setUser({}));
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <section className="dashboard-admin-section">
          <IonItem lines="none">
            <IonTitle className="dashboard-admin-title">
              Welcome, {user.username}
            </IonTitle>
          </IonItem>

          <IonItem lines="none">
            <IonButton
              onClick={() => history.push("/profile")}
              className="ion-margin"
            >
              See Profile
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonButton
              onClick={() => history.push("/statistic")}
              className="ion-margin"
            >
              See Statistic
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonButton
              onClick={() => history.push("/map")}
              className="ion-margin"
            >
              See Map
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonButton onClick={logout} className="ion-margin">
              Logout
            </IonButton>
          </IonItem>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default DashboardAdmin;
