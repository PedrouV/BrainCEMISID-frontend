import { RECOGNITION_SUCCESS, RECOGNITION_ATTEMPT, LOG_OUT, SET_INTERNAL_STATUS } from "../types"
import { RootRoute } from "../../Config/api"
import { resizeImage, getBooleanArrayFromImageData, getBrainPatternFromBoleanArray } from './Project'
import Axios from "axios"

// export const Learn = () => {
//     return (dispatch) => {

//     }
// }

export const Recognize = (card, data) => {
    return (dispatch, getState) => {
        dispatch({type: RECOGNITION_ATTEMPT})
        resizeImage(card.image, 16, 16).then(response=>{
            let arr = getBooleanArrayFromImageData(response.imageData, data.colorLimit)
            let sightPattern = getBrainPatternFromBoleanArray(arr);
            const config = {
                headers: {'Authorization': 'token '+getState().Auth.user.token }
            }
            let formatedData = {
                CHECK:[{
                    "hearing_pattern": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "hearing_class": "",
                    "sight_pattern": sightPattern,
                    intentions_input: [0,0,0],
                    "desired_intentions_input": [getState().Project.desiredState.biology, getState().Project.desiredState.feelings, getState().Project.desiredState.culture],
                }],
                mode:"EPISODES"
            }
            console.log(formatedData, config, getState().Project.projectId)
            Axios.put(`${RootRoute}/api/kernel/?project_id=${getState().Project.projectId}`, formatedData, config).then(r=>{
                console.log("Paso :D", r)
                if(r.data.length > 0){
                    dispatch({type: RECOGNITION_SUCCESS, payload: r.data[0]})
                    //El patron fue reconocido
                }else{
                    dispatch({type: RECOGNITION_SUCCESS, payload: null})
                    //El patron no fue reconocido
                }
            }).catch(err=>{
                console.log(err)
                if(err.response.status === 401){
                    dispatch({type: LOG_OUT})
                    let storage = window.localStorage;
                    // remove from store
                    storage.removeItem('bcemisid-user');
                    storage.removeItem('bcemisid-userInfo');
                }
            })
        });
    }
}

export const CreateEpisode = () => {
    return (dispatch) => {

    }
}

export const GetIntentions = () => {
    return (dispatch) => {

    }
}

