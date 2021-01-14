import React from "react";
import  { Redirect } from 'react-router-dom'
import { auth, firebase } from "../../firebase";
import {Button} from 'react-bootstrap';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readyToRedirect:false
    }
    this.googleLogin = this.googleLogin.bind(this);
    
  }
componentDidMount(){
  
}
googleLogin() {
// async googleLogin() {
    //1 - init Google Auth Provider
    const provider = new firebase.auth.GoogleAuthProvider();
    //2 - create the popup signIn
    auth.signInWithPopup(provider).then(
      async (result) => {
        
        //3 - pick the result and store the token
        const token = await auth?.currentUser?.getIdToken(true);
        //4 - check if have token in the current user
        if (token) {
          //5 - put the token at localStorage (We'll use this to make requests)
          localStorage.setItem("@token", token);
          localStorage.setItem("@name", result.user.displayName);
          localStorage.setItem("@user", result.user.email);
          //6 - navigate user to his high scores
          // history.push("/user-score");
          this.setState({readyToRedirect:true})
          
        }
      },
      function (error) {
        console.log(error);
      }
    );
  }
  render (){
    return (
      <div>
      <img src="logoblanco.png" className="logo" alt="Logo"/>
        {this.state.readyToRedirect?<Redirect to="/" />:""}
        <h1>Welcome!</h1>
        <Button variant="danger" onClick={this.googleLogin.bind(this)}>
        <img src="/loginGoogle.png" alt="Login with google"/>
        </Button>
        
    </div>
    );
  }
}
export default Login;