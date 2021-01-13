import React from "react";
import ReactDOM from 'react-dom';

class Mole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'inactive',
            whacked: false,
            showForSeconds:0
        }
        this.whack = this.whack.bind(this);
    }
    componentDidMount(){
        switch(this.props.speed){
            case 1: 
                this.setState({showForSeconds:2000});
                break;
            case 2:
                this.setState({showForSeconds:1000});
                break;
            case 3:
                this.setState({showForSeconds:700});
                break;
        }
        this.moleShowRandomFunction();
    }
    moleShowRandomFunction(){
        var showIn = Math.floor(Math.random() * 4000)+3000;
        console.log(showIn);
        var t = this;
        setTimeout(function(){ 
            t.setState({status:'active'});
            setTimeout(function(){
                t.setState({status:'inactive'});
                t.moleShowRandomFunction();
            },t.state.showForSeconds)
         }, showIn);
    }
    whack(){
        if(this.state.status == 'active'){
            this.props.whack();
            this.setState({wacked:true,status:'inactive'})
        }
    }
    render(){
        return(
            <div key="mole" className={`mole mole_${this.state.status} speed_${this.props.speed}`} onClick={this.whack.bind(this)}>
                <img src="/mole.png" draggable="false"/>
            </div>
        );
    }
}
export default Mole;
