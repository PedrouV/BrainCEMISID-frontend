import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import ProjectReducer from './ProjectReducer'

const RootReducer = combineReducers({
    Auth: AuthReducer,
    Project: ProjectReducer
});

export default RootReducer;