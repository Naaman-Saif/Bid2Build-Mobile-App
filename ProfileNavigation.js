import React from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {StackNavigator} from 'react-navigation';

import lHomeComponent from './LogHome';
import BidScreen from './BidComponent';    
import SearchScreen from './SearchComponent';

const ProfileNavigator = StackNavigator({
    lHome:{
        screen:lHomeComponent,
        navigationOptions:{
            title:"Current Bids",
            headerStyle: {
                backgroundColor: '#0061b0'
              },
            headerTitleStyle: {
                marginLeft:"30%",
                color:'#e27835'
            },
        }
    },
    Bid:{
        screen:BidScreen,
        navigationOptions:{
            title:"Your Bid",
            headerStyle: {
                backgroundColor: '#0061b0'
              },
            headerTitleStyle: {
                marginLeft:"15%",
                color:'#e27835'
            },
        }
    },
    Search:{
        screen:SearchScreen,
        navigationOptions:{
            title:"Hot Bids",
            headerStyle: {
                backgroundColor: '#0061b0'
              },
            headerTitleStyle: {
                marginLeft:"15%",
                color:'#e27835'
            },
        }
    }
});
export default ProfileNavigator;