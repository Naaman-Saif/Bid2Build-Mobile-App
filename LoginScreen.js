import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, AsyncStorage, Alert, BackHandler, ImageBackground, CheckBox } from 'react-native';
import { Font } from 'expo';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import url from './API.js';

export default class LoginComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            load: 0,
            remember: false
        }
    }
    async componentDidMount() {
        BackHandler.addEventListener('hadrwareBackPress', this.handleBackHandler);
    }
    handleBackHandler() {
        BackHandler.exitApp();
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hadrwareBackPress', this.handleBackHandler);

    }
    onChangeUser = (value) => {
        this.setState({
            username: value
        })
    }
    onChangePassword = (value) => {
        this.setState({
            password: value
        })
    }
    onSubmit = () => {
        this.setState({
            load: 1
        });
        const navigation = this.props.navigation;
        data = {
            username:this.state.username,
            password:this.state.password
        }
        fetch(url.url+'/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => {
            if (res) {
                console.log(res._bodyText);
                user = JSON.parse(res._bodyText);
                switch(user.role){
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
                        Alert.alert("User/Password do not match");
                        this.setState({
                           load:0 
                        });
                        break;
                }
            } else {
                if (res.status == 400) {
                    Alert.alert("Account Already Exists");
                } else {
                    Alert.alert("Some Error occured");
                }
            }
        }).catch((error) => {
            Alert.alert(error);
            this.setState({
                load:0
            })
        });
    }
    render() {
        const { navigate } = this.props.navigation;

        return ((this.state.load == 0 ? <ImageBackground source={require('./Resources/Background.png')} style={{ width: "100%", height: "100%" }}><View style={styles.container}>
            <Image style={{ height: 75, width: 60 }} source={require('./Resources/LogLogo.png')}></Image>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 70, borderBottomWidth: 1 }}>
                <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.loginInput} placeholder='Username' onChangeText={this.onChangeUser} placeholderTextColor="#8f98a9" />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20, borderBottomWidth: 1 }}>
                <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.loginInput} placeholder='Password' placeholderTextColor="#8f98a9" onChangeText={this.onChangePassword} onSubmitEditing={this.onSubmit} secureTextEntry={true} />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
                <CheckBox style={{ marginLeft: "14%" }} value={this.state.remember} onValueChange={() => this.setState({ remember: !this.state.remember })} />
                <Text style={{ marginTop: "2%", flex: 5, color: "#8f98a9" }}>Remember Me</Text>
                <TouchableOpacity style={{ flex: 7, marginTop: "2%" }}><Text style={{ color: "#8f98a9" }}>Forgot Password? </Text></TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.signUp} onPress={this.onSubmit}><Text style={styles.signUpText}>Login!</Text></TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 50, marginLeft: 40 }} onPress={() => navigate("SignUp")}><Text style={{ color: "#8f98a9" }}>Need to register an Account?</Text></TouchableOpacity>
            </View>
        </View></ImageBackground> : <ImageBackground source={require('./Resources/Background.png')} style={{ width: "100%", height: "100%" }}><View style={styles.container}><Bubbles size={10} color="#0061b0" /></View></ImageBackground>));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    header: {
        marginTop: "15%"
    },
    head: {
        fontSize: 40,
        color: "#000",
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
        fontSize: 25,
        fontFamily: 'Roboto'
    },
    loginInput: {
        width: 250,
        fontSize: 20,
        fontFamily: 'Roboto'
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
        marginTop: 10
    },
});