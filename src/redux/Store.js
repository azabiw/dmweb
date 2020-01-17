import {ADD_CHARACTER, ADD_LOG, ADD_SETTLEMENT} from "./ActionTypes";
import { createStore } from 'redux';
function addCharacter() {
    return {type: ADD_CHARACTER};
}

function addLog() {
    return{type: ADD_LOG};
}

function addSettlement() {
    return {type: ADD_SETTLEMENT};
}
function storeConfig(state = {characters: [],
    settlements: [],
    logs: []
}, action) {
    console.log("store created");
    switch (action.type) {
        case ADD_CHARACTER:
            return state.characters.push(action.payload);
        case ADD_SETTLEMENT:
            return state.settlements.push(action.payload);
        case ADD_LOG:
            return state.logs.push(action.payload);
    }
}
const store =  createStore(storeConfig);
export default store;