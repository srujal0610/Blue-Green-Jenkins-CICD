import {combineReducers} from "redux"
import userReducer from "./user.reducre.js"

export const reducer = combineReducers({
    user: userReducer
})