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
const setEditable = createAction("editable/set", function prepare(editable){
   return {
       payload: editable,
       editType: editable.type
   }
});
const removeCharacter = createAction("characters/remove");
const removeSettlement = createAction("settlements/remove");

const setInitialValues = createAction("initialise", function prepare(editable){
    return {
        payload: editable,
    }
});

const reducer = createReducer({
    characters: [],
    settlements: [],
    logs: [],
    editable: []
}, {
   [addCharacter]:  (state, action) => {
       state.characters.push(action.payload)
   },
   [addSettlement]: (state, action) => {
       state.settlements.push(action.payload)
   },
    [setEditable]: (state, action) => {
       state.editable = action.payload;
    },
    [removeCharacter]: (state, action) => {
        for (let i = 0; i < state.characters.length; i++) {
            if (state.characters[i].id === action.payload) {
                console.log("deleted character with id: " + action.payload);
                delete state.characters[i];
            }
        }
    },
    [setInitialValues]: (state, action) => {
       state.characters = action.payload.characters;
       state.settlements = action.payload.settlements;
       state.logs = action.payload.logs;
    }
});

const store =  configureStore({
    reducer: reducer
});
export default store;