import React from "react";
import ReactDOM from 'react-dom';
import { Button,Row,Col,Container,Alert } from 'react-bootstrap';
import HomeScreen from "../screens/HomeScreen";

class Game extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          play:false,
          timerToStart:3,
          gameTimer:15,
          gameOver:false,
          points:0,
          myScore:0,
          bestScore:0
      };
  }
  componentDidMount(){
   this.prepareGame();
  }
  prepareGame(){
    var x = setInterval(function() {
  this.setState({timerToStart:this.state.timerToStart-1});
      if(this.state.timerToStart < 0){
        clearInterval(x);
        this.startGame();
      }
    },1000);
    }
    startGame(){
     this.startTimer();
    }
    startTimer(){
    this.setState({play:true});
    var y = setInterval(function(){
      this.setState({gameTimer:this.state.gameTimer-1});
      if(this.state.gameTimer < 0){
        clearInterval(x);
        this.endGame();
      }
    },1000);
  }
  endGame(){
    this.setState({play:false,gameOver:true});
  }
  replay(){
    this.setState({timerToStart:3,gameOver:false,points:0,gameTimer:15});
    this.prepareGame();
  }
  render(){
      return (
        <div>
           <h1>{this.state.timerToStart}</h1>
           <h3>{this.state.gameTimer}</h3>
           <label>{ this.state.points }</label>
           <label> My: {this.state.myScore}</label>
           <label> Best: {this.state.bestScore}</label>
           { this.state.gameOver? <h4>Game Over</h4>:''}
        </div>
      )
  }
}
export default Game;