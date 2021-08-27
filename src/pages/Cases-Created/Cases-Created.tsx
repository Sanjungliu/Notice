import {
  IonButton,
  IonContent,
  IonImg,
  IonItem,
  IonPage,
  IonText,
  IonTitle,
} from "@ionic/react";

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

import back from "../../asset/back.png";

const CasesCreated: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  let [cases, setCases] = useState<any[]>([]);
  const history = useHistory();
  const dispatch = useDispatch();

  // fetch cases data created by user before render the component
  useEffect(() => {
    getCasesData();
  }, []);

  // fetch cases data created by user logged in from firestore database
  async function getCasesData() {
    const casesRef = firestore.collection("cases");
    const casesData = await casesRef
      .where("creator", "==", user.username)
      .get();
    if (casesData.empty) {
      swal.fire(`Please Input Case First`);
    } else {
      const casesArray = casesData.docs.map((doc) => doc.data());
      setCases(casesArray);
    }
  }

  // handle redirect to update page and send data to redux to showed in component
  function handleUpdate(data: any) {
    dispatch(setCase(data));
    history.push("/update-case");
  }

  // delete case from firestore database
  function handleDelete(data: any) {
    const caseRef = firestore.collection("cases");
    caseRef.doc(data.name).delete();
    getCasesData();
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <img
          onClick={() => history.push("/dashboard-user")}
          className="back-button"
          src={back}
        />
        <section className="cases-created-section">
          <IonItem lines="none">
            <IonTitle className="title">COVID 19 Cases</IonTitle>
          </IonItem>
          <IonItem lines="none">
            <IonTitle className="subtitle">You Reported</IonTitle>
          </IonItem>

          {cases.length === 0 ? (
            <IonItem lines="none">
              <IonText className="info-text">
                You haven't input any cases yet
              </IonText>
            </IonItem>
          ) : (
            cases.map((el, i) => {
              return (
                <div className="case-card" key={i}>
                  <IonImg className="photo-case" src={el.photoURL}></IonImg>
                  <IonItem className="line-1" lines="none">
                    <IonText className="name-data">{el.name}</IonText>
                    <IonText className="age-data">{el.age} years</IonText>
                  </IonItem>

                  <IonItem lines="none">
                    <IonText className="gender-data">{el.gender}</IonText>
                    <IonText className="region-data">{el.region}</IonText>
                  </IonItem>

                  <IonItem lines="none">
                    <IonText className="address-data">{el.address}</IonText>
                  </IonItem>

                  <IonItem lines="none">
                    <IonButton
                      shape="round"
                      onClick={() => handleUpdate(el)}
                      className="update-case-button"
                    >
                      Update Case
                    </IonButton>
                  </IonItem>
                  <IonItem lines="none">
                    <IonButton
                      shape="round"
                      onClick={() => handleDelete(el)}
                      color="danger"
                      className="delete-case-button"
                    >
                      Delete Case
                    </IonButton>
                  </IonItem>
                </div>
              );
            })
          )}
        </section>
      </IonContent>
    </IonPage>
  );
};

export default CasesCreated;
