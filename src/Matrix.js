import React from "react";
import {Header, Button, Icon, Input} from "semantic-ui-react";
import {alphabetReverse} from "./util";

export default class Matrix extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    
    render(){
        return this.props.matrix.map((row, rowi, matrixarr) => (
            <p style={{fontSize: "20px"}} key={"row-" + rowi}>
                {
                    row.slice(0, matrixarr.length).map((col, coli, colarr) => (
                        <span key={"col-" + coli}>
                            <Input size="small" type="number" inverted style={{width: "80px"}} value={col} onChange={(e, props) => {
                                this.props.onCellChanged(rowi, coli, props.value);
                            }} />
                            {" " + alphabetReverse[colarr.length - 1 - coli]}
                            <Icon name="plus" style={{marginLeft: "10px", marginRight: "10px"}} />
                        </span>
                    ))
                }
                <span key={"col-constant"}>
                    <Input size="small" type="number" inverted style={{width: "80px"}} value={row[row.length - 2]} onChange={(e, props) => {
                        this.props.onCellChanged(rowi, row.length - 2, props.value);
                    }} />
                    &nbsp;=&nbsp;
                    <Input size="small" type="number" inverted style={{width: "80px"}} value={row[row.length - 1]} onChange={(e, props) => {
                        this.props.onCellChanged(rowi, row.length - 1, props.value);
                    }} />
                </span>

            </p>
        ))
    }
}