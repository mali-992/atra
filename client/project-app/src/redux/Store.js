import {combineReducers, createStore} from "redux";
import {produce} from "immer"
import userReducer from "./userReducer";

const reducer=combineReducers({userReducer})
const store=createStore(reducer);
window.store=store;
export default store;


