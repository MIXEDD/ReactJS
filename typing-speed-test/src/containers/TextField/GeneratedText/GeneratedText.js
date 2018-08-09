import React,{Component} from 'react';
import './GeneratedText.css';
import SingleWordComponent from './SingleWordComponent/SingleWordComponent';

class GeneratedText extends Component {

    render(){
        // all <span> word components are created here from the randomTextArray
        const randomTextArray = [];
        for (let i = 0; i < this.props.randomTextArray.length; i++) {
            randomTextArray.push(this.props.randomTextArray[i]);
        }

        return(
            <div className="GeneratedText">
                {
                    randomTextArray.map((word,index) => {
                        if(index === 0) return <SingleWordComponent key={index} wordIndex={index} class="currentWord">{word}</SingleWordComponent>;
                        else return <SingleWordComponent key={index} wordIndex={index} class="nextWord">{word}</SingleWordComponent>;
                    })
                }
            </div>
        );
    }
}

export default GeneratedText;