import React from 'react';
import { StyleSheet, ScrollView, Text, View, AsyncStorage, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import FitImage from 'react-native-fit-image';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import url from './API.js';
export default class ARequest extends React.Component {
    constructor() {
        super();
        this.state = {
            data: ''
        }
    }
    componentWillMount = () => {
        fetch(url.url+'/api/admin/requestedBids').then((res) => {
            if (res) {
                this.setState({
                    data: JSON.parse(res._bodyText)
                })
                var newData = this.state.data
                for (i = 0; i < this.state.data.length; i++) {
                    var newLink = newData[i].image.replace("", '');
                    newData[i].image = newLink;
                }
                this.setState({
                    data: newData
                })
            } else {
                Alert.alert("Error recieving Requests");
            }
        })
    }
    click = (i)=>{
        const navigation = this.props.navigation
        AsyncStorage.setItem("currentItem",JSON.stringify(this.state.data[i]));
        AsyncStorage.getItem("currentItem",(err,item)=>{
            item = JSON.parse(item);
            console.log(item);
        });
        navigation.navigate('BidRequest');
    }
    render() {
        const { navigate } = this.props.navigation;
        setTimeout(()=>{
            if(this.state.data==''){
                Alert.alert("Nothing New to Display");
                navigate("AdmHome");
            }
        },1000*60);
        return (
            <ImageBackground source={require('./Resources/Background.png')} style={{ height: "100%", width: "100%" }}>
                {this.state.data != '' ? <View style={{ height: "74%", width: "100%", marginTop: "12%" }}>
                    <View style={styles.container}>
                        {(this.state.data[0])?<View style={styles.view}>
                            <TouchableOpacity onPress={()=>this.click(0)} style={styles.ItemImage}><FitImage originalHeight={225} originalWidth={300} source={{ uri: url.url+'/' + this.state.data[0].image }}></FitImage></TouchableOpacity>
                            <Text style={styles.name}>Item Price:{this.state.data[0].currentBid}</Text>
                            <Text style={styles.price}>Username:{this.state.data[0].username}</Text>
                        </View>:<View style={styles.view}><Text>Nothing New here Folks!</Text></View>}
                        {(this.state.data[1])?<View style={styles.view}>
                            <TouchableOpacity onPress={()=>this.click(1)} style={styles.ItemImage}><FitImage originalHeight={225} originalWidth={300} source={{ uri: url.url + '/' + this.state.data[1].image }}></FitImage></TouchableOpacity>
                            <Text style={styles.name}>Item Price:{this.state.data[1].currentBid}</Text>
                            <Text style={styles.price}>Username:{this.state.data[1].username}</Text>
                        </View>:null}
                        {(this.state.data[2])?<View style={styles.view}>
                            <TouchableOpacity onPress={()=>this.click(2)} style={styles.ItemImage}><FitImage originalHeight={225} originalWidth={300} source={{ uri: url.url + '/' + this.state.data[2].image }}></FitImage></TouchableOpacity>
                            <Text style={styles.name}>Item Price:{this.state.data[2].currentBid}</Text>
                            <Text style={styles.price}>Username:{this.state.data[2].username}</Text>
                        </View>:null}
                    </View>
                </View> : <View style={styles.container}><Bubbles size={10} color="#0061b0"></Bubbles></View>}
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
        width: "45%",
        height: "85%",
        borderRadius: 20
    },
    JohnDoe: {
        width: "14%",
        height: "25%",
        borderRadius: 20,
        marginLeft: "50%"
    },
    view: {
        height: "30%",
        width: "70%"
    },
    name: {
        marginTop: "-40%",
        marginLeft: "50%",
        color: '#fff'
    },
    price: {
        marginLeft: "50%",
        color: '#fff'
    }
});