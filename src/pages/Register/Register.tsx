import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
} from "@ionic/react";

import { firestore } from "../../firebase";
import "firebase/firestore";
import "firebase/auth";

import { useState } from "react";
import swal from "sweetalert2";
import { useHistory } from "react-router";

import gif from "../../asset/love.gif";

import "./Register.css";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [region, setRegion] = useState("");
  const history = useHistory();

  // handle register and validate input from user
  async function register() {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkPhoneNumber =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!username) {
      swal.fire(`username required`);
    } else if (!email) {
      swal.fire(`email required`);
    } else if (!re.test(String(email).toLowerCase())) {
      swal.fire(`invalid email format`);
    } else if (!phoneNumber) {
      swal.fire(`Phone Number required`);
    } else if (!checkPhoneNumber.test(String(phoneNumber).toLowerCase())) {
      swal.fire(`Invalid phone number format`);
    } else if (isAdmin === "") {
      swal.fire(`Please choose User Status`);
    } else if (region === "") {
      swal.fire(`Please choose Region`);
    } else {
      // if input all validated
      phoneNumber = "+62" + phoneNumber;

      // check if phone number already registered in database
      const accountRef = firestore.collection("users").doc(phoneNumber);
      const doc = await accountRef.get();

      // if already registered in database
      if (doc.exists) {
        swal.fire(`Failed`, `Phone Number registered`, `error`);

        // if not registered, send the data to firestore database as new record
      } else {
        const accountRef = firestore.collection("users");
        accountRef
          .doc(phoneNumber)
          .set({ username, email, phoneNumber, isAdmin, region });
        swal.fire(`Congratulation!`, `Your account succeed created`, `success`);
        history.push("/login");
      }
    }
    // clear all input after any action
    (document.getElementById("username-input") as HTMLInputElement).value = "";
    (document.getElementById("email-input") as HTMLInputElement).value = "";
    (document.getElementById("phone-number-input") as HTMLInputElement).value =
      "";
    (document.getElementById("isAdmin-input") as HTMLInputElement).value = "";
    (document.getElementById("region-input") as HTMLInputElement).value = "";
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonItem color="tr" lines="none">
          <IonTitle className="register-title">Create Account,</IonTitle>
        </IonItem>
        <IonItem color="tr" lines="none">
          <IonInput
            id="username-input"
            type="text"
            onIonInput={(e: any) => setUsername(e.target.value)}
            className="username-input"
            placeholder="Username"
          ></IonInput>
        </IonItem>
        <IonItem color="tr" lines="none">
          <IonInput
            id="email-input"
            type="email"
            onIonInput={(e: any) => setEmail(e.target.value)}
            className="email-input"
            placeholder="Email"
          ></IonInput>
        </IonItem>
        <IonItem color="tr" lines="none">
          <IonText className="country-code-register">+62</IonText>
          <IonInput
            id="phone-number-input"
            type="number"
            onIonInput={(e: any) => setPhoneNumber(e.target.value)}
            className="phone-number-input"
            placeholder="Phone Number"
          ></IonInput>
        </IonItem>
        <IonItem color="tr" lines="none">
          <IonSelect
            value={region}
            id="region-input"
            onIonChange={(e: any) => setRegion(e.detail.value)}
            className="region-input"
            placeholder="Region"
          >
            <IonSelectOption value="Aceh">Aceh</IonSelectOption>
            <IonSelectOption value="Sumatera Utara">
              Sumatera Utara
            </IonSelectOption>
            <IonSelectOption value="Sumatera Barat">
              Sumatera Barat
            </IonSelectOption>
            <IonSelectOption value="Sumatera Selatan">
              Sumatera Selatan
            </IonSelectOption>
            <IonSelectOption value="Riau">Riau</IonSelectOption>
            <IonSelectOption value="Kepulauan Riau">
              Kepulauan Riau
            </IonSelectOption>
            <IonSelectOption value="Jambi">Jambi</IonSelectOption>
            <IonSelectOption value="Bengkulu">Bengkulu</IonSelectOption>
            <IonSelectOption value="Bangka Belitung">
              Bangka Belitung
            </IonSelectOption>
            <IonSelectOption value="Lampung">Lampung</IonSelectOption>
            <IonSelectOption value="DKI Jakarta">DKI Jakarta</IonSelectOption>
            <IonSelectOption value="Jawa Barat">Jawa Barat</IonSelectOption>
            <IonSelectOption value="Jawa Tengah">Jawa Tengah</IonSelectOption>
            <IonSelectOption value="Jawa Timur">Jawa Timur</IonSelectOption>
            <IonSelectOption value="Daerah Istimewa Yogyakarta">
              Daerah Istimewa Yogyakarta
            </IonSelectOption>
            <IonSelectOption value="Banten">Banten</IonSelectOption>
            <IonSelectOption value="Bali">Bali</IonSelectOption>
            <IonSelectOption value="Nusa Tenggara Barat">
              Nusa Tenggara Barat
            </IonSelectOption>
            <IonSelectOption value="Nusa Tenggara Timur">
              Nusa Tenggara Timur
            </IonSelectOption>
            <IonSelectOption value="Kalimantan Barat">
              Kalimantan Barat
            </IonSelectOption>
            <IonSelectOption value="Kalimantan Tengah">
              Kalimantan Tengah
            </IonSelectOption>
            <IonSelectOption value="Kalimantan Selatan">
              Kalimantan Selatan
            </IonSelectOption>
            <IonSelectOption value="Kalimantan Timur">
              Kalimantan Timur
            </IonSelectOption>
            <IonSelectOption value="Kalimantan Utara">
              Kalimantan Utara
            </IonSelectOption>
            <IonSelectOption value="Sulawesi Utara">
              Sulawesi Utara
            </IonSelectOption>
            <IonSelectOption value="Sulawesi Tengah">
              Sulawesi Tengah
            </IonSelectOption>
            <IonSelectOption value="Sulawesi Selatan">
              Sulawesi Selatan
            </IonSelectOption>
            <IonSelectOption value="Sulawesi Tenggara">
              Sulawesi Tenggara
            </IonSelectOption>
            <IonSelectOption value="Sulawesi Barat">
              Sulawesi Barat
            </IonSelectOption>
            <IonSelectOption value="Gorontalo">Gorontalo</IonSelectOption>
            <IonSelectOption value="Maluku">Maluku</IonSelectOption>
            <IonSelectOption value="Maluku Utara">Maluku Utara</IonSelectOption>
            <IonSelectOption value="Papua">Papua</IonSelectOption>
            <IonSelectOption value="Papua Barat">Papua Barat</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem color="tr" lines="none">
          <IonSelect
            value={isAdmin}
            id="isAdmin-input"
            onIonChange={(e: any) => setIsAdmin(e.detail.value)}
            className="isAdmin-input"
            placeholder="User Status"
          >
            <IonSelectOption value="false">User</IonSelectOption>
            <IonSelectOption value="true">Admin</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem color="tr" lines="none">
          <IonButton
            shape="round"
            color="success"
            onClick={register}
            className="register-button"
          >
            Register
          </IonButton>
        </IonItem>
        <IonItem color="tr" lines="none">
          <IonText className="redirect-register">
            Already have account? <a href="/login">Login Here</a>
          </IonText>
        </IonItem>
        <div className="gif">
          <img className="love-gif" src={gif} alt="" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
