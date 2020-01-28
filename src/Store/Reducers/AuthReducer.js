import {
    SIGN_IN_USER, LOADING_SIGN_IN, SET_PROJECTS, LOADING_PROJECTS, LOG_OUT, LOG_IN_FAIL
} from '../types.js'

const initialState = {
    user: null,
    userInfo: null,
    loginStatus: {errors: false, status: '', code: 0},
    projects: [],
    loadingProjects: false,
}

const AuthReducer = (state = initialState, action) =>{
    let newState = {...state}
    switch(action.type){
        case LOADING_SIGN_IN:
            return initialState
        case SIGN_IN_USER:
            newState.user = action.payload.user;
            newState.userInfo = action.payload.userInfo
            newState.loginStatus = action.payload.loginStatus
            return newState
        case LOADING_PROJECTS:
            newState.loadingProjects = true;
            return newState;
        case SET_PROJECTS:
            newState.projects = action.payload;
            newState.loadingProjects = false;
            return newState;
        case LOG_OUT:
            newState = initialState;
            return newState;
        case LOG_IN_FAIL:
            newState.loginStatus = {errors: true, status: 'failure', code: 401}
            return newState
        default:
            return newState
    }
}

export default AuthReducer