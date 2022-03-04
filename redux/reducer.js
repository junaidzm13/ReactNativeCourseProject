import { 
    UPDATE_EXCHANGE_RATES,
    UPDATE_EXCHANGE_SOURCE,
    UPDATE_EXCHANGE_TARGET,
    UPDATE_EXCHANGE_SOURCETOTARGET,
    UPDATE_EXCHANGE_ERRMSG,
    UPDATE_CALCULATOR_FIRSTOPERAND,
    UPDATE_CALCULATOR_SECONDOPERAND,
    UPDATE_CALCULATOR_OPERATOR 
} from "./actions"
import { combineReducers } from "redux"


const exRatesReducer = (state=null, action) => {
    if (action.type === UPDATE_EXCHANGE_RATES) return action.payload
    return state
}

const exSourceReducer = (state="", action) => {
    if (action.type === UPDATE_EXCHANGE_SOURCE) return action.payload
    return state
}

const exTargetReducer = (state="", action) => {
    if (action.type === UPDATE_EXCHANGE_TARGET) return action.payload
    return state
}

const exSourceToTargetReducer = (state=0, action) => {
    if (action.type === UPDATE_EXCHANGE_SOURCETOTARGET) return action.payload
    return state
}

const exErrMessageReducer = (state="...", action) => {
    if (action.type === UPDATE_EXCHANGE_ERRMSG) return action.payload
    return state
}

const calFirstOperandReducer = (state="0", action) => {
    if (action.type === UPDATE_CALCULATOR_FIRSTOPERAND) return action.payload
    return state
}

const calSecondOperandReducer = (state="", action) => {
    if (action.type === UPDATE_CALCULATOR_SECONDOPERAND) return action.payload
    return state
}

const calOperatorReducer = (state="", action) => {
    if (action.type === UPDATE_CALCULATOR_OPERATOR) return action.payload
    return state
}

const reducer = combineReducers({
    rates: exRatesReducer,
    source: exSourceReducer,
    target: exTargetReducer,
    sourceToTarget: exSourceToTargetReducer,
    errMessage: exErrMessageReducer,
    calculator: combineReducers({
        currentOperator: calOperatorReducer,
        firstOperand: calFirstOperandReducer,
        secondOperand: calSecondOperandReducer
    })
})

export default reducer