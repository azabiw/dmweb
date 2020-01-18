import {ADD_CHARACTER, ADD_LOG, ADD_SETTLEMENT} from "./ActionTypes";
import {configureStore, createAction, createReducer} from "@reduxjs/toolkit";
import v4 from 'uuid/v4';

const addCharacter = createAction("characters/add", function prepare(character) {
    return {
        payload: character,
        id: v4()
    }
});
const addSettlement = createAction("settlements/add", function prepare(settlement) {
    return {
        payload: settlement,
        id: v4()
    }
});

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

const reducer = createReducer({characters: [],
    settlements: [],
    logs: []
}, {
   [addCharacter]: (state, action) => {
       state.characters.push(action.payload)
   }
});

const store =  configureStore({
    reducer: reducer
});
export default store;