import React,{Component} from 'react';
import './SingleWordComponent.css';
import {connect} from 'react-redux';
import Auxillary from '../../../../hoc/Auxillary/Auxillary';
import * as actions from "../../../../store/actions";

class SingleWordComponent extends Component {

    //Every single word is rendered here into a separate <span> element
    render(){
        //current word receives certain treatment and classes different to tohers
        if(this.props.curWordIndex === this.props.wordIndex){
            const curWordCharsArray = this.props.curWord.split('');
            return(
                <Auxillary>
                    <span className="currentWord">
                        {
                            curWordCharsArray.map((word,index) => {
                                return (
                                    <span key={index} className={this.props.wordChkClasses[index]}>{word}</span>
                                );
                            })
                        }
                    </span>
                    &nbsp;
                </Auxillary>
            );
        }else {
                // words which were typed already receive appropriate classes so that styling would be applied to them
                if(this.props.wordIndex < this.props.curWordIndex)
                {
                        return(
                            <Auxillary>
                                <span className={this.props.wordsCorrectClasses[this.props.wordIndex]}>{this.props.randomTextArr[this.props.wordIndex]} </span>
                            </Auxillary>
                        );
                } else {
                    //words that have not been typed yet will have the regular classes
                    return(
                        <Auxillary>
                            <span className={this.props.class}>{this.props.children} </span>
                        </Auxillary>
                    );
                }

        }
    };
}

const mapStateToProps = state => {
    return {
        randomTextArr: state.randomTextArray,
        curWordIndex: state.wordIndex,
        curWord:state.currentWord,
        unusedWordChars: state.unusedWordCharacters,
        usedWordChars: state.usedWordCharacters,
        wordChkClasses: state.wordCheckClasses,
        typedWords: state.wordsTyped,
        wordsCorrectClasses: state.wordsCorrectionClasses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        SetUp: () => dispatch(actions.SetUp())
    };
};


export default connect(mapStateToProps,mapDispatchToProps) (SingleWordComponent) ;
