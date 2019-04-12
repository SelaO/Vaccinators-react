import React, { Component } from 'react'
import UserDetails from '../components/UserDetails'

export default class UserDetailsPage extends Component {
  render() {
    return (
      <div>
        <UserDetails age = '22'
        firstName = 'Roi'
        lastName = 'Ashkenazi'
        countryOfBirth = 'Israel'
        dateOfBirth = '07/03/1991'
        id = '3019324981'
        ></UserDetails>
      </div>
    )
  }
}
