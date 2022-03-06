import React from 'react';
import {FlatList, Text, View, StyleSheet, TextInput} from 'react-native';
import {Row} from './Row';

import {connect} from 'react-redux'
import {
    updateExRates,
    updateExSource,
    updateExTarget,
    updateExSourceToTarget,
    updateExErrMessage,
    requestRates
} from '../redux/actions'; 

class ExchangeRatesScreen extends React.Component {

    updateSourceExchangeRates = source => {
        if (source.length === 3) {
            this.props.requestRates(source);
            return;
        }
        this.props.updateExRates(null);
        this.props.updateExErrMessage('Incomplete currency code');
    }

    updateSourceToTargetExchangeRate = (target) => {
        if (this.props.rates && target.length === 3) {
            const sourceToTargetRate = this.findSourceToTarget(target)
            this.props.updateExSourceToTarget(sourceToTargetRate);
            return;
        }
        this.props.updateExSourceToTarget(0);
    }

    findSourceToTarget = (target) => {
        const exRate = this.props.rates.find(
            rate => (rate.currency === target)
        );
        return exRate?exRate.rate:0;
    }

    onSourceCurrencyChange = (source) => {
        if (source.length <= 3) {
            this.props.updateExSource(source);
            this.updateSourceExchangeRates(source);
        }
    }

    onTargetCurrencyChange = (target) => {
        if (target.length <= 3) {
            this.props.updateExTarget(target);
            this.updateSourceToTargetExchangeRate(target);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <SourceTargetCurrencyInput 
                    source={this.props.source}
                    target={this.props.target}
                    onSourceCurrencyChange={this.onSourceCurrencyChange}
                    onTargetCurrencyChange={this.onTargetCurrencyChange}
                />
                <PairedExchangeRate rate={this.props.sourceToTarget} /> 
                <SourceExchangeRates {...this.props}/>
            </View>
        )
    }
}


const SourceExchangeRates = (props) => {
    const renderRate = ({item}) => {
        return (<Row {...item} />)
    }

    return (
        props.rates?
        (
        <View>
        <Text style={{color: 'white', fontSize: 30}}>{props.source + " Exchange Rates"}</Text>
        <FlatList 
            renderItem={renderRate}
            data={props.rates}
        />
        </View>
        ):(<Text style={styles.error}>{props.errMessage}</Text>)
    )
 }

const PairedExchangeRate = (props) => {
    const targetIsValid = props.rate>0;
    return (
        targetIsValid?
        (<Text style={styles.pairedExchangeRate}>{props.rate}</Text>)
        :null
    )
}


const SourceTargetCurrencyInput = (props) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <CurrencyInput 
                placeholder='Source'
                value={props.source}
                onChangeText={props.onSourceCurrencyChange}
            />
            <Text style={{color: 'white', fontSize: 40, margin: 5}}>to</Text>
            <CurrencyInput 
                placeholder='Target'
                value={props.target}
                onChangeText={props.onTargetCurrencyChange}
            />
        </View>
    )
}

const CurrencyInput = (props) => (
    <TextInput 
        style={styles.textinput}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        autoCapitalize='characters'
    />
)


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#16537e',
        paddingTop: 40,
        padding: 10,
        flex: 1
    },
    textinput: {
        fontSize: 40,
        color: 'white',
        borderRadius: 30,
        padding: 5,
        borderColor: 'white',
        borderWidth: 2,
        width: 150,
        textAlign: 'center'
    },
    error: {
        fontSize: 30,
        color: 'white'
    },
    pairedExchangeRate: {
        color: 'white',
        textAlign: 'center',
        fontSize: 35,
        margin: 20
    }
})


const mapStateToProps = state => ({
    rates: state.rates,
    source: state.source,
    target: state.target,
    sourceToTarget: state.sourceToTarget,
    errMessage: state.errMessage
});
const mapActionCreatorsToProps = {
    updateExRates: updateExRates,
    updateExSource: updateExSource,
    updateExTarget: updateExTarget,
    updateExSourceToTarget: updateExSourceToTarget,
    updateExErrMessage: updateExErrMessage,
    requestRates: requestRates
};
export default connect(mapStateToProps, mapActionCreatorsToProps)(ExchangeRatesScreen);