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
  const arrayData = [];
  const data = {
    id_usuario: Input_username
  }
  arrayData.push(data);
  try {
    AsyncStorage.getItem('database_form').then((value)=>{
      if(value !== null){
        const d = JSON.parse(value);
        d.push(data)
        AsyncStorage.setItem('database_form',JSON.stringify(d));
      }else{
        AsyncStorage.setItem('database_form',JSON.stringify(arrayData));
      }
    })
  }catch(err){
    console.log(err)
  }
  
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
          
           this.props.navigation.navigate('ViewDataMeasure');
  
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
      <Register/>
    );
    }
  
  }

  class MeasuresScreen extends React.Component {
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
      <Measures/>
    );
    }
  
  }
  class ViewDataMeasure extends React.Component{
    static navigationOptions = {
      title:'Your Measures'
  }
  
    constructor(props){
      super(props)
      this.state = {
        isLoading:true,
        id_usuario:'wea'
      }
    }
  
    componentDidMount(){
     
      return fetch('http://weaweawea.atwebpages.com/viewMeasures.php', {
          method: 'POST',
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          
           nick_usuario: this.state.id_usuario
          
          })
          
          })
              .then((response)=>response.json())
              .then((responseJson)=>{
                let ds =  new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2})
                this.setState({
                  isLoading:false,
                  dataSource: ds.cloneWithRows(responseJson)
                },function(){})
              }).catch((error)=>{
                console.error(error);
              })
    }
    reload = () => 
  {
      //RELOAD COMPONENT
      this.componentDidMount();
  };
    Action_Click(id_medida,fecha_medida,edad_medida,peso_medida,altura_medida,imc_medida,detalle_medida,id_usuario){
      this.props.navigation.navigate('UpdateAndDeleteMeasures',{
          id_medida:id_medida,
          fecha_medida:fecha_medida,
          edad_medida:edad_medida,
          peso_medida:peso_medida,
          altura_medida:altura_medida,
          imc_medida:imc_medida,
          detalle_medida:detalle_medida,
          id_usuario:id_usuario
        
      })
      Alert.alert(fecha_medida,id_usuario);
    }
  
    ListViewItemSeparator=()=>{
      return(
        <View
        style = {{
          height:.5,
          width:'100%',
          backgroundColor:'#2196F3'
        }}
        />
      )
    }
    
    render(){
      if(this.state.isLoading){
        return(
          <View style={{flex:1,paddingTop:1}}>
            <ActivityIndicator/>
          </View>
        )
      }
      return(
        <View style={styles.ContainerDataUsers}>
          <ListView
            dataSource={this.state.dataSource}
            renderSeparator={this.ListViewItemSeparator}
            renderRow={(rowData)=>
              <Text style={styles.rowViewContainer} onPress={this.Action_Click.bind(this,
                  rowData.id_medida,
                  rowData.fecha_medida,
                  rowData.edad_medida,
                  rowData.peso_medida,
                  rowData.altura_medida,
                  rowData.imc_medida,
                  rowData.detalle_medida,
                  rowData.id_usuario
                )}>
                {rowData.fecha_medida}
              </Text>
            }
          />
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle3} onPress={this.reload}>
            <Text style={styles.TextStyle}>Reload List</Text>
          </TouchableOpacity> 
        </View>
      )
    }
  }
  class UpdateAndDeleteMeasures extends React.Component{
    static navigationOptions={
      title:'Update And Delete Users'
    }
    constructor(props){
      super(props)
      this.state = {
          date:"1997-06-10",
          edad:'',
          InputPeso:'',
          InputAltura:'',
          IMC:'',
          detalleMedida:'',
          id_usuario:'',
          isLoading: true,
          mailvalidate:false
      }
    }
    componentDidMount(){
      this.setState({
        date: this.props.navigation.state.params.fecha_medida,
        edad: this.props.navigation.state.params.edad_medida,
        InputPeso: this.props.navigation.state.params.peso_medida,
        InputAltura: this.props.navigation.state.params.altura_medida,
        IMC: this.props.navigation.state.params.imc_medida,
        detalle_medida: this.props.navigation.state.params.detalle_medida,
        id_usuario: this.props.navigation.state.params.id_usuario,
      
      })
    }
    UpdateUsers=()=>{
      if(this.state.mailvalidate==false){
        fetch('http://10.92.108.146/ProyectoApp/update.php',{
          method: 'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            id_usuario:this.state.InputId,
            nombre_usuario:this.state.InputNombre,
            apellido_usuario:this.state.InputApellido,
            mail_usuario: this.state.InputMail,
            cedula_usuario:this.state.InputCedula,
            direccion_usuario:this.state.InputDireccion,
            telefono_usuario:this.state.InputTelefono,
            nick_usuario:this.state.InputNick,
            pass_usuario:this.state.InputPass
          })
        }).then((response)=>response.json())
        .then((responseJson)=> {
          Alert.alert(responseJson);
          this.props.navigation.navigate('Second');
        }).catch((error)=> {
          console.error(error);
        })
        this.props.navigation.navigate('Second')
      }else{
        Alert.alert('Error','Asegurese de ingresar bien los datos');
      }
      
    }
    DeleteUsers=()=>{
      fetch('http://10.92.108.146/ProyectoApp/delete.php',{
            method: 'POST',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              id_usuario:this.state.InputId
            })
          }).then((response)=>response.json())
          .then((responseJson)=>{
            Alert.alert(responseJson);
            this.props.navigation.navigate('Second');
          }).catch((error)=>{
            console.error(error);
          })
          this.props.navigation.navigate('Second')
    }
    mailvalidate = (text) => {
      console.log(text);
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
      if(reg.test(text) === false)
      {
      console.log("Email is Not Correct");
      this.setState({InputMail:text,mailvalidate:false})
      return false;
        }
      else {
        this.setState({InputMail:text,mailvalidate:true})
        console.log("Email is Correct");
      }
      }
   
    render(){
      return(
        <View style={styles.Container}>
  
          <TextInput 
          value= {this.state.InputPeso}
          placeholder="Enter your Weight as kg"
          onChangeText={InputPeso => this.setState({InputPeso})} 
          underlineColorAndroid='transparent'
          style={styles.TextInputStyle2}
          keyboardType='numeric'
          maxLength={2}/>
  
          <TextInput 
          value={this.state.InputAltura}
          placeholder="Enter your Height as cm"
          onChangeText={InputAltura => this.setState({InputAltura})} 
          underlineColorAndroid='transparent'
          style={styles.TextInputStyle}
          keyboardType='numeric'
          maxLength={3}/>
  
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.UpdateUsers}>
            <Text style={styles.TextStyle}>UPDATE</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle2} onPress={this.DeleteUsers}>
            <Text style={styles.TextStyle}>DELETE</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  const RootStack = createStackNavigator(
    {
      
      LoginScreen:LoginScreen,
      RegisterScreen:RegisterScreen,
      ViewDataMeasure:ViewDataMeasure,
      UpdateAndDeleteMeasures:UpdateAndDeleteMeasures
      
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
    },TextInputStyle:{
      textAlign:'center',
      marginBottom:7,
      height:40,
      width:'85%',
      borderWidth:1,
      borderColor:'#2196F3',
      borderRadius:5
    },
    TextInputStyle2:{
      textAlign:'center',
      marginTop:20,
      marginBottom:7,
      height:40,
      width:'85%',
      borderWidth:1,
      borderColor:'#2196F3',
      borderRadius:5
    },
    TextStyle:{
      color:'#fff',
      textAlign:'center',
  
    },
    TouchableOpacityStyle:{
      paddingTop:10,
      paddingBottom:10,
      borderRadius:5,
      marginBottom:7,
      width:'50%',
      backgroundColor:'#00BCD4',
      
    },
    
    TouchableOpacityStyle2:{
      paddingTop:10,
      paddingBottom:10,
      borderRadius:5,
      marginBottom:7,
      width:'50%',
      backgroundColor:'#FF5722'
    },
    TouchableOpacityStyle3:{
      paddingTop:10,
      paddingBottom:10,
      borderRadius:5,
      marginBottom:7,
      width:'100%',
      backgroundColor:'#00BCD4',
      
    },
    ContainerDataUsers:{
      flex:1,
      paddingTop:20,
      marginLeft:5,
      marginRight:5
    },
    rowViewContainer:{
      textAlign:'center',
      fontSize:20,
      paddingTop:10,
      paddingRight:10,
      paddingBottom:10,
      
    },
   
  });
  