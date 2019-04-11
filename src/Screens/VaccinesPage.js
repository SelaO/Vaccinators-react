import React, { Component } from 'react';
import VaccinesList from '../components/VaccineList'
import {getUsersVaccines} from '../logic/backend' ;

export default class VaccinesPage extends Component {

    constructor(props){
        super(props);
        this.state = {
          rows: []
        };
        const that = this; 
        getUsersVaccines('1').then(function(e) {
             that.setState({
               rows: e
             });
        });
    }

  render() {
    return (
      <div>
           <VaccinesList rows = {this.state.rows} /> 
      </div>
    )
  }
}

