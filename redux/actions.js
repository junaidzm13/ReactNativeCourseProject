import {fetchExchangeRates} from '../api';

// action types
export const UPDATE_EXCHANGE_RATES = 'UPDATE_EXCHANGE_RATES'
export const UPDATE_EXCHANGE_SOURCE = 'UPDATE_EXCHANGE_SOURCE'
export const UPDATE_EXCHANGE_TARGET = 'UPDATE_EXCHANGE_TARGET'
export const UPDATE_EXCHANGE_SOURCETOTARGET = 'UPDATE_EXCHANGE_SOURCETOTARGET'
export const UPDATE_EXCHANGE_ERRMSG = 'UPDATE_EXCHANGE_ERRMSG'
export const RATES_REQUEST_SENT = 'RATES_REQUEST_SENT'
export const RATES_REQUEST_FULFILLED = 'RATES_RQUEST_FULFILLED'
export const RATES_REQUEST_REJECTED = 'RATES_REQUEST_REJECTED'

export const UPDATE_CALCULATOR_FIRSTOPERAND = 'UPDATE_CALCULATOR_FIRSTOPERAND'
export const UPDATE_CALCULATOR_SECONDOPERAND = 'UPDATE_CALCULATOR_SECONDOPERAND'
export const UPDATE_CALCULATOR_OPERATOR = 'UPDATE_CALCULATOR_OPERATOR'


// action creators
export const updateExRates = rates => ({type: UPDATE_EXCHANGE_RATES, payload: rates})
export const updateExSource = source => {
    return {type: UPDATE_EXCHANGE_SOURCE, payload: source}}
export const updateExTarget = target => ({type: UPDATE_EXCHANGE_TARGET, payload: target})
export const updateExSourceToTarget = sourceToTarget => ({type: UPDATE_EXCHANGE_SOURCETOTARGET, payload: sourceToTarget})
export const updateExErrMessage = errMessage => ({type: UPDATE_EXCHANGE_ERRMSG, payload: errMessage})

export const requestRates = source => async dispatch => {
    dispatch({type: RATES_REQUEST_SENT});
    try {
        const rates = await fetchExchangeRates(source);
        dispatch({type: RATES_REQUEST_FULFILLED, payload: rates});
    } catch (err) {
        dispatch({type: RATES_REQUEST_REJECTED, payload: 'Wrong currency code'});
    }
}


export const updateCalFirstOperand = operand => ({type: UPDATE_CALCULATOR_FIRSTOPERAND, payload: operand})
export const updateCalSecondOperand = operand => ({type: UPDATE_CALCULATOR_SECONDOPERAND, payload: operand})
export const updateCalOperator = operator => ({type: UPDATE_CALCULATOR_OPERATOR, payload: operator})
