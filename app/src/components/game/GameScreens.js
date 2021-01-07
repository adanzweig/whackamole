import React from "react";
import ReactDOM from 'react-dom';
import { Button,Row,Col,Container,Alert } from 'react-bootstrap';
import HomeScreen from "../screens/HomeScreen";
import UserScore from "../user/UserScore";
import Game from "./Game";

class GameScreens extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          speed: 1,
          gameStarted:false,
          displayMyStats:false,
          displayStats:false
      };
      this.changeSpeed = this.changeSpeed.bind(this);
      this.startGame = this.startGame.bind(this);
      this.displayStats = this.displayStats.bind(this);
  }
  changeSpeed(speed) {
      this.setState({
          speed: speed,
          displayStats: 0,
          gameStarted: false
      });
  }
  startGame(speed) {
    this.setState({
        gameStarted: true
    });
    }
    displayStats(type) {
        this.setState({
            displayStats: type,
        });
      
  }
  componentDidMount(){
    
  }
  render(){
      return (
        <div>
            {this.state.gameStarted == false?<HomeScreen changeSpeed={this.changeSpeed.bind(this)}  startGame={this.startGame.bind(this)}  displayStats={this.displayStats.bind(this)} speed={this.state.speed}/>:''}
            {this.state.gameStarted == true?<Game speed={this.state.speed}/>:''}
            {this.state.gameStarted == false && this.state.displayStats == 1?<UserScore title="Highscores for difficulty" speed={this.state.speed}/>:''}
            {this.state.gameStarted == false && this.state.displayStats == 2?<UserScore title="My Highscores"/>:''}
        </div>
      )
  }
}
export default GameScreens;