import React from 'react';
import './App.css';

class Receipt extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.ingredients = props.ingredients;
    this.instructions = props.instructions;
    this.difficulty = props.difficulty;
    this.pictureUrl = props.pictureUrl;
  }

  render() {return (
      <tr>
        <td>{this.name}</td>
        <td>{this.ingredients.map(ingredient => ingredient + ', ')}</td>
        <td>{this.instructions}</td>
        <td>{this.difficulty}</td>
        <td><img src={this.pictureUrl} alt={this.name}></img></td>
      </tr>
  );}
}

export default Receipt;
