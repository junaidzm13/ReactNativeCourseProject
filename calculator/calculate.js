export const calculate = (firstOperandAsString, secondOperandAsString, operation) => {
    const firstOperandNumber = +firstOperandAsString;
    const secondOperandNumber = +secondOperandAsString;
    if (operandsNotANumber(firstOperandNumber, secondOperandNumber)) return "0";
    return format(evaluate(firstOperandNumber, secondOperandNumber, operation))
}

function format(number) {
    return (""+number).slice(0, 9);
}

function evaluate(firstOperand, secondOperand, operation) {
    if (operation === "+") return firstOperand + secondOperand
    else if (operation === "-") return firstOperand - secondOperand
    else if (operation === "x") return firstOperand * secondOperand
    else if (operation === "/") return secondOperand===0?'Error':firstOperand / secondOperand
}

function operandsNotANumber(firstOperand, secondOperand) {
    return (Number.isNaN(firstOperand) || Number.isNaN(secondOperand))
}
