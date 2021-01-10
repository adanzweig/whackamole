import React from "react";
import ReactDOM from 'react-dom';
import { Button,Row,Col,Container,Alert } from 'react-bootstrap';
import Toggle,{Knob} from 'react-toggle-knob'; 

class HomeScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        toggleState: false
      };
  }
  componentDidMount(){
    
  }
  render(){
      return (
        <div>
            <img src="https://via.placeholder.com/500x150"></img>
            <div className="speedSelector">
            <Toggle onChange={value => this.props.changeSpeed(value)} className="velocitySelector">
                <Knob value="1" className="easyKnob">Easy</Knob>
                <Knob value="2" className="mediumKnob">Medium</Knob>
                <Knob value="3" className="hardKnob">Hard</Knob>
            </Toggle>
            </div>
            <Container>
                    <Row>
                        <Col><Button variant="primary" onClick={()=>this.props.displayStats(2)}>My Scores</Button></Col>
                    
                        <Col><Button variant="primary" onClick={()=>this.props.displayStats(1)}>High scores</Button></Col>
                    </Row>
                    <Row>
                        <Col><Button variant="success" onClick={()=>this.props.startGame()}>Play</Button></Col>
                    </Row>
            </Container>   
        </div>
      )
  }
}
export default HomeScreen;