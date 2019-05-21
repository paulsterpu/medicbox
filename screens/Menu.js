import React from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: '#DCDCDC',
        padding: 20
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
});

function logout(navigation) {

    let userId = null, token, userName;

    let getData = async () => {
        try {
            userId = await AsyncStorage.getItem('user_id');
            token = await AsyncStorage.getItem('token');
            userName = await AsyncStorage.getItem('user_id');   //REPLACE USER_ID WITH USERNAME

            await AsyncStorage.setItem('user_id', '');
            await AsyncStorage.setItem('token', '');
            await AsyncStorage.setItem('username', '');

            navigation.navigate('Login');

        } catch(e) {
            // error reading value
        }
    };

    getData();
}

export default function Menu({ username, navigation }) {

    return (
        <ScrollView scrollsToTop={false} style={styles.menu}>

            <Text>
                Logged in as:
            </Text>

            <Text>
                {username}
            </Text>

            <TouchableOpacity onPress={() => {logout(navigation)}}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>


{/*            <Text
                style={styles.item}
            >
                Contacts
            </Text>*/}
        </ScrollView>
    );
}