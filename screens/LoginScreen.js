import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button, TextInput, TouchableOpacity, Keyboard, Image
} from "react-native";

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

let api = 'http://10.6.3.177:8000/api';

class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            cnp: '',
            password: '',
            isKeyboardUp: false
        };
    }

    componentWillMount() {
        let getData = async () => {
            try {
                const value = await AsyncStorage.getItem('token');
                
                console.log('token in login: ', value);
                
                if(value !== null && value !== '') {
                    this.props.navigation.navigate('PatientsList');
                }
            } catch(e) {
                // error reading value
            }
        };
        getData();

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    _keyboardDidShow = () => {
        this.setState({isKeyboardUp: true})
    };

    _keyboardDidHide = () => {
        this.setState({isKeyboardUp: false})
    };

    login = () => {

        axios({
            method: 'post',
            url: api + '/auth-token/',
            data: {
                username: this.state.cnp,
                password: this.state.password,
            }
        })
        .then(response => {
            console.log('response');
            console.log(response);
            if (response.status === 200) {

                storeData = async () => {
                    try {
                        await AsyncStorage.setItem('token', response.data.token);
                        await AsyncStorage.setItem('user_id', response.data.uuid);
                        await AsyncStorage.setItem('username', response.data.username);     //ADD FROM BACKEND
                    } catch (e) {
                        // saving error
                    }
                };

                storeData();

                this.props.navigation.navigate('PatientsList');
            }
        })
        .catch(error => {
            console.log('error');
            console.log(error.response.data);
            this.setState({
                invalidCredentials: true
            })

        })
    };

    fakeLogin = () => {

        if (this.state.cnp === 'cnp10' && this.state.password === '123123') {

            let storeData = async () => {
                try {
                    await AsyncStorage.setItem('token', 'token123');
                    await AsyncStorage.setItem('user_id', 'uuid123');
                    await AsyncStorage.setItem('username', 'cnp10');     //ADD FROM BACKEND
                } catch (e) {
                    // saving error
                }
            };

            storeData();

            this.props.navigation.navigate('PatientsList');

        } else {
            this.setState({
                invalidCredentials: true
            })
        }
    };

    register = () => {
        this.props.navigation.navigate('Register');
    };

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.imageContainer}>
                    <Image
                        style={{width: 200, height: 200}}
                        source={{uri: 'https://i.imgur.com/IPhCeyo.jpg'}}
                    />
                </View>

                <View style={styles.formContainer}>
                    {
                        this.state.invalidCredentials &&
                            <Text>
                                Invalid Credentials
                            </Text>
                    }
                    <TextInput
                        style={styles.loginField}
                        onChangeText={(cnp) => this.setState({cnp})}
                        placeholder={'CNP'}
                        value={this.state.text}
                        onSubmitEditing={Keyboard.dismiss}
                    />
                    <TextInput
                        style={styles.loginField}
                        onChangeText={(password) => this.setState({password})}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        value={this.state.text}
                        onSubmitEditing={Keyboard.dismiss}
                    />
                    <TouchableOpacity
                            style={styles.loginButton}
                            onPress={this.fakeLogin}><Text style={styles.loginButtonText}>Sign In</Text></TouchableOpacity>
                </View>

                <View style={styles.signupButtonContainer}>
                    <TouchableOpacity
                        style={this.state.isKeyboardUp ? {display: 'none'} : styles.registerButton}
                        onPress={this.register}><Text style={styles.registerButtonText}>Don't have an account? Sign up</Text></TouchableOpacity>
                </View>

            </View>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    loginField: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        width: '100%'
    },
    loginButton: {
        top: 20,
        width: '100%',
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonText: {
    },
    formContainer: {
        flex: 0.4,
        alignSelf: 'center',
        width: '80%'
    },
    imageContainer: {
        flex: 0.5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupButtonContainer: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center'
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