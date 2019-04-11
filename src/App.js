import React, { Component } from 'react';
import logo from './logo.svg';
import Drawer from './components/Drawer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Drawer />
      </div>
    );
  }
}

export default App;
