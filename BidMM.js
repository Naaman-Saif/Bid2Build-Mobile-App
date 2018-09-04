import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { ImagePicker } from 'expo';
import FitImage from 'react-native-fit-image';
import Bubbles from 'react-native-loader';
import url from './API.js';
import futch from './futch';

export default class MMBidScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            visibleHeight: "100%",
            image: './Resources/Upload.png',
            Name: '',
            price: '',
            uploaded: 0
        }
    }
    async componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
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
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        console.log(result);
        if (!result.cancelled) {
            this.setState({
                uploaded: 1,
                image: result.uri
            });
        }
    }
    onChangeName = (value) => {
        this.setState({
            Name: value
        })
    }
    onChangePrice = (value) => {
        this.setState({
            price: value
        })
    }
    sendImage = (user) => {
        const navigation = this.props.navigation;
        const data = new FormData();
        data.append('username', user.username);
        data.append('photo', {
          uri: this.state.image ,
          type: 'image/jpeg',
          name: 'BidItem'
        });
        data.append('currentBid',this.state.price);
        futch(url.url + '/api/requestBid', {
            method: 'post',
            body: data
          }, (e) => {
            const progress = e.loaded / e.total;
            console.log(progress);
            this.setState({
              progress: progress
            });
          }).then((res) => res._response=="success" ? navigation.navigate('MMHome'):Alert.alert("Some Error occured"), (e) => console.log(e))
    }
    sendData = () => {
        const navigation = this.props.navigation;
        if (this.state.image != './Resources/Upload.png') {
            Alert.alert("Your request is being uploaded");
            fetch(url.url+'/api/auth').then((user) => {
                console.log(user);
                user = JSON.parse(user._bodyText);
                this.sendImage(user);
            });
        } else {
            Alert.alert("Please enter a Photo");
        }
    }
    render() {
        return (
            <ImageBackground style={{ height: this.state.visibleHeight, width: "100%" }} source={require('./Resources/Background.png')}>
                <View style={styles.container}>
                    <TouchableOpacity style={{ alignSelf: "flex-start", marginTop: "-20%", marginLeft: "15%", width: "75%", height: "30%" }} onPress={this._pickImage}>
                        {(this.state.uploaded == 0 ? <Image style={{ width: "100%", height: "100%", borderRadius: 30 }} source={require('./Resources/Upload.png')}></Image> : <FitImage
                            source={{ uri: this.state.image }}
                            originalWidth={2000}
                            originalHeight={2000}
                        />)}
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: "30%", borderBottomWidth: 2, borderBottomColor: "#fff" }}>
                        <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.loginInput} placeholder='Name' placeholderTextColor="#8f98a9" onChangeText={this.onChangeName} />
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20, borderBottomWidth: 2, borderBottomColor: "#fff" }}>
                        <TextInput keyboardType='numeric' underlineColorAndroid='rgba(0,0,0,0)' style={styles.loginInput} placeholder='Price' placeholderTextColor="#8f98a9" onChangeText={this.onChangePrice} />
                    </View>
                    <TouchableOpacity style={styles.signUp} onPress={this.sendData}><Text style={styles.signUpText}>Send</Text></TouchableOpacity></View></ImageBackground>
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
        width: 250,
        fontSize: 20,
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
})