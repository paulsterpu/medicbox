import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button, TextInput, TouchableOpacity, ScrollView, Keyboard, Image
} from "react-native";

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

let api = 'http://10.6.3.177:8000/api';

class RegisterScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            cnp: '',
            password: '',
            name: '',
            hospital: '',
            speciality: '',
            code: '',
            email: ''
        };
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    _keyboardDidShow = () => {
        this.setState({isKeyboardUp: true})
    };

    _keyboardDidHide = () => {
        this.setState({isKeyboardUp: false})
    };

    register = () => {

        axios({
            method: 'post',
            url: api + '/register/',
            data: {
                username: this.state.cnp,
                password: this.state.password,
                hospital: this.state.hospital,
                speciality: this.state.speciality,
                unique_code: this.state.code,
                email: this.state.email,
                name: this.state.name
            }
        })
            .then(response => {
                console.log('response');
                console.log(response);

                this.props.navigation.navigate('SuccessfulRegister');

            })
            .catch(error => {
                console.log('error');
                console.log(error.response.data);

            })
    };

    login = () => {
        this.props.navigation.navigate('Login');
    };

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.registerImageContainer}>
                    <Image
                        style={{width: 60, height: 60}}
                        source={{uri: 'https://i.imgur.com/bpgCopC.jpg'}}
                    />
                </View>

                <ScrollView style={styles.formContainer}>
                    <TextInput
                        style={styles.loginField}
                        onChangeText={(name) => this.setState({name})}
                        placeholder={'Name'}
                        value={this.state.name}
                    />
                    <TextInput
                        style={styles.loginField}
                        onChangeText={(cnp) => this.setState({cnp})}
                        placeholder={'CNP'}
                        value={this.state.cnp}
                    />
                    <TextInput
                        style={styles.loginField}
                        onChangeText={(hospital) => this.setState({hospital})}
                        placeholder={'Hospital'}
                        value={this.state.hospital}
                    />
                    <TextInput
                        style={styles.loginField}
                        onChangeText={(speciality) => this.setState({speciality})}
                        placeholder={'Medical speciality'}
                        value={this.state.speciality}
                    />
                    <TextInput
                        style={styles.loginField}
                        onChangeText={(code) => this.setState({code})}
                        placeholder={'Unique code'}
                        value={this.state.code}
                    />
                    <TextInput
                        style={styles.loginField}
                        onChangeText={(email) => this.setState({email})}
                        placeholder={'Email'}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.loginField}
                        onChangeText={(password) => this.setState({password})}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        value={this.state.text}
                    />
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={this.register}><Text style={styles.loginButtonText}>Sign up</Text></TouchableOpacity>
                </ScrollView>

                <View style={styles.signupButtonContainer}>
                    <TouchableOpacity
                        style={this.state.isKeyboardUp ? {display: 'none'} : styles.registerButton}
                        onPress={this.login}><Text style={styles.registerButtonText}>Already have an account? Sign in</Text></TouchableOpacity>
                </View>

            </View>
        );
    }
}
export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        //borderWidth: 1
        //borderColor: 'red'
    },
    loginField: {
        height: 40,
        //borderColor: 'gray',
        borderBottomWidth: 1,
        width: '100%'
    },
    loginButton: {
        marginTop: 20,
        width: '100%',
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonText: {
    },
    formContainer: {
        //flex: 0.7,
        alignSelf: 'center',
        width: '80%',
        //height: '70%',
        //borderWidth: 1,
        //borderColor: 'blue'
    },
    registerImageContainer: {
        height: 120,
        //borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'

    },
    signupButtonContainer: {
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
        //borderWidth: 1,
        position: 'absolute',
        bottom: 0
       // borderColor: 'green'
    },
    registerButton: {
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderTopWidth: 2
    },
    registerButtonText: {

    }
});