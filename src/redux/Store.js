import {configureStore, createAction, createReducer} from "@reduxjs/toolkit";

const setUser = createAction("user/set", function prepare(user) {
    return {
        payload: user
    }
});


const setCurrentFormType = createAction("formtype/set", function prepare(formtype){
    return {
        payload: formtype
    }
});


const addForm = createAction("form/add", function prepare(form){
    return {
        payload: form
    }
} )


const setInitialValues = createAction("initialise", function prepare(editable){
    return {
        payload: editable,
    }
});

/**
 * Poistaa storesta lomakkeen annetulla ID:llä
 */
const removeForm = createAction("form/remove", function prepare(id, type){
    return {
        payload: {id,type}
    }
})
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
    forms:[],
    currentFormtype: "character"
}, {
    [setInitialValues]: (state, action) => {
       /*state.characters = action.payload.characters;
       state.settlements = action.payload.settlements;*/
       state["forms"] = action.payload ?? [];
       state.logs = action.payload.logs;
       console.log("Setting initial store state to" , action.payload);
    },
    [setUser]: (state, action) => {
        state["user"] = action.payload;
    },
    [setCurrentFormType]: (state, action) => {
        state["currentFormtype"] = action.payload;
    },
    [addForm]: (state, action) => {
        try { 
            const formtype = action.payload.formtype;
            console.log("adding form with formtype:", formtype);

            const index = getCharacterIndexWithID(state.forms[formtype], action.payload.id);
            if (index !== -1) {
                state.forms[formtype][index] = action.payload;
            } else {
                state.forms[formtype].push(action.payload);
            }
            

        } catch (error) {
            console.error(error);
        }
    },
    [removeForm]: (state, action) => {
        const formtype = action.payload.type;
        
        try {
            for (let i = 0; i < state.forms[formtype].length; i++) {
                if (state.forms[formtype][i].id === action.payload.id){
                    console.log("Removing form with id", state.forms[formtype][i]);
                    delete state.forms[formtype][i];
                    break;
                } 

            }
        } catch (error) {
            console.log(error);
        }    
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
    let forms = store.getState().forms[type];
    return forms[getCharacterIndexWithID(forms, id)];
}



export default store;
export {getCharacterIndexWithID, getFormDataWithID};
