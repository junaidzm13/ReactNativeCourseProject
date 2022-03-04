import { createStore } from 'redux';
import reducer from './reducer';


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

const store = createStore(reducer, DEAFAULT_STATE)

export default store;