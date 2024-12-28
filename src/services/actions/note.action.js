import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";

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