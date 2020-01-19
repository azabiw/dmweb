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



const reducer = createReducer({characters: [],
    settlements: [],
    logs: [],
    editable: []
}, {
   [addCharacter]: (state, action) => {
       state.characters.push(action.payload)
   }
});

const store =  configureStore({
    reducer: reducer
});
export default store;