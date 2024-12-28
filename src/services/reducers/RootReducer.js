import { combineReducers } from "redux";
import NoteReducer from "./NoteReducer";

const RootReducer = combineReducers({
    NoteReducer
});

export default RootReducer;