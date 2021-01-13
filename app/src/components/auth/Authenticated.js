import React,{Component} from 'react';
import {withRouter,Route} from 'react-router-dom';
class Authenticated extends Component{
    constructor(props){
        super(props);
        this.state = {
            logged: false
        };
    }
    componentDidMount(){
        console.log("TEST AUTH");
        const token = localStorage.getItem("@token");
        console.log(token);
        if(token == undefined || token == null || token == ""){
            this.props.history.push('/login');
        }
    }
    render(){
     
        return (
            <div>
                {this.props.children}
            </div>
        )    
    
    }
}
export default withRouter(Authenticated);