import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
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
import "firebase/messaging";

import { useState } from "react";
import swal from "sweetalert2";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Create-New-Case.css";
import back from "../../asset/back.png";
import write from "../../asset/write.gif";

const CreateNewCase: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [gender, setGender] = useState("");
  const history = useHistory();

  // handle when user choose file as input
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

  // upload case to firestore database
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
      caseRef
        .doc(name)
        .set({
          name,
          age,
          address,
          gender,
          photoURL,
          region: user.region,
          creator: user.username,
        })
        .then(() => {
          swal.fire(`succeed`, `New case has been record`, `success`);
          history.push("/cases-created");
        });
    }
    // clearing input after actions
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
          onClick={() => history.push("/dashboard")}
          className="back-button"
          src={back}
        />
        <IonItem lines="none">
          <IonTitle className="create-case-title">Report Case</IonTitle>
        </IonItem>
        <IonItem lines="none">
          <IonTitle className="create-case-subtitle">In Your Region</IonTitle>
        </IonItem>

        <IonItem lines="none">
          <IonInput
            id="name-input"
            type="text"
            onIonInput={(e: any) => setName(e.target.value)}
            className="create-name"
            placeholder="Name"
          ></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonInput
            id="age-input"
            type="number"
            onIonInput={(e: any) => setAge(e.target.value)}
            className="create-age"
            placeholder="Age"
          ></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonInput
            id="address-input"
            type="text"
            onIonInput={(e: any) => setAddress(e.target.value)}
            className="create-address"
            placeholder="Address"
          ></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonSelect
            value={gender}
            id="isAdmin-input"
            onIonChange={(e: any) => setGender(e.detail.value)}
            className="create-gender"
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
            color="success"
            shape="round"
            onClick={createNewCase}
            className="create-button"
          >
            Add Case
          </IonButton>
        </IonItem>
        <div className="write-div">
          <img src={write} className="write" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateNewCase;
