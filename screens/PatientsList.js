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

class PatientsList extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            patients: [],
            isOpen: false,
            username: '',
            menuShow: {
                flex: 1,
                width: window.width,
                height: window.height,
                backgroundColor: 'gray',
                padding: 20
            },
            menuHide: {
                flex: 1,
                width: window.width,
                height: window.height,
                backgroundColor: 'gray',
                padding: 20,
                display: 'none'
            }
        };
    }

    getFakeData = () => {

        let patients = [
            {
                user: {
                    first_name: 'firstName1',
                    last_name: 'lastName1',
                    id: 1
                }
            },
            {
                user: {
                    first_name: 'firstName2',
                    last_name: 'lastName2',
                    id: 2
                }
            },
            {
                user: {
                    first_name: 'firstName3',
                    last_name: 'lastName3',
                    id: 3
                }
            },
            {
                user: {
                    first_name: 'firstName4',
                    last_name: 'lastName4',
                    id: 4
                }
            },
            {
                user: {
                    first_name: 'firstName5',
                    last_name: 'lastName5',
                    id: 5
                }
            }
        ];

        this.setState({
            patients
        });

        let getUserDetails = async () => {
            try {
                userId = await AsyncStorage.getItem('user_id');
                token = await AsyncStorage.getItem('token');
                username = await AsyncStorage.getItem('username');   //REPLACE USER_ID WITH USERNAME

                console.log('token in patients list: ', token);

                if (userId === '' || token === '') {
                    this.props.navigation.navigate('Login');
                }

                this.setState({username, token});

            } catch(e) {
                // error reading value
            }
        };

        getUserDetails();

    };

    componentWillMount() {

        let userId = null, token, username;

        let getData = async () => {
            try {
                userId = await AsyncStorage.getItem('user_id');
                token = await AsyncStorage.getItem('token');
                username = await AsyncStorage.getItem('user_id');   //REPLACE USER_ID WITH USERNAME

                console.log('token in patients list: ', token);

                if (userId === '' || token === '') {
                    this.props.navigation.navigate('Login');
                }

                this.setState({username});

                axios.defaults.headers.common['Authorization'] = 'Token ' + token;

                axios({
                    method: 'get',
                    url: api + '/patients/?medic=' + userId
                })
                    .then(response => {
                        console.log('response');
                        console.log(response);
                        if (response.status === 200) {
                            this.setState({
                                patients: response.data
                            })
                        }
                    })
                    .catch(error => {
                        console.log('error');
                        console.log(error.response.data);
                    })

            } catch(e) {
                // error reading value
            }
        };
        //getData();
        this.getFakeData();
    }

    createPatientButton = (patient) => {
        return (
            <TouchableOpacity style={styles.patientButton} onPress={() => this.props.navigation.navigate('PatientDetails', {patientId: patient.id})}>
                <Text>{patient.user.first_name + ' ' + patient.user.last_name}</Text>
                <Text> > </Text>
            </TouchableOpacity>
        )
    };

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    render() {

        console.log('token in patients list: ', this.state.token);

        let menu = <Menu username={this.state ? this.state.username : ''} navigation={this.props ? this.props.navigation : null}/>;

        return (
            <SideMenu
                menu={menu}
            >
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            List of patients
                        </Text>
                    </View>

                    <View style={{flex: 0.1}}/>

                    <ScrollView style={styles.listContainer}>
                        {
                            this.state.patients.map(patient => {
                                return this.createPatientButton(patient)
                            })
                        }
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>Add patient</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SideMenu>
        );
    }
}
export default PatientsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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