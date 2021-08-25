import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Register from "./pages/Register/Register";
import OTP from "./pages/OTP/OTP";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import DashboardUser from "./pages/Dashboard-User/Dashboard-User";
import DashboardAdmin from "./pages/Dashboard-Admin/Dashboard-Admin";
import CreateNewCase from "./pages/Create New Case/Create-New-Case";
import Profile from "./pages/Profile/Profile";
import UpdateProfile from "./pages/Update-Profile/Update-Profile";
import CasesCreated from "./pages/Cases-Created/Cases-Created";
import UpdateCase from "./pages/Update-Case/Update-Case";
import Statistic from "./pages/Statistic/Statistic";
import Map from "./pages/Map/Map";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    namespace: any;
    webkitTemporaryStorage: any;
    webkitStorageInfo: any;
    recaptchaWidgetId: any;
  }
}

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/OTP">
            <OTP />
          </Route>
          <Route exact path="/dashboard">
            {user && user.isAdmin == "true" ? (
              <Redirect to="dashboard-admin" />
            ) : (
              <Redirect to="/dashboard-user" />
            )}
          </Route>
          <Route exact path="/dashboard-admin">
            {user && user.isAdmin == "true" ? (
              <DashboardAdmin />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/dashboard-user">
            {user ? <DashboardUser /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/create-new-case">
            {user ? <CreateNewCase /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/profile">
            {user ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/update-profile">
            {user ? <UpdateProfile /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/cases-created">
            {user ? <CasesCreated /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/update-case">
            {user ? <UpdateCase /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/statistic">
            {user ? <Statistic /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/map">
            {/* {user ? <Map /> : <Redirect to="/login" />} */}
            <Map />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
