/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import PatientsList from './screens/PatientsList';
import RegisterScreen from './screens/RegisterScreen';
import SuccessfulRegisterScreen from './screens/SuccessfulRegisterScreen';
import PatientDetailsScreen from './screens/PatientDetailsScreen';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
          <AppContainer/>
    );
  }
}

class Home extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Home</Text>
            </View>
        );
    }
}

const AppStackNavigator = createStackNavigator({
    Login: LoginScreen,
    PatientsList: PatientsList,
    Register: RegisterScreen,
    SuccessfulRegister: SuccessfulRegisterScreen,
    PatientDetails: PatientDetailsScreen
});

const AppContainer = createAppContainer(AppStackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
