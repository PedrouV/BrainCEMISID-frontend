import { RECOGNITION_SUCCESS, RECOGNITION_ATTEMPT, SET_SNB, LEARN_ATTEMPT, LEARN_SUCCESS, LEARN_FAILURE } from "../types"
import { RootRoute } from "../../Config/api"
import { resizeImage, getBooleanArrayFromImageData, getBrainPatternFromBoleanArray, createImageFromBooleanArray, amplifyBooleanArrayImage } from './Project'
import Axios from "axios"

export const Learn = (card, data) => {
    return (dispatch, getState) => {
        console.log(data, 'Este test me interesa')
        dispatch({type: LEARN_ATTEMPT})
        resizeImage(card, 16, 16).then(response=>{
            let arr = getBooleanArrayFromImageData(response.imageData, data.tolerances)
            let sightPattern = getBrainPatternFromBoleanArray(arr);
            let hearingPattern = data.hearingPattern
            const config = {
                headers: {'Authorization': `token ${getState().Auth.user.token}` }
            }
            const formatedData = {
                CLACK: [{
                    hearing_pattern: hearingPattern,
                    hearing_class: data.category.toLowerCase(),
                    sight_pattern: sightPattern,
                    intentions_input: [data.bfc.biology, data.bfc.culture, data.bfc.feelings],
                    desired_intentions_input: [getState().Project.desiredState.biology, getState().Project.desiredState.culture, getState().Project.desiredState.feelings],
                    image_id: data.cardId,
                    rename: true,
                    set: data.set
                }],
                mode: "EPISODES"
            }
            console.log(formatedData, config, getState().Project.projectId)
            Axios.put(`${RootRoute}/api/kernel/?project_id=${getState().Project.projectId}`, formatedData, config).then(r=>{
                dispatch({type: LEARN_SUCCESS})
                let promises = [];
                promises.push(Axios.get(`${RootRoute}/api/sight_net/?project_id=${getState().Project.projectId}`, config))
                promises.push(Axios.get(`${RootRoute}/api/hearing_net/?project_id=${getState().Project.projectId}`, config))
                promises.push(Axios.get(`${RootRoute}/api/rel_net/?project_id=${getState().Project.projectId}`, config))
                promises.push(Axios.get(`${RootRoute}/api/episodicmemory/?project_id=${getState().Project.projectId}`, config))
                Promise.all(promises).then(response=>{
                    dispatch({type: SET_SNB, payload: {sight: response[0].data, hearing: response[1].data, relational: response[2].data, episodes: response[3].data[0].group_list}})
                }).catch(err=>{
                    console.log(err);
                    dispatch({type: SET_SNB, payload: {sight: [], hearing: [], relational: [], episodes: []}})
                })
                
            }).catch(err=>{
                console.log(err.response)
                dispatch({type: LEARN_FAILURE})
            })
        })
    }
}

export const Recognize = (card, data) => {
    return (dispatch, getState) => {
        dispatch({type: RECOGNITION_ATTEMPT})
        resizeImage(card.image, 16, 16).then(response=>{
            let arr = getBooleanArrayFromImageData(response.imageData, data.tolerances)
            let sightPattern = getBrainPatternFromBoleanArray(arr);
            const config = {
                headers: {'Authorization': 'token '+getState().Auth.user.token }
            }
            let formatedData = {
                CHECK:[{
                    "hearing_pattern": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    "hearing_class": "",
                    "sight_pattern": sightPattern,
                    "intentions_input": [0,0,0],
                    "desired_intentions_input": [getState().Project.desiredState.biology, getState().Project.desiredState.culture, getState().Project.desiredState.feelings],
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
                    console.log("Este sera el miss?")
                    dispatch({type: RECOGNITION_SUCCESS, payload: null})
                    //El patron no fue reconocido
                }
            }).catch(err=>{
                console.log(err)

            })
        });
    }
}

export const LiveEpisode = (items, bcf) => {
    return (dispatch, getState) => {
        console.log(items, bcf)
        let reducedImagesPromises = []
        items.forEach(item=>{
            reducedImagesPromises.push(resizeImage(item.image, 16, 16));
        })
        const config = {
            headers: {'Authorization': 'token '+getState().Auth.user.token }
        }
        Promise.all(reducedImagesPromises).then(images=>{
            let sightPatterns = []
            const hearing_pattern = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            const hearing_class = ""
            const intentions_input = [0,0,0]
            const desired_intentions_input = [getState().Project.desiredState.biology, getState().Project.desiredState.culture, getState().Project.desiredState.feelings]
            images.forEach((image, index)=>{
                let boolArray = getBooleanArrayFromImageData(image.imageData, items[index].colorLimit)
                let hexArray = getBrainPatternFromBoleanArray(boolArray)
                sightPatterns.push(hexArray);
            })
            let BUM = []
            let BIP = []
            let CHECK = []
            let CLACK = []
            BUM.push({
                hearing_pattern, 
	            hearing_class,
	            sight_pattern: hearing_class,
	            intentions_input
            })
            sightPatterns.forEach((sp, index)=>{
                if(index !== sightPatterns.length-2 && index !== sightPatterns.length-1){
                    BIP.push({
                        hearing_pattern,
                        hearing_class,
                        sight_pattern: sp,
                        intentions_input
                    })
                }else if(index === sightPatterns.length-2){
                    CHECK.push({
                        hearing_pattern,
                        hearing_class,
                        sight_pattern: sp,
                        intentions_input
                    })
                }else {
                    CLACK.push({
                        hearing_pattern,
                        hearing_class,
                        sight_pattern: sp,
                        intentions_input: [bcf.biology, bcf.culture, bcf.feelings],
                        image_id: -1,
                        rename: 'false'
                    })
                }
            })
            const formatedData = {
                BUM,
                BIP,
                CHECK,
                CLACK,
                mode: 'EPISODES'
            }
            console.log(formatedData)
            Axios.put(`${RootRoute}/api/kernel/?project_id=${getState().Project.projectId}`, formatedData, config).then(r=>{
                console.log(r)
            }).catch(err=>{
                console.log(err.response)
            })
        })
    }
}

export const GetIntentions = (items, bcf) => {
    return (dispatch, getState) => {
        console.log(items, bcf)
        let reducedImagesPromises = []
        items.forEach(item=>{
            reducedImagesPromises.push(resizeImage(item.image, 16, 16));
        })
        const config = {
            headers: {'Authorization': 'token '+getState().Auth.user.token }
        }
        Promise.all(reducedImagesPromises).then(images=>{
            let sightPatterns = []
            const hearing_pattern = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            const hearing_class = ""
            const intentions_input = [0,0,0]
            const desired_intentions_input = [getState().Project.desiredState.biology, getState().Project.desiredState.culture, getState().Project.desiredState.feelings]
            images.forEach((image, index)=>{
                let boolArray = getBooleanArrayFromImageData(image.imageData, items[index].colorLimit)
                let hexArray = getBrainPatternFromBoleanArray(boolArray)
                sightPatterns.push(hexArray);
            })
            let BUM = []
            let BIP = []
            let CHECK = []
            let CLACK = []
            BUM.push({
                hearing_pattern, 
	            hearing_class,
	            sight_pattern: hearing_class,
	            intentions_input
            })
            sightPatterns.forEach((sp, index)=>{
                if(index !== sightPatterns.length-1){
                    BIP.push({
                        hearing_pattern,
                        hearing_class,
                        sight_pattern: sp,
                        intentions_input
                    })
                }else{
                    CHECK.push({
                        hearing_pattern,
                        hearing_class,
                        sight_pattern: sp,
                        intentions_input
                    })
                }
            })
            const formatedData = {
                BUM,
                BIP,
                CHECK,
                mode: 'INTENTIONS'
            }
            console.log(formatedData)
            Axios.put(`${RootRoute}/api/kernel/?project_id=${getState().Project.projectId}`, formatedData, config).then(r=>{
                console.log(r)
            }).catch(err=>{
                console.log(err.response)
            })
        })
    }
}

