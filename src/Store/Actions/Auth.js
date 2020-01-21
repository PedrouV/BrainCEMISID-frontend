import { SIGN_IN_USER, LOADING_SIGN_IN, LOADING_PROJECTS, SET_PROJECTS, LOG_OUT } from "../types"
import { RootRoute } from "../../Config/api"
import Axios from "axios"

export const tryRelog = () => {
    return (dispatch) => {
        let storage = window.localStorage;
        // get from store
        let user = JSON.parse(storage.getItem('bcemisid-user'));
        let userInfo = JSON.parse(storage.getItem('bcemisid-userInfo'));
        // remove from store
        console.log('Store User: ', user);
        console.log('Store UserInfo:', userInfo);
        if(user && userInfo)
            dispatch({type: SIGN_IN_USER, 
                payload: {
                    userInfo: userInfo,
                    user: user,
                    loginStatus: {errors: null, status: 'OK', code: 200}
                }
            })
    }
}

export const LoginUser = (credentials) =>{
    return (dispatch) =>{
        const {username, password} = credentials
        dispatch({type: LOADING_SIGN_IN})
        Axios.post(RootRoute+'/api/auth/login', {username, password}).then(r=>{
            const user = {id: r.data.user.id, token: r.data.token}
            const userInfo = {email: r.data.user.email, id: r.data.user.id, username: r.data.user.username}
            console.log(JSON.stringify(user), JSON.stringify(userInfo))
            let storage = window.localStorage;
            // set to store
            storage.setItem('bcemisid-user', JSON.stringify(user));
            storage.setItem('bcemisid-userInfo', JSON.stringify(userInfo));
            dispatch({type: SIGN_IN_USER, payload: 
                {userInfo: userInfo, 
                user: user,
                loginStatus: {errors: null, status: 'OK', code: 200}
            }})
        }).catch(e=>{
            console.log(e);
        })
    }
}

export const RegisterUser = (data) =>{
    return (dispatch) =>{
        const {username, email, password} = data
        dispatch({type: LOADING_SIGN_IN})
        Axios.post(RootRoute+'/api/auth/register', {username, email, password}).then(r=>{
            dispatch({type: SIGN_IN_USER, payload: 
                {userInfo: {email: r.data.user.email, id: r.data.user.id, username: r.data.user.username}, 
                user: {id: r.data.user.id, token: r.data.token},
                loginStatus: {errors: null, status: 'OK', code: 200}
            }})
        }).catch(e=>{
            console.log(e);
        })
    }
}

export const getUserProjects = () => {
    return (dispatch, getState) => {
        dispatch({type: LOADING_PROJECTS})
        const header = {
            Authorization: `token ${getState().Auth.user.token}`
        }
        Axios.get(RootRoute+`/api/user_projects`, {headers: header}).then(r=>{
            let payload = []
            r.data.forEach(project=>{
                let bfcObject = JSON.parse(project.internal_state)
                let desired = JSON.parse(project.desired_state)
                payload.push({
                    id: project.id,
                    name: project.name,
                    internal_state: bfcObject,
                    desired_state: desired
                })
            })
            dispatch({type: SET_PROJECTS, payload})
        }).catch(e=>{
            console.log(e)
        })
    }
}

export const logOut = () => {
    return (dispatch, getState) => {
        dispatch({type: LOG_OUT})
        let storage = window.localStorage;
        // get from store
        storage.removeItem('bcemisid-user');
        storage.removeItem('bcemisid-userInfo');
    }
}