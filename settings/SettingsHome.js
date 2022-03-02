import {Pressable, Text, View, Switch, StyleSheet} from 'react-native';
import React from 'react';


class SettingsHome extends React.Component {

    state = {
        isEnabled: false
    }

    toggleSwitch = (value) => (this.setState({isEnabled: value}))

    onContactUsPress = () => {
        this.props.navigation.navigate('ContactScreen');
    }

    render() {
        return (
            <View style={styles.container}>
                <Pressable style={styles.pressable} onPress={this.onContactUsPress}>
                    <Text style={styles.text}>Contact Us</Text>
                </Pressable>
                <View style={styles.switchContainer}>
                    <Text style={[styles.text, styles.rightMargin]}>Dark Theme? </Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleSwitch}
                        value={this.state.isEnabled}
                        disabled={true}
                        style={styles.leftMargin}
                    />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'teal',
        justifyContent: 'center',
        alignItems: 'center'
    },  
    pressable: {
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 10
    },
    rightMargin: {
        marginRight: 5
    },
    leftMargin: {
        marginLeft: 5
    }
})

export default SettingsHome;