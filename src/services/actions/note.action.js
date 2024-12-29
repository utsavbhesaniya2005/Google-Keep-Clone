import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";


export const getDataSuc = (data) => {

    return {
        type : 'GET_DATA_SUC',
        payload : data
    }
}

export const getDataRej = (msg) => {
    
    return {
        type : 'GET_DATA_REJ',
        payload : msg
    }
}

export const addNotesSuc = (data) => {

    return{
        type : 'ADD_NOTES_SUC',
        payload : data
    }
}

export const addNotesRej = (msg) => {

    return{
        type : 'ADD_NOTES_REJ',
        payload : msg
    }
}

export const findNoteSuc = (note) => {

    return{
        type : 'FIND_NOTES_SUC',
        payload : note
    }
}

export const findNoteRej = (msg) => {

    return{
        type : 'FIND_NOTES_REJ',
        payload : msg
    }
}

export const updateNoteSuc = (note) => {

    return{
        type : 'UPDATE_NOTE_SUC',
        payload : note
    }
}

export const updateNoteRej = (msg) => {

    return{
        type : 'UPDATE_NOTE_REJ',
        payload : msg
    }
}

export const getNotesAsync = () => {
    
    return async dispatch => {
        
        try{
            
            const note = await getDocs(collection(db, 'notes'));
            
            let notes = [];
            
            note.forEach((doc) => {
                
                let getdata = doc.data();
                getdata.id = doc.id;
                notes.push(getdata);
            })
            
            dispatch(getDataSuc(notes));
            
        }catch(err){
            
            dispatch(getDataRej(err.code))
        }
        
    }
    
}

export const addNotesAsync = (note) => {

    return async dispatch => {

        try{
            console.log("Notes",note);

            let currentDate = new Date().toLocaleString();

            // let formatedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

            const addTime = {
                ...note,
                createAt : currentDate
            }
            
            await addDoc(collection(db, 'notes'), addTime);

            dispatch(addNotesSuc());

        }catch(err){

            console.log(err);
            dispatch(addNotesRej());
        }

    }
}

export const findNoteAsync = (id) => {

    return async dispatch => {

        try{

            let findNote = await getDoc(doc(db, 'notes', `${id}`));

            let getNote = findNote.data();  
            getNote.id = findNote.id;
            
            dispatch(findNoteSuc(getNote))

        }catch(err){

            dispatch(findNoteRej(err.code))
        }
    }
}

export const updateNoteAsync = (note) => {

    return async dispatch => {

        try{

            let updateNote = await setDoc(doc(db, 'notes', `${note.id}`), note);

            dispatch(updateNoteSuc(updateNote))

        }catch(err){

            dispatch(updateNoteRej(err.msg))
        }

    }
}

export const deleteNotesAsync = (id) => {

    return async dispatch => {

        try{
            
            await deleteDoc(doc(db, "notes", `${id}`));
            dispatch(getNotesAsync());
        }catch(err){
            
            console.log(err);
        }

    }
}