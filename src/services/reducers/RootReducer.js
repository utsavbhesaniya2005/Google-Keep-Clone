import { combineReducers } from "redux";
import NoteReducer from "./NoteReducer";
import AuthReducer from "./AuthReducer";

const RootReducer = combineReducers({
    NoteReducer,
    AuthReducer
});

export default RootReducer;