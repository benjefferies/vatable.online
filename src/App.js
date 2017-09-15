import React, { Component } from 'react';
import './App.css';
import SearchVatable from './SearchVatable.js';
import Vatable from './Vatable.js';
import Popup from 'react-popup';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vatable: {}
    }
  }

  setVatable(vatable) {
    this.setState({vatable: vatable})
  }

  render() {
    return (
      <div className="App">
        <Popup id="votedPopup"/>
        <p className="title">Vatable</p>
        <SearchVatable setVatable={this.setVatable.bind(this)} />
        { Object.keys(this.state.vatable).length > 0 && <Vatable vatable={this.state.vatable} /> }
      </div>
    );
  }
}

export default App;
