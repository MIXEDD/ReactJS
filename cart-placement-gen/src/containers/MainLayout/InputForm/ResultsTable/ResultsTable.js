import React, {Component} from 'react';
import './ResultsTable.css';

class ResultsTable extends Component{
    render(){
        if(this.props.showTable){
            const mixedGuestsArray = this.props.mixedGuestsArray;
            const classStyle = `ResultsTable-${this.props.styleClass}`;
            return(
                <table className={classStyle} cellSpacing="0">
                    <thead>
                    <tr>
                        <th>Komanda / Dalyvis</th>
                        <th>Pozicija</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        mixedGuestsArray.map((number,index) => {
                            return(
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{number}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            );
        } else return null;
    }
}

export default ResultsTable;