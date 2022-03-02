import {Text, View, StyleSheet} from 'react-native';


export const Row = (props) => (
    <View style={styles.row}>
        <Text style={styles.text}>{`${props.currency}: ${props.rate}`}</Text>
    </View>
)

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: 'lightgrey'
    },
    row: {
        margin: 10,
        borderColor: 'black',
        borderTopWidth: 1,
        borderBottomWidth: 1
    }
})
