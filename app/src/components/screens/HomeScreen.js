import React from "react";
import ReactDOM from 'react-dom';
import { Button,Row,Col,Container,Alert } from 'react-bootstrap';
import {MultiSwitch} from 'react-multi-switch'; 

class HomeScreen extends React.Component {
  constructor(props) {
      super(props);
  }
  componentDidMount(){
    
  }
  render(){
      return (
        <div>
            <img src="https://via.placeholder.com/500x150"></img>
            <div className="speedSelector">
            <MultiSwitch itemWidth={100} onChange={(idx,key)=>{}} selIndex={0} states={[{label:"Easy",key:1},{label:"Medium",key:2},{label:"Hard",key:3}]} /> 

                <Container>
                    <Row>
                        <Col><Button variant="success" onClick={()=>this.props.changeSpeed(1)}>Easy</Button></Col>
                        <Col><Button variant="warning" onClick={()=>this.props.changeSpeed(2)}>Medium</Button></Col>
                        <Col><Button variant="danger" onClick={()=>this.props.changeSpeed(3)}>Hard</Button></Col>
                    </Row>
                </Container>
            </div>
            <Container>
                    <Row>
                        <Col><Button variant="primary" onClick={()=>this.props.displayStats(2)}>My Scores</Button></Col>
                    </Row>
                    <Row>
                        <Col><Button variant="primary" onClick={()=>this.props.displayStats(1)}>High scores</Button></Col>
                    </Row>
                    <Row>
                        <Col><Button variant="primary" onClick={()=>this.props.startGame()}>Play</Button></Col>
                    </Row>
            </Container>   
        </div>
      )
  }
}
export default HomeScreen;