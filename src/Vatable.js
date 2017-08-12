import React, { Component } from 'react';
import like from "./like.svg"
import dislike from "./dislike.svg"
import Popup from 'react-popup';
import api from './Api.js'

class Vatable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vatable: props.vatable
     };
  }

  render() {
    return (
      <div className="votes">
        <figure>
          <img id="upVote" className="vote" src={like} onClick={this.upVote.bind(this)} alt="" />
          <figcaption>{this.props.vatable.up} votes</figcaption>
        </figure>
        <figure>
          <img id="downVote" className="vote" src={dislike} onClick={this.downVote.bind(this)} alt="" />
          <figcaption>{this.props.vatable.down} votes</figcaption>
        </figure>
      </div>
    );
  }

  upVote() {
    const vatable = this.props.vatable
    if (localStorage.getItem(vatable.name)) {
      Popup.alert('You have already voted')
      return
    } else {
      localStorage.setItem(vatable.name, true)
    }
    vatable.up = vatable.up + 1
    this.setState({vatable: vatable})
    console.log(`up voting ${vatable.name}`)
    api.put(`up/${vatable.name}`, {})
      .then(res => {
        console.log(`up voted ${vatable.name}`)
      })
      .catch(error => {
        Popup.alert(`Could not vote for ${vatable.name}`)
      });
  }

  downVote() {
    const vatable = this.props.vatable
    if (localStorage.getItem(vatable.name)) {
      Popup.alert('You have already voted')
      return
    } else {
      localStorage.setItem(vatable.name, true)
    }
    vatable.down = vatable.down + 1
    this.setState({vatable: vatable})
    console.log(`down voting ${vatable.name}`)
    localStorage.setItem(vatable.name, true)
    api.put(`down/${vatable.name}`, {})
      .then(res => {
        console.log(`down voted ${vatable.name}`)
      })
      .catch(error => {
        Popup.alert(`Could not vote for ${vatable.name}`)
      });
  }

}

export default Vatable;
