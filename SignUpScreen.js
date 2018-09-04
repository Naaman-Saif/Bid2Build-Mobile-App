import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, AsyncStorage, Alert, Button, ScrollView, ImageBackground, Keyboard } from 'react-native';
import { Font } from 'expo';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import url from './API.js';
export default class SignUpUserComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            user: '',
            password: '',
            repeatPassword: '',
            load: 0,
            PicHeight: "28%",
            totalHeight: "100%"
        }
    }
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        FetchUserData();
    }
    _keyboardDidShow = (e) => {
        let newSize = e.endCoordinates.height;
        this.setState({
            PicHeight: 0,
            totalHeight: newSize
        })

    }

    _keyboardDidHide = (e) => {
        this.setState({
            PicHeight: "28%",
            totalHeight: "100%"
        })
    }
    onChangeEmail = (value) => {
        this.setState({
            email: value
        });
    }
    onChangeUser = (value) => {
        this.setState({
            user: value
        });
    }
    onChangePassword = (value) => {
        this.setState({
            password: value
        });
    }
    onChangePasswordAgain = (value) => {
        this.setState({
            repeatPassword: value
        });
    }
    onSubmit = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.setState({
            load: 1
        });
        if (this.state.user.length > 6) {
            if (reg.test(this.state.email)) {
                if (this.state.password.length > 6) {
                    if (this.state.password == this.state.repeatPassword) {
                        var data = {
                            username: this.state.user,
                            password: this.state.password,
                            email: this.state.email,
                            role: "Bidder"
                        };
                        const navigation = this.props.navigation;
                        fetch(url.url+'/api/signup', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data)
                        }).then((res) => {
                            if (res.ok) {
                                navigation.navigate("Login");
                            } else {
                                if(res.status==400){
                                Alert.alert("Account Already Exists");
                                }else{
                                    Alert.alert("Some Error occured");
                                }
                            }
                        }).catch((error) => {
                            console.log(error)
                        });
                    } else {
                        Alert.alert("Passwords do not match");
                        this.setState({
                            load: 0
                        })
                    }
                } else {
                    Alert.alert("Enter a Password above 6 characters");
                    this.setState({
                        load: 0
                    })
                }
            } else {
                Alert.alert("Please Enter a Valid Email Address");
                this.setState({
                    load: 0
                })
            }
        } else {
            Alert.alert("Username should be greater than 6 characters");
            this.setState({
                load: 0
            })
        }
    }
    onSubmitMM = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.setState({
            load: 1
        });
        if (this.state.user.length > 6) {
            if (reg.test(this.state.email)) {
                if (this.state.password.length > 6) {
                    if (this.state.password == this.state.repeatPassword) {
                        var data = {
                            username: this.state.user,
                            password: this.state.password,
                            email: this.state.email,
                            role: "MiddleMan"
                        };
                        const navigation = this.props.navigation;
                        fetch(url.url+'/api/signup', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data)
                        }).then((res) => {
                            if (res._bodyText == "{\"sucesss\":true}") {
                                navigation.navigate("Login");
                            } else {
                                console.log(res);
                                Alert.alert("Some Error Occured, Please try again later");
                            }
                        }).catch((error) => {
                            console.log(error)
                        });
                    } else {
                        Alert.alert("Passwords do not match");
                        this.setState({
                            load: 0
                        })
                    }
                } else {
                    Alert.alert("Enter a Password above 6 characters");
                    this.setState({
                        load: 0
                    })
                }
            } else {
                Alert.alert("Please Enter a Valid Email Address");
                this.setState({
                    load: 0
                })
            }
        } else {
            Alert.alert("Username should be greater than 6 characters");
            this.setState({
                load: 0
            })
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            this.state.load == 0 ? <ImageBackground source={require('./Resources/Background.png')} style={{ height: "100%", width: "100%" }}><View style={styles.container}>
                <Image source={require('./Resources/LogLogo.png')} style={{ height: this.state.PicHeight, width: "30%" }} />
                <View style={styles.form} style={{ marginTop: "7%" }}>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderBottomWidth: 1 }}>
                            <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.loginInput} placeholder='Email' placeholderTextColor="#8f98a9" onChangeText={this.onChangeEmail} />
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderBottomWidth: 1 }}>
                            <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.signUpInput} placeholder='Username' placeholderTextColor="#8f98a9" onChangeText={this.onChangeUser} />
                        </View><View style={{ flexDirection: 'row', flexWrap: 'wrap', borderBottomWidth: 1 }}>
                            <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.signUpInput} placeholder='Password' placeholderTextColor="#8f98a9" secureTextEntry={true} onChangeText={this.onChangePassword} />
                        </View><View style={{ flexDirection: 'row', flexWrap: 'wrap', borderBottomWidth: 1 }}>
                            <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.signUpInput} placeholder='Repeat Password' placeholderTextColor="#8f98a9" secureTextEntry={true} onChangeText={this.onChangePasswordAgain} />
                        </View>
                        {(this.state.PicHeight >= "100%" ? <View><TouchableOpacity style={styles.signUp} onPress={this.onSubmit}><Text style={styles.signUpText}>SignUp As Bidder</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.signUp} onPress={this.onSubmitMM}><Text style={styles.signUpText}>SignUp as MiddleMan</Text></TouchableOpacity></View> : null)}
                    </ScrollView>
                </View>
            </View></ImageBackground> : <ImageBackground source={require('./Resources/Background.png')} style={{ width: "100%", height: "100%" }}><View style={styles.container}><Bubbles size={10} color="#0061b0" /></View></ImageBackground>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: "45%"
    },
    header: {
        marginTop: -20
    },
    head: {
        fontSize: 40,
        color: "#fff",
        marginBottom: 20
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
    loginInput: {
        width: 250,
        fontSize: 20,
        fontFamily: 'Roboto',
    },
    signUpPage: {
        width: 250,
        height: 50,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "#FFF",
        backgroundColor: "#FFF",
        alignItems: 'center'
    },
    signUpInput: {
        width: 250,
        fontSize: 20,
        marginTop: 10,
        fontFamily: 'Roboto'
    },
    signUpFb: {
        width: 250,
        height: 50,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "#FFF",
        marginTop: 30,
        backgroundColor: "#4267b2",
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpFbText: {
        color: '#FFF',
        fontSize: 15,
    }
});