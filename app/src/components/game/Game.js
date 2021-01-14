import React from "react";
import { Button,Row,Col,Container } from 'react-bootstrap';
import { HOSTNAME } from "../../config/constants";
import Mole from "./Mole";

class Game extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          play:false,
          timerToStart:3,
          gameTimer:30,
          gameOver:false,
          points:0,
          myScore:0,
          bestScore:0
      };
      this.whack = this.whack.bind(this);
      this.replay = this.replay.bind(this);

  }
  componentDidMount(){
    this.getMyHighScore();
    this.getSpeedHighScore();
    this.prepareGame();
  }
  whack(){
    this.setState({points: this.state.points + 1});
  }
  prepareGame(){
    var t = this;
    var x = setInterval(function() {
      t.setState({timerToStart:t.state.timerToStart-1});
        if(t.state.timerToStart === 0){
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
        if(t.state.gameTimer === 0){
          clearInterval(y);
          t.endGame();
        }
      },1000);
  }
  getMyHighScore(){
      var query = 'query usersScoreSpeed($user_id: String!,$speed:Int!) { usersScoreSpeed(user_id: $user_id,speed: $speed) { user_id,score,speed,id,}}'
      var operationName = 'usersScoreSpeed';
      var variables = { user_id: localStorage.getItem('@user'),speed:this.props.speed };
    
    fetch(HOSTNAME+'/graphql', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: "Bearer " + localStorage.getItem("@token"),
      },
      body: JSON.stringify({ query: query,
      operationName: operationName,
      variables: variables }),
    })
    .then(res => res.json())
    .then((res) => 
        {
          if(res.message !== undefined && res.message === 'Could not authorize'){
            document.location = '/Logout';
          }
          if(res.data[operationName] !== null){
            this.setState({myScore:res.data[operationName].score})
          }
        
          
        }
      );
  }
  getSpeedHighScore(){
      var query = 'query speedScore($speed:Int!) { speedScore(speed: $speed) { user_id,score,speed,id,}}'
      var operationName = 'speedScore';
      var variables = { user_id: localStorage.getItem('@user'),speed:this.props.speed };
    
    fetch(HOSTNAME+'/graphql', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: "Bearer " + localStorage.getItem("@token"),
      },
      body: JSON.stringify({ query: query,
      operationName: operationName,
      variables: variables }),
    })
    .then(res => res.json())
    .then((res) => {
      if(res.message !== undefined && res.message === 'Could not authorize'){
        document.location = '/Logout';
      }
        if(res.data[operationName] !== undefined){
          this.setState({bestScore:res.data[operationName][0].score})
        }
    }
    );
  }
  endGame(){
    this.setState({play:false,gameOver:true});
    var query = 'mutation($user_id: String, $speed: Int, $score: Int) {addScore (user_id: $user_id, speed: $speed, score: $score) {user_id}}';
    var variables = { speed: this.props.speed,score:this.state.points,user_id:localStorage.getItem('@user') };
    fetch(HOSTNAME+'/graphql', {
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
    this.setState({timerToStart:3,gameOver:false,points:0,gameTimer:30});
    this.prepareGame();
  }
  transformToText(speed){
    switch(speed){
      case 1:
        return 'Easy';
      case 2: 
        return 'Medium';
      case 3:
        return 'Hard';
      default:
        return "";
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
        <img src="logoblanco.png" className="logo small" alt="logo small"/>
        { (!this.state.play && !this.state.gameOver)? <div className="overlayPrepare"><div>Prepare yourself!<br/>{this.state.timerToStart}</div></div>:''}
          <Container >
            <Row className="gameInfoStats">
              <Col>
                <div>Difficulty: { this.transformToText(this.props.speed) }</div>
              </Col>
              <Col>
                <div className="myScore panel-body"> My highscore: <b>{this.state.myScore}</b></div>
              </Col>
              <Col>
                <div className="bestScore"> Best: <b>{this.state.bestScore}</b></div>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3 className="gameTimer">{this.state.gameTimer} Seconds Left!</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="currentScore">Current: { this.state.points }</div>
              </Col>
            </Row>
           </Container>
           
           { this.state.gameOver? <div className="overlayPrepare"><h4>Game Over<br/> Your final score was: {this.state.points}</h4>
           <br/><Button variant="success" onClick={()=>this.replay()}> Replay </Button></div>:''}
           {(!this.state.gameOver && this.state.play)?<Container>{board}</Container>:''}
        </div>
      )
  }
}
export default Game;