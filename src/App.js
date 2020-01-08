import React from 'react';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import {Header, Button, Icon, Input, Divider} from "semantic-ui-react";
import {fillArray, deepClone, alphabetReverse} from "./util";
import Matrix from "./Matrix";

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {vars: 3, matrix: [[-3, -2, -3, -1], [1, 2, -2, 0], [1, 1, 3, -8]], answer: null, steps: null};
        //Solution: (8, -7, -3)
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
            newmatrix = this.state.matrix.slice(0, newval).map((i) => i.slice(0, newval + 1));
        }else if(newval > old){
            newmatrix = this.state.matrix.map((i) => fillArray(0, newval - old, i));
            newmatrix = fillArray(fillArray(0, newval + 1), newval - old, newmatrix);
        }
        this.setState({matrix: newmatrix})
    }

    solve = async () => {
        let steps = [];
        let matrix = await deepClone(this.state.matrix);
        steps.push(await deepClone(matrix));
        const vars = this.state.vars;
        // For each column:
            // For each row: Make that cell 0 by sutracting equation # X where X is the column we're on
        // Divide so that all numbers are either 1 or 0

        for(let coli = 0; coli < vars; coli++){
            const refrow = matrix[coli];
            const refcell = refrow[coli];
            for(let rowi = 0; rowi < vars; rowi++){
                if(coli == rowi) continue;
                const cell = matrix[rowi][coli];
                const product = -(cell / refcell);
                for(let colseti = 0; colseti < vars + 1; colseti++){
                    matrix[rowi][colseti] = matrix[rowi][colseti] + (refrow[colseti] * product);
                }
                steps.push(await deepClone(matrix));
            }
        }

        for(let i = 0; i < vars; i++){
            matrix[i][vars] = matrix[i][vars] / matrix[i][i];
            matrix[i][i] = 1;
            steps.push(await deepClone(matrix));
        }
        const answer = matrix.map((row) => row[vars]);
        this.setState({steps: steps, answer: answer})
    }

    render(){
        const matrix = this.state.matrix;
        return (
            <div style={{paddingTop: "50px", color: "#FFFFFF"}}>
                <Header as="h1" inverted style={{textAlign: "center", textShadow: "0 0 15px #b89aed"}}><Icon name="rocket" inverted /> Linear Systems Solver</Header>
                <div style={{textAlign: "center"}}>
                    <a href="https://github.com/yummypasta/linear-equation-solver" target="_blank"><Button secondary inverted circular labelPosition="left" icon="code" content="View source on GitHub" /></a>
                    <a href="/" target="_blank"><Button secondary inverted circular labelPosition="left" icon="home" content="More useless programs" style={{marginLeft: "15px"}} /></a>
                </div>
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
                        matrix[row][col] = parseInt(newVal);
                        this.setState({matrix: matrix});
                        console.log(matrix);
                    }} />
                </div>
                <div className="section">
                    <Header as="h2" inverted ><Icon name="check" inverted /> Solve</Header>
                    <Button positive size="large" content="Solve!" labelPosition="left" icon="check" onClick={this.solve} />
                </div>
                {
                    this.state.answer == null ? null : (
                        <div className="section">
                            <Header as="h2" inverted ><Icon name="gem" inverted /> Answer</Header>
                            <div style={{fontSize: "20px"}}>
                            {
                                this.state.answer.map((ans, idx) =>
                                    <p>{alphabetReverse[this.state.vars - 1 - idx]} = {ans}</p>
                                )
                            }
                            </div>
                        </div>
                    )
                }
                {
                    this.state.steps == null ? null : (
                        <div className="section">
                            <Header as="h2" inverted ><Icon name="list" inverted /> Steps</Header>
                            {
                                this.state.steps.map((step, idx) =>
                                    <div>
                                        <Matrix matrix={step} />
                                        <Divider />
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}

export default App;
