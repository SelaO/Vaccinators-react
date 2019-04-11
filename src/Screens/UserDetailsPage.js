import React, { Component } from 'react'
import UserDetails from '../components/UserDetails'

export default class UserDetailsPage extends Component {
  render() {
    return (
      <div>
        <UserDetails age = '10'
        firstName = 'Roi'
        lastName = 'Ashkenazi'
        countryOfBirth = 'Syria'
        id = '123'
        ></UserDetails>
      </div>
    )
  }
}
