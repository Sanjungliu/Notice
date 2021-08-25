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
import firebase from "../../firebase";
import { firestore } from "../../firebase";
import "firebase/firestore";
import "firebase/auth";

import { useState } from "react";
import swal from "sweetalert2";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Dashboard-User.css";
import { setUser } from "../../store/action";

const DashboardUser: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [gender, setGender] = useState("");
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
        <section className="dashboard-user-section">
          <IonItem lines="none">
            <IonTitle className="dashboard-user-title">
              Welcome, {user.username}
            </IonTitle>
          </IonItem>

          <IonItem lines="none">
            <IonButton
              onClick={() => history.push("/create-new-case")}
              className="ion-margin"
            >
              Add New Case
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonButton
              onClick={() => history.push("/profile")}
              className="ion-margin"
            >
              My Profile
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonButton
              onClick={() => history.push("/cases-created")}
              className="ion-margin"
            >
              See Cases
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonButton color="danger" onClick={logout} className="ion-margin">
              Logout
            </IonButton>
          </IonItem>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default DashboardUser;
