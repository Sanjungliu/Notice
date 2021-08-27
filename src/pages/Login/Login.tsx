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
import { setConfirmationResult, setFlag } from "../../store/action";

import "./Login.css";
import vector from "../../asset/vector.jpg";

const Login: React.FC = () => {
  let [phoneNumber, setPhoneNumber] = useState("");
  let flag = useSelector((state: RootState) => state.flag);
  const history = useHistory();
  const dispatch = useDispatch();

  // set recaptcha before send OTP code
  function setupRecaptcha() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        },
      }
    );
    dispatch(setFlag(true));
  }

  // handle firebase authentication by phone number
  async function onSignInSubmit() {
    // if recaptcha not render yet
    if (!flag) {
      setupRecaptcha();
    }

    let appVerifier = window.recaptchaVerifier;
    phoneNumber = "+62" + phoneNumber;

    // check phone number from firestore database first before login
    const accountRef = firestore.collection("users").doc(phoneNumber);
    const doc = await accountRef.get();

    // if the phone number not registered in database
    if (!doc.exists) {
      swal.fire(`Phone number not registered`);

      // if the phone number registered in database, then do action
    } else {
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(async (confirmationResult) => {
          // redirect to OTP input page, and send the verification function to redux, to used in OTP page
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
            <IonText className="country-code-login">+62</IonText>
            <IonInput
              id="phone-number-input"
              type="number"
              onIonInput={(e: any) => setPhoneNumber(e.target.value)}
              className="phone-number-input-login"
              placeholder="Phone Number"
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonButton
              shape="round"
              className="send-OTP-button"
              color="success"
              onClick={onSignInSubmit}
            >
              Send OTP
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonText className="redirect">
              Don't have account? <a href="/register">Register Here</a>
            </IonText>
          </IonItem>
          <div className="vector-div">
            <img className="vector" src={vector} alt="" />
          </div>
        </section>
        <div id="recaptcha"></div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
