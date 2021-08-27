import {
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
} from "@ionic/react";

import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Profile.css";
import back from "../../asset/back.png";
import pic from "../../asset/62.jpg";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <img
          onClick={() => history.push("/dashboard")}
          className="back-button"
          src={back}
        />
        <IonItem lines="none">
          <IonTitle className="profile-title">Profile Page</IonTitle>
        </IonItem>

        <div className="div-pic">
          <img className="pic" src={pic} />
        </div>

        <IonItem lines="none">
          <IonLabel color="dark" className="label" position="stacked">
            Username
          </IonLabel>
          <IonText className="profile">{user.username}</IonText>
        </IonItem>
        <IonItem lines="none">
          <IonLabel className="label" position="stacked">
            Email
          </IonLabel>
          <IonText className="profile">{user.email}</IonText>
        </IonItem>
        <IonItem lines="none">
          <IonLabel className="label" position="stacked">
            Phone Number
          </IonLabel>
          <IonText className="profile">{user.phoneNumber}</IonText>
        </IonItem>
        <IonItem lines="none">
          <IonLabel className="label" position="stacked">
            Admin
          </IonLabel>
          <IonText className="profile">{user.isAdmin}</IonText>
        </IonItem>
        <IonItem lines="none">
          <IonLabel className="label" position="stacked">
            Region
          </IonLabel>
          <IonText className="profile">{user.region}</IonText>
        </IonItem>

        <IonItem lines="none">
          <IonButton
            shape="round"
            onClick={() => history.push("/update-profile")}
            className="update-profile-button"
          >
            Edit Profile
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
