import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Image,TextInput,TouchableOpacity,Keyboard,Alert } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class PlaceNewBid extends React.Component {
    constructor() {
        super();
        this.state={
            visibleHeight:"100%",
            isDateTimePickerVisible:false,
            isDateTimePickerVisible2:false,
        }
    }
    
      _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    
      _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
      _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
      }
      _showDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: true });
    
      _hideDateTimePicker2 = () => this.setState({ isDateTimePickerVisible2: false });
    
      _handleDatePicked2 = (date) => {
        console.log('A date has been picked: ', date);
        this._hideDateTimePicker();
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
                    <Image source={require('./Resources/Upload.png')} style={{ alignSelf: "flex-start",marginTop:"-10%", marginLeft: "15%", width: "30%", height: "20%", borderRadius: 30 }}></Image>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: "30%", borderBottomWidth: 2,borderBottomColor:"#fff" }}>
                        <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.loginInput} placeholder='Name' placeholderTextColor="#8f98a9" onChangeText={this.onChangePassword} onSubmitEditing={this.onSubmit} />
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20, borderBottomWidth: 2,borderBottomColor:"#fff" }}>
                        <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.loginInput} placeholder='Price' placeholderTextColor="#8f98a9" onChangeText={this.onChangePassword} onSubmitEditing={this.onSubmit}/>
                    </View>
                    <TouchableOpacity onPress={this._showDateTimePicker} style={[styles.signUp,{width:100,height:25}]}><Text style={styles.signUpText}>From</Text></TouchableOpacity>
                    <TouchableOpacity onPress={this._showDateTimePicker2} style={[styles.signUp,{width:100,height:25}]}><Text style={styles.signUpText}>To</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.signUp}><Text style={styles.signUpText}>Start Bid</Text></TouchableOpacity>
                </View>
                <DateTimePicker
                    mode='datetime'
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    is24Hour={false}
                />
                <DateTimePicker
                    mode='datetime'
                    isVisible={this.state.isDateTimePickerVisible2}
                    onConfirm={this._handleDatePicked2}
                    onCancel={this._hideDateTimePicker2}
                    is24Hour={false}
                    />
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