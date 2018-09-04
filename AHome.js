import React from 'react';
import {Text,View,StyleSheet,ImageBackground,Image,TouchableOpacity,Alert} from 'react-native';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import url from './API.js';
export default class AdminHome extends React.Component{
    constructor(){
        super();
        this.state = {
            load:0
        }
    }
    signOut = () =>{
        const navigation = this.props.navigation;
        this.setState({
            load:1
        })
        fetch(url.url+'/api/logout').then((res)=>{
            if(res.ok){
                navigation.navigate("Login");
            }else{
                Alert.alert("Some Error occured");
            }
        })
    }
    render(){
        const navigation = this.props.navigation;
        return(
            this.state.load == 0 ? <ImageBackground source={require('./Resources/Background.png')} style={{ width: "100%", height: "100%" }}>
                <View>
                <TouchableOpacity onPress={this.signOut} style={[styles.signUp,{alignSelf:'center',marginTop:'2%'}]}><Text style={styles.signUpText}>Sign Out!</Text></TouchableOpacity>
                </View>
                <View style={styles.container}>
                        <TouchableOpacity style={styles.first} onPress={()=>{navigation.navigate('Requests')}}>
                            <Image source={require('./Resources/request.png')} style={styles.nav}></Image>
                            <Text style={styles.text}>Requests</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.second} onPress={()=>{navigation.navigate('NewBid')}}>
                            <Image source={require('./Resources/PlaceBid.png')} style={styles.nav}></Image>
                            <Text style={styles.text}>Place Bid</Text>
                        </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                        <TouchableOpacity style={styles.third}>
                            <Image source={require('./Resources/viewBid.png')} style={styles.nav}></Image>
                            <Text style={styles.text}>View Bids</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourth}>
                            <Image source={require('./Resources/Stats.png')} style={styles.nav}></Image>
                            <Text style={styles.text}>Stats</Text>
                        </TouchableOpacity>
                </View>
            </ImageBackground>:<ImageBackground source={require('./Resources/Background.png')} style={{ width: "100%", height: "100%" }}><View style={{        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'}}><Bubbles size={10} color="#0061b0"></Bubbles></View></ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width:"45%",
        alignSelf:'flex-start',
        alignItems:'center',
        justifyContent:'center',
        marginTop:"-40%"
    },
    nav:{
        borderRadius:40,
        width:100,
        height:100
    },
    first:{
        alignSelf:'flex-end'
    },
    second:{
        alignSelf:'flex-end',
        marginTop:"30%"
    },
    container2: {
        flex: 1,
        flexDirection: 'column',
        width:"45%",
        alignSelf:'flex-end',
        alignItems:'center',
        justifyContent:'center',
        marginTop:"-182%"
    },
    third:{
        alignSelf:'flex-start'
    },
    fourth:{
        alignSelf:'flex-start',
        marginTop:"30%"
    },
    text:{
        alignSelf:'center',
        color:"#8f98a9"
    },
    signUp: {
        width: 250,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#e27835",
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Roboto',
    }
})