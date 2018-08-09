import React, {Component} from 'react';
import axios from '../../../axios-obj';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import Canvas from '../../../components/UI/Canvas/Canvas';
import './Diagram.css';
import * as actions from "../../../store/actions";

class Diagram extends Component{

    state = {
        scoresRetrieved:false,
        scoresArray : [],
        peopleCount: [],
    };

    //Retrieve scores from DB and clear RandomText state
    componentWillMount () {
        this.props.setRandomTextToNull();
        this.retrieveScores();
    };

    //Method to retrieve scores
    retrieveScores = () => {
        const scoresData = [];
        axios.get('/scoreData.json/')
            .then(resp =>{
                for(let key in resp.data){
                    let counter = 0;
                    for(let innerKey in resp.data) {
                        let breakLoop = false;
                        for(let index in scoresData){
                            if(scoresData[index].score === resp.data[key].wpm){
                                breakLoop = true;
                                break;
                            }
                        }
                        if(resp.data[key].wpm === resp.data[innerKey].wpm && !breakLoop)
                            counter++;
                    }
                    if(counter > 0){
                        const score = {
                            score: resp.data[key].wpm,
                            peopleCount: counter
                        };
                        scoresData.push(score);
                    }
                }
                scoresData.sort((a,b) => parseInt(a.score,10) - parseInt(b.score,10));
                this.setScoresToState(scoresData);
            })
            .catch(err => {
                console.log(err);
            });
    };

    //Sets scores data to state
    setScoresToState = (scoresData) => {
        const scoresArray = [];
        const peoplesCount = [];
        for(let key in scoresData){
            scoresArray.push(scoresData[key].score);
            peoplesCount.push(scoresData[key].peopleCount);
        }
        this.setState({scoresRetrieved:true,scoresArray:scoresArray,peopleCount:peoplesCount});
    };

    render(){
        //chartData is set in this variable
        const chartData = {
            labels: this.state.peopleCount,
            datasets: [
                {
                    label: "My Second dataset",
                    fillColor: "rgba(240, 143, 144, 1)",
                    strokeColor: "rgba(201, 55, 86, 1)",
                    highlightFill: "rgba(201, 31, 55, 1)",
                    highlightStroke: "rgba(201, 31, 55, 1))",
                    data: this.state.scoresArray
                }
            ]
        };
        //chart options are set here
        const chartOptions = {
            //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero : true,

            //Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,

            //Boolean - If there is a stroke on each bar
            barShowStroke : true,

            //Number - Pixel width of the bar stroke
            barStrokeWidth : 2,

            //Number - Spacing between each of the X value sets
            barValueSpacing : 5,
            responsive:true
        };
            if(this.state.scoresRetrieved){
                        return(
                            <div className="Diagram">
                                <h1 id="score">Scores</h1>
                                <Canvas chartData={chartData} chartOptions={chartOptions} graphWidth="400" graphHeight="150" />
                                <p id="chart-bottom-title">Amount of people per WPM</p>
                            </div>
                        );
            } else {
                return <Spinner/>;
            }
    }
}

const mapStateToProps = state => {
    return {
        randomTextArr: state.randomTextArray
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setRandomTextToNull: () => dispatch(actions.setRandomTextToNull())
    };
};


export default connect(mapStateToProps,mapDispatchToProps) (Diagram);

