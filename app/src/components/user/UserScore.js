import React from "react";
import ReactDOM from 'react-dom';
import {Table} from 'react-bootstrap';
class UserScore extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          userInfo: {},
          isLoaded:false
      };
  }
  componentDidMount(){
    this.getMyScores();
  }
  getMyScores(){
    this.setState({isLoaded:false})
    if(this.props.speed == undefined){
      var query = 'query usersScore($user_id: String!) { usersScore(user_id: $user_id) { user_id,score,speed,id,}}'
      var operationName = 'usersScore';
      var variables = { user_id: localStorage.getItem('@user') };
    }else{
      var query = 'query speedScore($speed: Int!) { speedScore(speed: $speed) { user_id,score,speed,id,}}'
      var operationName = 'speedScore';
      console.log(this.props);
      var variables = { speed: this.props.speed };
    }
    
    fetch('http://localhost:4000/graphql', {
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
    .then(res => this.setState({isLoaded:true,
      userInfo:res.data[operationName]}));
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
    if(this.state.isLoaded){
      return (
          <div className="container" key="UserScore">
          <h1>{this.props.title}</h1>
          <h3>{this.props.speed == undefined?'':this.transformToText(this.props.speed)}</h3>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              {this.props.speed == undefined?<th>Dificulty</th>:<th>User</th>}
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.userInfo.map((score,idx)=>(
                <tr>
                  <td><h3>#{parseInt(idx)+1}</h3></td>
                  {this.props.speed == undefined?<td>{this.transformToText(score.speed)}</td>:<td>{score.user_id}</td>}
                  <td>{score.score}</td>
                
                </tr>
              ))
            }
          </tbody>
          </Table>
        </div>   
      );
    }else{
      return (
          <div>Loading... Please Wait</div>
      );
  }
  }
}
export default UserScore;
