import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ButtonsRow from './CalculatorButtons';
import { calculate } from './calculate';


const LIGHTGREY = {bgcolor: 'lightgrey', color: 'grey'}
const GREY = {bgcolor: 'grey', color: 'white'}
const ORANGE = {bgcolor: 'orange', color: 'white'}


class CalculatorScreen extends React.Component {
    state = {
        currentOperator: "",
        firstOperand: "0",
        secondOperand: ""
    }

    onOperatorPress = (operator) => {
        if (this.state.secondOperand) {
            this.setState(
                prevState => ({
                    firstOperand: calculate(
                        prevState.firstOperand, prevState.secondOperand, prevState.currentOperator
                    ),
                    secondOperand: "",
                    currentOperator: operator,
                })
            )
            return
        }
        this.setState({currentOperator: operator})
    }

    isOperatorSelected = (operator) => {
        return operator === this.state.currentOperator && !this.state.secondOperand;
    }

    onNumberPress = (operand) => {
        this.setState(
            prevState => {
                if(!this.state.currentOperator) {
                    if(prevState.firstOperand === "0")
                        return {firstOperand: operand}
                    else return {firstOperand: (prevState.firstOperand+operand).slice(0, 9)}
                }
                else {
                    if(!prevState.secondOperand || prevState.secondOperand === "0")
                        return {secondOperand: operand}
                    else return {secondOperand: (prevState.secondOperand+operand).slice(0, 9)}
                }
            }
        )
    }

    onDecimalPress = () => {
        const operand = (!this.state.currentOperator)?'firstOperand':'secondOperand';
        this.addDecimal(operand);
    }

    addDecimal = (operand) => {
        const prevOperand = this.state[operand] === ""?"0":this.state[operand];
        if(this.checkIfDecimalExists(prevOperand)) return;
        this.setState({[operand]: prevOperand+"."})
    }

    checkIfDecimalExists = (operand) => {
        return (operand.indexOf(".") !== -1);
    }


    onEvaluate = () => {
        if(!this.state.currentOperator) return;
        else if (this.state.secondOperand === "") {
            this.setState(prevState => ({firstOperand: calculate(
                prevState.firstOperand, prevState.firstOperand, prevState.currentOperator,
            ), currentOperator: ""}))
        }
        else 
            this.setState(prevState => ({
                firstOperand: calculate(
                    prevState.firstOperand, prevState.secondOperand, prevState.currentOperator
                ), secondOperand: "", currentOperator: ""
            }))
    }


    onClear = () => this.setState({currentOperator: "", firstOperand: "0", secondOperand: ""})


    onPercentagePress = () => {
        if(!this.state.currentOperator) this.convertToPercentage('firstOperand');
        else this.convertToPercentage('secondOperand');            
    }

    convertToPercentage = (operand) => {
        this.setState(prevState => ({[operand]: ""+(+prevState[operand]/100)}))
    }


    onSignChange = () => {
        const operand = (!this.state.currentOperator)?'firstOperand':'secondOperand';
        this.changeSign(operand);
    }

    changeSign = (operand) => {
        if(this.state[operand] === "0") return;
        else if (+this.state[operand] > 0) this.setState(prevState => ({[operand]: "-"+prevState[operand]}))
        else this.setState(prevState => ({[operand]: prevState[operand].slice(1)}))
    }


    render() {
        const result = this.state.secondOperand?this.state.secondOperand:this.state.firstOperand;
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 0.2}}><Text></Text></View>
                <View style={{flex: 0.8, justifyContent: 'flex-end', marginBottom: 10}}>
                    <Text style={styles.result}>{result}</Text>
                    <ButtonsRow buttons={
                        [
                            {symbol: "C", onPress: this.onClear, color: LIGHTGREY},
                            {symbol: "+/-", onPress: this.onSignChange, color: LIGHTGREY},
                            {symbol: "%", onPress: this.onPercentagePress, color: LIGHTGREY },
                            {symbol: "/", onPress: () => this.onOperatorPress("/"), color: ORANGE, selected: this.isOperatorSelected("/")}
                        ]
                    } />
                    <ButtonsRow buttons={
                        [
                            {symbol: "7", onPress: () => this.onNumberPress("7"), color: GREY},
                            {symbol: "8", onPress: () => this.onNumberPress("8"), color: GREY},
                            {symbol: "9", onPress: () => this.onNumberPress("9"), color: GREY},
                            {symbol: "x", onPress: () => this.onOperatorPress("x"), color: ORANGE, selected: this.isOperatorSelected("x")}
                        ]
                    } />
                    <ButtonsRow buttons={
                        [
                            {symbol: "4", onPress: () => this.onNumberPress("4"), color: GREY},
                            {symbol: "5", onPress: () => this.onNumberPress("5"), color: GREY},
                            {symbol: "6", onPress: () => this.onNumberPress("6"), color: GREY},
                            {symbol: "-", onPress: () => this.onOperatorPress("-"), color: ORANGE, selected: this.isOperatorSelected("-")}
                        ]
                    } />
                    <ButtonsRow buttons={
                        [
                            {symbol: "1", onPress: () => this.onNumberPress("1"), color: GREY},
                            {symbol: "2", onPress: () => this.onNumberPress("2"), color: GREY},
                            {symbol: "3", onPress: () => this.onNumberPress("3"), color: GREY},
                            {symbol: "+", onPress: () => this.onOperatorPress("+"), color: ORANGE, selected: this.isOperatorSelected("+")}
                        ]
                    } />
                    <ButtonsRow buttons={
                        [
                            {symbol: "0", onPress: () => this.onNumberPress("0"), color: GREY},
                            {symbol: ".", onPress: this.onDecimalPress, color: GREY},
                            {symbol: "=", onPress: this.onEvaluate, color: ORANGE}
                        ]
                    } />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    result: {
        fontSize: 60,
        marginRight: 25,
        fontWeight: 'bold',
        textAlign: 'right'
    },
})

export default CalculatorScreen;
