import React from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {StackNavigator} from 'react-navigation';

import AdminHome from './AHome';
import ARequest from './ARequests';
import PlaceNewBid from './ANewRequest';
import SBidRequest from './BidRequestPage';

const AdminNavigator = StackNavigator({
    AdmHome:{
        screen:AdminHome,
        navigationOptions:{
            title:"Admin Panel",
            headerStyle: {
                backgroundColor: '#0061b0'
              },
            headerTitleStyle: {
                marginLeft:"30%",
                color:'#e27835'
            },
        }
    },
    Requests:{
        screen:ARequest,
        navigationOptions:{
            title:"Bid Requests",
            headerStyle: {
                backgroundColor: '#0061b0'
              },
            headerTitleStyle: {
                marginLeft:"20%",
                color:'#e27835'
            },
        }
    },
    NewBid:{
        screen:PlaceNewBid,
        navigationOptions:{
            title:"Place New Bid",
            headerStyle: {
                backgroundColor: '#0061b0'
              },
            headerTitleStyle: {
                marginLeft:"20%",
                color:'#e27835'
            },
        }
    },
    BidRequest:{
        screen:SBidRequest,
        navigationOptions:{
            title:"Bid Request",
            headerStyle: {
                backgroundColor: '#0061b0'
              },
            headerTitleStyle: {
                marginLeft:"20%",
                color:'#e27835'
            },
        }
    }
});
export default AdminNavigator;