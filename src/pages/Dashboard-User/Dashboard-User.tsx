import {
  IonButton,
  IonContent,
  IonItem,
  IonPage,
  IonTitle,
} from "@ionic/react";

import firebase from "../../firebase";
import "firebase/firestore";
import "firebase/auth";

import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Dashboard-User.css";
import { setUser } from "../../store/action";
import gif from "../../asset/dashboard.gif";

const DashboardUser: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  // handle logout user and redirect to login page
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
        <IonItem lines="none">
          <IonButton
            shape="round"
            color="danger"
            onClick={logout}
            className="logout"
          >
            Logout
          </IonButton>
        </IonItem>
        <IonItem lines="none">
          <IonTitle className="dashboard-user-title">
            Welcome, {user.username}
          </IonTitle>
        </IonItem>
        <div className="dashboard-gif">
          <img src={gif} alt="" className="dashboard" />
        </div>

        <IonItem lines="none">
          <IonButton
            shape="round"
            color="success"
            onClick={() => history.push("/create-new-case")}
            className="add-new-case"
          >
            Add New Case
          </IonButton>
        </IonItem>
        <IonItem lines="none">
          <IonButton
            shape="round"
            color="tertiary"
            onClick={() => history.push("/profile")}
            className="my-profile"
          >
            My Profile
          </IonButton>
        </IonItem>
        <IonItem lines="none">
          <IonButton
            shape="round"
            onClick={() => history.push("/cases-created")}
            className="see-cases"
          >
            See Cases
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default DashboardUser;
