import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image, TouchableOpacity, ImageBackground,Alert } from 'react-native';

export default class MMLogHome extends React.Component {
    constructor() {
        super();
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground source={require('./Resources/Background.png')} style={{ height: "100%", width: "100%" }}>
                <View style={{ height: "74%", width: "100%", marginTop: "12%" }}>
                    <View style={styles.container}>
                        <View style={styles.view}>
                            <TouchableOpacity  onPress={() => navigate('BidRequest')}><Image source={require('./Resources/Item.png')} style={styles.ItemImage}></Image></TouchableOpacity>
                            <Text style={styles.name}>Item Name:</Text>
                            <Text style={styles.price}>Item Price:</Text>
                            <Image source={require('./Resources/JohnDoe.png')} style={styles.JohnDoe}></Image>
                        </View>
                        <View style={styles.view}>
                        <TouchableOpacity  onPress={() => navigate('BidRequest')}><Image source={require('./Resources/Item.png')} style={styles.ItemImage}></Image></TouchableOpacity>
                            <Text style={styles.name}>Item Name:</Text>
                            <Text style={styles.price}>Item Price:</Text>
                            <Image source={require('./Resources/JohnDoe.png')} style={styles.JohnDoe}></Image>
                        </View>
                        <View style={styles.view}>
                        <TouchableOpacity  onPress={() => navigate('BidRequest')}><Image source={require('./Resources/Item.png')} style={styles.ItemImage}></Image></TouchableOpacity>
                            <Text style={styles.name}>Item Name:</Text>
                            <Text style={styles.price}>Item Price:</Text>
                            <Image source={require('./Resources/JohnDoe.png')} style={styles.JohnDoe}></Image>
                        </View>
                    </View>
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
    signUp: {
        width: 250,
        height: 50,
        borderRadius: 50,
        marginTop: 30,
        backgroundColor: "#e27835",
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Roboto',
    },
    ItemImage: {
        width: "40%",
        height: "80%",
        borderRadius: 20,
        alignSelf: 'flex-start'
    },
    JohnDoe: {
        width: "14%",
        height: "25%",
        borderRadius: 20,
        marginLeft: "50%"
    },
    view:{ 
        height: "30%",
        width: "70%" 
    },
    name:{ 
        marginTop: "-40%",
        marginLeft: "50%",
        color: '#fff'
    },
    price:{ 
        marginLeft: "50%", 
        color: '#fff'
    }
});