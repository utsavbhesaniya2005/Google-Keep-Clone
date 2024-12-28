const initialState = {
    notes : [],
    isCreate : false,
    
}

const NoteReducer = (state = initialState, action) => {

    switch(action.type){

        case 'ADD_NOTES_SUC' :

            return {

                ...state, 
                isCreate : true
            }

        case 'GET_DATA_SUC' :

            return{

                ...state,
                notes : action.payload
            }

        default :
            return state;

    }
}
export default NoteReducer;