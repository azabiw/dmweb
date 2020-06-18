import {configureStore, createAction, createReducer} from "@reduxjs/toolkit";
import v4 from 'uuid/v4';
import * as firebase from "firebase";
import {firebaseConfig} from "../firebaseConfig";
import { act } from "react-test-renderer";

const addCharacter = createAction("characters/add", function prepare(character) {
    return {
        payload: {
            character : character
        }
    }
});
const setUser = createAction("user/set", function prepare(user) {
    return {
        payload: user
    }
});

const addSettlement = createAction("settlements/add", function prepare(settlement) {
    return {
        payload: settlement,
        id: v4()
    }
});

const addQuest = createAction("quest/add", function prepare(quest) {
    return {
        payload: quest,
    }
});

const setEditable = createAction("editable/set", function prepare(editable){
   return {
       payload: editable,
       editType: editable.type
   }
});

const initialiseFirebase = createAction("firebase/initalise")

const updateCharacter = createAction("characters/update");

const removeCharacter = createAction("characters/remove");


const removeSettlement = createAction("settlements/remove");

const setInitialValues = createAction("initialise", function prepare(editable){
    return {
        payload: editable,
    }
});


/**
 * Returns either given characters index from char list or -1 if not found
 * @param characterList
 * @param id
 * @returns {number} index or -1 if not found from list
 */
function getCharacterIndexWithID(characterList, id) {
    for (let i = 0; i < characterList.length; i++) {
        if (characterList[i].id === id) {
            return i;
        }
    }
    return -1;
}
const reducer = createReducer({
    characters: [],
    settlements: [],
    logs: [],
    editable: [],
    quests: []
}, {
   [addCharacter]:  (state, action) => {
       let index = getCharacterIndexWithID(state.characters, action.payload.id);
       if (index !== -1) {
           state.characters[index] = action.payload;
       }
       else state.characters.push(action.payload);
   },
    [updateCharacter]: (state, action) => {
        for (let i = 0; i < state.characters.length; i++) {
            if (state.characters[i].id === state.editable.id) {
                state.characters[i] = action.payload;
                return;
            }
        }
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
       console.log("Setting initial store state to" , action.payload);
    },
    [addQuest]: (state, action) => {
        state.quests.push(action.payload);
    },
    [initialiseFirebase]: (state, action) => {
        if (state["firebase"] !== undefined) return; //jos firebase on jo alustettu storeen, ei luoda enää uusia kopioita siitä
        firebase.initializeApp(firebaseConfig)
        state["firebase"] = firebase.app;
        console.log(state.firebase);
    },
    [setUser]: (state, action) => {
        state["user"] = action.payload;
    }
});


const store =  configureStore({
    reducer: reducer
});

/**
 *
 * @param id wanted UUID
 * @param type formType characters or settlements
 * @returns {number}
 */
function getFormDataWithID(id, type) {
    let forms = store.getState()[type];
    return forms[getCharacterIndexWithID(forms, id)];
}



export default store;
export {getCharacterIndexWithID, getFormDataWithID};
