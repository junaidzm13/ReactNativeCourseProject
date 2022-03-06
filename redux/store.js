import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

/*const thunkMiddleware = store => next => action => {
    if (typeof action === 'function') {
        action(store.dispatch);
    } else {
        next(action);
    }
} */

const DEAFAULT_STATE = {
    rates: null,
    source: '',
    target: '',
    sourceToTarget: 0,
    errMessage: "...",
    calculator: {
        currentOperator: "",
        firstOperand: "0",
        secondOperand: ""
    }
};

const store = createStore(reducer, DEAFAULT_STATE, applyMiddleware(thunk))

export default store;