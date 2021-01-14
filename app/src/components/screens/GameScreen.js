import React from "react";
import { Button } from 'react-bootstrap';
import HomeScreen from "./HomeScreen";
import UserScore from "../user/UserScore";
import Game from "../game/Game";

class GameScreens extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            speed: 2,
            gameStarted:false,
            displayMyStats:false,
            displayStats:false,
            showBack:false
        };
        this.changeSpeed = this.changeSpeed.bind(this);
        this.startGame = this.startGame.bind(this);
        this.displayStats = this.displayStats.bind(this);
    }
    changeSpeed(speed) {
        this.setState({
            speed: parseInt(speed),
            displayStats: 0,
            gameStarted: false,
            displayBack:false
        });
    }
    startGame(speed) {
        this.setState({
            gameStarted: true,
            displayBack:true
        });
    }
    displayStats(type) {
        this.setState({
            displayStats: type,
            displayBack:true
        });  
    }
    goBack(){
        this.setState({
            displayStats: 0,
            gameStarted: false,
            displayBack: false
        });
    }
    componentDidMount(){
        
    }
  render(){
      return (
        <div>
            {(this.state.gameStarted === true)?<Button variant="danger" onClick={()=>this.goBack()} className="backButton btn-lg">Back</Button>:''}
            {this.state.gameStarted === false?<HomeScreen changeSpeed={this.changeSpeed.bind(this)}  startGame={this.startGame.bind(this)}  displayStats={this.displayStats.bind(this)} speed={this.state.speed}/>:''}
            {this.state.gameStarted === true?<Game speed={this.state.speed}/>:''}
            {this.state.gameStarted === false && this.state.displayStats === 1?<UserScore title="Highscores for difficulty" speed={this.state.speed}/>:''}
            {this.state.gameStarted === false && this.state.displayStats === 2?<UserScore title="My Highscores"/>:''}
        </div>
      )
  }
}
export default GameScreens;