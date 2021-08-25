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

import { useEffect, useState } from "react";
import swal from "sweetalert2";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Update-Case.css";
import { setCase } from "../../store/action";

const UpdateCase: React.FC = () => {
  const caseData = useSelector((state: RootState) => state.case);
  const [name, setName] = useState(caseData.name);
  const [age, setAge] = useState(caseData.age);
  const [address, setAddress] = useState(caseData.address);
  const [photo, setPhoto] = useState();
  const [photoURL, setPhotoURL] = useState(caseData.photoURL);
  const [gender, setGender] = useState(caseData.gender);
  const history = useHistory();
  const dispatch = useDispatch();

  function handleChangePhoto(file: any) {
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

  function updateCase() {
    if (!name) {
      swal.fire(`name required`);
    } else if (!age) {
      swal.fire(`age required`);
    } else if (!address) {
      swal.fire(`address required`);
    } else if (!gender) {
      swal.fire(`gender required`);
    } else {
      const caseRef = firestore.collection("cases");
      caseRef.doc(caseData.name).delete();
      caseRef
        .doc(name)
        .set({ ...caseData, name, age, address, gender, photoURL });
      swal.fire(`succeed`, `Update has been saved`, `success`);
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
              Update Case Data
            </IonTitle>
          </IonItem>

          <IonItem lines="none">
            <IonInput
              value={name}
              id="name-input"
              type="text"
              onIonInput={(e: any) => setName(e.target.value)}
              className="ion-margin"
              placeholder="Name"
            ></IonInput>
          </IonItem>

          <IonItem lines="none">
            <IonInput
              value={age}
              id="age-input"
              type="number"
              onIonInput={(e: any) => setAge(e.target.value)}
              className="ion-margin"
              placeholder="Age"
            ></IonInput>
          </IonItem>

          <IonItem lines="none">
            <IonInput
              value={address}
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
            <img src={caseData.photoURL} id="chosen-image" />
          </IonItem>

          <IonItem lines="none">
            <IonButton onClick={updateCase} className="ion-margin">
              Save Update
            </IonButton>
          </IonItem>
          <IonItem lines="none">
            <IonButton
              onClick={() => history.push("/cases-created")}
              className="ion-margin"
            >
              Back to Cases Data
            </IonButton>
          </IonItem>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default UpdateCase;
