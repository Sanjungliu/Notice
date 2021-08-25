import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonText,
  IonTitle,
} from "@ionic/react";

import firebase from "firebase/app";
import { firestore } from "../../firebase";
import "firebase/firestore";
import "firebase/auth";

import { useState } from "react";
import swal from "sweetalert2";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import OTP from "../OTP/OTP";
import { setConfirmationResult, setFlag } from "../../store/action";

const Login: React.FC = () => {
  let [phoneNumber, setPhoneNumber] = useState("");
  let flag = useSelector((state: RootState) => state.flag);
  const history = useHistory();
  const dispatch = useDispatch();

  function setupRecaptcha() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
      }
    );
    dispatch(setFlag(true));
  }

  function getCodeFromUserInput(confirmationResult: any) {
    history.push("/getOTP");
  }

  async function onSignInSubmit() {
    if (!flag) {
      setupRecaptcha();
    }
    let appVerifier = window.recaptchaVerifier;
    phoneNumber = "+62" + phoneNumber;
    const accountRef = firestore.collection("users").doc(phoneNumber);
    const doc = await accountRef.get();
    if (!doc.exists) {
      swal.fire(`Phone number not registered`);
    } else {
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(async (confirmationResult) => {
          dispatch(setConfirmationResult(confirmationResult));
          history.push("/OTP");
        })
        .catch((error) => {
          console.log(error, `ini error`);
        });
    }
    (document.getElementById("phone-number-input") as HTMLInputElement).value =
      "";
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <section className="login-section">
          <IonItem lines="none">
            <IonTitle className="login-title">Verify Account,</IonTitle>
          </IonItem>
          <IonItem lines="none">
            <IonText className="ion-margin">+62</IonText>
            <IonInput
              id="phone-number-input"
              type="number"
              onIonInput={(e: any) => setPhoneNumber(e.target.value)}
              className="ion-margin"
              placeholder="Phone Number"
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <div id="recaptcha"></div>
          </IonItem>
          <IonItem lines="none">
            <IonButton onClick={onSignInSubmit} className="ion-margin">
              Verify Phone Number
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonText>
              Don't have account? <a href="/register">Register Here</a>
            </IonText>
          </IonItem>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Login;
