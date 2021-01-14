import React from "react";
import  { Redirect } from 'react-router-dom'

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readyToRedirect:false
        }
    }
    componentDidMount(){
        localStorage.setItem("@token", "");
        localStorage.setItem("@name", "");
        localStorage.setItem("@user", "");
        this.setState({readyToRedirect:true})
    }
    render(){
            return (
                <div>
                {this.state.readyToRedirect?<Redirect to="/" />:""}
                </div>
            );
          }
}
export default Logout;