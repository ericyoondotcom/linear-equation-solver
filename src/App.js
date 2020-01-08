import React from 'react';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import {Header, Button, Icon, Input} from "semantic-ui-react";
import {fillArray, alphabetReverse} from "./util";
import Matrix from "./Matrix";

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {vars: 2, matrix: [[0, 0, 0, 0], [0, 0, 0, 0]]};
    }

    handleDegreeChange = (positive) => {
        const old = this.state.vars;
        let newval = positive ? (old + 1) : (old - 1);
        if(newval < 2) return;
        this.setState({vars: newval});
        if(old == newval) return;
        const oldmatrix = this.state.matrix;
        let newmatrix;
        if(newval < old){
            newmatrix = this.state.matrix.slice(0, newval).map((i) => i.slice(0, newval + 2));
        }else if(newval > old){
            newmatrix = this.state.matrix.map((i) => fillArray(0, newval - old, i));
            newmatrix = fillArray(fillArray(0, newval + 2), newval - old, newmatrix);
        }
        this.setState({matrix: newmatrix})
    }

    render(){
        const matrix = this.state.matrix;
        return (
            <div style={{paddingTop: "50px", color: "#FFFFFF"}}>
                <Header as="h1" inverted style={{textAlign: "center", textShadow: "0 0 15px #b89aed"}}><Icon name="rocket" inverted /> Linear Systems Solver</Header>
                <div className="section">
                    <Header as="h2" inverted ><Icon name="expand" inverted /> Number of Variables</Header>
                    <Button circular size="large" icon="minus" negative disabled={this.state.vars <= 2} style={{display: "inline", marginRight: "10px"}} onClick={() => {
                        this.handleDegreeChange(false);
                    }} />
                    <Header inverted size="huge" style={{fontSize: "32px", display: "inline"}}>{this.state.vars}</Header>
                    <Button circular size="large" icon="plus" positive style={{display: "inline", marginLeft: "10px"}}  onClick={() => {
                        this.handleDegreeChange(true);
                    }} />
                </div>
                <div className="section">
                    <Header as="h2" inverted ><Icon name="grid layout" inverted /> Equations</Header>
                    <Matrix matrix={this.state.matrix} onCellChanged={(row, col, newVal) => {
                        matrix[row][col] = newVal;
                        this.setState({matrix: matrix});
                    }} />
                </div>
            </div>
        );
    }
}

export default App;
