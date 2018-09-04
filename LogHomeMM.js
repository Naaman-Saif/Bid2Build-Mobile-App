import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Image, TouchableOpacity, ImageBackground,Alert } from 'react-native';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import url from './API.js';
export default class MMLogHome extends React.Component {
    constructor() {
        super();
        this.state = {
            data:'',
            load:0
        }
    }
    componentWillMount = () =>{
        fetch(url.url+'/api/myBids').then((res)=>{

        });
    }
    signOut = () =>{
        const navigation = this.props.navigation;
        this.setState({load:1})
        fetch(url.url+'/api/logout').then((res) => {
            if (res.ok) {
                navigation.navigate("Login");
            } else {
                if (res.status == 400) {
                    Alert.alert("Account Already Exists");
                } else {
                    Alert.alert("Some Error occured");
                }
            }
        }).catch((error) => {
            console.log(error)
        });
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground source={require('./Resources/Background.png')} style={{ height: "100%", width: "100%" }}>
                {this.state.load == 0 ?<View style={{ height: "74%", width: "100%",marginTop:"18%" }}>
                    <View style={styles.container}>
                        {(this.state.data[0])?<View style={styles.view}>
                            <Image source={require('./Resources/Item.png')} style={styles.ItemImage}></Image>
                            <Text style={styles.name}>Item Name:</Text>
                            <Text style={styles.price}>Item Price:</Text>
                            <Image source={require('./Resources/JohnDoe.png')} style={styles.JohnDoe}></Image>
                        </View>:<View style={styles.view}><Text>Nothing yet accepted</Text></View>}
                        {(this.state.data[1]) ? <View style={styles.view}>
                            <Image source={require('./Resources/Item.png')} style={styles.ItemImage}></Image>
                            <Text style={styles.name}>Item Name:</Text>
                            <Text style={styles.price}>Item Price:</Text>
                            <Image source={require('./Resources/JohnDoe.png')} style={styles.JohnDoe}></Image>
                        </View>:null}
                        {(this.state.data[2]) ? <View style={styles.view}>
                            <Image source={require('./Resources/Item.png')} style={styles.ItemImage}></Image>
                            <Text style={styles.name}>Item Name:</Text>
                            <Text style={styles.price}>Item Price:</Text>
                            <Image source={require('./Resources/JohnDoe.png')} style={styles.JohnDoe}></Image>
                        </View> : null}
                        <TouchableOpacity style={styles.signUp} onPress={() => navigate('MMRequest')}><Text style={styles.signUpText}>Place New Bid</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.signUp} onPress={this.signOut}><Text style={styles.signUpText}>SignOut</Text></TouchableOpacity>
                    </View>
                </View>:<View style={styles.container}><Bubbles size={10} color="#0061b0"></Bubbles></View>}
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