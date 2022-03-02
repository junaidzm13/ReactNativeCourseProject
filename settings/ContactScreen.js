import {Text, View, StyleSheet} from 'react-native';


export default function ContactScreen(){
    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <Text style={styles.title}>Phone #: </Text>
                <Text style={styles.text}>{"021-954-76548"}</Text>
            </View>
            <View style={styles.subcontainer}>
                <Text style={styles.title}>Address: </Text>
                <Text style={styles.text}>{"123 Pokfulam Road, Hong Kong"}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: 'teal'
    },
    subcontainer: {
        marginLeft: 4,
        marginBottom: 20
    },
    text: {fontSize: 25, color: 'white', fontStyle: 'italic'},
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    }
})
