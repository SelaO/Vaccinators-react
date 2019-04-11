import React, { Component } from "react";
import logo from "./logo.svg";
import Drawer from "./components/Drawer";
import "./App.css";
import VaccineCard from "./components/VaccineCard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Drawer />
        <VaccineCard
          name="Elad"
          date="23.12.1991"
          location="Tel aviv"
          md="123"
          outdate="10.10.2019"
        />
      </div>
    );
  }
}

export default App;
