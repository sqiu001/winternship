import React from "react";
import axios from 'axios';
import * as V from 'victory';
import { Button, Grid, Row, Col } from "react-bootstrap";


export default class CatChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Cats that ' + this.props.name + ' has pet:',
            data: [],
        };
    }

    async componentDidMount() {
        const data = await this.getData();
        this.setState({data: data});
    }

    async getData() {
        const res = await axios.get('http://127.0.0.1:5000/api/data');
        console.log('Response', res)
        return res.data;
    }

    render() {
        return (
            <div>
                <V.VictoryChart
                    domainPadding={20}
                >
                    <V.VictoryLabel text={this.state.title} x={225} y={30} textAnchor="middle"/>
                    <V.VictoryAxis
                        label='days'
                    />
                    <V.VictoryAxis
                        dependentAxis
                        label='cats'
                    />
                    <V.VictoryBar
                        labelComponent={<V.VictoryTooltip/>}
                        data={this.state.data}
                        style={{ data: { fill: "purple" } }}
                        x="days"
                        y="cats" />

                </V.VictoryChart>
            </div>
        );
    }
}