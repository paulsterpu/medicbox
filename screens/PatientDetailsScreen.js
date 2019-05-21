import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button, TouchableOpacity, ScrollView, Image
} from "react-native";

import Menu from './Menu';

import SideMenu from  'react-native-side-menu';
import AsyncStorage from "@react-native-community/async-storage";

let generalInfo = 'https://i.imgur.com/905ZfId.jpg';
let personalAntecedents = 'https://i.imgur.com/Vx57EDh.jpg';
let vaccines = 'https://i.imgur.com/siUSlOD.jpg';
let allergies = 'https://i.imgur.com/YJYXGZy.jpg';
let diagnostics = 'https://i.imgur.com/L3Air3x.jpg';
let treatments = 'https://i.imgur.com/ue4FX25.jpg';

class PatientDetailsScreen extends Component {

    static navigationOptions = {
    };

    constructor(props) {
        super(props);
        this.state = {
            menuEntries: []
        };
    }

    componentWillMount() {

        let username = null;

        let getData = async () => {
            try {
                username = await AsyncStorage.getItem('user_id');   //REPLACE USER_ID WITH USERNAME

                console.log('username: ', username);

                if (username === '' || username === null) {
                    this.props.navigation.navigate('Login');
                }

                this.setState({username});

            } catch(e) {
                // error reading value
            }
        };
        getData();
        this.getMenuEntries();
    }

    getMenuEntries = () => {

        let menuEntries = [
            {
                label: 'General information',
                icon: generalInfo,
                screen: 'GeneralInformation'
            },
            {
                label: 'Personal antecedents',
                icon: personalAntecedents,
                screen: 'PersonalAntecedents'
            },
            {
                label: 'Vaccines',
                icon: vaccines,
                screen: 'Vaccines'
            },
            {
                label: 'Allergies',
                icon: allergies,
                screen: 'Allergies'
            },
            {
                label: 'Diagnostics',
                icon: diagnostics,
                screen: 'Diagnostics'
            },
            {
                label: 'Treatments',
                icon: treatments,
                screen: 'Treatments'
            }
        ];

        this.setState({
            menuEntries
        })
    };

    createMenuEntry = (menuEntry) => {
        return (
            <TouchableOpacity style={styles.patientButton} onPress={() => this.props.navigation.navigate(menuEntry.screen, {patientId: this.props.navigation.getParam('patientId', '')})}>
                <Image
                    style={{width: 20, height: 20}}
                    source={{uri: menuEntry.icon}}
                />
                <Text>{menuEntry.label}</Text>
                <Text> > </Text>
            </TouchableOpacity>
        )
    };

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    render() {

        let menu = <Menu username={this.state ? this.state.username : ''} navigation={this.props ? this.props.navigation : null}/>;

        return (
            <SideMenu
                menu={menu}
            >
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            Patient Details
                        </Text>
                    </View>

                    <View style={{flex: 0.1}}/>

                    <ScrollView style={styles.listContainer}>
                        {
                            this.state.menuEntries.map(menuEntry => {
                                return this.createMenuEntry(menuEntry)
                            })
                        }
                    </ScrollView>
                </View>
            </SideMenu>
        );
    }
}
export default PatientDetailsScreen;

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
        flex: 0.75,
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