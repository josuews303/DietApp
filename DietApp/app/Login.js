import React from 'react';
import { ActivityIndicator,ListView,AsyncStorage,Alert,TextInput,StyleSheet,TouchableOpacity,ImageBackground,Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import Register from './app/components/Register';
import Measures from './app/components/Measures';
import CommonDataManager from './app/components/CommonDataManager';
class LoginScreen extends React.Component {
    static navigationOptions = {
      header: null
  }
  constructor(props){
    super(props);
    this.state = {
        Input_username:'',
        Input_password:'',
    }
  }
  
  
  render() {
  return (
    <ImageBackground source={require('./img/login.jpg')} style={styles.imageContainer}>
        <View style={styles.container}>
            <Text style={styles.tittle}>Easy Diet</Text>
            <TextInput style={styles.textInput} 
                //value = {this.state.Input_username}
                placeholder='Username' 
                onChangeText={(Input_username) => this.setState({Input_username})} 
                underlineColorAndroid='transparent'/>
  
            <TextInput secureTextEntry={true} 
               style={styles.textInput} 
                //value = {this.state.Input_password}
                placeholder='Password' 
                onChangeText={(Input_password) => this.setState({Input_password})} 
                underlineColorAndroid='transparent'/>
  
            <TouchableOpacity onPress={(this.UserLoginFunction.bind(this))} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={(this.UserRegisterFunction.bind(this))} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
  );
  }
  UserRegisterFunction = () =>{
    this.props.navigation.navigate('RegisterScreen');
  }
 
  UserLoginFunction = () =>{
  
  const { Input_username }  = this.state ;
  const { Input_password }  = this.state ;

  // When storing data.
let commonData = CommonDataManager.getInstance();
commonData.setUserID(Input_username);

  fetch('http://weaweawea.atwebpages.com/User_Login.php', {
  method: 'POST',
  headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json',
  },
  body: JSON.stringify({
  
   nick_usuario: Input_username,
  
   pass_usuario: Input_password
  
  })
  
  }).then((response) => response.json())
     .then((responseJson) => {
  
       // If server response message same as Data Matched
      if(responseJson === 'Data Matched')
       {
        Alert.alert('Your login was successful');
           //Then open Profile activity and send user email to profile activity.
           //this.props.navigation.navigate('Second', { Email: UserEmail });
          
           this.props.navigation.navigate('InputMeasure');
  
       }
       else{
  
         Alert.alert(responseJson);
       }
  
     }).catch((error) => {
       console.error(error);
     });
  
  }
  }
