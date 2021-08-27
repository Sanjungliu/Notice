import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
} from "@ionic/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import Swal from "sweetalert2";
import { firestore } from "../../firebase";
import { RootState } from "../../store";
import { setUser } from "../../store/action";

import gif from "../../asset/team.gif";
import "./OTP.css";

export default function OTP() {
  const [OTPcode, setOTPcode] = useState("");
  const confirmationResult = useSelector(
    (state: RootState) => state.confirmationResult
  );
  const dispatch = useDispatch();
  const history = useHistory();

  // validate the OTP code from user input
  function getOTP() {
    if (confirmationResult !== {}) {
      confirmationResult
        .confirm(OTPcode)
        .then(async (result: any) => {
          // if correct, get user data from firestore database and send data to redux
          const accountRef = firestore
            .collection("users")
            .doc(result.user.phoneNumber);
          const doc = await accountRef.get();
          const user = doc.data();
          dispatch(setUser(user));

          // check admin status
          if (user) {
            if (user.isAdmin === "true") {
              history.push("/dashboard-admin");
            } else {
              history.push("/dashboard-user");
            }
          }
        })
        .catch((error: any) => {
          Swal.fire(`Wrong passcode`);
        });
    }
    (document.getElementById("OTP-input") as HTMLInputElement).value = "";
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <section className="OTP-section">
          <IonItem lines="none">
            <IonTitle className="OTP-title">Input OTP</IonTitle>
          </IonItem>
          <IonItem lines="none">
            <IonInput
              id="OTP-input"
              type="text"
              onIonInput={(e: any) => setOTPcode(e.target.value)}
              className="OTP-input"
              placeholder="OTP Code"
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonButton
              shape="round"
              className="OTP-button"
              color="success"
              onClick={getOTP}
            >
              Verify
            </IonButton>
          </IonItem>
          <div className="gif-OTP">
            <img className="gif-team" src={gif} alt="" />
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
}
