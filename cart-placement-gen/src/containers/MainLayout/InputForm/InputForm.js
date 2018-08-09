import React, {Component} from 'react';
import ResultsTable from './ResultsTable/ResultsTable';
import Pdf from './pdf/Pdf';
import './InputForm.css';


class InputForm extends Component {

    state = {
          noOfGuests: "",
          noOfGuestsMixed: [],
          rerenderInput:false,
          showTable:false
    };

    setGuestsArray = () => {
        console.log(this.state.noOfGuests);
        if(this.state.noOfGuests === "") {
            alert("Prašome įvesti skaičių.");
            return;
        }
        const noOfGuestsArray = this.createGuestsArray();
        const mixedGuestsArray = this.mixArray(noOfGuestsArray);
        this.setState({noOfGuestsMixed:mixedGuestsArray,showTable:true});
    };

    createGuestsArray = () => {
        const noOfGuests = this.state.noOfGuests;
        const noOfGuestsArray = [];
        for(let i = 1; i <= noOfGuests; i++){
            noOfGuestsArray.push(i);
        }
        return noOfGuestsArray;
    };


    mixArray = (noOfGuestsArray) => {
        let firstRandNumb,secondRandNumb,firstCartNo,secondCartNo;
        const noOfGuestsSize = noOfGuestsArray.length - 1;
        const noOfGuestsArr = [...noOfGuestsArray];
        for(let i = 0; i < noOfGuestsArr.length; i++){
            firstRandNumb = Math.round(Math.random() * noOfGuestsSize);
            secondRandNumb = Math.round(Math.random() * noOfGuestsSize);
            firstCartNo = noOfGuestsArr[firstRandNumb];
            secondCartNo = noOfGuestsArr[secondRandNumb];
            noOfGuestsArr[firstRandNumb] = secondCartNo;
            noOfGuestsArr[secondRandNumb] = firstCartNo;
        }
        return noOfGuestsArr;
    };

    setNumberOfGuests = (noOfGuests) => {
        if(noOfGuests === ' ' || noOfGuests === '-') return;
        if(noOfGuests === "") {
            this.setState({noOfGuests:""});
            return;
        }
        if(noOfGuests <= 0) {
            alert("Skaičius negali būti neigiamas arba nulis.");
            this.rerenderInput();
            return;
        }
        this.setState({noOfGuests:noOfGuests});
    };

    rerenderInput = () => {
        if(this.state.rerenderInput) this.setState({rerenderInput:false});
        else this.setState({rerenderInput:true});
    };

    render(){
        return(
            <div className="main">
            <form className="InputForm">
                <input key={this.state.rerenderInput ? "rerender" : "rerender-update"} onChange={(event) => this.setNumberOfGuests(event.target.value)} id="people-input-field" type="number" placeholder="Įveskite komandos / dalyvių sk. "/>
                <a id="generator" onClick={this.setGuestsArray}>Generuoti</a>
            </form>
                <ResultsTable styleClass="screen" mixedGuestsArray={this.state.noOfGuestsMixed} showTable={this.state.showTable}/>
                <Pdf table={<ResultsTable styleClass="pdf" mixedGuestsArray={this.state.noOfGuestsMixed} showTable={this.state.showTable}/>}  pdfAvailable={this.state.showTable}/>
            </div>
        );
    }
}

export default InputForm;