/**
 * src/BookList.js
 */
import React from "react";
import ReactDOM from 'react-dom';

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
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: "Bearer " + localStorage.getItem("@token"),
      },
      body: JSON.stringify({ query: 'query getScore($userId: Int!) { scores(userId: $userId) { userId,score,speed,id,}}',
      operationName: 'getScore',
      variables: { userId: 1 } }),
    })
    .then(res => res.json())
    .then(res => this.setState({isLoaded:true,userInfo:res.data.scores}));
  }
  render(){
    if(this.state.isLoaded){
      return (
          <div className="container" key="UserScore">
          <h1>My top scores</h1>
          <h2>{localStorage.getItem("@name")}</h2>
          <table>
          <thead>
            <tr>
              <th>Speed Level</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.userInfo.map((score,idx)=>(
                <tr>
                <td>{score.speed}</td>
                <td>{score.score}</td>
                
                </tr>
              ))
            }
          </tbody>
          </table>
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
