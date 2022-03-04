import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ButtonsRow from './CalculatorButtons';
import { calculate } from './calculate';

import { connect } from 'react-redux';
import {
    updateCalFirstOperand,
    updateCalOperator,
    updateCalSecondOperand
} from '../redux/actions';


const LIGHTGREY = {bgcolor: 'lightgrey', color: 'grey'}
const GREY = {bgcolor: 'grey', color: 'white'}
const ORANGE = {bgcolor: 'orange', color: 'white'}


class CalculatorScreen extends React.Component {

    onOperatorPress = (operator) => {
        if (this.props.secondOperand) {
            const {firstOperand, secondOperand, currentOperator} = this.props;
            this.props.updateCalFirstOperand(calculate(
                        firstOperand, secondOperand, currentOperator
            ))
            this.props.updateCalSecondOperand("")
            this.props.updateCalOperator(operator)
            return
        }
        this.props.updateCalOperator(operator)
    }

    isOperatorSelected = (operator) => {
        return operator === this.props.currentOperator && !this.props.secondOperand;
    }


    onNumberPress = (operand) => {
        const {firstOperand, secondOperand} = this.props;
        if(this.isOnFirstOperand()) {
            if(firstOperand === "0")
                return this.props.updateCalFirstOperand(operand);
            else return this.props.updateCalFirstOperand((firstOperand+operand).slice(0, 9))
        }
        else {
            if(!secondOperand || secondOperand === "0")
                return this.props.updateCalSecondOperand(operand);
            else return this.props.updateCalSecondOperand((secondOperand+operand).slice(0, 9));
        }
    }


    onDecimalPress = () => {
        const operandType = (!this.props.currentOperator)?'firstOperand':'secondOperand';
        this.addDecimalIfPossible(operandType);
    }

    addDecimalIfPossible = (operandType) => {
        const operand = this.props[operandType] === ""?"0":this.props[operandType];
        if(this.checkIfDecimalExists(operand)) return;
        this.addDecimal(operandType, operand)
    }

    addDecimal = (operandType, operand) => {
        if (operandType == 'firstOperand') this.props.updateCalFirstOperand(operand+".")
        else this.props.updateCalSecondOperand(operand+".");
    }

    checkIfDecimalExists = (operand) => {
        return (operand.indexOf(".") !== -1);
    }


    onEvaluate = () => {
        const {firstOperand, secondOperand, currentOperator} = this.props;
        if(this.isOnFirstOperand()) return;
        else if (secondOperand === "") {
            this.props.updateCalFirstOperand(calculate(
                firstOperand, firstOperand, currentOperator
            ));
            this.props.updateCalOperator("");
        }
        else {
            this.props.updateCalFirstOperand(
                calculate(firstOperand, secondOperand, currentOperator)
            )
            this.props.updateCalSecondOperand("");
            this.props.updateCalOperator("");
        }
    }


    onClear = () => {
        this.props.updateCalFirstOperand("0")
        this.props.updateCalOperator("")
        this.props.updateCalSecondOperand("")
    }


    onPercentagePress = () => {
        if(this.isOnFirstOperand())
            this.props.updateCalFirstOperand(this.toPercentage(this.props.firstOperand));
        else 
            this.props.updateCalSecondOperand(this.toPercentage(this.props.secondOperand));
    }

    toPercentage = (number) => {
        return ""+(+number/100)
    }


    onSignChange = () => {
        const [operand, actionCreator] = this.isOnFirstOperand()?
        [this.props.firstOperand, this.props.updateCalFirstOperand]:
        [this.props.secondOperand, this.props.updateCalSecondOperand];
        this.changeSign(operand, actionCreator);
    }

    isOnFirstOperand = () => (!this.props.currentOperator)

    changeSign = (operand, actionCreator) => {
        if(operand === "0") return;
        else if (+operand > 0) actionCreator("-"+operand)
        else actionCreator(operand.slice(1))
    }


    render() {
        const result = this.props.secondOperand?this.props.secondOperand:this.props.firstOperand;
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



const mapStateToProps = state => ({
    firstOperand: state.calculator.firstOperand,
    secondOperand: state.calculator.secondOperand,
    currentOperator: state.calculator.currentOperator,
});
const mapActionCreatorsToProps = {
    updateCalFirstOperand: updateCalFirstOperand,
    updateCalSecondOperand: updateCalSecondOperand,
    updateCalOperator: updateCalOperator
};

export default connect(mapStateToProps, mapActionCreatorsToProps)(CalculatorScreen);
