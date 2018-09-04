import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image,TextInput,TouchableOpacity,Keyboard,Alert } from 'react-native';

export default class BidScreen extends React.Component {
    constructor() {
        super();
        this.state={
            visibleHeight:"100%"
        }
    }
    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
      }
    
      componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
      }
      _keyboardDidShow = (e)=> {
        let newSize = e.endCoordinates.height;
        this.setState({
            visibleHeight: newSize
          })
      
      }
    
      _keyboardDidHide= (e)=> {
        this.setState({
            visibleHeight: "100%"
          })
      }
    render() {
        return (
            <ImageBackground style={{height:this.state.visibleHeight, width: "100%" }} source={require('./Resources/Background.png')}>
                <View style={styles.container}>
                    <Image source={require('./Resources/pic.png')} style={{ alignSelf: "flex-start",marginTop:"-5%", marginLeft: "10%", width: "80%", height: "45%", borderRadius: 60 }}></Image>
                    <Image source={require('./Resources/JohnDoe.png')} style={styles.johndoe} />
                    <Text style={[styles.johndoe,{alignSelf:'flex-end',marginRight:'29%',fontSize:20,color:'#fff',marginTop:'-13%'}]}>John Doe</Text>
                    <Text style={[styles.johndoe,{alignSelf:'flex-end',marginRight:'29%',fontSize:16,color:'#0f0',marginTop:'-5%'}]}>120</Text>
                    <View style={{ flexDirection: 'row',marginTop:'2%',marginLeft:"-38%",borderWidth: 2,borderColor:"#ff0" }}>
                        <Text style={[styles.loginInput,{width:"25%"}]}>Rs.500</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: "-9%",marginLeft:"35%",borderWidth: 2,borderColor:"#0f0"}}>
                        <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={[styles.loginInput,{color:"#0f0"}]} placeholder='Your Price' placeholderTextColor="#080" onChangeText={this.onChangePassword} onSubmitEditing={this.onSubmit}/>
                    </View>
                    <TouchableOpacity style={styles.signUp}><Text style={styles.signUpText}>Push</Text></TouchableOpacity>
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
        width: "45%",
        fontSize: 20,
        color:"#e27835",
    },
    johndoe:{
        width: "14%",
        height: "10%",
        borderRadius: 20,
        alignSelf:'flex-start',
        marginTop:'10%',
        marginLeft:"20%"
    },
    signUp: {
        width: 50,
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