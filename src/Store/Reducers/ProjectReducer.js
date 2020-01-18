import {
    SIGN_IN_USER, SET_PROJECT_SUMMARY, SET_CARDS, SET_SNB
} from '../types.js'
import {n1, n2, n3, n4, n5, n6, n7, n8, n9, n0} from '../../Components/PreloadedCardImages'


const initialState = {
    cards: [
        {
            image: n1,
            class: 'dígito',
            name: '1'
        },
        {
            image: n2,
            class: 'dígito',
            name: '2'
        },
        {
            image: n3,
            class: 'dígito',
            name: '3'
        },
        {
            image: n4,
            class: 'dígito',
            name: '4'
        },
        {
            image: n5,
            class: 'dígito',
            name: '5'
        },
        {
            image: n6,
            class: 'dígito',
            name: '6'
        },
        {
            image: n7,
            class: 'dígito',
            name: '7'
        },
        {
            image: n8,
            class: 'dígito',
            name: '8'
        },
        {
            image: n9,
            class: 'dígito',
            name: '9'
        },
        {
            image: n0,
            class: 'dígito',
            name: '0'
        },
    ],
    projectId: -1,
    projectName: '',
    internalState: {
        biology: 0,
        culture: 0,
        feelings: 0,
    },
    desiredState: {
        biology: 0,
        culture: 0,
        feelings: 0,
    },
    loadingCards: false,
    snbHearing: [],
    snbSight: [],
}

const ProjectReducer = (state = initialState, action) =>{
    let newState = {...state}
    switch(action.type){
        case SET_PROJECT_SUMMARY:
            console.log(action.payload)
            newState.projectId = action.payload.id;
            newState.internalState = action.payload.internal_state
            newState.desiredState = action.payload.desired_state
            newState.projectName = action.payload.name
            console.log(newState)
            return newState
        case SET_CARDS:
            let cardArray = [];
            action.payload.cards.forEach(c=>{
                cardArray.push({
                    image: c.img,
                    name: c.name,
                    class: c.name_class
                })
            })
            if(action.payload.append)
                newState.cards = newState.cards.concat(cardArray);
            else
                newState.cards = initialState.cards.concat(cardArray);
            newState.loadingCards = false;
            return newState;
        case SET_SNB:
            console.log(action.payload)
            newState.snbHearing = action.payload.hearing;
            newState.snbSight = action.payload.sight;
            return newState;
        default:
            return newState
    }
}

export default ProjectReducer