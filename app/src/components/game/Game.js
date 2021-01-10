import React from "react";
import ReactDOM from 'react-dom';
import { Button,Row,Col,Container,Alert } from 'react-bootstrap';
import HomeScreen from "../screens/HomeScreen";
import Mole from "./Mole";

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
      this.whack = this.whack.bind(this);

  }
  componentDidMount(){
   this.prepareGame();
  }
  whack(){
    this.setState({points: this.state.points + 1});
  }
  prepareGame(){
    var t = this;
    var x = setInterval(function() {
      t.setState({timerToStart:t.state.timerToStart-1});
        if(t.state.timerToStart == 0){
          clearInterval(x);
          t.startGame();
        }
    },1000);
    }
    startGame(){
     this.setState({play:true});
     this.startTimer();
    }
    startTimer(){
      var t = this;
      var y = setInterval(function(){
        t.setState({gameTimer:t.state.gameTimer-1});
        if(t.state.gameTimer == 0){
          clearInterval(y);
          t.endGame();
        }
      },1000);
  }
  endGame(){
    this.setState({play:false,gameOver:true});
    var query = 'mutation($user_id: String, $speed: Int, $score: Int) {\
      addScore (user_id: $user_id, speed: $speed, score: $score) {\
          user_id\
      }\
    }';
    var operationName = 'addScore';
    console.log(this.props);
    var variables = { speed: this.props.speed,score:this.state.points,user_id:localStorage.getItem('@user') };
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: "Bearer " + localStorage.getItem("@token"),
      },
      body: JSON.stringify({ query: query,
      variables: variables }),
    })
    .then(res => res.json())
    .then(res => this.setState({}));
      
    
    
  }
  replay(){
    this.setState({timerToStart:3,gameOver:false,points:0,gameTimer:15});
    this.prepareGame();
  }
  transformToText(speed){
    switch(speed){
      case 1:
        return 'Easy';
        break;
      case 2: 
        return 'Medium';
        break;
      case 3:
        return 'Hard';
        break;
    }
  }
  render(){
    const board = [];
    for (let y=0; y<3; y++) {
      const cols = []
      for (let x=0; x<3; x++) {
        cols.push(<Col><Mole key={`${x}_${y}`} speed={this.props.speed} whack={this.whack.bind(this)}/></Col>);
      }
      board.push(<Row>{cols}</Row>);
    }
      return (
        <div>
        { (!this.state.play && !this.state.gameOver)? <div className="overlayPrepare"><div>Prepare yourself!<br/>{this.state.timerToStart}</div></div>:''}
          <Container>
            <Row>
              <Col>
                <div>Difficulty: { this.transformToText(this.props.speed) }</div>
              </Col>
              <Col>
                <div className="myScore"> My highscore: {this.state.myScore}</div>
              </Col>
              <Col>
                <div className="bestScore"> Best: {this.state.bestScore}</div>
              </Col>
            </Row>
           </Container>
           <h3>{this.state.gameTimer} Seconds Left!</h3>
           <div className="currentScore">Current: { this.state.points }</div>
           { this.state.gameOver? <div className="overlayPrepare"><h4>Game Over<br/> Your final score was: {this.state.points}</h4></div>:''}
           {(!this.state.gameOver && this.state.play)?<Container>{board}</Container>:''}
        </div>
      )
  }
}
export default Game;