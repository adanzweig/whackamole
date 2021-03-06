import React from "react";
import { Button,Row,Col,Container } from 'react-bootstrap';
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
        <img src="logoblanco.png" className="logo" alt="logo"/>
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
                        <Col><Button variant="success" onClick={()=>this.props.startGame()} className="btn-lg">Play</Button></Col>
                    </Row>
                    <Row>
                      <Col>
                        <br/>
                        <Button variant="danger" href="/logout" className="btn-lg">Logout</Button>
                      </Col>
                    </Row>
            </Container>   
        </div>
      )
  }
}
export default HomeScreen;