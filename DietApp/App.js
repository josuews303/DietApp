import React from 'react';
import { Alert,TextInput,StyleSheet,TouchableOpacity,ImageBackground,Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import Register from './app/components/Register';
  
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
           //this.props.navigation.navigate('RegisterScreen');
  
       }
       else{
  
         Alert.alert(responseJson);
       }
  
     }).catch((error) => {
       console.error(error);
     });
  
  }
  }
  class RegisterScreen extends React.Component {
    static navigationOptions = {
      title:'Register User'
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
      <Register/>
    );
    }
  
  }
  
  const RootStack = createStackNavigator(
    {
      
      LoginScreen:LoginScreen,
      RegisterScreen:RegisterScreen
      
    },
    {
      initialRouteName: 'LoginScreen',
    }
  );
  
  export default class App extends React.Component {
    render() {
      return <RootStack />;
    }
  }
  const styles = StyleSheet.create({
    wrapper: {
        flex:1,
    },
    imageContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
        width: '100%', height: '100%'
        //justifyContent: 'center',
      },
      container:{
        alignItems: 'center',
      },
      button:{
        width:300,
        height:50,
        backgroundColor:'red',
        alignItems:'center',
        marginTop:40,
        marginBottom:10,
        borderRadius:8,
        borderWidth:1
      },
      buttonText:{
        fontSize:20,
        color:'white',
        textAlign:'center',
        alignSelf:'stretch',
        margin: 10
      },
      tittle:{
        fontSize:30,
        marginTop:50,
        color:'white',
        //backgroundColor:'rgba{0,0,0,0}'
      },
    textInput:{
        marginTop:20,
        alignSelf:'stretch',
        padding: 16,
        backgroundColor:'#fff',
        textAlign:'center',
        marginBottom:7,
        height:50,
        width:300,
        borderWidth:1,
        borderColor:'#2196F3',
        borderRadius:5
    },
   
  });
  