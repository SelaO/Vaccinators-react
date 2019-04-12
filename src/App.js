import React, { Component } from "react";
import logo from "./logo.svg";
import Drawer from "./components/Drawer";
import Login from './Screens/Login'
import "./App.css";

class App extends Component {

  constructor(props){
    super(props);

    this.state = {isLogin: true}

    this.login = this.login.bind(this);
  }

  login() {
    this.setState({isLogin: false})
  }

  render() {
    return (
      <div className="App">
        {this.state.isLogin ? <Login onClick={() => this.login()}/> : <Drawer /> }
      </div>
    );
  }
}

export default App;
