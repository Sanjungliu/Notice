import { IonContent, IonItem, IonPage, IonTitle } from "@ionic/react";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Map.css";
import { fetchAPI, fetchCases } from "../../store/action";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";

import back from "../../asset/back.png";

const Map: React.FC = () => {
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

  // icon color to used in map
  const redIcon = L.icon({
    iconUrl: "https://image.flaticon.com/icons/png/512/684/684908.png",
    iconSize: [40, 40],
  });

  const yellowIcon = L.icon({
    iconUrl: "https://image.flaticon.com/icons/png/512/727/727606.png",
    iconSize: [40, 40],
  });

  const greenIcon = L.icon({
    iconUrl:
      "https://www.seekpng.com/png/full/19-190761_simple-location-map-pin-icon-location-pin-green.png",
    iconSize: [40, 40],
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        <img
          onClick={() => history.push("/dashboard")}
          className="back-button"
          src={back}
        />
        <IonItem lines="none">
          <IonTitle className="dashboard-admin-title">
            COVID 19 Map Data
          </IonTitle>
        </IonItem>

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
          {dataAPI.map((el: any, i: any) => {
            return {
              ...(el.attributes.Kasus_Posi > 100000 ? (
                <Marker
                  key={i}
                  position={[el.geometry.y, el.geometry.x]}
                  icon={redIcon}
                >
                  <Popup>
                    Provinsi: {el.attributes.Provinsi}. <br />
                    Positif: {el.attributes.Kasus_Posi} <br />
                    Sembuh: {el.attributes.Kasus_Semb} <br />
                    Meninggal: {el.attributes.Kasus_Meni} <br />
                  </Popup>
                </Marker>
              ) : el.attributes.Kasus_Posi > 10000 ? (
                <Marker
                  key={i}
                  position={[el.geometry.y, el.geometry.x]}
                  icon={yellowIcon}
                >
                  <Popup>
                    Provinsi: {el.attributes.Provinsi}. <br />
                    Positif: {el.attributes.Kasus_Posi} <br />
                    Sembuh: {el.attributes.Kasus_Semb} <br />
                    Meninggal: {el.attributes.Kasus_Meni} <br />
                  </Popup>
                </Marker>
              ) : (
                <Marker
                  key={i}
                  position={[el.geometry.y, el.geometry.x]}
                  icon={greenIcon}
                >
                  <Popup>
                    Provinsi: {el.attributes.Provinsi}. <br />
                    Positif: {el.attributes.Kasus_Posi} <br />
                    Sembuh: {el.attributes.Kasus_Semb} <br />
                    Meninggal: {el.attributes.Kasus_Meni} <br />
                  </Popup>
                </Marker>
              )),
            };
          })}
        </MapContainer>
      </IonContent>
    </IonPage>
  );
};

export default Map;
