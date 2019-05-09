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

    componentWillMount() {

        let userId = null;

        let getData = async () => {
            try {
                userId = await AsyncStorage.getItem('user_id');
                if(userId == null) {
                    this.props.navigation.navigate('Login');
                }

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
                        console.log(error)
                    })

            } catch(e) {
                // error reading value
            }
        };
        getData();
    }

    createPatientButton = (patient) => {
        return (
            <TouchableOpacity style={styles.patientButton}>
                <Text>{patient.user.first_name + ' ' + patient.user.last_name}</Text>
                <Text> > </Text>
            </TouchableOpacity>
        )
    };

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

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
                    <TouchableOpacity
                            style={styles.buttonStyle}><Text style={styles.buttonText}>Add patient</Text></TouchableOpacity>
                </View>
            </View>
        </SideMenu>
        );
    }
}
export default PatientsList;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: '80%',
        flex: 0.15,
        borderBottomWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 30,
        color: 'black'
    },
    buttonContainer: {
        flex: 0.15,
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        width: '50%',
        height: 30,
        backgroundColor: 'red',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    listContainer: {
        width: '80%',
        flex: 0.6,
        alignSelf: 'center'
    },
    patientButton: {
        width: '100%',
        height: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'row',
        marginBottom: 20
    }
});