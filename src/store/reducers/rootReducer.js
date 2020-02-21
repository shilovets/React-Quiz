import {combineReducers} from 'redux';
import quizListReducer from './quizList';
import createReducer from "./create";
import authReducer from "./auth";

export default combineReducers({
    quizList: quizListReducer,
    create: createReducer,
    auth: authReducer

});