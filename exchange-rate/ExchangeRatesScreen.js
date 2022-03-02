import React from 'react';
import {FlatList, Text, View, StyleSheet, TextInput} from 'react-native';
import {getExchangeRates} from '../api';
import {Row} from './Row';

class ExchangeRatesScreen extends React.Component {

    state = {
        rates: null,
        source: '',
        target: '',
        sourceToTarget: 0,
        errMessage: "..."
    }

    updateSourceExchangeRates = async () => {
        if (this.state.source.length === 3) {
            const sourceExchangeRates = await getExchangeRates(this.state.source);
            this.setState({rates: sourceExchangeRates});
            this.updateErrorMessage('Wrong currency code');
            return;
        }
        this.setState({rates: null});
        this.updateErrorMessage('Incomplete currency code');
    }

    updateSourceToTargetExchangeRate = () => {
        if (this.state.rates && this.state.target.length === 3) {
            const sourceToTargetRate = this.findSourceToTarget()
            this.setState({sourceToTarget: sourceToTargetRate});
            return;
        }
        this.setState({sourceToTarget: 0});
    }

    updateErrorMessage = (errMessage) => this.setState({errMessage})

    findSourceToTarget = () => {
        const exRate = this.state.rates.find(rate => (rate.currency === this.state.target));
        return exRate?exRate.rate:0;
    }

    onSourceCurrencyChange = (source) => {
        if (source.length <= 3)
            this.setState({source}, this.updateSourceExchangeRates)
    }

    onTargetCurrencyChange = (target) => {
        if (target.length <= 3)
            this.setState({target}, this.updateSourceToTargetExchangeRate)
    }

    render() {
        return (
            <View style={styles.container}>
                <SourceTargetCurrencyInput 
                    source={this.state.source}
                    target={this.state.target}
                    onSourceCurrencyChange={this.onSourceCurrencyChange}
                    onTargetCurrencyChange={this.onTargetCurrencyChange}
                />
                <PairedExchangeRate rate={this.state.sourceToTarget} /> 
                <SourceExchangeRates {...this.state}/>
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


export default ExchangeRatesScreen;