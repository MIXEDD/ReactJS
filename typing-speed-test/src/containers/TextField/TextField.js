import React,{Component} from 'react';
import GeneratedText from './GeneratedText/GeneratedText';
import TextInput from './TextInput/TextInput';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-obj';
import Spinner from '../../components/UI/Spinner/Spinner';
import './TextField.css';

class TextField extends Component{

    constructor(props){
        super(props);
        this.onKeyPressed = this.onKeyPressed.bind(this);
    }

    state = {
        positionChange:"",
        previousWordValue: "",
        toggleInput: false,
        dashboardUpdateByKey:""
    };

    componentWillMount () {
        this.props.SetUp();
    };

    componentWillReceiveProps(nextProps) {
        //when timer has finished input has to be rerender and block
        // dashboard Accuracy field is calculated here
        if(nextProps.timerFinished && !nextProps.userTypingScoreUploaded){
            this.rerenderInputField();
            this.calculateTypingAccuracy();
            this.uploadUserScore();
        }
    }

    //Handles all key presses from the Input field
    // Method filters the type of keys and redirects to appropriate actions
    onKeyPressed = (e) => {
        const charsAllowed = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM,./;'[]{}()";
        const enteredInput = e.key;
        if(!this.props.timerStarted && !this.props.timerFinished){
            this.props.startTimer();
        }
        if(enteredInput === " "){
            this.rerenderInputField("");
            this.processSpace();
        } else if(enteredInput === "Backspace") {
            this.processBackspace();
        } else if(charsAllowed.includes(enteredInput)){
            this.processEnteredLetter(enteredInput);
        } else return;
    };

    //Calculates users final typing accuracy in %
    calculateTypingAccuracy = () => {
        const typedWords = [...this.props.typedWords];
        const wordsCorrectClasses = [...this.props.wordsCorrectClasses];
        const totalWordsTyped = typedWords.length;
        let totalCorrectWords = 0;
        let accuracy;
        if(totalWordsTyped > 0){
            for(let i = 0; i < typedWords.length; i++){
                if(wordsCorrectClasses[i] === "correctWord")
                    totalCorrectWords++;
            }
            accuracy = Math.round((totalCorrectWords * 100) / totalWordsTyped);
        } else accuracy = 0;
        this.props.updateDashboardAccuracy(accuracy);
    };

    // Uploads user score to the DB
    uploadUserScore = () => {
        const scoresData = {
            wpm:this.props.WPM
        };
        axios.post('/scoreData.json/',scoresData)
            .catch(err => {
                console.log(err);
            });
        this.props.scoreUpdate();
    };

    // this function the entered letters from the Input field
    // each letter is handled separately in this function
     processEnteredLetter = (enteredChar) => {
        if(this.state.positionChange !== "") this.rerenderInputField("");
        const usedWordChar = this.props.unusedWordChars[0];
        const usedWordCharsArray = [...this.props.usedWordChars];
        let unusedWordCharsUpdated = [...this.props.unusedWordChars];
        unusedWordCharsUpdated = unusedWordCharsUpdated.splice(1,100);
        const noOfCharsOfCurWord = this.props.curWord.length;
        const wordChkClasses = [...this.props.wordChkClasses];
        const workCheckIndex = (noOfCharsOfCurWord - unusedWordCharsUpdated.length) - 1;
        if(!(usedWordChar === undefined)) {
            if(enteredChar === usedWordChar) wordChkClasses[workCheckIndex] = "correct";
            else wordChkClasses[workCheckIndex] = "incorrect";
        }
        usedWordCharsArray.push(enteredChar);
        //Update state from redux
        this.props.processEnteredLetter(unusedWordCharsUpdated,usedWordCharsArray,wordChkClasses);
    };

     //this function handles backspace clicks from the Input field
     processBackspace = () => {
         let usedWordsChars = [...this.props.usedWordChars];
         let unusedWordsChars = [...this.props.unusedWordChars];
         let wordChkClasses = [...this.props.wordChkClasses];
         //variables used for dashboard info
         let wpm = this.props.WPM;
         let cpm = this.props.CPM;

         if(!usedWordsChars.length && this.props.curWordIndex > 0) {
             // set up variables and move to previous word
             const prevWordIndex = this.props.curWordIndex - 1;
             let prevWord = this.props.randomTextArr[prevWordIndex];
             let prevUsedWordChars = this.props.typedWords[prevWordIndex];
             prevUsedWordChars = prevUsedWordChars.split('');
             const prevUnusedWordChars = prevWord.split('').splice(prevUsedWordChars.length,100);
             const wordChkClasses = [];
             for(let i = 0; i < prevWord.split('').length; i++){
                     const char = prevWord.split('')[i];
                     if(prevUsedWordChars[i] === char) wordChkClasses.push("correct");
                     else if(prevUsedWordChars[i] === undefined) wordChkClasses.push("unchecked");
                     else wordChkClasses.push("incorrect");
             }
             let typedWords = [...this.props.typedWords];
             typedWords = typedWords.splice(0,typedWords.length - 1);
             let wordsCorrectClasses = [...this.props.wordsCorrectClasses];
             wordsCorrectClasses = wordsCorrectClasses.splice(0,wordsCorrectClasses.length - 1);

             //dashboard calculation code
             const prevWordClass = this.props.wordsCorrectClasses[prevWordIndex];
             if(prevWordClass === "correctWord"){
                 wpm -= 1;
                 cpm -= this.props.randomTextArr[prevWordIndex].length;
             }
             this.props.moveToPreviousWord(prevWordIndex,prevWord,prevUnusedWordChars,prevUsedWordChars,wordChkClasses,typedWords,wordsCorrectClasses,wpm,cpm);
             const prevWordCharsJoined = prevUsedWordChars.join('') + prevUsedWordChars[prevUsedWordChars.length - 1];
             this.rerenderInputField(prevWordCharsJoined);
         } else if(usedWordsChars.length) {
             // set up variables and move to previous letter
             if(usedWordsChars.length > this.props.curWord.length) {
                 usedWordsChars = usedWordsChars.splice(0,usedWordsChars.length - 1);
                 this.props.moveToPreviousLetter(unusedWordsChars,usedWordsChars,wordChkClasses);
                 return;
             }
             if(usedWordsChars.length <= wordChkClasses.length)
                 wordChkClasses[usedWordsChars.length - 1] = "unchecked";
             if(this.props.unusedWordChars.length < this.props.curWord.length){
                 unusedWordsChars.splice(0,0,this.props.curWord[(this.props.curWord.length - 1 ) - unusedWordsChars.length]);
                 usedWordsChars = usedWordsChars.splice(0,usedWordsChars.length - 1);
                 this.props.moveToPreviousLetter(unusedWordsChars,usedWordsChars,wordChkClasses);
             }
         }
     };
    //Used to rerender Input Field for various reasons(for ex: clear the input field)
    rerenderInputField = (prevWordValue) => {
        this.setState({previousWordValue:prevWordValue});
        if(this.state.toggleInput === false) this.setState({toggleInput:true});
        else this.setState({toggleInput:false});
    };
    //this function handles space clicks from the Input field
     processSpace = () => {
        let userTypedWord = this.props.usedWordChars;
        userTypedWord = userTypedWord.join('');
        const typedWordsArray = [...this.props.typedWords];
        const wordsCorrectClasses = [...this.props.wordsCorrectClasses];
        typedWordsArray.push(userTypedWord);
        if(userTypedWord === this.props.curWord) wordsCorrectClasses.push("correctWord");
        else wordsCorrectClasses.push("incorrectWord");
        const nextWordIndex = this.props.curWordIndex + 1;
        let nextWord = this.props.randomTextArr[nextWordIndex];
        const nextUnusedWordChars = [];
        const nextUsedWordChars = [];
        const nextWordChkClasses = [];
        for(let i = 0; i < nextWord.split('').length; i++){
                const char = nextWord.split('')[i];
                nextUnusedWordChars.push(char);
                nextWordChkClasses.push("unchecked");
        }
        // dashboard calculation code
         const prevWordIndex = this.props.curWordIndex;
         let prevWord = this.props.randomTextArr[prevWordIndex];
         const prevCorrectionClass = wordsCorrectClasses[prevWordIndex];
         let wpm = this.props.WPM;
         let cpm = this.props.CPM;
         if(prevCorrectionClass === "correctWord"){
             wpm++;
             cpm += prevWord.length;
         }
        this.props.moveToNextWord(nextWordIndex,nextWord,nextUnusedWordChars,nextUsedWordChars,nextWordChkClasses,typedWordsArray,wordsCorrectClasses,wpm,cpm);
    };

     // displays GeneratedText and Input field
    render(){
            if(this.props.randomTextArr.length > 0){
                return(
                    <div className="TextField">
                        <GeneratedText randomTextArray={this.props.randomTextArr}></GeneratedText>
                        <TextInput
                            positionChanged={this.state.positionChange}
                            onKeyDown={this.onKeyPressed}
                            previousWord={this.state.previousWordValue}
                            toggleInput={this.state.toggleInput}
                            disableInput={this.props.timerFinished}
                        />
                    </div>
                );
            } else return <Spinner/>;
    }
}

//REDUX STATE PROPS
const mapStateToProps = state => {
    return {
        randomTextArr: state.randomTextArray,
        curWordIndex: state.wordIndex,
        curWord:state.currentWord,
        unusedWordChars: state.unusedWordCharacters,
        usedWordChars: state.usedWordCharacters,
        wordChkClasses: state.wordCheckClasses,
        typedWords: state.wordsTyped,
        wordsCorrectClasses: state.wordsCorrectionClasses,
        WPM: state.WPM,
        CPM: state.CPM,
        Accuracy: state.Accuracy,
        timerStarted:state.timerStarted,
        timerFinished:state.timerFinished,
        userTypingScoreUploaded:state.userScoreUploaded
    };
};

//REDUX STATE ALTERING METHODS
const mapDispatchToProps = dispatch => {
    return {
        SetUp: () => dispatch(actions.SetUp()),
        processEnteredLetter:
            (unusedWordChars,usedWordChars,wordCheckClasses) =>
                dispatch(actions.processEnteredLetter(unusedWordChars,usedWordChars,wordCheckClasses)),
        moveToNextWord:
            (nextWordIndex,nextWord,nextUnusedWordChars,nextUsedWordChars,nextWordChkClasses,typedWords,wordsCorrectClasses,wpm,cpm) =>
                dispatch(actions.moveToNextWord(nextWordIndex,nextWord,nextUnusedWordChars,nextUsedWordChars,nextWordChkClasses,typedWords,wordsCorrectClasses,wpm,cpm)),
        moveToPreviousLetter:
            (unusedWordChars,usedWordChars,wordChkClasses) =>
                dispatch(actions.moveToPreviousLetter(unusedWordChars,usedWordChars,wordChkClasses)),
        moveToPreviousWord:
            (prevWordIndex,prevWord,prevUnusedWordChars,prevUsedWordChars,wordChkClasses,typedWords,wordsCorrectClasses,wpm,cpm) =>
                dispatch(actions.moveToPreviousWord(prevWordIndex,prevWord,prevUnusedWordChars,prevUsedWordChars,wordChkClasses,typedWords,wordsCorrectClasses,wpm,cpm)),
        startTimer:
            () =>
                dispatch(actions.startTimer()),
        updateDashboardAccuracy:
            (accuracy) =>
                dispatch(actions.updateDashboardAccuracy(accuracy)),
        scoreUpdate:
            () =>
                dispatch(actions.scoreUpdate())
    };
};



export default connect(mapStateToProps,mapDispatchToProps) (TextField);