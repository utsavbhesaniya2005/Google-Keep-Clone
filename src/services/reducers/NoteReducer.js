const initialState = {
    notes : [],
    note : null,
    isCreate : false,
    errMsg : null
}

const NoteReducer = (state = initialState, action) => {

    switch(action.type){

        case 'ADD_NOTES_SUC' :

            return {

                ...state, 
                isCreate : true,
                errMsg : null
            }

        case 'ADD_NOTES_REJ' :

            return {

                ...state, 
                errMsg : action.payload
            }

        case 'GET_DATA_SUC' :

            return {

                ...state,
                notes : action.payload,
                errMsg : null
            }

        case 'GET_DATA_REJ' :

            return {

                ...state,
                errMsg : action.payload
            }

        case 'FIND_NOTES_SUC' : 
            
            return {
                ...state,
                note : action.payload,
                errMsg : null
            }
        
        case 'FIND_NOTES_REJ' : 
            
            return {
                ...state,
                errMsg : action.payload
            }

        case 'UPDATE_NOTE_SUC' :

            return {

                ...state,
                note : action.payload,
                errMsg : null
            }

        case 'UPDATE_NOTE_REJ' :

            return {

                ...state,
                errMsg : action.payload
            }

        default :
            return state;

    }
}
export default NoteReducer;