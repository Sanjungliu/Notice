import {
  IonButton,
  IonContent,
  IonItem,
  IonPage,
  IonTitle,
} from "@ionic/react";

// com.liu.notice
import "firebase/firestore";
import "firebase/auth";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Map.css";
import { fetchAPI, fetchCases } from "../../store/action";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";

const Map: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const cases = useSelector((state: RootState) => state.case);
  const dataAPI = useSelector((state: RootState) => state.API);
  const history = useHistory();
  const dispatch = useDispatch();
  let result = null;

  useEffect(() => {
    getData();
    dispatch(fetchAPI());
    dispatch(fetchCases());
  }, []);

  async function getData() {
    const response = await fetch(
      "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=Provinsi,Kasus_Posi,Kasus_Semb,Kasus_Meni&outSR=4326&f=json"
    );
    result = await response.json();
  }

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
              COVID 19 Map Data
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

          <div id="mapid">
            <MapContainer
              center={[-2.548926, 118.0148634]}
              zoom={4}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution=""
                url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGl1LWNhbmp1bmciLCJhIjoiY2tzZW81Z2J0MGwxbTJ2bnVpaGZicmEzMyJ9.RTGKt28NuDI1Qals7HgJug"
                id="mapbox/light-v9"
              />
              <Marker position={[-2.548926, 118.0148634]}>
                <Popup>
                  A pretty CSS3 popup {result}. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <div id="map"></div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Map;
