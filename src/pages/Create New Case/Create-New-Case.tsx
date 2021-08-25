import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
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
import "firebase/storage";

import { useState } from "react";
import swal from "sweetalert2";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Create-New-Case.css";

const CreateNewCase: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [gender, setGender] = useState("");
  const history = useHistory();

  function handleChangePhoto(file: any) {
    console.log(file.type);
    if (file === undefined) {
    } else if (
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg"
    ) {
      setPhoto(file);
      uploadPhoto(file);
    } else {
      swal.fire(`file is not image format`);
    }
  }

  function uploadPhoto(image: any) {
    const storageRef = firebase.storage().ref(`photos/${image.name}`);
    let uploadTask = storageRef.put(image);
    storageRef.getDownloadURL().then((url) => {
      setPhotoURL(url);
      (document.getElementById("chosen-image") as HTMLImageElement).src = url;
    });
  }

  function createNewCase() {
    if (!name) {
      swal.fire(`name required`);
    } else if (!age) {
      swal.fire(`age required`);
    } else if (!address) {
      swal.fire(`address required`);
    } else if (!gender) {
      swal.fire(`gender required`);
    } else if (!photo) {
      swal.fire(`photo required`);
    } else {
      const caseRef = firestore.collection("cases");
      caseRef.doc(name).set({
        name,
        age,
        address,
        gender,
        photoURL,
        region: user.region,
        creator: user.username,
      });
      swal.fire(`succeed`, `New case has been record`, `success`);
      history.push("/cases-created");
    }
    (document.getElementById("name-input") as HTMLInputElement).value = "";
    (document.getElementById("age-input") as HTMLInputElement).value = "";
    (document.getElementById("address-input") as HTMLInputElement).value = "";
    (document.getElementById("isAdmin-input") as HTMLInputElement).value = "";
    (document.getElementById("image-input") as HTMLInputElement).value = "";
    (document.getElementById("chosen-image") as HTMLImageElement).src = "";
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
            <IonInput
              id="name-input"
              type="text"
              onIonInput={(e: any) => setName(e.target.value)}
              className="ion-margin"
              placeholder="Name"
            ></IonInput>
          </IonItem>

          <IonItem lines="none">
            <IonInput
              id="age-input"
              type="number"
              onIonInput={(e: any) => setAge(e.target.value)}
              className="ion-margin"
              placeholder="Age"
            ></IonInput>
          </IonItem>

          <IonItem lines="none">
            <IonInput
              id="address-input"
              type="text"
              onIonInput={(e: any) => setAddress(e.target.value)}
              className="ion-margin"
              placeholder="Address"
            ></IonInput>
          </IonItem>

          <IonItem lines="none">
            <IonSelect
              value={gender}
              id="isAdmin-input"
              onIonChange={(e: any) => setGender(e.detail.value)}
              className="ion-margin"
              placeholder="Gender"
            >
              <IonSelectOption value="male">Male</IonSelectOption>
              <IonSelectOption value="female">Female</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem lines="none">
            <input
              id="image-input"
              onChange={(e: any) => {
                handleChangePhoto(e.target.files[0]);
              }}
              className="ion-margin"
              type="file"
              placeholder="Photo"
            />
            <img id="chosen-image" />
          </IonItem>

          <IonItem lines="none">
            <IonButton onClick={createNewCase} className="ion-margin">
              Add Case
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonButton
              onClick={() => history.push("/dashboard-user")}
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

export default CreateNewCase;
