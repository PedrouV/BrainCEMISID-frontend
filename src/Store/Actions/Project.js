import { SET_PROJECT_SUMMARY, SET_CARDS, SET_SNB } from "../types"
import { RootRoute } from "../../Config/api"
import Axios from "axios"

//0 to 1
const colorTolerance = 0.1
const colorLimit = 255 - 254*colorTolerance

//Helper Functions

export const transformIntToHexArray = (int, expectedSize) => {
    let hexArr = []
    let aux = int;
    while(aux > 0){
        let rest = aux%16;
        hexArr.unshift(rest);
        aux = (aux - rest)/16; 
    }
    let finalHex = []
    for(let i = 0; i < expectedSize - hexArr.length; i++){
        finalHex.push(0);
    }
    finalHex = finalHex.concat(hexArr)
    return finalHex;
}

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}


function imagetoblob(ImgId){
var ImageURL = ImgId
// Split the base64 string in data and contentType
var block = ImageURL.split(";");
// Get the content type of the image
var contentType = block[0].split(":")[1];// In this case "image/gif"
// get the real base64 content of the file
var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

// Convert it to a blob to upload
return b64toBlob(realData, contentType);
}

export const resizeImage = (data, width, height) => {

    return new Promise((resolve, reject)=>{
        console.log(data)
        let image = new Image();
        image.src = (data.indexOf('https://') === -1 && data.indexOf('http://') === -1) ? data : (data + '?' + new Date().getTime()); 
        image.crossOrigin = "Anonymous";
        image.setAttribute('crossOrigin', '');    
        let flag = false;
        image.onload = ()=>{
            if(!flag){
                flag = true;
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                ctx.fillStyle = "#FFF";
                ctx.fillRect(0,0,canvas.width, canvas.height);
                ctx.drawImage(image,
                0,
                0,
                canvas.width,
                canvas.height,
                )
                let optimizedImageURL = canvas.toDataURL();
                let imageData = ctx.getImageData(0,0,width,height);
                let pixelCount = width*height
                // console.log(optimizedImageURL)
                resolve({url: optimizedImageURL, imageData, pixelCount})
            }
        }
    })
}

export const createImageFromBooleanArray = (arr, w, h, customColors = {false: {r: 255, g: 255, b: 255}, true: {r: 0, g: 0, b: 0}}) => {
    return new Promise((resolve, reject)=>{
                let formatedarr = []
                arr.forEach(p=>{
                    if(p){
                        formatedarr.push(customColors.true.r)
                        formatedarr.push(customColors.true.g)
                        formatedarr.push(customColors.true.b)
                        formatedarr.push(255)
                    }else{
                        formatedarr.push(customColors.false.r)
                        formatedarr.push(customColors.false.g)
                        formatedarr.push(customColors.false.b)
                        formatedarr.push(255)
                    }
                })
                let imgdt = new ImageData(Uint8ClampedArray.from(formatedarr), w,h)
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext('2d');
                canvas.width = w;
                canvas.height = h;
                ctx.putImageData(imgdt,0,0);
                console.log(canvas.toDataURL());
                resolve(canvas.toDataURL())
                // let optimizedImageURL = canvas.toDataURL();
                // console.log(optimizedImageURL)
                // resolve({imageData, pixelCount})
    })
}

export const getBooleanArrayFromImageData = (imgData, limit = colorLimit) => {
    let booleanArray = []
    let rgba = {r: 0, g: 0, b: 0, a: 0}
    imgData.data.forEach((value, index)=>{
        if(index%4 === 0)
            rgba.r = value;
        if(index%4 === 1)
            rgba.g = value;
        if(index%4 === 2)
            rgba.b = value;
        if(index%4 === 3){
            rgba.a = value;
            if((rgba.r > limit && rgba.g > limit && rgba.b > limit)){
                booleanArray.push(false)
            }else{
                booleanArray.push(true);
            }
        }
    })
        // Section used for test purposes
    createImageFromBooleanArray(booleanArray, imgData.width, imgData.height).then(r=>{
        resizeImage(r,200,200).then(res=>{
            console.log(res)
        })
    })
    return booleanArray;

}

const getBrainPatternFromBoleanArray = (booleanArray) => {
    let brainPattern = []
    let sum = 0
    booleanArray.forEach((value, index)=>{
        
        console.log(value)
        if(index%4 === 0 && value)
            sum+=8
        if(index%4 === 1 && value)
            sum+=4
        if(index%4 === 2 && value)
            sum+=2
        if(index%4 === 3){
            if(value)
                sum+=1
            brainPattern.push(sum)
            sum = 0;
        }
    })
    return brainPattern
}

//Actions

export const GetProjectDetails = (project) =>{
    return (dispatch, getState) =>{
        console.log('setting details of... ',project)
        dispatch({type: SET_PROJECT_SUMMARY, payload: project})
    }
}

export const CreateProject = (name) =>{
    return (dispatch, getState) =>{
        Axios.post(RootRoute+`/api/kernel/`, {user_id: getState().Auth.userInfo.id, project_name: name}).then(response=>{
            console.log('ready')
        }).catch(err=>{
            console.log(err)
        })
    }
}

export const Learn = (card, data) => {
    return (dispatch, getState) => {
        console.log(data)
        resizeImage(card, 16, 16).then(response=>{
            console.log(response.dataURL, response.imageData, response.pixelCount)
            let arr = getBooleanArrayFromImageData(response.imageData)
            let sightPattern = getBrainPatternFromBoleanArray(arr);
            let hearingPattern;
            console.log(sightPattern)
            console.log("TEST" ,transformIntToHexArray(43,64))
            const config = {
                headers: {'Authorization': `token ${getState().Auth.user.token}` }
            }
            const formatedData = {
                CLACK: [{
                    hearing_pattern: hearingPattern,
                    hearing_class: data.category,
                    sight_pattern: sightPattern,
                    intentions_input: [data.bfc.biology, data.bfc.feelings, data.bfc.cultural],
                    image_id: -1,
                    rename: true,
                }],
                mode: "EPISODES"
            }
            Axios.put(`${RootRoute}/api/api/kernel/?project_id=${getState().Project.projectId}`, formatedData, config).then(r=>{
                console.log('omg paso :D', r)
            })
            // var palette    = this.getPaletteFromPixels(pixels, pixelCount, colorCount, quality, allowWhite)

            // return palette;
        })
    }
}

export const SaveCard = (data) => {
    return (dispatch, getState) => {
        console.log(data)
        var bodyFormData = new FormData();
        bodyFormData.set("name", data.name);
        bodyFormData.set("name_class", data.className);
        bodyFormData.append('img', imagetoblob(data.data), `${getState().Auth.userInfo.username}_${data.className}_${data.name}.png`)
        console.log(bodyFormData.get('img'), bodyFormData.get('name'), bodyFormData.get('name_class'))
        const config = {
            headers: {'Content-Type': 'multipart/form-data', 'Authorization': 'token '+getState().Auth.user.token }
        }
        const url = `${RootRoute}/api/user_collection/`
        console.log(url, bodyFormData, config)
        Axios.post(url,bodyFormData,config).then(r=>{
            console.log(r);
        }).catch(err=>{
            console.log(err)
        })
    }
}

const helperGetCards = (url, config = null, data = []) => {
    console.log('loading')
    return Axios.get(url, config).then(res=>{
        let newdata = data.concat(res.data.results);
        if(res.data.next !== null)
            return helperGetCards(res.data.next, config, newdata)
        else
            return newdata
    })
}

export const getUserCards = () => {
    return (dispatch, getState) => {
        const config = {
            headers: {'Authorization': 'token '+getState().Auth.user.token }
        }
        helperGetCards(`${RootRoute}/api/user_collection`, config).then(r=>{
            dispatch({type: SET_CARDS, payload: {cards: r, append: false}})
        })

    }
}

export const getCards = () => {
    return (dispatch, getState) => {
        const config = {
            headers: {'Authorization': 'token '+getState().Auth.user.token }
        }
        helperGetCards(`${RootRoute}/api/all_collections/`, config).then(r=>{
            dispatch({type: SET_CARDS, payload: {cards: r, append: false}})
        })
    }
}

export const getSNB = () => {
    return (dispatch, getState) => {
        let promises = [];
        let config = {
            headers: { 'Authorization': `token ${getState().Auth.user.token}`}
        }
        console.log(getState().Project.projectId, config, "DBURGENT")
        promises.push(Axios.get(`${RootRoute}/api/sight_net/?project_id=${getState().Project.projectId}`, config))
        promises.push(Axios.get(`${RootRoute}/api/hearing_net/?project_id=${getState().Project.projectId}`, config))
        Promise.all(promises).then(response=>{
            console.log('SETTING SNB', response[0].data, response[1].data)
            dispatch({type: SET_SNB, payload: {sight: response[0].data, hearing: response[1].data}})
        }).catch(err=>{
            console.log(err);
            dispatch({type: SET_SNB, payload: {sight: [], hearing: []}})
        })
    }
}