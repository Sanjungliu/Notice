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

import { firestore } from "../../firebase";

import { useState } from "react";
import swal from "sweetalert2";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Update-Profile.css";
import { setUser } from "../../store/action";
import back from "../../asset/back.png";
import pic from "../../asset/62.jpg";

const UpdateProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [username, setUsername] = useState(user.username);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [email, setEmail] = useState(user.email);
  const [region, setRegion] = useState(user.region);
  const history = useHistory();
  const dispatch = useDispatch();

  // update case data to firestore database
  async function update() {
    const accountRef = firestore.collection("users");
    accountRef.doc(user.phoneNumber).delete();
    accountRef
      .doc(phoneNumber)
      .set({ ...user, username, email, phoneNumber, region })
      .then(() => {
        dispatch(setUser({ ...user, username, email, phoneNumber, region }));
        swal.fire(`Succeed!`, `Update has been saved`, `success`);
        history.push("/profile");
      });
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <img
          onClick={() => history.push("/profile")}
          className="back-button"
          src={back}
        />
        <IonItem lines="none">
          <IonTitle className="update-profile-title">Update Profile</IonTitle>
        </IonItem>
        <div className="div-pic">
          <img className="pic" src={pic} />
        </div>
        <IonItem lines="none">
          <IonLabel className="update-label" position="floating">
            Username
          </IonLabel>
          <IonInput
            value={username}
            type="text"
            onIonInput={(e: any) => setUsername(e.target.value)}
            className="update-profile"
          ></IonInput>
        </IonItem>
        <IonItem lines="none">
          <IonLabel className="update-label" position="floating">
            Email
          </IonLabel>
          <IonInput
            value={email}
            type="email"
            onIonInput={(e: any) => setEmail(e.target.value)}
            className="update-profile"
          ></IonInput>
        </IonItem>
        <IonItem lines="none">
          <IonLabel className="update-label" position="floating">
            Phone Number
          </IonLabel>
          <IonInput
            value={phoneNumber}
            type="text"
            onIonInput={(e: any) => setPhoneNumber(e.target.value)}
            className="update-profile"
          ></IonInput>
        </IonItem>
        <IonItem lines="none">
          <IonLabel className="update-label" position="floating">
            Region
          </IonLabel>
          <IonSelect
            value={region}
            onIonChange={(e: any) => setRegion(e.detail.value)}
            className="update-profile"
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

        <IonItem lines="none">
          <IonButton
            shape="round"
            onClick={update}
            className="save-update-button"
          >
            Save Update
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default UpdateProfile;
