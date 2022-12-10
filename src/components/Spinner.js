import React, { Component } from 'react'
import loading from './ZZ5H.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img className="my-3" src={loading} alt="loading"/>
      </div>
    )
  }
}

export default Spinner
