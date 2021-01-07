import React from "react";
import ReactDOM from 'react-dom';
import { Button,Row,Col,Container,Alert } from 'react-bootstrap';
import HomeScreen from "../screens/HomeScreen";

class Game extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          speed: 1,
          gameStarted:false
      };
  }
  componentDidMount(){
    
  }
  render(){
      return (
        <div>
           
        </div>
      )
  }
}
export default Game;