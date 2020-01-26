import { RECOGNITION_ATTEMPT, RECOGNITION_SUCCESS, RECOGNITION_FAILURE, LEARN_ATTEMPT, LEARN_SUCCESS, LEARN_FAILURE } from '../types.js'


const initialState = {
    recognizeStatus: 'none',
    recognizeResult: {},
    learnStatus: 'none'
}

const StimulusReducer = (state = initialState, action) =>{
    let newState = {...state}
    switch(action.type){
        case RECOGNITION_ATTEMPT:
            newState.recognizeStatus = 'loading'
            newState.recognizeResult = initialState.recognizeResult
            return newState;            
        case RECOGNITION_FAILURE:
            newState.recognizeStatus = 'failure'
            newState.recognizeResult = initialState.recognizeResult
            return newState;
        case RECOGNITION_SUCCESS:
            newState.recognizeStatus = 'success'
            newState.recognizeResult = action.payload
            return newState
        case LEARN_ATTEMPT:
            newState.learnStatus = 'loading'
            return newState
        case LEARN_SUCCESS:
            newState.learnStatus = 'success'
            return newState
        case LEARN_FAILURE:
            newState.learnStatus = 'failure'
            return newState
        default:
            return newState
    }
}

export default StimulusReducer