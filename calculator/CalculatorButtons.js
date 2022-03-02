import {View, Pressable, Text, StyleSheet} from 'react-native';
import { useState } from 'react';


const ButtonsRow = (props) => (
    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        {
            props.buttons.map(
                (button, index) => 
                <CalculatorButton 
                    key={index}
                    symbol={button.symbol}
                    onPress={button.onPress}
                    color={button.color}
                    selected={button.selected}
                />
            )
        }
    </View>
)


const CalculatorButton = (props) => {
    const [selected, setSelected] = useState(false);
    const isMainOperator = checkIfMainOperator(props.symbol);
    return (
        <Pressable 
            style={[
                styles.calculatorButton, 
                {backgroundColor: (!selected&&!props.selected)?props.color.bgcolor:'#d3d8d7'}]}
            onPress={props.onPress}
            onPressIn={() => isMainOperator?null:setSelected(!selected)}
            onPressOut={() => isMainOperator?null:setSelected(!selected)}
        >
            <Text style={[styles.buttonSymbol, {color: props.color.color}]}>{props.symbol}</Text>
        </Pressable>
    )
}

const checkIfMainOperator = (symbol) => {
    return (["+", "-", "/", "x"].find(elem => elem === symbol))?true:false;
}


const styles = StyleSheet.create({
    calculatorButton: {
        borderRadius: 80,
        width: 80,
        height: 80,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    buttonSymbol: {
        fontSize: 35,
        textAlign: 'center',
        justifyContent: 'center'
    }
})


export default ButtonsRow;