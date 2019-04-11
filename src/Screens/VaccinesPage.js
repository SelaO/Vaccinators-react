import React, { Component } from 'react';
import VaccinesList from '../components/VaccineList'
import {getUsersVaccines} from '../logic/backend' ;

export default class VaccinesPage extends Component {

    constructor(props){
        super(props);
        this.state = {
          rows: []
        };
        var that = this; 
        var firebaseRef = getUsersVaccines('1').then(function(e) {
            console.log(e)
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

