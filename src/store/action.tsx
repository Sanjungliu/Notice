import { firestore } from "../firebase";
const schedule = require("node-schedule");

// send User in redux
export function setUser(input: any) {
  return {
    type: "SET_USER",
    payload: input,
  };
}

// send firebase authentication function to redux
export function setConfirmationResult(input: any) {
  return {
    type: "SET_CONFIRMATION_RESULT",
    payload: input,
  };
}

// send case data to redux to used in update case component
export function setCase(input: any) {
  return {
    type: "SET_CASE",
    payload: input,
  };
}

// set flag to avoid rendering recaptcha if recaptcha already rendered
export function setFlag(input: any) {
  return {
    type: "SET_FLAG",
    payload: input,
  };
}

// send API data to redux
export function setAPI(input: any) {
  return {
    type: "SET_API",
    payload: input,
  };
}

// fetch API data from firstore database
export function fetchAPI() {
  return async (dispatch: any) => {
    const covidAPIRef = firestore.collection("covid-API");
    const covidAPIData = await covidAPIRef.get();
    let covidAPIArray = covidAPIData.docs.map((doc) => doc.data());
    covidAPIArray[0].data.pop();
    dispatch(setAPI(covidAPIArray[0].data));
  };
}

// fetch cases data created by user from firestore database
export function fetchCases() {
  return async (dispatch: any) => {
    const casesRef = firestore.collection("cases");
    const casesData = await casesRef.get();
    const casesArray = casesData.docs.map((doc) => doc.data());
    dispatch(setCase(casesArray));
  };
}

// to fetch updated 3rd API data everyday at 23.59 PM
export function backgroundJob() {
  const job = schedule.scheduleJob("* 59 23 * *", async function () {
    const response = await fetch(
      "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=Provinsi,Kasus_Posi,Kasus_Semb,Kasus_Meni&outSR=4326&f=json"
    );
    const data = await response.json();
    const covidAPI = firestore.collection("covid-API");
    covidAPI.doc("covid-API").set({ data: data.features });
  });
}
