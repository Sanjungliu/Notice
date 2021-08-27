import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
} from "@ionic/react";

import firebase from "firebase/app";
import { firestore } from "../../firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

import { useState } from "react";
import swal from "sweetalert2";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Update-Case.css";
import back from "../../asset/back.png";

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

  // handle file photo changed
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

  // upload photo to firebase storage
  function uploadPhoto(image: any) {
    const storageRef = firebase.storage().ref(`photos/${image.name}`);
    let uploadTask = storageRef.put(image);
    storageRef.getDownloadURL().then((url) => {
      setPhotoURL(url);
      (document.getElementById("chosen-image") as HTMLImageElement).src = url;
    });
  }

  // verify input and update data from firestore database
  function updateCase() {
    if (!name) {
      swal.fire(`name required`);
    } else if (!age) {
      swal.fire(`age required`);
    } else if (!address) {
      swal.fire(`address required`);
    } else {
      const caseRef = firestore.collection("cases");
      caseRef.doc(caseData.name).delete();
      caseRef
        .doc(name)
        .set({ ...caseData, name, age, address, gender, photoURL });
      swal.fire(`succeed`, `Update has been saved`, `success`);
      history.push("/cases-created");
    }

    // clear all input after any action
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
        <img
          onClick={() => history.push("/cases-created")}
          className="back-button"
          src={back}
        />
        <IonItem lines="none">
          <IonTitle className="dashboard-user-title">Update Case Data</IonTitle>
        </IonItem>

        <IonItem lines="none">
          <IonLabel className="update-label" position="stacked">
            Name
          </IonLabel>
          <IonInput
            value={name}
            id="name-input"
            type="text"
            onIonInput={(e: any) => setName(e.target.value)}
            className="update"
            placeholder="Name"
          ></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonLabel className="update-label" position="stacked">
            Age
          </IonLabel>
          <IonInput
            value={age}
            id="age-input"
            type="number"
            onIonInput={(e: any) => setAge(e.target.value)}
            className="update"
            placeholder="Age"
          ></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonLabel className="update-label" position="stacked">
            Address
          </IonLabel>
          <IonInput
            value={address}
            id="address-input"
            type="text"
            onIonInput={(e: any) => setAddress(e.target.value)}
            className="update"
            placeholder="Address"
          ></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonLabel className="update-label" position="stacked">
            Gender
          </IonLabel>
          <IonSelect
            value={gender}
            id="isAdmin-input"
            onIonChange={(e: any) => setGender(e.detail.value)}
            className="update"
            placeholder="Gender"
          >
            <IonSelectOption value="male">Male</IonSelectOption>
            <IonSelectOption value="female">Female</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem lines="none">
          <label htmlFor="image-input" className="custom-file-upload">
            <input
              id="image-input"
              onChange={(e: any) => {
                handleChangePhoto(e.target.files[0]);
              }}
              className="create-photo"
              type="file"
              placeholder="Photo"
            />
            PHOTO
          </label>
          <img id="chosen-image" />
        </IonItem>

        <IonItem lines="none">
          <IonButton
            shape="round"
            onClick={updateCase}
            className="update-case-button"
          >
            Save Update
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default UpdateCase;
