import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import Popup from 'react-popup';
import api from './Api.js'

class SearchVatable extends Component {

  constructor(props) {
      super(props);
      this.state = {
        name: '',
        names: [],
        setVatable: props.setVatable
       };
    }

  render() {
    const menuStyle = {
      fontSize: '1.5em',
      borderRadius: '3px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
      background: 'rgba(255, 255, 255, 0.9)',
      cursor: 'pointer'
    }
    const inputProps = { style: { 'width': '50vw', 'fontSize': '1.5em' } }
    return (
      <Autocomplete
        value={this.state.name}
        items={this.state.names}
        getItemValue={(vatable) => vatable.name}
        onSelect={this.selectVatable.bind(this)}
        renderItem={(item, isHighlighted) =>
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.name}
          </div>
        }
        onChange={this.onChange.bind(this)}
        inputProps={inputProps}
        menuStyle={menuStyle}
      />
    );
  }

  onChange(e, name) {
    if (name.length === 0) {
        this.state.setVatable({})
        this.setState({name: name, names: []})
    } else {
      this.setState({name: name})
      this.searchForVatable(name)
    }
  }

  selectVatable(val) {
    if (val === 'Create new vatable?') {
      this.createVatable(this.state.name)
    } else {
      this.setState({name: val, names: []})
      this.getVatable(val)
    }
  }

  searchForVatable(name) {
    if (name.length < 2) {
      return
    }
    api.get(`search/${name}`, {})
      .then( (response) => {
        if (response.data.length === 0) {
          this.setState({names: [{name: 'Create new vatable?'}]})
        } else {
          this.setState({names: response.data})
        }
      })
  }

  getVatable(name) {
    if (name.length === 0) {
      return
    }
    api.get(`${name}`)
      .then( (response) => {
        this.state.setVatable(response.data)
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.state.setVatable({})
          console.log(error)
        }
      });
  }

  createVatable(name) {
    console.log(`creating vatable ${name}`)
    api.post(`${name}`, {})
      .then(res => {
        this.state.setVatable({name: name, up: 0, down: 0, report: 0})
      })
      .catch(error => {
        Popup.alert(`${name} already exists`)
      });
  }

}

export default SearchVatable;
