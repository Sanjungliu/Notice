import {
  IonCol,
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";

import { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Statistic.css";
import { fetchAPI, fetchCases } from "../../store/action";
import back from "../../asset/back.png";

const Statistic: React.FC = () => {
  const cases = useSelector((state: RootState) => state.case);
  const dataAPI = useSelector((state: RootState) => state.API);
  const history = useHistory();
  const dispatch = useDispatch();

  // fetch cases data created by all user and API data from COVID-19 3rd API before render the component
  useEffect(() => {
    dispatch(fetchAPI());
    dispatch(fetchCases());
  }, []);

  // combine cases data created by all user and COVID data from 3rd API
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
      <IonContent className="table" fullscreen>
        <img
          onClick={() => history.push("/dashboard")}
          className="back-button"
          src={back}
        />
        <IonItem lines="none">
          <IonTitle className="statistic-title">COVID 19 Statistic</IonTitle>
        </IonItem>

        <IonRow style={{ borderBottom: "groove" }}>
          <IonCol size="1" col-4>
            <IonLabel className="statistic-label-no">No</IonLabel>
          </IonCol>
          <IonCol size="4" col-4>
            <IonLabel className="statistic-label-provinsi">Provinsi</IonLabel>
          </IonCol>
          <IonCol className="ion-text-end" col-4>
            <IonLabel className="statistic-label-positif">Positif</IonLabel>
          </IonCol>
          <IonCol className="ion-text-end" col-4>
            <IonLabel className="statistic-label-sembuh">Sembuh</IonLabel>
          </IonCol>
          <IonCol className="ion-text-end" col-4>
            <IonLabel className="statistic-label-meninggal">Meninggal</IonLabel>
          </IonCol>
        </IonRow>

        {dataAPI.map((el: any, i: any) => {
          return (
            <div key={i}>
              <IonRow style={{ borderBottom: "groove" }}>
                <IonCol className="ion-text-center" size="1" col-2>
                  <IonLabel className="no">{i + 1}</IonLabel>
                </IonCol>
                <IonCol size="4" col-4>
                  <IonLabel className="provinsi">
                    {el.attributes.Provinsi}
                  </IonLabel>
                </IonCol>
                <IonCol className="ion-text-end" col-4>
                  <IonLabel className="positif">
                    {(el.attributes.Kasus_Posi / 1000).toFixed(3)}
                  </IonLabel>
                </IonCol>
                <IonCol className="ion-text-end" col-4>
                  <IonLabel className="sembuh">
                    {(el.attributes.Kasus_Semb / 1000).toFixed(3)}
                  </IonLabel>
                </IonCol>
                <IonCol className="ion-text-end" col-4>
                  <IonLabel className="meninggal">
                    {el.attributes.Kasus_Meni > 999
                      ? (el.attributes.Kasus_Meni / 1000).toFixed(3)
                      : el.attributes.Kasus_Meni}
                  </IonLabel>
                </IonCol>
              </IonRow>
            </div>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default Statistic;
