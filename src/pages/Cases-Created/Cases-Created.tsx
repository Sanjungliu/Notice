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

import { useEffect, useState } from "react";
import swal from "sweetalert2";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Cases-Created.css";
import { setCase } from "../../store/action";

const CasesCreated: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  let [cases, setCases] = useState<any[]>([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    getCasesData();
  }, []);

  async function getCasesData() {
    const casesRef = firestore.collection("cases");
    const casesData = await casesRef
      .where("creator", "==", user.username)
      .get();
    if (casesData.empty) {
      swal.fire(`Please Input Case First`);
      return;
    }
    const casesArray = casesData.docs.map((doc) => doc.data());
    setCases(casesArray);
  }

  function handleUpdate(data: any) {
    dispatch(setCase(data));
    history.push("/update-case");
  }

  function handleDelete(data: any) {
    const caseRef = firestore.collection("cases");
    caseRef.doc(data.name).delete();
    getCasesData();
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <section className="cases-created-section">
          <IonItem lines="none">
            <IonTitle className="dashboard-user-title">
              COVID 19 Cases in Your Region
            </IonTitle>
          </IonItem>
          {cases.length === 0 ? (
            <IonText>You don't input any cases yet</IonText>
          ) : (
            cases.map((el, i) => {
              return (
                <div key={i}>
                  <IonImg src={el.photoURL}></IonImg>
                  <IonItem lines="none">
                    <IonText>Name: {el.name}</IonText>
                  </IonItem>
                  <IonItem lines="none">
                    <IonText>Age: {el.age}</IonText>
                  </IonItem>
                  <IonItem lines="none">
                    <IonText>Address: {el.address}</IonText>
                  </IonItem>
                  <IonItem lines="none">
                    <IonText>Gender: {el.gender}</IonText>
                  </IonItem>
                  <IonItem lines="none">
                    <IonText>Region: {el.region}</IonText>
                  </IonItem>
                  <IonItem lines="none">
                    <IonButton
                      onClick={() => handleUpdate(el)}
                      className="ion-margin"
                    >
                      Update Case
                    </IonButton>
                  </IonItem>
                  <IonItem lines="none">
                    <IonButton
                      onClick={() => handleDelete(el)}
                      color="danger"
                      className="ion-margin"
                    >
                      Delete Case
                    </IonButton>
                  </IonItem>
                </div>
              );
            })
          )}

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

export default CasesCreated;
