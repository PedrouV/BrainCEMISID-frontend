import { RECOGNITION_ATTEMPT, RECOGNITION_SUCCESS, RECOGNITION_FAILURE } from '../types.js'


const initialState = {
    recognizeStatus: 'none',
    recognizeResult: {}
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
        default:
            return newState
    }
}

export default StimulusReducer