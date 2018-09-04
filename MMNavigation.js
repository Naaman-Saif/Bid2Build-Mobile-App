import React from 'react';
import {StackNavigator} from 'react-navigation';

import MMLogHome from './LogHomeMM';
import MMBidScreen from './BidMM'

const MMNavigator = StackNavigator({
    MMHome:{
        screen:MMLogHome,
        navigationOptions:{
            title:"Your Bid Status",
            headerStyle: {
                backgroundColor: '#0061b0'
              },
            headerTitleStyle: {
                marginLeft:"30%",
                color:'#e27835'
            },
        }
    },
    MMRequest:{
        screen:MMBidScreen,
        navigationOptions:{
            title:"Request New Bid",
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
export default MMNavigator;