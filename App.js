import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginComponent from './LoginScreen'
import ProfileNavigator from './ProfileNavigation'
import SplashComponent from './Splash'
import SignUpComponent from './SignUpScreen'
import MMNavigator from './MMNavigation'
import AdminNavigator from './AdminNavigation'


const RootNavigator = StackNavigator({
    Splash: {
        screen:SplashComponent,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: LoginComponent,
        navigationOptions: {
            header: null
        }
    },
    SignUp:{
        screen:SignUpComponent,
        navigationOptions:{
            header:null
        }
    },
    Profile: {
        screen: ProfileNavigator,
        navigationOptions: {
            header: null
        }
    },
    MM:{
        screen:MMNavigator,
        navigationOptions:{
            header:null
        }
    },
    Admin:{
        screen:AdminNavigator,
        navigationOptions:{
            header:null
        }
    }
});

export default RootNavigator;
