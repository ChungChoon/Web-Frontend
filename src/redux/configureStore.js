import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import penderMiddleware from 'redux-pender';
import user from "redux/modules/user";
import lecture from "redux/modules/lecture";
import wallet from "redux/modules/wallet";


const env = process.env.NODE_ENV;
const middlewares = [penderMiddleware()];

const reducer = combineReducers({
    user,
    wallet,
    lecture
});

let store;
if(env === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
    store = initialState => createStore(
        reducer, 
        composeWithDevTools(applyMiddleware(...middlewares))
    );
} else {
    store = initialState => 
    createStore(reducer, applyMiddleware(...middlewares));
}


export default store();