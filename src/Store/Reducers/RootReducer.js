import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import ProjectReducer from './ProjectReducer'
import StimulusReducer from './StimulusReducer';

const RootReducer = combineReducers({
    Auth: AuthReducer,
    Project: ProjectReducer,
    Stimulus: StimulusReducer
});

export default RootReducer;