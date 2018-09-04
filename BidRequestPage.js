import React from 'react';
import { Text, View, StyleSheet,AsyncStorage, ImageBackground, Image, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import FitImage from 'react-native-fit-image';
import url from './API.js';
export default class SBidRequest extends React.Component {
    constructor() {
        super();
        this.state = {
            visibleHeight: "100%",
            data:''
        }
    }
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        AsyncStorage.getItem("currentItem",(err,item)=>{
            if(err)console.log(err);
            item = JSON.parse(item);
            this.setState({
                data:item
            })
            console.log(this.state.data);
        })
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        AsyncStorage.removeItem("currentItem");
    }
    _keyboardDidShow = (e) => {
        let newSize = e.endCoordinates.height;
        this.setState({
            visibleHeight: newSize
        })

    }

    _keyboardDidHide = (e) => {
        this.setState({
            visibleHeight: "100%"
        })
    }
    onResponse = (e) =>{
        const navigation = this.props.navigation;
        let data = {
            _id:this.state.data._id,
            approved:true
        }
        if(e==true){
            fetch(url.url+'/api/admin/changeBidStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then((res) => {
                if(res.ok==true){
                    Alert.alert("Approved!");
                    navigation.navigate("Requests");
                }
            }).catch((error) => {
                console.log(error)
            });
        }else{
            fetch(url.url+'/api/admin/changeBidStatus',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({_id:this.state.data._id,approved:false})
            }).then((res)=>{
                if(res.ok==true){
                    Alert.alert("Declined!");
                    navigation.navigate("Requests");
                }
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
    render() {
        data = this.state.data;
        return (
            <ImageBackground style={{ height: this.state.visibleHeight, width: "100%" }} source={require('./Resources/Background.png')}>
                <View style={styles.container}>
                    <View style={{width:'80%',height:'50%'}}><FitImage originalHeight={10} originalWidth={13} source={{uri:url.url+'/' + this.state.data.image}}></FitImage></View>
                    <Text style={{fontSize:20,color:'#fff'}}>Username:  {this.state.data.username}</Text>
                    <Text style={{fontSize:15,color:'#fff'}}>Proposed Price:  {this.state.data.currentBid}</Text>
                    <TouchableOpacity onPress={()=>this.onResponse(true)} style={styles.signUp}><Text style={styles.signUpText}>Approve</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.signUp} onPress={()=>this.onResponse(false)}><Text style={styles.signUpText}>Decline</Text></TouchableOpacity>
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
    loginInput: {
        fontSize: 20,
        color: "#e27835",
    },
    signUp: {
        width: 250,
        height: 50,
        borderRadius: 50,
        marginTop: 10,
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