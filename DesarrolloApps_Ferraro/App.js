import React from "react";
import PlaceNavigator from "./navigation/PlaceNavigator"
import { Provider } from "react-redux";
import store from "../DesarrolloApps_Ferraro/store"
import {init} from "./db"

init()
  .then(() => console.log("Database initialized"))
  .catch((err) => {
    console.log("Data base fail connect");
    console.log(err.message);
  });

export default function App() {
  return (
    <Provider store={store}>
      <PlaceNavigator />
    </Provider>
  );
}