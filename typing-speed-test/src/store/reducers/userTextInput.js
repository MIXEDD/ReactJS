import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

// all state that is used throughout the project
const initialState = {
    randomTextArray: "",
    wordIndex: 0,
    currentWord:"",
    unusedWordCharacters:"",
    usedWordCharacters: [],
    wordCheckClasses: "",
    wordsTyped: [],
    wordsCorrectionClasses: [],
    WPM: 0,
    CPM: 0,
    Accuracy: 0,
    timerStarted:false,
    timerFinished:false,
    userScoreUploaded:false
};
// sets up all the state for a new test
export const setUpNewTest = (state,action) => {
    const newObject = {
        randomTextArray: action.randomTextArray,
        wordIndex: action.wordIndex,
        currentWord: action.currentWord,
        unusedWordCharacters: action.unusedWordCharacters,
        usedWordCharacters: action.usedWordCharacters,
        wordCheckClasses: action.wordCheckClasses,
        wordsTyped: action.wordsTyped,
        wordsCorrectionClasses: action.wordsCorrectionClasses,
        WPM: action.WPM,
        CPM: action.CPM,
        Accuracy: action.Accuracy,
        timerStarted:action.timerStarted,
        timerFinished:action.timerFinished,
        userScoreUploaded:action.userScoreUploaded
    };
    return updateObject(state,newObject);
};
// processes entered letter
export const processEnteredLetter = (state,action) => {
      const newObject = {
          unusedWordCharacters:action.unusedWordCharacters,
          usedWordCharacters: action.usedWordCharacters,
          wordCheckClasses: action.wordCheckClasses
      };
      return updateObject(state,newObject);
};
//moves to next word
export const moveToNextWord = (state,action) => {
    const newObject = {
        wordIndex: action.nextWordIndex,
        currentWord:action.nextWord,
        unusedWordCharacters:action.nextUnusedWordChars,
        usedWordCharacters: action.nextUsedWordChars,
        wordCheckClasses: action.nextWordChkClasses,
        wordsTyped: action.typedWords,
        wordsCorrectionClasses: action.wordsCorrectionClasses,
        WPM: action.WPM,
        CPM: action.CPM
    };
    return updateObject(state,newObject);
};
// moves to previous letter
export const moveToPreviousLetter = (state,action) => {
    const newObject = {
        unusedWordCharacters: action.unusedWordCharacters,
        usedWordCharacters: action.usedWordCharacters,
        wordCheckClasses: action.wordCheckClasses
    };
    return updateObject(state,newObject);
};
// moves to previous word
export const moveToPreviousWord = (state,action) => {
    const newObject = {
        wordIndex: action.prevWordIndex,
        currentWord: action.prevWord,
        unusedWordCharacters: action.prevUnusedWordChars,
        usedWordCharacters: action.prevUsedWordChars,
        wordCheckClasses: action.wordChkClasses,
        wordsTyped: action.typedWords,
        wordsCorrectionClasses: action.wordsCorrectClasses,
        WPM: action.WPM,
        CPM: action.CPM
    };
    return updateObject(state,newObject);
};
//starts timer
export const startTimer = (state,action) => {
    const newObject = {
        timerStarted: action.timerStarted
    };
    return updateObject(state,newObject);
};
// stops timer
export const stopTimer = (state,action) => {
    const newObject = {
        timerStarted: action.timerStarted,
        timerFinished: action.timerFinished
    };
    return updateObject(state,newObject);
};
// Updates Dashboard accuracy field
export const updateDashboardAccuracy = (state,action) => {
    const newObject = {
        Accuracy: action.Accuracy,
    };
    return updateObject(state,newObject);
};

// sets state scoreUpdated state to true
export const scoreUpdate = (state,action) => {
    const newObject = {
        userScoreUploaded: action.userScoreUploaded
    };
    return updateObject(state,newObject);
};
// sets randomText to null
export const setRandomTextToNull = (state,action) => {
    const newObject = {
        randomTextArray: action.randomTextArray
    };
    return updateObject(state,newObject);
};

//REDUX REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_UP_NEW_TEST: return setUpNewTest(state,action);
        case actionTypes.PROCESS_ENTERED_LETTER: return processEnteredLetter(state,action);
        case actionTypes.MOVE_TO_NEXT_WORD: return  moveToNextWord(state,action);
        case actionTypes.MOVE_TO_PREVIOUS_LETTER: return  moveToPreviousLetter(state,action);
        case actionTypes.MOVE_TO_PREVIOUS_WORD: return  moveToPreviousWord(state,action);
        case actionTypes.START_TIMER: return  startTimer(state,action);
        case actionTypes.STOP_TIMER: return  stopTimer(state,action);
        case actionTypes.UPDATE_DASHBOARD_ACCURACY: return  updateDashboardAccuracy(state,action);
        case actionTypes.SCORE_UPDATE: return  scoreUpdate(state,action);
        case actionTypes.SET_RANDOM_TEXT_TO_NULL: return  setRandomTextToNull(state,action);
        default: return state;
    }
};

export default reducer;


