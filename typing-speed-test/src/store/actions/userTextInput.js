import * as actionTypes from './actionTypes';
import axios from '../../axios-obj';

// Action to process entered letter and change according state
export const processEnteredLetter = (unusedWordChars,usedWordChars,wordCheckClasses) => {
    return {
        type:actionTypes.PROCESS_ENTERED_LETTER,
        unusedWordCharacters:unusedWordChars,
        usedWordCharacters: usedWordChars,
        wordCheckClasses: wordCheckClasses
    };
};
// Action to move to next word and change according state
export const moveToNextWord = (nextWordIndex,nextWord,nextUnusedWordChars,nextUsedWordChars,nextWordChkClasses,typedWords,wordsCorrectClasses,wpm,cpm,accuracy) => {
    return {
        type:actionTypes.MOVE_TO_NEXT_WORD,
        nextWordIndex: nextWordIndex,
        nextWord:nextWord,
        nextUnusedWordChars: nextUnusedWordChars,
        nextUsedWordChars: nextUsedWordChars,
        nextWordChkClasses: nextWordChkClasses,
        typedWords: typedWords,
        wordsCorrectionClasses: wordsCorrectClasses,
        WPM: wpm,
        CPM: cpm
    };
};
// Action to move to previous letter and change according state
export const moveToPreviousLetter = (unusedWordChars,usedWordChars,wordChkClasses) => {
    return {
        type:actionTypes.MOVE_TO_PREVIOUS_LETTER,
        unusedWordCharacters:unusedWordChars,
        usedWordCharacters: usedWordChars,
        wordCheckClasses: wordChkClasses
    };
};
// Action to move to previous word and change according state
export const moveToPreviousWord = (prevWordIndex,prevWord,prevUnusedWordChars,prevUsedWordChars,wordChkClasses,typedWords,wordsCorrectClasses,wpm,cpm,accuracy) => {
    return {
        type:actionTypes.MOVE_TO_PREVIOUS_WORD,
        prevWordIndex: prevWordIndex,
        prevWord: prevWord,
        prevUnusedWordChars:prevUnusedWordChars,
        prevUsedWordChars: prevUsedWordChars,
        wordChkClasses: wordChkClasses,
        typedWords: typedWords,
        wordsCorrectClasses: wordsCorrectClasses,
        WPM: wpm,
        CPM: cpm
    };
};
// Action to start timer and change according state
export const startTimer = () => {
    return {
        type:actionTypes.START_TIMER,
        timerStarted:true
    };
};
// Action to stop timer letter and change according state
export const stopTimer = () => {
    return {
        type:actionTypes.STOP_TIMER,
        timerStarted:false,
        timerFinished:true
    };
};
// Action to update dashboard  Accuracy field
export const updateDashboardAccuracy = (accuracy) => {
    return {
        type:actionTypes.UPDATE_DASHBOARD_ACCURACY,
        Accuracy: accuracy
    };
};
// Action to set up new test and change according state
export const setUpNewTest = (randomTextArray,unusedWordChars,wordCheckClasses) => {
    return {
        type:actionTypes.SET_UP_NEW_TEST,
        randomTextArray: randomTextArray,
        wordIndex: 0,
        currentWord:randomTextArray[0],
        unusedWordCharacters:unusedWordChars,
        usedWordCharacters: [],
        wordCheckClasses: wordCheckClasses,
        wordsTyped: [],
        wordsCorrectionClasses: [],
        WPM: 0,
        CPM: 0,
        Accuracy: 0,
        timerStarted:false,
        timerFinished:false,
        userScoreUploaded:false,
        runOutOfWords: false
    };
};
// Action to set score update state to TRUE so that it would be clear that typing results where sent to the DB
export const scoreUpdate = () => {
    return {
        type:actionTypes.SCORE_UPDATE,
        userScoreUploaded:true
    };
};
// Sets randomTextArray to null
export const setRandomTextToNull = () => {
    return {
        type:actionTypes.SET_RANDOM_TEXT_TO_NULL,
        randomTextArray: ""
    };
};

export const setRunOutOfWordsToTrue = () => {
    return {
        type:actionTypes.SET_RUN_OUT_OF_WORDS,
        runOutOfWords: true
    };
};


// Async setup method to retrieve and mix new random text and set up everything for NEW TEST
export const SetUp = () => {
    return dispatch => {
        axios.get('RandomText.json')
            .then(res => {
                const randomText = res.data.Text;
                let textArray = randomText.split(' ');
                let tempIndexFirst,tempIndexSecond,firstValue,secondValue;
                for(let i = 0; i < textArray.length; i++){
                        tempIndexFirst = Math.round(Math.random() * (textArray.length - 1));
                        tempIndexSecond = Math.round(Math.random() * (textArray.length - 1));
                        firstValue = textArray[tempIndexFirst];
                        secondValue = textArray[tempIndexSecond];
                        textArray[tempIndexFirst] = secondValue;
                        textArray[tempIndexSecond] = firstValue;
                }
                const unusedFirstWordChars = textArray[0].split('');
                let wordCheckClasses = [];
                for(let i = 0; i < unusedFirstWordChars.length; i++)
                    wordCheckClasses.push("unchecked");
                dispatch(setUpNewTest(textArray,unusedFirstWordChars,wordCheckClasses));
            })
            .catch( err => {
                console.log(err);
            })
    }
};
