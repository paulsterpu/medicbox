import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button, TouchableOpacity, ScrollView
} from "react-native";

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import Menu from './Menu';

import SideMenu from  'react-native-side-menu';

let api = 'http://10.6.3.177:8000/api';

class SuccessfulRegisterScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    login = () => {
        this.props.navigation.navigate('Login');
    };

    render() {

        let menu = <Menu menuStyle={this.state.isOpen ? this.state.menuShow : this.state.menuHide} show={this.state.isOpen}/>;

        return (
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={isOpen => this.updateMenuState(isOpen)}
            >
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            Registered successfully!
                        </Text>
                    </View>

                    <View style={{flex: 0.1}}/>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={this.state.isKeyboardUp ? {display: 'none'} : styles.registerButton}
                            onPress={this.login}><Text style={styles.registerButtonText}>Go to login</Text></TouchableOpacity>
                    </View>
                </View>
            </SideMenu>
        );
    }
}
export default SuccessfulRegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: '80%',
        flex: 0.15,
        borderBottomWidth: 2,
        borderColor: "#b30000",
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 20,
        color: 'black'
    },
    buttonContainer: {
        flex: 0.15,
        alignSelf: 'center',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    buttonStyle: {
        top: 20,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 15,
        backgroundColor: "#b30000"
    },
    buttonText: {
        color: 'white',
        //fontSize: 20
    },
    listContainer: {
        width: '80%',
        flex: 0.6,
        alignSelf: 'center'
    },
    patientButton: {
        width: '100%',
        height: 45,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: "gray",
        borderRadius: 15,
        flexDirection: 'row',
        marginBottom: 20
    }
});