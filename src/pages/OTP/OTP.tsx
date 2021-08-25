import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import Swal from "sweetalert2";
import { firestore } from "../../firebase";
import { RootState } from "../../store";
import { setUser } from "../../store/action";

export default function OTP() {
  const [OTPcode, setOTPcode] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const confirmationResult = useSelector(
    (state: RootState) => state.confirmationResult
  );
  const dispatch = useDispatch();
  const history = useHistory();

  function getOTP() {
    if (confirmationResult !== {}) {
      confirmationResult
        .confirm(OTPcode)
        .then(async (result: any) => {
          const accountRef = firestore
            .collection("users")
            .doc(result.user.phoneNumber);
          const doc = await accountRef.get();
          const user = doc.data();
          dispatch(setUser(user));
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
        <section className="register-section">
          <IonItem lines="none">
            <IonTitle className="register-title">Input OTP</IonTitle>
          </IonItem>
          <IonItem lines="none">
            <IonInput
              id="OTP-input"
              type="text"
              onIonInput={(e: any) => setOTPcode(e.target.value)}
              className="ion-margin"
              placeholder="OTP Code"
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonButton onClick={getOTP} className="ion-margin">
              Verify
            </IonButton>
          </IonItem>
        </section>
      </IonContent>
    </IonPage>
  );
}
