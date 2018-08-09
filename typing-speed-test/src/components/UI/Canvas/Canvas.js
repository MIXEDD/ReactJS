import React from 'react';
import {Bar} from 'react-chartjs';
import './Canvas.css';

// graph by Chart JS used for displaying score results
const canvas = (props) => (
        <div className="Canvas">
            <p id="chart-left-title">Words / MIN </p>
            <Bar data={props.chartData} options={props.chartOptions} width={props.graphWidth} height={props.graphHeight} />
        </div>
);

export default canvas;
