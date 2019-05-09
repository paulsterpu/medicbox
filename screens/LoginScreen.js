import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button, TextInput, TouchableOpacity
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
            password: ''
        };
    }

    componentWillMount() {
        let getData = async () => {
            try {
                const value = await AsyncStorage.getItem('token');
                if(value !== null) {
                    this.props.navigation.navigate('PatientsList');
                }
            } catch(e) {
                // error reading value
            }
        };
        getData();
    }

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
            console.log(error)
            this.setState({
                invalidCredentials: true
            })

        })
    };

    render() {

        return (
            <View style={styles.container}>
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
                        onPress={this.login}><Text style={styles.loginButtonText}>Sign In</Text></TouchableOpacity>
            </View>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginField: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        width: '80%'
    },
    loginButton: {
        top: 80,
        width: '80%',
        borderWidth: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonText: {
    }
});