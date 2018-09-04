import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage,ImageBackground} from 'react-native';
import * as Animatable from 'react-native-animatable';
import url from './API.js';
export default class SplashComponent extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
        const navigation = this.props.navigation;
        fetch(url.url+'/api/auth').then((res) => {
            res = JSON.parse(res._bodyText);
            switch(res.role){
                case "Bidder":
                    navigation.navigate("Profile");
                    break;
                case "MiddleMan":
                    navigation.navigate("MM");
                    break;
                case "Admin":
                    navigation.navigate("Admin");
                    break;
                default:
                    navigation.navigate("Login");
                    break;
            }
        })
    }
    render() {
        return (
            <ImageBackground source={require('./Resources/Background.png')} style={{ width: "100%", height: "100%" }}>
                <View style={styles.container}>
                    <Animatable.Image source={require('./Resources/logo.png')} style={{ width: 350, height: 250 }} animation="wobble" iterationCount="infinite"></Animatable.Image>
                </View>
            </ImageBackground>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
});