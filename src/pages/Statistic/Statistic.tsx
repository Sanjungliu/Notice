import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
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
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Statistic.css";
import {
  fetchAPI,
  fetchCases,
  setAPI,
  setCase,
  setUser,
} from "../../store/action";
const schedule = require("node-schedule");

const Statistic: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const cases = useSelector((state: RootState) => state.case);
  const dataAPI = useSelector((state: RootState) => state.API);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAPI());
    dispatch(fetchCases());
  }, []);

  useEffect(() => {
    for (let i = 0; i < dataAPI.length; i++) {
      for (let j = 0; j < cases.length; j++) {
        if (dataAPI[i].attributes.Provinsi === cases[j].region) {
          dataAPI[i].attributes.Kasus_Posi++;
        }
      }
    }
  }, [dataAPI]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <section className="dashboard-admin-section">
          <IonItem lines="none">
            <IonTitle className="dashboard-admin-title">
              COVID 19 Statistic
            </IonTitle>
          </IonItem>
          <IonItem lines="none">
            <IonButton
              onClick={() => history.push("/dashboard-admin")}
              className="ion-margin"
            >
              Back to Dashboard
            </IonButton>
          </IonItem>
          <IonRow style={{ borderBottom: "groove" }}>
            <IonCol col-4>
              <IonLabel>No</IonLabel>
            </IonCol>
            <IonCol col-4>
              <IonLabel>Provinsi</IonLabel>
            </IonCol>
            <IonCol col-4>
              <IonLabel>Positif</IonLabel>
            </IonCol>
            <IonCol col-4>
              <IonLabel>Sembuh</IonLabel>
            </IonCol>
            <IonCol col-4>
              <IonLabel>Meninggal</IonLabel>
            </IonCol>
          </IonRow>

          {dataAPI.map((el: any, i: any) => {
            return (
              <div key={i}>
                <IonRow style={{ borderBottom: "groove" }}>
                  <IonCol col-4>
                    <IonLabel>{i + 1}</IonLabel>
                  </IonCol>
                  <IonCol col-4>
                    <IonLabel>{el.attributes.Provinsi}</IonLabel>
                  </IonCol>
                  <IonCol col-4>
                    <IonLabel>
                      {(el.attributes.Kasus_Posi / 1000).toFixed(3)}
                    </IonLabel>
                  </IonCol>
                  <IonCol col-4>
                    <IonLabel>
                      {(el.attributes.Kasus_Semb / 1000).toFixed(3)}
                    </IonLabel>
                  </IonCol>
                  <IonCol col-4>
                    <IonLabel>
                      {el.attributes.Kasus_Meni > 999
                        ? (el.attributes.Kasus_Meni / 1000).toFixed(3)
                        : el.attributes.Kasus_Meni}
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </div>
            );
          })}
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Statistic;
